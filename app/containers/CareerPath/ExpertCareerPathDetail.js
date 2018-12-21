import React, { Component, Fragment } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { arrayMove } from 'react-sortable-hoc';

import {
  fetchCourseDetailForExpert,
  updateCourseDetail,
  publishChanges
} from '../../actions/learningPath';
import {
  fetchSkillTracksByCTId,
  createSkillTrackByCareerTrackId,
  updateSkillTrack,
  deleteSkillTrack,
  updateSkillTrackOrder
} from '../../actions/careerTrack';
import LearningPath from '../LearningPath/LearningPathForm';
import { routeConstant } from '../../globals/AppConstant';
import DetailSideMenu from '../SideMenu/DetailSideMenu';
import SortableSectionList from '../LearningPath/SortableSectionList';
import DeleteSection from '../ExpertSection/DeleteSection';

import AddWhite from '../../../assets/images/add_white.svg';
import PaperPlane from '../../../assets/images/paper-plane.svg';
import CloseIcon from '../../../assets/images/close.svg';
import NoDataFound from '../../components/NoDataFound/NoDataFound';

class CareerPathDetail extends Component {
  constructor() {
    super();
    this.state = {
      isEditCourse: false,
      isCreateSkillTrack: false,
      isOnsearch: false,
      isEditSkillTrack: false,
      selectedSkillTrack: {},
      isDeleteSkillTrack: false
    };
    this.closeOnEsc = true;
    this.skillTrackToDelete = {};
    this.expandableLimit = 270;
    this.iPublishedCalled = false;
  }

  componentDidMount() {
    const { careerTrackId } = this.props.match.params;
    this.props.fetchCareerTrackDetail('CareerTracks', careerTrackId);
    this.props.fetchSkillTracksByCTId(careerTrackId);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const sectionOrder = {};
    const newSections = arrayMove(this.props.skillTracks, oldIndex, newIndex);
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
      const { careerTrackId } = this.props.match.params;
      this.props.updateSkillTrackOrder(careerTrackId, sectionOrder);
    }
  }

  onClickViewCareerTrack = skillTrackId => {
    const { careerTrackId } = this.props.match.params;
    this.props.history.push(`${careerTrackId}${routeConstant.SKILL_TRACK}/${skillTrackId}`);
  }

  onClickPublish = isPublished => {
    const { courseDetails, locale, userId } = this.props;
    if (courseDetails.owner_id === userId) {
      if (isPublished === false && this.iPublishedCalled === false) {
        const { careerTrackId } = this.props.match.params;
        this.props.publishChanges('careerTrack', careerTrackId);
        this.iPublishedCalled = true;
      }
    } else {
      toast.error(locale.learningPathDetails.notAuthorized);
    }
  }

  getSkillTrackToDelete = skillTrack => {
    const { courseDetails, locale, userId } = this.props;
    if (courseDetails.owner_id === userId) {
      this.skillTrackToDelete = skillTrack;
      this.openPopup('isDeleteSkillTrack');
    } else {
      toast.error(locale.learningPathDetails.notAuthorized);
    }
  };

  closePopup = stateValue => {
    this.setState({
      [stateValue]: false
    });
  }

  searchSections = () => {
    // this.props.fetchLearningPathSections(this.props.match.params.pathId, value);
  }

  closeOnEscape = () => {
    this.closeOnEsc = !this.closeOnEsc;
  }

  handleSkillTrackUpdate = value => {
    const { careerTrackId } = this.props.match.params;
    value.careerTrackId = careerTrackId;
    this.props.updateSkillTrack(value, this.closePopup);
  };

  openPopup = (stateValue, selectedSkillTrack) => {
    const { courseDetails, locale, userId } = this.props;
    if (courseDetails.owner_id === userId) {
      if (selectedSkillTrack && selectedSkillTrack.id) {
        selectedSkillTrack.display_name = 'Skill track';
        this.setState({
          [stateValue]: true,
          selectedSkillTrack
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

  handleDelete = () => {
    const { careerTrackId } = this.props.match.params;
    this.props.deleteSkillTrack(careerTrackId, this.skillTrackToDelete.id, this.closePopup);
  }

  handleCreate = courseDetail => {
    const data = {
      name: courseDetail.name,
      description: courseDetail.description,
      category_id: courseDetail.category,
      owner_id: this.props.userId,
      file: courseDetail.file
    };
    this.props.createSkillTrackByCareerTrackId(this.props.match.params.careerTrackId, data, this.closePopup);
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
      // unpublishedCount,
      // learningPathSections
      userId,
      skillTracks
    } = this.props;
    const {
      isEditCourse,
      isCreateSkillTrack,
      isOnsearch,
      selectedSkillTrack,
      isEditSkillTrack,
      isDeleteSkillTrack
    } = this.state;
    const locale = this.props.locale.learningPathDetails;
    const { careerTrackId } = this.props.match.params;
    return (
      <div className="careerPath-details">
        <div className="row">
          {
            courseDetails && courseDetails.id &&
            <DetailSideMenu
              name={courseDetails.name}
              description={courseDetails.description}
              {...this.props}
              routeUrl={
                `${routeConstant.DASHBOARD}`
              }
              showEditIcon
              onEdit={() => { this.openPopup('isEditCourse'); }}
              userId={userId}
            />
          }
          <div className="col-12 col-lg-8 px-5 pb-5 learner-section-inner">
            <div className="col-12 p-3 flow-diagram p-0">
              <div className="row">
                <div className="col-md-4 col-lg-6 flow-diagram p-0">
                  <div className="title pt-3">
                    {courseDetails.name}
                  </div>
                </div>
                {skillTracks && skillTracks.length > 0 &&
                  <Fragment>
                    <div className="col-md-4 col-lg-3 pt-3">
                      <button
                        className={`btn publish-btn ${
                          (this.iPublishedCalled || courseDetails.is_published) && 'c-not-allowed'}`
                        }
                        onClick={() => this.onClickPublish(courseDetails.is_published)}
                        disabled={this.iPublishedCalled || courseDetails.is_published}
                      >
                        <img src={PaperPlane} alt="Publish" className="icon" />
                        {locale.publishButton}
                      </button>
                    </div>
                    <div className="col-md-4 col-lg-3 pt-3">
                      <button
                        className="btn add-new-section-btn"
                        onClick={() => { this.openPopup('isCreateSkillTrack'); }}
                      >
                        <img src={AddWhite} alt="Add" className="icon" />
                        {locale.addNewButton}
                      </button>
                    </div>
                  </Fragment>
                }
              </div>
              {
                skillTracks && skillTracks.length ?
                  <div className="col-12">
                    <SortableSectionList
                      axis="xy"
                      distance={1}
                      sections={skillTracks}
                      onSortEnd={option => this.onSortEnd(option)}
                      onClickDeletedSection={this.getSkillTrackToDelete}
                      onClickEditSection={skillTrack => { this.openPopup('isEditSkillTrack', skillTrack); }}
                      onClickViewSection={this.onClickViewCareerTrack}
                      useDragHandle={(skillTracks.length && skillTracks.length === 1) ? true : isOnsearch}
                      locale={locale}
                      ownerId={courseDetails.owner_id}
                      userId={userId}
                    />
                  </div>
                  :
                  <NoDataFound
                    buttonText={locale.addNewButton}
                    onClick={() => { this.openPopup('isCreateSkillTrack'); }}
                    description={locale.noSkillDescription}
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
            courseId={careerTrackId}
            closeOnEscape={this.closeOnEscape}
            handleUpdate={value => { this.props.updateCourseDetail(value, this.closePopup); }}
            courseDetails={courseDetails}
            isEditPopup
            titleLabel={locale.careerEditLabel}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isEditSkillTrack}
          onClose={() => { this.closePopup('isEditSkillTrack'); }}
          centered={isEditSkillTrack}
          external={this.externalCloseButton('isEditSkillTrack')}
          className="custom-modal-dialog"
        >
          <LearningPath
            onClose={() => { this.closePopup('isEditSkillTrack'); }}
            courseDetails={selectedSkillTrack}
            courseId={selectedSkillTrack.id}
            closeOnEscape={this.closeOnEscape}
            handleUpdate={this.handleSkillTrackUpdate}
            isEditPopup
            titleLabel={locale.skillEditLabel}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isCreateSkillTrack}
          onClose={() => { this.closePopup('isCreateSkillTrack'); }}
          centered={isCreateSkillTrack}
          external={this.externalCloseButton('isCreateSkillTrack')}
          className="custom-modal-dialog"
        >
          <LearningPath
            onClose={() => { this.closePopup('isCreateSkillTrack'); }}
            courseId=""
            closeOnEscape={this.closeOnEscape}
            handleCreate={this.handleCreate}
            isMappingCourse
            titleLabel={locale.skillCreateLabel}
            initialValues={{ category: courseDetails.category_id }}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={isDeleteSkillTrack}
          onClose={() => { this.closePopup('isDeleteSkillTrack'); }}
          centered={isDeleteSkillTrack}
          external={this.externalCloseButton('isDeleteSkillTrack')}
        >
          <DeleteSection
            onCloseDeleteSection={() => { this.closePopup('isDeleteSkillTrack'); }}
            onDeleteSection={() => { this.handleDelete(); }}
            locale={locale}
            title={locale.skillTrack}
          />
        </Modal>
      </div >
    );
  }
}

CareerPathDetail.propTypes = {
  match: PropTypes.object.isRequired,
  courseDetails: PropTypes.object.isRequired,
  fetchCareerTrackDetail: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  unpublishedCount: PropTypes.number.isRequired,
  learningPathSections: PropTypes.array.isRequired,
  updateCourseDetail: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  createSkillTrackByCareerTrackId: PropTypes.func.isRequired,
  fetchSkillTracksByCTId: PropTypes.func.isRequired,
  skillTrackDetail: PropTypes.object.isRequired,
  skillTracks: PropTypes.array.isRequired,
  updateSkillTrack: PropTypes.func.isRequired,
  deleteSkillTrack: PropTypes.func.isRequired,
  updateSkillTrackOrder: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  publishChanges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  userId: state.user.get('userId'),
  courseDetails: state.learningPath.get('courseDetails'),
  skillTrackDetail: state.careerTrack.get('skillTrackDetail'),
  unpublishedCount: state.learningPath.get('unpublishedCount'),
  learningPathSections: Array.from(state.learningPath.get('learningPathSections')),
  skillTracks: Array.from(state.careerTrack.get('skillTracks'))
});

const mapDispatchToProps = dispatch => ({
  fetchCareerTrackDetail: (courseType, pathId) => dispatch(fetchCourseDetailForExpert(courseType, pathId)),
  fetchCourseDetailForExpert: (courseType, courseId) => dispatch(fetchCourseDetailForExpert(courseType, courseId)),
  updateCourseDetail: (courseDetail, cb) => dispatch(updateCourseDetail(courseDetail, cb)),
  createSkillTrackByCareerTrackId: (careerTrackId, courseDetail, cb) => dispatch(createSkillTrackByCareerTrackId(
    careerTrackId,
    courseDetail,
    cb
  )),
  fetchSkillTracksByCTId: careerTrackId => dispatch(fetchSkillTracksByCTId(careerTrackId)),
  updateSkillTrack: (courseDetail, cb) => dispatch(updateSkillTrack(courseDetail, cb)),
  deleteSkillTrack: (careerTrackId, skillTrackId, cb) => dispatch(deleteSkillTrack(careerTrackId, skillTrackId, cb)),
  updateSkillTrackOrder: (careerTrackId, skillList) => dispatch(updateSkillTrackOrder(careerTrackId, skillList)),
  publishChanges: (courseType, courseId) => dispatch(publishChanges(courseType, courseId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(translatable(locale => locale)(CareerPathDetail)));
