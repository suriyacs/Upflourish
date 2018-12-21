import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Progress, Modal } from 'reactstrap';

import { enrollSection, updateLatestSectionForUser } from '../../actions/section';

import '../../../assets/styles/components/LearningPath.scss';
import '../../../assets/styles/components/LearnerSection.scss';

import ClockIcon from '../../../assets/images/clock.svg';

class NonSortableItem extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.enrolledLearningPath && prevState.enrollPathAndSection &&
      nextProps.enrolledLearningPath.id) {
      const {
        enrollMySection,
        userId,
        match,
        enrolledLearningPath,
        updateLatestSection
      } = nextProps;
      enrollMySection({
        sectionId: prevState.selectedSectionId,
        enrollmentId: enrolledLearningPath.id,
        userId,
        pathId: match.params.pathId
      });
      updateLatestSection(match.params.pathId, prevState.selectedSectionId);
      return {
        enrollPathAndSection: false,
        selectedSectionId: null
      };
    }
    if (nextProps.enrolledSection && nextProps.enrolledSection.id) {
      nextProps.onClickViewSectionContents(
        nextProps.enrolledSection.section_id,
        {
          content_type: nextProps.enrolledSection.latestContent.content_type,
          id: nextProps.enrolledSection.latestContent.id,
          isStarted: nextProps.enrolledSection.latestContent.isStarted
        }
      );
    }
    return null;
  }

  constructor() {
    super();
    this.state = {
      isNotEnrolled: false,
      selectedSectionId: null,
      enrollPathAndSection: false
    };
  }

  onClickStartSection = (sectionId, sectionName, enrollmentId) => {
    const {
      enrollMySection,
      userId,
      match,
      onClickViewSectionContents
    } = this.props;
    enrollMySection({
      sectionId,
      sectionName,
      enrollmentId,
      userId,
      pathId: match.params.pathId
    }, onClickViewSectionContents);
  };

  enrollSection = () => {
    const {
      value,
      enrollmentId
    } = this.props;
    if (enrollmentId && !value.isStarted) {
      this.onClickStartSection(value.id, value.name, enrollmentId);
    } else if (enrollmentId && value.isStarted) {
      this.updateLatestSectionIdForUser(value.id);
      this.props.onClickViewSectionContents(value.id, value.latestContent);
    } else if (!enrollmentId) {
      this.toggleEnrollModal(value.id);
    }
  }

  toggleEnrollModal = sectionId => {
    let { selectedSectionId } = this.state;
    selectedSectionId = sectionId;
    if (sectionId) {
      this.setState({
        isNotEnrolled: !this.state.isNotEnrolled,
        selectedSectionId
      });
    } else {
      this.setState({
        isNotEnrolled: !this.state.isNotEnrolled
      });
    }
  }

  enrollLearningPathAndSection = () => {
    let { enrollPathAndSection } = this.state;
    enrollPathAndSection = true;
    this.setState({
      enrollPathAndSection
    }, () => {
      this.props.onClickEnroll();
    });
  }

  updateLatestSectionIdForUser = sectionId => {
    const { match } = this.props;
    this.props.updateLatestSection(match.params.pathId, sectionId);
  }

  render() {
    const {
      value,
      onClickViewSectionContents,
      index,
      enrollmentId,
      locale,
      enrollmentSectionId
    } = this.props;
    const { isNotEnrolled } = this.state;
    return (
      <div
        className="row px-3 pt-4 section-content c-pointer"
        id={value.id}
        role="presentation"
        onClick={() => { this.enrollSection(); }}
      >
        <div
          id="outer-box"
          className={`col-12 learner-section-detail
          ${value.id === enrollmentSectionId ?
            'show-border-top' : ''}`}
        >
          <div className="row">
            <div className="col-12 col-sm-2 col-md-1 pb-4 section-count">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </div>
            <div className="col-12 col-sm-10 col-md-11 col-lg-11 container-fluid">
              <div className="row">
                <div className="col-11 col-md-12">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <div className="one-row-ellipsis px-2 section-detail-title">{value.name}</div>
                    </div>
                    <div className="col-4 hours-section pr-sm-4">
                      <span className="d-flex flex-row justify-content-end align-items-center">
                        <img className="profile-common-icon assessment" src={ClockIcon} alt="time" />
                        <span className="info pl-2">
                          {parseInt(value.minutes, 10)}
                          <span> {locale.learnerLearningPathDetails.minutes}</span>
                        </span>
                        <span className="pl-4 justify-content-end">
                          {value.points}
                          <span className="pl-1 points">{locale.learnerLearningPathDetails.points}</span>
                        </span>
                      </span>
                    </div>
                  </div>
                  {enrollmentId && value.isStarted &&
                    <div className="row progress-bar-wrapper">
                      <div className="col-8 col-md-6">
                        <Progress value={parseFloat(value.completed_percentage)} />
                      </div>
                      <div className="progress-percentage">
                        {value.completed_percentage ? `${Math.round(value.completed_percentage)}%` : `${0}%`}
                      </div>
                    </div>
                  }
                  <div
                    className="col-12 mb-3 section-detail-content three-row-ellipsis"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={value.description}
                  >
                    {value.description}
                  </div>
                  {
                    value.id === enrollmentSectionId &&
                    <div className="pl-2 mt-2 resume-learning-btn col-12 col-md-10">
                      <button
                        className="btn resume-btn col-10 col-sm-8 col-xl-6"
                        onClick={() => {
                          this.updateLatestSectionIdForUser(value.id);
                          onClickViewSectionContents(value.id, value.latestContent);
                        }}
                      >
                        {locale.learnerLearningPathDetails.resumeLearning}
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isNotEnrolled}
          centered
          external={
            <button className="styles_closeButton__20ID4 pop-up-close-button" onClick={() => this.toggleEnrollModal()}>
              <span className="close-icon">
              &times;
              </span>
            </button>
          }
          modalClassName="reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
        >
          <div className="container-fluid confirm-enroll-popup">
            <div className="row">
              <div className="col-12 text-center title">
                {locale.learnerLearningPathDetails.notEnrolledTitle}
              </div>
              <div className="col-12 text-center description">
                {locale.learnerLearningPathDetails.notEnrolledMsg}
              </div>
              <div className="action-btn p-4">
                <button
                  className="btn enroll-btn w-50 m-0"
                  onClick={() => { this.toggleEnrollModal(); this.enrollLearningPathAndSection(); }}
                >
                  {locale.learnerLearningPathDetails.enrollButton}
                </button>
                <button className="btn cancel-btn" onClick={() => this.toggleEnrollModal()}>
                  {locale.learnerLearningPathDetails.cancelButton}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const NonSortableSectionList = ({
  sections,
  onClickViewSectionContents,
  locale,
  enrollmentId,
  ...props
}) => sections.map((value, index) => (
  <NonSortableItem
    key={value.id}
    distance={1}
    index={index}
    value={value}
    length={sections.length}
    onClickViewSectionContents={onClickViewSectionContents}
    locale={locale}
    enrollmentId={enrollmentId}
    {...props}
  />));

NonSortableItem.propTypes = {
  value: PropTypes.object.isRequired,
  onClickViewSectionContents: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  enrollmentId: PropTypes.string,
  enrollMySection: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  onClickEnroll: PropTypes.func.isRequired,
  updateLatestSection: PropTypes.func.isRequired,
  enrollmentSectionId: PropTypes.string
};

NonSortableItem.defaultProps = {
  enrollmentId: null,
  enrollmentSectionId: ''
};

const mapStateToProps = state => ({
  userId: state.user.get('userId'),
  enrolledLearningPath: state.learningPath.get('enrolledLearningPath'),
  enrolledSection: state.section.get('enrolledSection')
});

const mapDispatchToProps = dispatch => ({
  enrollMySection: (enroll, onClickViewSectionContents) => dispatch(enrollSection(enroll, onClickViewSectionContents)),
  updateLatestSection: (learningPathId, sectionId) =>
    dispatch(updateLatestSectionForUser(learningPathId, sectionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NonSortableSectionList);
