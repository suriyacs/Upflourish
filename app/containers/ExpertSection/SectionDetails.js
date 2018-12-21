import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { translatable } from 'react-multilingual';

import OnlineCourse from '../OnlineCourse/OnlineCourse';
import Article from '../Article/Article';
import Book from '../Book/Book';
import Assesment from '../Assesment/Assesment';
import Document from '../Document/Document';
import Video from '../Video/Video';
import YouTubeVideo from '../YouTube/YouTube';
import ContentSortableList from './ContentSortableList';
import DeleteContent from '../Content/DeleteContent';
import NewContent from '../Content/NewContent';
import SearchBar from '../../components/SearchBar/SearchBar';
import storage from '../../globals/localStorage';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import { constantValues } from '../../globals/AppConstant';
import { fetchSectionDetails, fetchSectionContents, updateSectionContentOrder } from '../../actions/section';

import '../../../assets/styles/components/LearningPath.scss';

import PaperPlane from '../../../assets/images/paper-plane.svg';
import AddWhite from '../../../assets/images/add_white.svg';
import AddGray from '../../../assets/images/add_gray.svg';

let contentOrder = {};

class SectionDetails extends Component {
  constructor() {
    super();
    this.createSection = React.createRef();
    this.state = {
      isOnsearch: false,
      isCreateNewContent: false,
      isDeleteContent: false,
      sectionContentId: '',
      isCourseContentOpen: false,
      isArticleContentOpen: false,
      isBookContentOpen: false,
      isAssessmentContentOpen: false,
      isDocumentContentOpen: false,
      isVideoContentOpen: false,
      isYTVideoContentOpen: false
    };
    this.closeOnEsc = true;
  }

  componentDidMount() {
    const { pathId, sectionId } = this.props.match.params;
    this.props.fetchSectionDetails({ sectionId, pathId });
    this.props.fetchSectionContents(pathId, sectionId, '');
  }

  componentDidUpdate(prevProps) {
    if (this.props.sectionDetails &&
      (!prevProps.sectionDetails || prevProps.sectionDetails.id !== this.props.sectionDetails.id)) {
      const breadCrumbObj = JSON.parse(storage.getItem('breadCrumb'));
      breadCrumbObj.sectionName = this.props.sectionDetails.new_name;
      storage.setItem('breadCrumb', JSON.stringify(breadCrumbObj));
    }
  }

  onClickCreateOrCloseContent = () => {
    this.setState(({ isCreateNewContent }) => ({
      isCreateNewContent: !isCreateNewContent
    }));
  }

  onCloseCreateContentPopup = () => {
    this.setState({ isCreateNewContent: false });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { pathId, sectionId } = this.props.match.params;
    contentOrder = {};
    const newContents = arrayMove(this.props.sectionContents, oldIndex, newIndex);
    newContents.forEach((content, index) => {
      if (newIndex > oldIndex && oldIndex <= index && newIndex >= index) {
        content.order = index + 1;
        contentOrder[content.id] = content.order;
      } else if (oldIndex > newIndex && newIndex <= index && oldIndex >= index) {
        content.order = index + 1;
        contentOrder[content.id] = content.order;
      }
    });
    if (oldIndex !== newIndex) {
      this.props.updateSectionContentOrder(pathId, sectionId, contentOrder);
    }
  }

  onClickDeletedSectionContent = contentIdToDelete => {
    this.setState({
      isDeleteContent: true,
      sectionContentId: contentIdToDelete
    });
  }

  onCloseDeleteContent = () => {
    this.setState({
      isDeleteContent: false,
      sectionContentId: ''
    });
  }

  onClickEditSectionContent = (contentIdToEdit, contentType) => {
    this.setState({
      [`is${contentType}ContentOpen`]: true,
      sectionContentId: contentIdToEdit
    });
  }

  onClickViewSectionContent = (contentId, contentType) => {
    const { pathId, sectionId } = this.props.match.params;
    if (contentType === 'Video' || contentType === 'Document' ||
      contentType === 'Article' || contentType === 'Book' || contentType === 'YTVideo') {
      this.props.history.push(`/learningPath/${pathId}/section/${sectionId}/${contentType.toLowerCase()}/${contentId}`);
    } else if (contentType === 'Course') {
      const targetContent = this.props.sectionContents.find(sectionContent => sectionContent.item_id === contentId);
      if (targetContent && targetContent.new_link) {
        const win = window.open(targetContent.new_link, '_blank');
        win.focus();
      }
    }
  }

  onCloseContentPop = popupFlag => {
    this.setState({ [popupFlag]: false });
  }

  getSectionContentsAfterCreateOrDelete = () => {
    const { pathId, sectionId } = this.props.match.params;
    this.setState({
      isDeleteContent: false,
      sectionContentId: ''
    });
    this.props.fetchSectionContents(pathId, sectionId, '');
  }

  closeOnEscape = () => {
    this.closeOnEsc = !this.closeOnEsc;
  }

  searchContents = value => {
    if (value) {
      this.setState({ isOnsearch: true });
    } else {
      this.setState({ isOnsearch: false });
    }
    const { pathId, sectionId } = this.props.match.params;
    this.props.fetchSectionContents(pathId, sectionId, value);
  }

  redirectToLearningPathDetails = () => {
    this.props.history.goBack();
  }

  publishAllChanges = () => {
    if (this.props.unpublishedCount > 0) {
      // this.props.publishChanges(this.props.match.params.pathId);
    }
  }

  render() {
    const {
      isCreateNewContent,
      isOnsearch,
      isDeleteContent,
      sectionContentId,
      isCourseContentOpen,
      isArticleContentOpen,
      isBookContentOpen,
      isAssessmentContentOpen,
      isDocumentContentOpen,
      isVideoContentOpen,
      isYTVideoContentOpen
    } = this.state;
    const { sectionDetails, sectionContents, unpublishedCount } = this.props;
    const { pathId, sectionId } = this.props.match.params;
    const locale = this.props.locale.sectionDetail;
    const forwardButtonLabel = {
      Document: locale.documentButton,
      Book: locale.bookButton,
      Article: locale.articleButton,
      Video: locale.videoButton,
      YTVideo: locale.videoButton,
      Course: locale.courseButton,
      Assessment: locale.assesmentButton
    };
    const { learningpathName } = JSON.parse(storage.getItem('breadCrumb'));
    return (
      <div className="container-fluid">
        <div className="row learning-path-details-head">
          <div className="col-12 col-md-8 col-lg-9">
            <BreadCrumb
              learningPathName={learningpathName}
              sectionName={sectionDetails && sectionDetails.new_name}
            />
            <div className="path-detail-title">{sectionDetails && sectionDetails.new_name}</div>
            <div className="col-12 padding-0 path-detail">
              <div id="expandableContent" className="learning-path-detail-expandable">
                <p id="detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                  {sectionDetails && sectionDetails.new_description}
                </p>
                {sectionDetails && sectionDetails.new_description &&
                  sectionDetails.new_description.length > constantValues.expandableLimit &&
                  <span className="expand collapsed" data-toggle="collapse" href="#detail" aria-expanded="false" />
                }
              </div>
            </div>
          </div>
          <div className="col-10 col-md-4 offset-1 col-sm-6 offset-sm-3 offset-md-0 col-lg-3 publish">
            <button className="btn publish-btn" onClick={this.publishAllChanges}>
              <img src={PaperPlane} alt="add" className="icon" />{locale.publishButton}
            </button>
            <span className="unpublished">{unpublishedCount} {locale.unpublishCount}</span>
          </div>
        </div>
        <div className="row course-structure">
          <div className="col-12 col-md-7 col-lg-6 p-10 count-and-search">
            <span className="learning-path-count">
              <b>{locale.contentTitle} </b>
              <span className="text-nowrap">
                ({sectionContents.length} {locale.contentCount})
              </span>
            </span>
            <div className="splitter" />
            <div className="d-inline-block learningpath-search">
              <SearchBar onChange={this.searchContents} />
            </div>
          </div>
          <div className="col-10 offset-1 col-sm-6 offset-sm-3 col-md-4 offset-md-1 col-lg-3 offset-lg-3">
            <button
              className="btn add-new-section-btn"
              onClick={this.onClickCreateOrCloseContent}
            >
              <img src={AddWhite} alt="add" className="icon" />{locale.addNewButton}
            </button>
          </div>
          <div className="col-12">
            <ContentSortableList
              axis="xy"
              distance={1}
              contents={sectionContents}
              onSortEnd={option => this.onSortEnd(option)}
              onClickDeletedSectionContent={this.onClickDeletedSectionContent}
              onClickEditSectionContent={this.onClickEditSectionContent}
              onClickViewSectionContent={this.onClickViewSectionContent}
              useDragHandle={(sectionContents.length && sectionContents.length === 1) ? true : isOnsearch}
              locale={locale}
              forwardButtonLabel={forwardButtonLabel}
            />
          </div>
          <div className="col-12">
            <div className="row p-20">
              <div
                className="col-12 add-new-section-div"
                onClick={this.onClickCreateOrCloseContent}
                role="presentation"
              >
                <img src={AddGray} alt="add" className="icon" />{locale.addNewContent}
              </div>
            </div>
          </div>
        </div>
        {/* Edit content start */}
        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isDeleteContent}
          onClose={this.onCloseDeleteContent}
          centered={isDeleteContent}
        >
          <DeleteContent
            onCloseDeleteContent={this.onCloseDeleteContent}
            sectionContentId={sectionContentId}
            onDeleteContent={this.getSectionContentsAfterCreateOrDelete}
            locale={locale}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isCreateNewContent}
          onClose={this.onCloseCreateContentPopup}
          centered={isCreateNewContent}
        >
          <NewContent learningPathId={pathId} sectionId={sectionId} />
        </Modal>

        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isCourseContentOpen}
          onClose={() => { this.onCloseContentPop('isCourseContentOpen'); }}
          centered={isCourseContentOpen}
        >
          <OnlineCourse
            learningPathId={pathId}
            sectionId={sectionId}
            onClickOnlineCourse={() => { this.onCloseContentPop('isCourseContentOpen'); }}
            courseId={sectionContentId}
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isArticleContentOpen}
          onClose={() => { this.onCloseContentPop('isArticleContentOpen'); }}
          centered={isArticleContentOpen}
        >
          <Article
            learningPathId={pathId}
            sectionId={sectionId}
            onClickArticle={() => { this.onCloseContentPop('isArticleContentOpen'); }}
            articleId={sectionContentId}
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isBookContentOpen}
          onClose={() => { this.onCloseContentPop('isBookContentOpen'); }}
          centered={isBookContentOpen}
        >
          <Book
            learningPathId={pathId}
            sectionId={sectionId}
            onClickBook={() => { this.onCloseContentPop('isBookContentOpen'); }}
            bookId={sectionContentId}
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isAssessmentContentOpen}
          onClose={() => { this.onCloseContentPop('isAssessmentContentOpen'); }}
          centered={isAssessmentContentOpen}
        >
          <Assesment
            learningPathId={pathId}
            onClickAssesment={() => { this.onCloseContentPop('isAssessmentContentOpen'); }}
            sectionId={sectionId}
            assesmentId={sectionContentId}
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isDocumentContentOpen}
          onClose={() => { this.onCloseContentPop('isDocumentContentOpen'); }}
          centered={isDocumentContentOpen}
        >
          <Document
            learningPathId={pathId}
            sectionId={sectionId}
            onClickDocument={() => { this.onCloseContentPop('isDocumentContentOpen'); }}
            documentId={sectionContentId}
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isVideoContentOpen}
          onClose={() => { this.onCloseContentPop('isVideoContentOpen'); }}
          centered={isVideoContentOpen}
        >
          <Video
            learningPathId={pathId}
            sectionId={sectionId}
            onClickVideo={() => { this.onCloseContentPop('isVideoContentOpen'); }}
            videoId={sectionContentId}
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={isYTVideoContentOpen}
          onClose={() => { this.onCloseContentPop('isYTVideoContentOpen'); }}
          centered={isYTVideoContentOpen}
        >
          <YouTubeVideo
            learningPathId={pathId}
            sectionId={sectionId}
            onClickYouTube={() => { this.onCloseContentPop('isYTVideoContentOpen'); }}
            videoId={sectionContentId}
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        {/* Edit contents stop */}
      </div>
    );
  }
}

SectionDetails.propTypes = {
  match: PropTypes.object.isRequired,
  fetchSectionDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  sectionDetails: PropTypes.object.isRequired,
  sectionContents: PropTypes.array.isRequired,
  fetchSectionContents: PropTypes.func.isRequired,
  unpublishedCount: PropTypes.number.isRequired,
  updateSectionContentOrder: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  loading: state.section.get('loading'),
  sectionDetails: state.section.get('section'),
  sectionContents: Array.from(state.section.get('sectionContents')),
  unpublishedCount: state.section.get('unpublishedCount')
});

const mapDispatchToProps = dispatch => ({
  fetchSectionDetails: data => dispatch(fetchSectionDetails(data)),
  fetchSectionContents: (learningPathId, sectionId, searchTerm) =>
    dispatch(fetchSectionContents(learningPathId, sectionId, searchTerm)),
  updateSectionContentOrder: (learningPathId, sectionId) =>
    dispatch(updateSectionContentOrder(learningPathId, sectionId, contentOrder))
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(SectionDetails));
