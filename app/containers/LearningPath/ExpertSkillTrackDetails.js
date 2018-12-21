import React, { Component, Fragment } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { arrayMove } from 'react-sortable-hoc';
import { toast } from 'react-toastify';

import {
  fetchCourseDetailForExpert,
  updateCourseDetail,
  fetchLearningPathSections,
  publishChanges
} from '../../actions/learningPath';
import {
  createSection,
  updateSection,
  deleteSection,
  updateSectionOrder
} from '../../actions/section';

import LearningPath from '../LearningPath/LearningPathForm';
import { routeConstant } from '../../globals/AppConstant';
import DetailSideMenu from '../SideMenu/DetailSideMenu';
import SortableSectionList from '../LearningPath/SortableSectionList';
import DeleteSection from '../ExpertSection/DeleteSection';

import AddWhite from '../../../assets/images/add_white.svg';
import PaperPlane from '../../../assets/images/paper-plane.svg';
import CloseIcon from '../../../assets/images/close.svg';
import NoDataFound from '../../components/NoDataFound/NoDataFound';

class SkillTrackDetail extends Component {
  constructor() {
    super();
    this.state = {
      isEditCourse: false,
      isOnsearch: false,
      isEditSection: false,
      isCreateSection: false,
      selectedSection: {},
      isDeleteSection: false
    };
    this.closeOnEsc = true;
    this.sectionToDelete = {};
    this.expandableLimit = 270;
    this.iPublishedCalled = false;
  }

  componentDidMount() {
    const { skillTrackId } = this.props.match.params;
    this.props.fetchSkillTrackDetail('SkillTracks', skillTrackId);
    this.props.fetchSectionsBySTId(skillTrackId);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const sectionOrder = {};
    const newSections = arrayMove(this.props.learningPathSections, oldIndex, newIndex);
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
      const { skillTrackId } = this.props.match.params;
      this.props.updateSectionOrder(skillTrackId, sectionOrder);
    }
  }

  onClickViewCareerTrack = sectionId => {
    const { match } = this.props;
    const { skillTrackId, careerTrackId } = match.params;
    const url = careerTrackId ?
      `${routeConstant.CAREER_TRACK}/${careerTrackId}${routeConstant.SKILL_TRACK}/${skillTrackId}/${sectionId}` :
      `${routeConstant.SKILL_TRACK}/${skillTrackId}/${sectionId}`;
    this.props.history.push(url);
  }

  onClickPublish = isPublished => {
    if (isPublished === false && this.iPublishedCalled === false) {
      const { skillTrackId } = this.props.match.params;
      this.props.publishChanges('skillTrack', skillTrackId);
      this.iPublishedCalled = true;
    }
  }

  getSectionToDelete = section => {
    this.sectionToDelete = section;
    this.openPopup('isDeleteSection');
  };

  closePopup = stateValue => {
    this.setState({
      [stateValue]: false
    });
  }

  closeOnEscape = () => {
    this.closeOnEsc = !this.closeOnEsc;
  }

  handleSectionUpdate = value => {
    value.category_id = value.category;
    delete value.category;
    this.props.updateSection(
      value,
      this.props.match.params.skillTrackId,
      this.closePopup
    );
  };

  openPopup = (stateValue, selectedSection) => {
    const { locale, userId, courseDetails } = this.props;
    if (courseDetails.owner_id === userId) {
      if (selectedSection && selectedSection.id) {
        selectedSection.display_name = 'Microlearning/Section';
        this.setState({
          [stateValue]: true,
          selectedSection
        });
      } else {
        this.setState({
          [stateValue]: true
        });
      }
    } else {
      toast.error(locale.learningPathDetails.notAuthorized);
    }
  }

  updateSkillTrack = data => {
    this.props.updateCourseDetail(data, this.closePopup);
  }

  handleDelete = () => {
    const { skillTrackId } = this.props.match.params;
    this.props.deleteSection(this.sectionToDelete.id, skillTrackId, this.closePopup);
  }

  handleCreate = courseDetail => {
    const data = {
      name: courseDetail.name,
      description: courseDetail.description,
      category_id: courseDetail.category,
      owner_id: this.props.userId,
      file: courseDetail.file
    };
    this.props.createSectionkBySkillTrackId(this.props.match.params.skillTrackId, data, this.closePopup);
  }

  externalCloseButton = modalName => (
    <div className="common-close-icon">
      <img
        role="presentation"
        src={CloseIcon}
        alt="close"
        className="icon close-icon c-pointer"
        onClick={() => { this.closePopup(`${modalName}`); }}
      />
    </div>
  );

  render() {
    const {
      courseDetails,
      learningPathSections,
      userId
    } = this.props;
    const {
      isEditCourse,
      isCreateSection,
      isOnsearch,
      selectedSection,
      isEditSection,
      isDeleteSection
    } = this.state;
    const locale = this.props.locale.learningPathDetails;
    const { skillTrackId, careerTrackId } = this.props.match.params;
    const routeUrl = careerTrackId ? `${routeConstant.CAREER_TRACK}/${careerTrackId}` : routeConstant.DASHBOARD;
    return (
      <div className="careerPath-details">
        <div className="row">
          {
            courseDetails && courseDetails.id &&
            <DetailSideMenu
              name={courseDetails.name}
              description={courseDetails.description}
              {...this.props}
              routeUrl={routeUrl}
              showEditIcon
              onEdit={() => { this.openPopup('isEditCourse'); }}
              userId={userId}
            />
          }
          <div className="col-12 col-lg-8 px-5 pb-5 learner-section-inner">
            <div className="col-12 p-3 flow-diagram p-0">
              <div className="row">
                <div className={`${careerTrackId ? 'col-md-8 col-lg-9' : 'col-md-4 col-lg-6'} flow-diagram p-0`}>
                  <div className="title pt-3">
                    {courseDetails.name}
                  </div>
                </div>
                {learningPathSections && learningPathSections.length > 0 &&
                  <Fragment>
                    {!careerTrackId &&
                      <div className="col-md-4 col-lg-3 flow-diagram pt-3">
                        <button
                          className="btn publish-btn"
                          onClick={() => this.onClickPublish(courseDetails.is_published)}
                          disabled={this.iPublishedCalled || courseDetails.is_published}
                        >
                          <img src={PaperPlane} alt="Publish" className="icon" />
                          {locale.publishButton}
                        </button>
                      </div>
                    }
                    <div className="col-md-4 col-lg-3 flow-diagram pt-3">
                      <button
                        className="btn add-new-section-btn"
                        onClick={() => { this.openPopup('isCreateSection'); }}
                      >
                        <img src={AddWhite} alt="Add" className="icon" />
                        {locale.addNewSection}
                      </button>
                    </div>
                  </Fragment>
                }
              </div>
              {
                learningPathSections && learningPathSections.length ?
                  <div className="col-12">
                    <SortableSectionList
                      axis="xy"
                      distance={1}
                      sections={learningPathSections}
                      onSortEnd={option => this.onSortEnd(option)}
                      onClickDeletedSection={this.getSectionToDelete}
                      onClickEditSection={section => { this.openPopup('isEditSection', section); }}
                      onClickViewSection={this.onClickViewCareerTrack}
                      useDragHandle={(learningPathSections.length &&
                        learningPathSections.length === 1) ? true : isOnsearch}
                      locale={locale}
                      ownerId={courseDetails.owner_id}
                      userId={userId}
                    />
                  </div>
                  :
                  <NoDataFound
                    buttonText={locale.addNewSection}
                    onClick={() => { this.openPopup('isCreateSection'); }}
                    description={locale.noSectionDescription}
                  />
              }
            </div>
          </div>
        </div>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isEditCourse}
          onClose={() => { this.closePopup('isEditCourse'); }}
          centered={isEditCourse}
          external={this.externalCloseButton('isEditCourse')}
          className="custom-modal-dialog"
        >
          <LearningPath
            onClose={() => { this.closePopup('isEditCourse'); }}
            courseId={skillTrackId}
            closeOnEscape={this.closeOnEscape}
            handleUpdate={this.updateSkillTrack}
            courseDetails={courseDetails}
            isEditPopup
            titleLabel={locale.skillEditLabel}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isEditSection}
          onClose={() => { this.closePopup('isEditSection'); }}
          centered={isEditSection}
          external={this.externalCloseButton('isEditSection')}
          className="custom-modal-dialog"
        >
          <LearningPath
            onClose={() => { this.closePopup('isEditSection'); }}
            courseDetails={selectedSection}
            courseId={selectedSection.id}
            closeOnEscape={this.closeOnEscape}
            handleUpdate={this.handleSectionUpdate}
            isEditPopup
            titleLabel={locale.sectionEditLabel}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isCreateSection}
          onClose={() => { this.closePopup('isCreateSection'); }}
          centered={isCreateSection}
          external={this.externalCloseButton('isCreateSection')}
          className="custom-modal-dialog"
        >
          <LearningPath
            onClose={() => { this.closePopup('isCreateSection'); }}
            courseId=""
            closeOnEscape={this.closeOnEscape}
            handleCreate={this.handleCreate}
            isMappingCourse
            titleLabel={locale.sectionCreateLabel}
            initialValues={{ category: courseDetails.category_id }}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isDeleteSection}
          onClose={() => { this.closePopup('isDeleteSection'); }}
          centered={isDeleteSection}
          external={this.externalCloseButton('isDeleteSection')}
        >
          <DeleteSection
            onCloseDeleteSection={() => { this.closePopup('isDeleteSection'); }}
            onDeleteSection={() => { this.handleDelete(); }}
            locale={locale}
            title={locale.section}
          />
        </Modal>
      </div >
    );
  }
}

SkillTrackDetail.propTypes = {
  match: PropTypes.object.isRequired,
  courseDetails: PropTypes.object.isRequired,
  fetchSkillTrackDetail: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  unpublishedCount: PropTypes.number.isRequired,
  learningPathSections: PropTypes.array.isRequired,
  updateCourseDetail: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  createSectionkBySkillTrackId: PropTypes.func.isRequired,
  fetchSectionsBySTId: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  updateSectionOrder: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  publishChanges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  userId: state.user.get('userId'),
  courseDetails: state.learningPath.get('courseDetails'),
  unpublishedCount: state.learningPath.get('unpublishedCount'),
  learningPathSections: Array.from(state.learningPath.get('learningPathSections'))
});

const mapDispatchToProps = dispatch => ({
  fetchSkillTrackDetail: (courseType, pathId) => dispatch(fetchCourseDetailForExpert(courseType, pathId)),
  updateCourseDetail: (courseDetail, cb) => dispatch(updateCourseDetail(courseDetail, cb)),
  createSectionkBySkillTrackId: (skillTrackId, courseDetail, cb) => dispatch(createSection(
    courseDetail,
    skillTrackId,
    cb
  )),
  fetchSectionsBySTId: skillTrackId => dispatch(fetchLearningPathSections(skillTrackId)),
  updateSection: (section, skillTrackId, cb) => dispatch(updateSection(section, skillTrackId, cb)),
  deleteSection: (sectionId, skillTrackId, cb) => dispatch(deleteSection(sectionId, skillTrackId, cb)),
  updateSectionOrder: (skillTrackId, sectionOrder) => dispatch(updateSectionOrder(skillTrackId, sectionOrder)),
  publishChanges: (courseType, courseId) => dispatch(publishChanges(courseType, courseId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(translatable(locale => locale)(SkillTrackDetail)));
