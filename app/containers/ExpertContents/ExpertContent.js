import React, { PureComponent } from 'react';
import { Modal } from 'reactstrap';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';

import ContentNavigation from './ContentNavigation';
import NewContent from '../Content/NewContent';
import Book from './Book';
import Article from './Article';
import YouTube from './YouTube';
import Video from './Video';
import Loader from '../../components/Loader/Loader';
import Document from './Document';
import DeleteContent from '../Content/DeleteContent';
import Assessment from '../ExpertAssessment/Assessment';
import Menu from '../../../assets/images/menu.svg';
import { routeConstant } from '../../globals/AppConstant';

import {
  fetchSectionContentList,
  reorderContent,
  deleteContent,
  createContent,
  updateContent
} from '../../actions/content';
import { updateMicrolearning } from '../../actions/course';
import { fetchCourseDetailForExpert, publishChanges } from '../../actions/learningPath';
import LearningPath from '../LearningPath/LearningPathForm';

import AssesmentIcon from '../../../assets/images/assessment-w.svg';
import ArticleIcon from '../../../assets/images/article-w.svg';
import BookIcon from '../../../assets/images/book-w.svg';
import VideoIcon from '../../../assets/images/video-w.svg';
import CloseIcon from '../../../assets/images/close.svg';
import NoDataFound from '../../components/NoDataFound/NoDataFound';

class ExpertContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openContentTypeModal: false,
      selectedContentId: this.props.contentList.length ? this.props.contentList[0].id : '',
      isDeletePopup: false,
      iconMap: {
        Assessment: AssesmentIcon,
        Article: ArticleIcon,
        Video: VideoIcon,
        Book: BookIcon,
        YTVideo: VideoIcon,
        Document: ArticleIcon
      },
      openEditModal: false,
      sectionId: null,
      showSideContent: false,
      iPublishedCalled: false,
      showEditMicrolearning: false,
      selectedMicrolearning: {}
    };
    this.selectedContentIdToDelete = '';
  }

  componentDidMount() {
    const { match } = this.props;
    const { sectionId } = match.params;
    this.setSectionId(sectionId);
    this.props.fetchSectionContentList(sectionId);
    this.props.fetchCourseDetailForExpert('Sections', sectionId);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.contentList, this.props.contentList)) {
      const lastContent = this.props.contentList.slice(-1)[0];
      if (lastContent) {
        this.onSelectContent(lastContent.id);
      }
    }
  }

  onSelectContent = (id, isDelete) => {
    if (isDelete) {
      if (this.checkOwnerPermission()) {
        this.selectedContentIdToDelete = id;
        this.setState({ isDeletePopup: true });
      } else {
        this.showUnauthorizeErrorMessage();
      }
    } else {
      this.setState({ selectedContentId: id });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (this.checkOwnerPermission()) {
      const sectionOrder = {};
      const newSections = arrayMove(this.props.contentList, oldIndex, newIndex);
      newSections.forEach((section, index) => {
        if (newIndex > oldIndex && oldIndex <= index && newIndex >= index) {
          section.order = index + 1;
          sectionOrder[section.id] = section.order;
        } else if (oldIndex > newIndex && newIndex <= index && oldIndex >= index) {
          section.order = index + 1;
          sectionOrder[section.id] = section.order;
        }
      });
      if (oldIndex !== newIndex) {
        const { match } = this.props;
        const { sectionId } = match.params;
        this.props.reorderContent(sectionId, sectionOrder);
      }
    } else {
      this.showUnauthorizeErrorMessage();
    }
  }

  onCloseDeleteContent = () => {
    this.setState({ isDeletePopup: false });
  };

  onClickPublish = isPublished => {
    const { iPublishedCalled } = this.state;
    if (isPublished === false && iPublishedCalled === false) {
      const { sectionId } = this.props.match.params;
      this.props.publishChanges('section', sectionId);
      this.setState({
        iPublishedCalled: true
      });
    }
  }

  setSectionId(sectionId) {
    this.setState({ sectionId });
  }

  getIcon = type => {
    const { iconMap } = this.state;
    return iconMap[type];
  }

  getContent = selectedContentId => {
    const { contentList, locale } = this.props;
    const selectedContent = contentList.find(content => content.id === selectedContentId);
    const contentType = selectedContent ? selectedContent.content_type : '';
    switch (contentType) {
      case 'Assessment':
        return <Assessment contentDetails={selectedContent} handleEdit={this.handleEdit} contentList={contentList} />;
      case 'Book':
        return <Book contentDetails={selectedContent} handleEdit={this.handleEdit} />;
      case 'Article':
        return <Article contentDetails={selectedContent} handleEdit={this.handleEdit} />;
      case 'YTVideo':
        return <YouTube contentDetails={selectedContent} handleEdit={this.handleEdit} />;
      case 'Video':
        return <Video contentDetails={selectedContent} handleEdit={this.handleEdit} />;
      case 'Document':
        return <Document contentDetails={selectedContent} handleEdit={this.handleEdit} />;
      default:
        return (
          <NoDataFound
            buttonText={locale.sectionDetail.createContent}
            onClick={this.toggleContentTypeModal}
            description={locale.sectionDetail.noContentDescription}
          />
        );
    }
  }

  getEditContent = selectedContentId => {
    const { contentList } = this.props;
    const { sectionId } = this.state;
    const selectedContent = contentList.find(content => content.id === selectedContentId);
    const contentType = selectedContent ? selectedContent.content_type : '';
    return (
      <NewContent
        sectionId={sectionId}
        closeContentModal={this.closeEditModal}
        contentDetails={selectedContent}
        isEdit
        contentType={contentType}
        saveAssessment={this.saveAssessment}
      />
    );
  }

  getRouteUrl = () => {
    const { match } = this.props;
    const { careerTrackId, skillTrackId } = match.params;
    let url = `${routeConstant.DASHBOARD}`;
    if (careerTrackId) {
      url = `${routeConstant.CAREER_TRACK}/${careerTrackId}${routeConstant.SKILL_TRACK}/${skillTrackId}`;
    } else if (skillTrackId) {
      url = `${routeConstant.SKILL_TRACK}/${skillTrackId}`;
    }
    return url;
  }

  setSideContentVisible = sideContent => {
    this.setState({
      showSideContent: sideContent
    });
  }

  getFirstContentId = contentList => (
    (contentList.size === 0 || contentList.length === 0) ? '' : contentList[0].id
  );

  goBack = () => {
    const url = this.getRouteUrl();
    this.props.history.push(url);
  }

  showUnauthorizeErrorMessage = () => {
    const { locale } = this.props;
    toast.error(locale.learningPathDetails.notAuthorized);
  }

  checkOwnerPermission = () => {
    const { courseDetails, userId } = this.props;
    return courseDetails.owner_id === userId;
  }

  shouldCancelStart = e => (
    // Cancel sorting if the event target is not a drag-icon
    e.target.id !== 'drag-icon'
  );

  toggleContentTypeModal = () => {
    if (this.checkOwnerPermission()) {
      this.setState({ openContentTypeModal: !this.state.openContentTypeModal });
    } else {
      this.showUnauthorizeErrorMessage();
    }
  }

  closeContentTypeModal = () => {
    this.setState({ openContentTypeModal: false });
  }

  closeEditModal = () => {
    this.setState({ openEditModal: false });
  }

  deleteSectionContent = () => {
    const { match } = this.props;
    const { sectionId } = match.params;
    this.props.deleteContent(sectionId, this.selectedContentIdToDelete, this.onCloseDeleteContent);
  };

  openEditMicroleaningModal = () => {
    const { courseDetails } = this.props;
    if (this.checkOwnerPermission()) {
      courseDetails.display_name = 'Microlearning/Section';
      this.setState({ showEditMicrolearning: true, selectedMicrolearning: courseDetails });
    } else {
      this.showUnauthorizeErrorMessage();
    }
  }

  closeEditMicroleaningModal = () => {
    this.setState({ showEditMicrolearning: false });
  }

  handleMicrolearningUpdate = updatedValues => {
    updatedValues.category_id = updatedValues.category.id;
    delete updatedValues.category;
    delete updatedValues.coursetype;
    this.props.updateMicrolearning(updatedValues, this.closeEditMicroleaningModal);
  }

  handleEdit = () => {
    if (this.checkOwnerPermission()) {
      this.setState({
        openEditModal: true
      });
    } else {
      this.showUnauthorizeErrorMessage();
    }
  }

  saveAssessment = (assessment, contentDetails) => {
    const { sectionId } = this.state;
    assessment.content_type = 'Assessment';
    this.closeContentTypeModal();
    this.closeEditModal();
    if (contentDetails && contentDetails.id) {
      assessment.id = contentDetails.id;
      this.props.updateContent(assessment, sectionId);
    } else {
      this.props.createContent(assessment, sectionId);
    }
  }

  externalCloseButton = functionName => (
    <div className="common-close-icon">
      <img
        role="presentation"
        src={CloseIcon}
        alt="close"
        className="icon close-icon c-pointer"
        onClick={functionName}
      />
    </div>
  );

  render() {
    const {
      selectedContentId,
      openContentTypeModal,
      sectionId, iconMap,
      openEditModal,
      isDeletePopup,
      showSideContent,
      iPublishedCalled,
      showEditMicrolearning,
      selectedMicrolearning
    } = this.state;
    const {
      contentList,
      loading,
      locale,
      courseDetails
    } = this.props;
    const { skillTrackId } = this.props.match.params;
    return (
      <div className="wrapper row">
        <Loader loading={loading} />
        <ContentNavigation
          goBack={this.goBack}
          addContentType={this.toggleContentTypeModal}
          contentList={Array.isArray(contentList) ? contentList : []}
          selectedContentId={selectedContentId}
          iconMap={iconMap}
          onSelectContent={this.onSelectContent}
          shouldCancelStart={this.shouldCancelStart}
          onSortEnd={option => this.onSortEnd(option)}
          courseDetails={courseDetails}
          setSideContentVisible={this.setSideContentVisible}
          showSideContent={showSideContent}
          locale={locale.sectionDetail}
          onClickPublish={this.onClickPublish}
          isMicroLearning={skillTrackId}
          showEditIcon={courseDetails.is_microlearning || false}
          iPublishedCalled={iPublishedCalled}
          editMicrolearning={this.openEditMicroleaningModal}
        />
        <div className="no-content-sidebar-section p-0" >
          <span className="open-sidebar" role="presentation" onClick={() => this.setSideContentVisible(true)}>
            <img
              src={Menu}
              alt="opensidenav"
              title="Open SideNav"
            />
          </span>
        </div>
        <div
          className="p-0 content-outer expert-content-outer px-5 pb-5"
        >
          {this.getContent(!selectedContentId ?
            this.getFirstContentId(contentList) :
            selectedContentId)
          }
        </div>

        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={openContentTypeModal}
          onClose={this.closeContentTypeModal}
          centered={openContentTypeModal}
          external={this.externalCloseButton(this.closeContentTypeModal)}
        >
          <NewContent
            saveAssessment={this.saveAssessment}
            sectionId={sectionId}
            closeContentModal={this.closeContentTypeModal}
            category={courseDetails.category_id || ''}
          />
        </Modal>

        {
          openEditModal &&
          this.getEditContent(selectedContentId)
        }

        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isDeletePopup}
          onClose={this.onCloseDeleteContent}
          centered={isDeletePopup}
          external={this.externalCloseButton(this.onCloseDeleteContent)}
        >
          <DeleteContent
            deleteSectionContent={this.deleteSectionContent}
            onCloseDeleteContent={this.onCloseDeleteContent}
            locale={locale.sectionDetail}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={showEditMicrolearning}
          onClose={() => { this.closeEditMicroleaningModal(); }}
          centered={showEditMicrolearning}
          external={this.externalCloseButton(this.closeEditMicroleaningModal)}
          className="custom-modal-dialog"
        >
          <LearningPath
            onClose={() => { this.closeEditMicroleaningModal(); }}
            courseDetails={selectedMicrolearning}
            courseId={courseDetails.id}
            closeOnEscape={this.closeOnEscape}
            handleUpdate={this.handleMicrolearningUpdate}
            isEditPopup
            titleLabel={locale.learningPathDetails.microlearningEditLabel}
          />
        </Modal>
      </div>
    );
  }
}

ExpertContent.propTypes = {
  match: PropTypes.object.isRequired,
  contentList: PropTypes.any,
  fetchSectionContentList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reorderContent: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  createContent: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  fetchCourseDetailForExpert: PropTypes.func.isRequired,
  courseDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  publishChanges: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  updateMicrolearning: PropTypes.func.isRequired
};

ExpertContent.defaultProps = {
  contentList: []
};

const mapStateToProps = state => ({
  loading: state.content.get('loading'),
  contentList: state.content.get('contentList'),
  courseDetails: state.learningPath.get('courseDetails'),
  userId: state.user.get('userId')
});

const mapDispatchToProps = dispatch => ({
  fetchSectionContentList: sectionId => dispatch(fetchSectionContentList(sectionId)),
  reorderContent: (sectionId, contentOrder) => dispatch(reorderContent(sectionId, contentOrder)),
  deleteContent: (sectionId, contentId, cb) => dispatch(deleteContent(sectionId, contentId, cb)),
  createContent: (content, sectionId, file) => dispatch(createContent(content, sectionId, file)),
  updateContent: (content, sectionId, file) => dispatch(updateContent(content, sectionId, file)),
  fetchCourseDetailForExpert: (courseType, courseId) => dispatch(fetchCourseDetailForExpert(courseType, courseId)),
  publishChanges: (courseType, courseId) => dispatch(publishChanges(courseType, courseId)),
  updateMicrolearning: (microlearning, closePopupCb) => dispatch(updateMicrolearning(microlearning, closePopupCb))
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(ExpertContent));
