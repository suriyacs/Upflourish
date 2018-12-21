import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';
import { reduxForm } from 'redux-form';

import { checkIfDashboardCourseEnrolled, clearEnrolledCareerTrack } from '../../actions/careerTrack';
import {
  fetchCurrentLearningPaths,
  getAllLearningPathMaterials,
  getRecommendedLearnings
} from '../../actions/learningPath';
import {
  routeConstant,
  dashboardSection,
  courseTypes,
  thumnailCourseType,
  learnerEnrollmentTabs
} from '../../globals/AppConstant';
import LearnerDashboardSideBar from './LearnerDashboardSidebar';
import CompleteYourProfile from '../Recommendation/CompleteYourProfile';
import RecommendedCareerTrack from '../Recommendation/RecommendedCareerTrack';
import RecommendedSkillTrack from '../Recommendation/RecommendedSkillTrack';
import RecommendedMicrolearning from '../Recommendation/RecommendedMicrolearning';
import FeaturedLearningPath from '../Recommendation/FeaturedLearningPath';
import storage from '../../globals/localStorage';
import ImageURL from '../../components/Image/ImageURL';
import { getDailyGoals } from '../../actions/goal';
import { fetchCompletedCourses } from '../../actions/profile';
import Loader from '../../components/Loader/Loader';
import Star from '../../../assets/images/star.svg';

import '../../../assets/styles/components/Dashboard.scss';
import '../../../assets/styles/common.scss';
import '../../../assets/styles/components/LearningPath.scss';

import NoImage from '../../../assets/images/no-image.svg';

class LearnerHomeDashboard extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { isDashboardCourseEnrolled, history } = nextProps;
    if (isDashboardCourseEnrolled && isDashboardCourseEnrolled.isEnrolled) {
      if (prevState.courseType === 'skillTrack') {
        history.push(`${routeConstant.DASHBOARD}${routeConstant.LEARNINGPATH}/${prevState.courseId}`);
      } else if (prevState.courseType === 'careerTrack') {
        history.push(`${routeConstant.DASHBOARD}${routeConstant.CAREER}/${prevState.courseId}`);
      }
    }
    if (isDashboardCourseEnrolled && (isDashboardCourseEnrolled.isEnrolled === false)) {
      if (prevState.courseType === 'skillTrack') {
        history.push({
          pathname: `${routeConstant.SKILL_TRACK}/${prevState.courseId}`
        });
      } else if (prevState.courseType === 'careerTrack') {
        history.push({
          pathname: `${routeConstant.CAREER_TRACK}/${prevState.courseId}`
        });
      }
    }
    return null;
  }
  constructor() {
    super();
    this.state = {
      popularCourses: [],
      activeCourse: '',
      courseId: '',
      courseType: '',
      activeTab: 0
    };
  }

  componentDidMount() {
    this.props.fetchCurrentLearningPaths(this.props.roleId);
    window.addEventListener('scroll', this.scrollFunction);
    this.props.history.listen(this.onRouteChange);
    this.props.getRecommendedLearnings();
    this.props.getDailyGoals();
  }

  onRouteChange = () => {
    this.props.clearIsDashboardCourseEnrolled();
  }

  onCloseRecommendation = () => {
    document.getElementsByClassName('whichCourseToTake')[0].classList.add('close-recommend-popup');
    document.getElementsByClassName('open-arrow')[0].classList.remove('d-none');
  }

  onOpenRecommendation = () => {
    document.getElementsByClassName('whichCourseToTake')[0].classList.remove('close-recommend-popup');
    document.getElementsByClassName('open-arrow')[0].classList.add('d-none');
  }

  onClickLearningPath = (pathId, courseType, latestContent) => {
    switch (courseType) {
      case 'Skill track':
        this.props.history.push(`${routeConstant.DASHBOARD}${routeConstant.LEARNINGPATH}/${pathId}`);
        break;
      case 'Career track':
        this.props.history.push(`${routeConstant.DASHBOARD}${routeConstant.CAREER}/${pathId}`);
        break;
      case 'Microlearning':
        storage.setItem('breadCrumb', JSON.stringify({ learningpathName: '' }));
        this.props.history.push({
          pathname: `${routeConstant.DASHBOARD}` +
            `${routeConstant.SECTION}/${pathId}/` +
            `${latestContent.content_type.toLowerCase()}/${latestContent.id}`
        });
        break;
      default:
        break;
    }
  }

  onClickCompleteProfile = () => {
    const { userDetails: { learner: { is_resume_uploaded: IsResumeUploaded } } } = this.props;
    if (IsResumeUploaded) {
      this.props.history.push(routeConstant.PROFILE);
    } else {
      this.props.history.push(routeConstant.UPLOADRESUME);
    }
  };

  getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  setActiveTab = index => {
    const { roleId } = this.props;
    this.setState({ activeTab: index });
    if (index === 0) {
      this.props.fetchCurrentLearningPaths(roleId);
    } else if (index === 1) {
      this.props.fetchCompletedCourses(roleId);
    }
  }

  setActiveCategory = categoryId => {
    const { popularCourses } = this.state;
    if (popularCourses.indexOf(categoryId) !== -1) {
      popularCourses.splice(categoryId, 1);
    } else {
      popularCourses.push(categoryId);
    }
    this.setState({
      popularCourses
    });
  }

  getStatus = id => {
    const { popularCourses } = this.state;
    if (popularCourses.indexOf(id) === -1) {
      return 'popular';
    }
    return 'new';
  }

  setExploreCourseStyle = (course, index) => {
    const { activeCourse } = this.state;
    if (activeCourse.length === 0 && index === 0) {
      return 'active';
    } else if (course === activeCourse) {
      return 'active';
    }
    return '';
  }

  setActiveCourse = course => {
    this.setState({
      activeCourse: course
    });
  }

  scrollFunction = () => {
    if ((document.body.scrollTop >= 500 || document.documentElement.scrollTop >= 500) &&
      document.getElementsByClassName('whichCourseToTake')[0]) {
      document.getElementsByClassName('whichCourseToTake')[0].classList.remove('d-none');
    }
  }

  checkIfEnrolled = (id, courseType) => {
    let type = this.state.courseType;
    type = courseTypes[courseType];
    this.setState({
      courseId: id,
      courseType: type
    }, () => {
      this.props.checkIfDashboardCourseEnrolled(this.state.courseType, this.state.courseId);
    });
  }

  goToProfilePage = () => {
    this.props.history.push(`${routeConstant.PROFILE}`);
  }

  goToMicroLearningPage = microLearning => {
    const {
      isStarted, id, latestContent
    } = microLearning;
    if (isStarted) {
      storage.setItem('breadCrumb', JSON.stringify({ learningpathName: '' }));
      this.props.history.push({
        pathname: `${routeConstant.DASHBOARD}` +
          `${routeConstant.SECTION}/${id}/` +
          `${latestContent.content_type.toLowerCase()}/${latestContent.id}`
      });
    } else {
      this.props.history.push({
        pathname: `${routeConstant.MICRO_LEARNING}/${id}`
      });
    }
  }

  formatLearningPath = learningPath => ({
    ...(learningPath.skillTrack || learningPath.careerTrack
      || learningPath.section),
    completed_percentage: learningPath.completed_percentage,
    courseType: learningPath.courseType,
    isCompleted: learningPath.is_completed
  });

  renderEnrollmentCard = learningPath => {
    const {
      starRating,
      ratingCount
    } = this.props;
    const learnerHomePageLocale = this.props.locale.learnerHomePage;
    const randomRatingCount = (ratingCount === 0) ? this.getRandomInt(1000) : ratingCount;
    let randomStarRating = (starRating === 0.0) ? this.getRandomInt(5) : starRating;
    randomStarRating += 0.5;
    return (
      <div key={learningPath.id} className="col-sm-6 col-md-6 col-lg-4 py-3 px-2">
        <div
          className="learner-learning-path min-h-90 zoomIn m-0"
          key={learningPath.id}
          role="presentation"
          onClick={() => this.onClickLearningPath(
            learningPath.id,
            learningPath.courseType,
            {
              ...learningPath.latestContent,
              sectionEnrollmentId: learningPath.enrolment_section_id
            }
          )}
        >
          <div className="text-truncate">
            <img
              className="zoomingImg"
              src={ImageURL(thumnailCourseType[learningPath.display_name] ?
                thumnailCourseType[learningPath.display_name].url : '', learningPath.id)}
              alt="learningPath"
              onError={event => { event.target.src = NoImage; }}
            />
          </div>
          <div className="learning-path-details">
            <div className="learning-path-name one-row-ellipsis p-10">
              {learningPath.name}
            </div>
          </div>
          <div className="learning-path-btns">
            <button
              className="btn learning-path-action-btn"
            >
              {learningPath.isCompleted ? learnerHomePageLocale.view :
                learnerHomePageLocale.continueLearning}
              <i className="fa fa-angle-right" />
            </button>
            <div className="d-flex progress-content">
              {
                learningPath &&
                learningPath.completed_percentage !== null &&
                <Fragment>
                  <Progress value={parseInt(learningPath.completed_percentage, 10)} />
                  <div className="progress-percentage">
                    {learningPath.completed_percentage ?
                      Math.round(learningPath.completed_percentage) : 0}%
                  </div>
                </Fragment>
              }
            </div>
          </div>
          <div className="card-detail">
            <div className="h-25">
              <div className="row description">
                <div className="col-1 star-count">{randomStarRating}</div>
                <img className="star-img p-0" src={Star} alt="rating" />
                <div className="col-4 p-0">({randomRatingCount} ratings)</div>
                <div className="col-5 p-l-0 text-right">{learningPath.learner_count} learners</div>
              </div>
            </div>
          </div>
          <label
            className="card-label text-center"
            htmlFor={learningPath.courseType}
          >{learningPath.courseType}
          </label>
        </div>
      </div>
    );
  }

  renderTabs = () => {
    const { activeTab } = this.state;
    const locale = this.props.locale.learnerHomePage;
    return (
      <div className="expert-course-tabs nav nav-tabs w-100 mb-3 h-100">
        {learnerEnrollmentTabs.map((tab, index) => (
          <li
            className={`nav-item ${activeTab === index ? 'active-tab' : ''}`}
            onClick={() => this.setActiveTab(index)}
            role="presentation"
            key={tab}
          >
            <div className="nav-link c-pointer">{locale.learnerEnrollmentTabs[index]}</div>
          </li>
        ))}
      </div>
    );
  }

  renderNoCoursesFound = () => {
    const locale = this.props.locale.learnerHomePage;
    const { activeTab } = this.state;
    if (activeTab === 0) {
      return locale.noCurrentEnrollments;
    }
    return locale.noCompletedCourses;
  }

  render() {
    const {
      currentLearningPaths,
      locale,
      allLearningPathMaterials,
      goalStatus,
      completedCourses,
      loadingEnrollments,
      loadingCurrentCourses
    } = this.props;
    const { isFilterEnable } = dashboardSection;
    const learnerHomePageLocale = this.props.locale.learnerHomePage;
    const learningPathLocale = this.props.locale.learnerLearningPathDetails;
    const { activeTab } = this.state;
    return (
      <div className="row">
        <Loader loading={loadingEnrollments || loadingCurrentCourses} />
        <div className="col-12 learner-learning-path-container p-4">
          <div className="row">
            <div className={`col-lg-3 col-md-4 col-xs-1 col-12 collapse in ${isFilterEnable ? '' : 'show'}`} >
              <div className="p-10 col-12 course-structure sidebar-wrapper">
                <LearnerDashboardSideBar
                  learningPathLocale={learningPathLocale}
                  goToProfilePage={this.goToProfilePage}
                  goalStatus={goalStatus}
                />
              </div>
            </div>
            <main className="col-md-8 col-lg-9 p-l-2 p-t-2 col-12">
              <div className="continue-watching-container">
                <span className="row continue-watching-text px-2">
                  {learnerHomePageLocale.myLearnings}
                </span>
                <div className="row">
                  {
                    this.renderTabs()
                  }
                  {
                    activeTab === 0 &&
                    currentLearningPaths.map(learningPath => {
                      learningPath = this.formatLearningPath(learningPath);
                      return this.renderEnrollmentCard(learningPath);
                    })
                  }
                  {
                    activeTab === 1 &&
                    completedCourses.map(learningPath => {
                      learningPath = this.formatLearningPath(learningPath);
                      return this.renderEnrollmentCard(learningPath);
                    })
                  }
                  {
                    activeTab === 0 && currentLearningPaths.length === 0 &&
                    <div className="no-learning-path">
                      {this.renderNoCoursesFound()}
                    </div>
                  }
                  {
                    activeTab === 1 && completedCourses.length === 0 &&
                    <div className="no-learning-path">
                      {this.renderNoCoursesFound()}
                    </div>
                  }
                </div>
              </div>
              <Fragment>
                <div className="whichCourseToTake py-4 px-4 d-none">
                  <div className="open-arrow px-2 d-none">
                    <i
                      className="fa fa-angle-left c-pointer"
                      onClick={this.onOpenRecommendation}
                      role="presentation"
                    />
                  </div>
                  <i
                    className="fa fa-angle-right close-arrow c-pointer"
                    onClick={this.onCloseRecommendation}
                    role="presentation"
                  />
                  <CompleteYourProfile locale={locale} onClickCompleteProfile={this.onClickCompleteProfile} />
                </div>
                <FeaturedLearningPath
                  locale={locale}
                  checkIfEnrolled={this.checkIfEnrolled}
                  onClickLearningPath={this.onClickLearningPath}
                  goToMicroLearningPage={this.goToMicroLearningPage}
                />
                <RecommendedCareerTrack
                  checkIfEnrolled={this.checkIfEnrolled}
                  onClickLearningPath={this.onClickLearningPath}
                  locale={locale}
                  allLearningPathMaterials={allLearningPathMaterials}
                />
                <RecommendedSkillTrack
                  locale={locale}
                  checkIfEnrolled={this.checkIfEnrolled}
                  allLearningPathMaterials={allLearningPathMaterials}
                  onClickLearningPath={this.onClickLearningPath}
                />
                <RecommendedMicrolearning
                  locale={locale}
                  allLearningPathMaterials={allLearningPathMaterials}
                  goToMicroLearningPage={this.goToMicroLearningPage}
                />
              </Fragment>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

LearnerHomeDashboard.propTypes = {
  history: PropTypes.object.isRequired,
  roleId: PropTypes.any.isRequired,
  currentLearningPaths: PropTypes.any,
  fetchCurrentLearningPaths: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  allLearningPathMaterials: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  checkIfDashboardCourseEnrolled: PropTypes.func.isRequired,
  clearIsDashboardCourseEnrolled: PropTypes.func.isRequired,
  getRecommendedLearnings: PropTypes.func.isRequired,
  getDailyGoals: PropTypes.func.isRequired,
  goalStatus: PropTypes.object,
  fetchCompletedCourses: PropTypes.func.isRequired,
  completedCourses: PropTypes.array,
  loadingEnrollments: PropTypes.bool.isRequired,
  loadingCurrentCourses: PropTypes.bool.isRequired,
  starRating: PropTypes.number,
  ratingCount: PropTypes.number
};

LearnerHomeDashboard.defaultProps = {
  goalStatus: {},
  currentLearningPaths: [],
  completedCourses: [],
  starRating: 4,
  ratingCount: 0
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  currentLearningPaths: Array.from(state.learningPath.get('currentLearningPaths')),
  roleId: state.user.get('roleId'),
  reduxState: state,
  allLearningPathMaterials: state.learningPath.get('allLearningPathMaterials'),
  userDetails: state.user.get('userDetails'),
  isDashboardCourseEnrolled: state.careerTrack.get('isDashboardCourseEnrolled'),
  goalStatus: state.goal.get('goalStatus'),
  completedCourses: Array.from(state.profile.get('completedCourses')),
  loadingCurrentCourses: state.profile.get('loadingCurrentCourses'),
  loadingEnrollments: state.learningPath.get('loadingEnrollments')
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentLearningPaths: roleId => dispatch(fetchCurrentLearningPaths(roleId)),
  checkIfDashboardCourseEnrolled: (courseType, courseId) =>
    dispatch(checkIfDashboardCourseEnrolled(courseType, courseId)),
  clearIsDashboardCourseEnrolled: () => dispatch(clearEnrolledCareerTrack()),
  getAllLearningPathMaterials: subCategoryId => dispatch(getAllLearningPathMaterials(subCategoryId)),
  getRecommendedLearnings: () => dispatch(getRecommendedLearnings()),
  getDailyGoals: () => dispatch(getDailyGoals()),
  fetchCompletedCourses: userId => dispatch(fetchCompletedCourses(userId))
});

const learnerDashboard = connect(mapStateToProps, mapDispatchToProps)(LearnerHomeDashboard);

export default translatable(locale => locale)(reduxForm({
  form: 'learnerDashboard'
})(learnerDashboard));
