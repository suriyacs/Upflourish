import React, { Component } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal } from 'reactstrap';

import Header from './Header';
import TopLearningPaths from './TopLearningPaths';
import Comments from './Comments';
// import LearningPaths from './LearningPaths';
import RecommendationCourse from './RecommendationCourse';
import LandingFooter from '../Footer/Footer';
import { fetchAllCategories } from '../../actions/learningPath';
import PrimaryCareerGoal from './PrimaryCareerGoal';
import LearnerLogin from '../Login/LearnerLogin';
import { routeConstant } from '../../globals/AppConstant';

import '../../../assets/styles/components/LearnerLandingPage.scss';
import '../../../assets/styles/components/LearningPath.scss';

class LearnerLandingPage extends Component {
  state = {
    isLoginPopupOpen: false,
    signInOrSignUp: ''
  };

  componentDidMount() {
    this.props.fetchAllCategories();
    window.addEventListener('scroll', this.scrollFunction);
  }

  onClickCourse = (courseId, courseType) => {
    this.props.history.push({
      pathname: `/${courseType}/${courseId}`
    });
  }

  onCloseRecommendation = () => {
    document.getElementsByClassName('whichCourseToTake')[0].classList.add('close-recommend-popup');
    document.getElementsByClassName('open-arrow')[0].classList.remove('d-none');
  }

  onOpenRecommendation = () => {
    document.getElementsByClassName('whichCourseToTake')[0].classList.remove('close-recommend-popup');
    document.getElementsByClassName('open-arrow')[0].classList.add('d-none');
  }

  scrollFunction = () => {
    if ((document.body.scrollTop >= 2100 || document.documentElement.scrollTop >= 2100) &&
      document.getElementsByClassName('whichCourseToTake')[0]) {
      document.getElementsByClassName('whichCourseToTake')[0].classList.remove('d-none');
    }
  }

  openLoginPopup = signInOrSignUp => {
    this.setState({ isLoginPopupOpen: true, signInOrSignUp });
  };

  closeLoginPopup = () => {
    this.setState({ isLoginPopupOpen: false });
  };

  render() {
    const { locale, categories } = this.props;
    const { isLoginPopupOpen, signInOrSignUp } = this.state;
    const landingLocale = locale.learnerLandingPage;
    return (
      <div className="container-fluid landing-container p-0">
        <Header landingLocale={locale} />
        <PrimaryCareerGoal landingLocale={landingLocale} openLoginPopup={this.openLoginPopup} />
        <TopLearningPaths
          landingLocale={landingLocale}
          categories={categories}
          onClickCourse={this.onClickCourse}
        />
        <RecommendationCourse landingLocale={landingLocale} openLoginPopup={this.openLoginPopup} />
        {/* <LearningPaths landingLocale={landingLocale} /> */}
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
          <div className="titile">{landingLocale.whichCourseToTake.title}</div>
          <p className="description">{landingLocale.whichCourseToTake.description}</p>
          <button
            className="w-100 btn recommendation-btn"
            onClick={() => { this.openLoginPopup('signUp'); }}
          >
            {landingLocale.whichCourseToTake.recommendationBtn}
          </button>
        </div>
        <Comments landingLocale={landingLocale} />
        <LandingFooter landingLocale={landingLocale} />
        <Modal
          modalClassName="min-h-100 learner-login-popup reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
          isOpen={isLoginPopupOpen}
          onClose={this.closeLoginPopup}
          centered={isLoginPopupOpen}
          toggle={this.closeLoginPopup}
          autoFocus
        >
          {/* eslint-disable-next-line */}
          <LearnerLogin onClosePopup={this.closeLoginPopup} isSignUp={signInOrSignUp !== 'signIn' ? true : false} redirectTo={`${routeConstant.UPLOADRESUME}`} />
        </Modal>
      </div>
    );
  }
}

LearnerLandingPage.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: Array.from(state.learningPath.get('categories')),
  loading: state.learningPath.get('loading')
});

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: () => dispatch(fetchAllCategories())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(translatable(locale => locale)(LearnerLandingPage)));
