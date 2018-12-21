import React, { Component, Fragment } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategorySideMenu from '../SideMenu/CategorySideMenu';
import CompleteYourProfile from './CompleteYourProfile';
import RecommendedCareerTrack from './RecommendedCareerTrack';
import Loader from '../../components/Loader/Loader';
import RecommendedSkillTrack from './RecommendedSkillTrack';
import RecommendedMicrolearning from './RecommendedMicrolearning';
import FeaturedLearningPath from './FeaturedLearningPath';

import { checkIfDashboardCourseEnrolled, clearEnrolledCareerTrack } from '../../actions/careerTrack';
import { getAllLearningPathMaterials, getRecommendedLearnings } from '../../actions/learningPath';
import storage from '../../globals/localStorage';

import { routeConstant, courseTypes } from '../../globals/AppConstant';

import '../../../assets/styles/components/Recommendation.scss';
import Catalog from '../Catalog/Catalog';

class Recommendation extends Component {
  constructor() {
    super();
    this.state = {
      category: null,
      subCategory: null,
      courseId: '',
      courseType: ''
    };
  }

  componentDidMount() {
    this.props.getRecommendedLearnings();
    window.addEventListener('scroll', this.scrollFunction);
    this.props.history.listen(this.onRouteChange);
  }

  componentDidUpdate() {
    const { isDashboardCourseEnrolled, history } = this.props;
    const { courseId, courseType } = this.state;
    if (isDashboardCourseEnrolled && isDashboardCourseEnrolled.isEnrolled) {
      if (courseType === 'skillTrack') {
        history.push(`${routeConstant.DASHBOARD}${routeConstant.LEARNINGPATH}/${courseId}`);
      } else if (courseType === 'careerTrack') {
        history.push(`${routeConstant.DASHBOARD}${routeConstant.CAREER}/${courseId}`);
      }
    }
    if (isDashboardCourseEnrolled && (isDashboardCourseEnrolled.isEnrolled === false)) {
      if (courseType === 'skillTrack') {
        history.push({
          pathname: `${routeConstant.SKILL_TRACK}/${courseId}`
        });
      } else if (courseType === 'careerTrack') {
        history.push({
          pathname: `${routeConstant.CAREER_TRACK}/${courseId}`
        });
      }
    }
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

  onClickLearningPath = pathId => {
    this.props.history.push(`${routeConstant.DASHBOARD}${routeConstant.LEARNINGPATH}/${pathId}`);
  }

  onClickCompleteProfile = () => {
    const { userDetails: { learner: { is_resume_uploaded: IsResumeUploaded } } } = this.props;
    if (IsResumeUploaded) {
      this.props.history.push(routeConstant.PROFILE);
    } else {
      this.props.history.push(routeConstant.UPLOADRESUME);
    }
  };

  // handleClickCategory = category => {
  //   this.setState({
  //     category
  //   });
  // }

  handleClickSubCategory = subCategory => {
    this.setState({
      subCategory
    });
    if (subCategory && subCategory.id) {
      this.props.getAllLearningPathMaterials(subCategory.id);
    } else if (subCategory === '') {
      this.props.getRecommendedLearnings();
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

  scrollFunction = () => {
    if ((document.body.scrollTop >= 300 || document.documentElement.scrollTop >= 300) &&
      document.getElementsByClassName('whichCourseToTake')[0]) {
      document.getElementsByClassName('whichCourseToTake')[0].classList.remove('d-none');
    }
  }

  render() {
    const { locale, allLearningPathMaterials, isLoaderEnable } = this.props;
    const { category, subCategory } = this.state;
    return (
      <div className="row">
        <Loader loading={isLoaderEnable} />
        <CategorySideMenu
          // handleClickCategory={this.handleClickCategory}
          handleClickSubCategory={this.handleClickSubCategory}
          locale={locale}
        />
        {!subCategory &&
          <main className="col-9 pb-4 px-5 content-view">
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
              <RecommendedCareerTrack
                locale={locale}
                checkIfEnrolled={this.checkIfEnrolled}
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
              <FeaturedLearningPath
                locale={locale}
                checkIfEnrolled={this.checkIfEnrolled}
                onClickLearningPath={this.onClickLearningPath}
                goToMicroLearningPage={this.goToMicroLearningPage}
              />
            </Fragment>
          </main>
        }
        {subCategory && subCategory.id &&
          <main className="col-9 pb-4 px-0 content-view">
            <Catalog
              activeCategory={category}
              activeSubCategory={subCategory}
              locale={locale}
              goToMicroLearningPage={this.goToMicroLearningPage}
              checkIfEnrolled={this.checkIfEnrolled}
            />
          </main>
        }
      </div>
    );
  }
}

Recommendation.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  getAllLearningPathMaterials: PropTypes.func.isRequired,
  allLearningPathMaterials: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getRecommendedLearnings: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  isLoaderEnable: PropTypes.bool.isRequired,
  checkIfDashboardCourseEnrolled: PropTypes.func.isRequired,
  clearIsDashboardCourseEnrolled: PropTypes.func.isRequired,
  isDashboardCourseEnrolled: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isLoaderEnable: state.learningPath.get('isLoaderEnable'),
  userDetails: state.user.get('userDetails'),
  allLearningPathMaterials: state.learningPath.get('allLearningPathMaterials'),
  isDashboardCourseEnrolled: state.careerTrack.get('isDashboardCourseEnrolled')
});

const mapDispatchToProps = dispatch => ({
  getAllLearningPathMaterials: subCategoryId => dispatch(getAllLearningPathMaterials(subCategoryId)),
  getRecommendedLearnings: () => dispatch(getRecommendedLearnings()),
  checkIfDashboardCourseEnrolled: (courseType, courseId) =>
    dispatch(checkIfDashboardCourseEnrolled(courseType, courseId)),
  clearIsDashboardCourseEnrolled: () => dispatch(clearEnrolledCareerTrack())
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(Recommendation));
