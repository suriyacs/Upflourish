import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';

import { courseSection, routeConstant } from '../../globals/AppConstant';
import LearnerLogin from '../Login/LearnerLogin';
import { loginWithLinkedIn } from '../../actions/login';
import { isCourseEnrolled, enrollMyCareer, clearEnrolledCareerTrack } from '../../actions/careerTrack';
import { enrollSection } from '../../actions/section';
import { enrollLearningPath, clearEnrolledLearningPath } from '../../actions/learningPath';
import { getCourseDetails, clearCoureDetails } from '../../actions/course';
import storage from '../../globals/localStorage';
import GeneralHeader from '../LandingPage/GeneralHeader';
import Loader from '../../components/Loader/Loader';

import '../../../assets/styles/components/Course.scss';

import ArtWork from '../../../assets/images/artwork.svg';
import inactiveArrow from '../../../assets/images/keyboard-right-arrow-button-white.svg';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      isLoginPopupOpen: false
    };
    this.isEnrollCareerCalled = false;
    this.isEnrollSkillCalled = false;
    this.isEnrollSectionCalled = false;
  }
  componentDidMount() {
    const {
      location,
      history,
      match,
      userId
    } = this.props;
    const { courseType, courseId } = match.params;
    if (location.search) {
      const code = this.props.location.search.split('=')[1].split('&')[0];
      if (this.props.location.search.split('=')[0] === '?code') {
        this.props.onLogin(code);
      }
    }
    history.listen(this.onRouteChange);
    this.props.getCourseDetails(courseType, courseId);
    if (userId) {
      this.props.isCourseEnrolled(courseType, courseId);
    }
  }

  componentWillUnmount() {
    this.props.clearCoureDetails();
  }

  onClickViewOrJoinCourse = () => {
    const {
      match,
      userId,
      isContentEnrolled,
      enrolledLearningPath,
      enrolledCareer,
      enrolledSection,
      history,
      enrollMySection,
      enrollMyLearningPath,
      enrollingSection,
      enrollCareer,
      courseDetails
    } = this.props;
    const { courseType } = match.params;
    if (isContentEnrolled && isContentEnrolled.isEnrolled) {
      if (courseType === 'skilltrack') {
        history.push(`${routeConstant.DASHBOARD}${routeConstant.LEARNINGPATH}/${match.params.courseId}`);
      } else if (courseType === 'careertrack') {
        history.push(`${routeConstant.DASHBOARD}${routeConstant.CAREER}/${match.params.courseId}`);
      } else if (courseType === 'microlearning') {
        const section = courseDetails;
        if (section.latestContent && section.latestContent.id) {
          storage.setItem('breadCrumb', JSON.stringify({ learningpathName: '' }));
          const { id } = section.latestContent;
          let { content_type: contentType } = section.latestContent;
          contentType = contentType.toLowerCase();
          const url = `${routeConstant.DASHBOARD}${routeConstant.SECTION}/${section.id}/${contentType}/${id}`;
          history.push({
            pathname: url
          });
        }
      }
    }
    if (isContentEnrolled && (isContentEnrolled.isEnrolled === false) &&
      !enrolledLearningPath.id && (courseType === 'skilltrack') && !this.isEnrollSkillCalled) {
      enrollMyLearningPath({
        userId,
        pathId: match.params.courseId,
        isOverview: true
      });
      this.isEnrollSkillCalled = true;
    } else if (enrolledLearningPath && enrolledLearningPath.id && (courseType === 'skilltrack')) {
      history.push(`${routeConstant.DASHBOARD}${routeConstant.LEARNINGPATH}/${match.params.courseId}`);
    }

    if (isContentEnrolled && (isContentEnrolled.isEnrolled === false) &&
      !enrolledCareer.id && (courseType === 'careertrack') && !this.isEnrollCareerCalled) {
      enrollCareer({
        userId,
        careerId: match.params.courseId,
        isOverview: true
      });
      this.isEnrollCareerCalled = true;
    } else if (enrolledCareer && enrolledCareer.id && (courseType === 'careertrack')) {
      history.push(`${routeConstant.DASHBOARD}${routeConstant.CAREER}/${match.params.courseId}`);
    }
    if (isContentEnrolled && (isContentEnrolled.isEnrolled === false) &&
      !enrolledSection.id && (courseType === 'microlearning') &&
      !enrollingSection && !this.isEnrollSectionCalled) {
      const section = courseDetails;
      enrollMySection({
        sectionId: section.id,
        sectionName: section.name,
        userId,
        pathId: section.id,
        isOverview: true
      }, { isGeneralLogin: true });
      this.isEnrollSectionCalled = true;
    } else if (enrolledSection && enrolledSection.id && (courseType === 'microlearning')) {
      const section = courseDetails;
      if (section.latestContent && section.latestContent.id) {
        storage.setItem('breadCrumb', JSON.stringify({ learningpathName: '' }));
        const { id } = section.latestContent;
        let { content_type: contentType } = section.latestContent;
        contentType = contentType.toLowerCase();
        const url = `${routeConstant.DASHBOARD}${
          routeConstant.SECTION}/${section.id}/${contentType}/${id}`;
        history.push({
          pathname: url
        });
      }
    }
  }

  onRouteChange = () => {
    this.props.clearEnrolledCareerTrack();
    this.props.clearEnrolledLearningPath();
  }

  openLoginPopup = () => {
    if (storage.getItem('user')) {
      const { match } = this.props;
      this.props.isCourseEnrolled(match.params.courseType, match.params.courseId);
    } else {
      this.setState({ isLoginPopupOpen: true });
    }
  };

  closeLoginPopup = () => {
    this.setState({ isLoginPopupOpen: false });
  };

  renderTrack = () => {
    const { locale, match } = this.props;
    const { courseType } = match.params;
    if (courseType === 'skilltrack') {
      return locale.overview.skillTrack;
    } else if (courseType === 'careertrack') {
      return locale.overview.careerTrack;
    } else if (courseType === 'microlearning') {
      return locale.overview.microLearning;
    }
  }

  render() {
    const {
      courseDetails,
      locale,
      userId,
      isContentEnrolled
    } = this.props;
    this.isEnrollCareerCalled = false;
    this.isEnrollSkillCalled = false;
    this.isEnrollSectionCalled = false;
    const { overViewSection } = courseSection;
    const { isLoginPopupOpen } = this.state;
    const { courseId, courseType } = this.props.match.params;
    return (
      <div className="top-section">
        <Loader loading={this.props.loading} />
        <div className="overview-secion" id="overview">
          { !storage.getItem('user') &&
            <GeneralHeader isLanding />
          }
          <div className="container-fluid">
            <div className="row body">
              <div className="col-12 p-3  col-sm-6 image-section">
                <span>
                  <img width="100%" className="art" src={ArtWork} alt="Art work" />
                </span>
              </div>
              <div className="col-12 p-3 col-sm-6 col-md-6 col-lg-6 header-section">
                <div className="mb-3 career-track-div ml-lg-1">
                  <span className="label">
                    {this.renderTrack()}
                  </span>
                </div>
                <div className="mb-3 title">
                  {courseDetails.name}
                </div>
                <div
                  className="mb-3 description pl-lg-1"
                  title={courseDetails.description}
                >
                  {courseDetails.description}
                </div>
                <div className="button-section text-center">
                  <button
                    className="justify-content-center btn join-career-track-btn float-left ml-lg-1"
                    onClick={() => { this.openLoginPopup(); this.onClickViewOrJoinCourse(); }}
                  >
                    {(!userId || (isContentEnrolled && !isContentEnrolled.isEnrolled)) &&
                      <span
                        className="label"
                      >
                        {locale.overview.joinTrack.replace('{track}', this.renderTrack().toLowerCase())}
                      </span>
                    }
                    {isContentEnrolled && isContentEnrolled.isEnrolled &&
                      <span
                        className="label"
                      >
                        {locale.overview.viewTrack.replace('{track}', this.renderTrack().toLowerCase())}
                      </span>
                    }
                    <span>
                      <img
                        className="right-key-arrow"
                        src={inactiveArrow}
                        alt="edit"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid info-section">
            <div className="row">
              <div className="col offset-md-1 col-md-10 offset-lg-2 col-lg-8 body">
                <div className="row">
                  {
                    overViewSection.map(section => (
                      <Fragment key={section.count}>
                        <div className="col col-sm-2 label-section">
                          <div className="info-label">
                            {section.count}
                          </div>
                          <div className="info-sublabel">
                            {section.learners}
                          </div>
                        </div>
                        <div className="col col-sm-4 label-section">
                          <div className="info-label">
                            {section.duration}
                          </div>
                          <div className="info-sublabel">
                            {section.completion}
                          </div>
                        </div>
                      </Fragment>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          modalClassName="min-h-100 learner-login-popup reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
          isOpen={isLoginPopupOpen}
          onClose={this.onCloseChangePassword}
          centered={isLoginPopupOpen}
        >
          <LearnerLogin
            onClosePopup={this.closeLoginPopup}
            courseId={courseId}
            courseType={courseType}
          />
        </Modal>
      </div>
    );
  }
}

Overview.propTypes = {
  history: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.any.isRequired,
  isCourseEnrolled: PropTypes.func.isRequired,
  clearEnrolledCareerTrack: PropTypes.func.isRequired,
  clearEnrolledLearningPath: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  isContentEnrolled: PropTypes.object.isRequired,
  enrolledLearningPath: PropTypes.object.isRequired,
  enrolledCareer: PropTypes.object.isRequired,
  enrolledSection: PropTypes.object.isRequired,
  enrollMySection: PropTypes.func.isRequired,
  enrollMyLearningPath: PropTypes.func.isRequired,
  enrollingSection: PropTypes.bool.isRequired,
  enrollCareer: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  getCourseDetails: PropTypes.func.isRequired,
  clearCoureDetails: PropTypes.func.isRequired,
  courseDetails: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userId: state.user.get('userId'),
  isContentEnrolled: state.careerTrack.get('isCourseEnrolled'),
  enrolledCareer: state.careerTrack.get('enrolledCareer'),
  enrolledLearningPath: state.learningPath.get('enrolledLearningPath'),
  enrolledSection: state.section.get('enrolledSection'),
  enrollingSection: state.section.get('enrollingSection'),
  courseDetails: state.course.get('courseDetails'),
  loading: state.course.get('loading')
});

const mapDispatchToProps = dispatch => ({
  onLogin: code => dispatch(loginWithLinkedIn(code, 'expert')),
  isCourseEnrolled: (courseType, courseId) => dispatch(isCourseEnrolled(courseType, courseId)),
  enrollMyLearningPath: enroll => dispatch(enrollLearningPath(enroll)),
  enrollCareer: enroll => dispatch(enrollMyCareer(enroll)),
  clearEnrolledCareerTrack: () => dispatch(clearEnrolledCareerTrack()),
  clearEnrolledLearningPath: () => dispatch(clearEnrolledLearningPath()),
  enrollMySection: (enroll, additionalData) => dispatch(enrollSection(enroll, additionalData)),
  getCourseDetails: (courseType, courseId) => dispatch(getCourseDetails(courseType, courseId)),
  clearCoureDetails: () => dispatch(clearCoureDetails())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview));
