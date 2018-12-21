import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';

import Button from '../../components/Button/Button';
import { loginUser, resetLoginError } from '../../actions/login';
import TextField from '../../components/FormComponents/TextField';
import { required, isEmail } from '../../utils/Validations';
import LinkedInLogin from './LinkedInLogin';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import LearnerSignup from './LearnerSignup';
import Loader from '../../components/Loader/Loader';
import { routeConstant } from '../../globals/AppConstant';
import { isCourseEnrolled, enrollMyCareer } from '../../actions/careerTrack';
import { enrollLearningPath } from '../../actions/learningPath';

import CloseIcon from '../../../assets/images/close_grey.svg';

import '../../../assets/styles/components/LearnerLogin.scss';

class LearnerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isForgetPassword: false,
      isResetPassword: false,
      isSignup: props.isSignUp
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error && this.props.error) {
      this.props.untouch('password');
      this.props.change('password', '');
    }
  }

  componentWillUnmount() {
    if (this.props.error) this.props.resetLoginError();
  }

  onCloseResetPassword = () => {
    this.props.history.push(routeConstant.LEARNER);
  }

  setForgetPassword = () => {
    this.setState(({ isForgetPassword }) => ({
      isForgetPassword: !isForgetPassword
    }));
  };

  toggleSignUp = () => {
    this.setState(({ isSignup }) => ({
      isSignup: !isSignup,
      isForgetPassword: false
    }));
  }

  handleFormSubmit = value => {
    const { courseId, courseType } = this.props;
    const loginData = {};
    const additionalData = {};
    if (value.username && value.password) {
      const isMail = isEmail(value.username);
      loginData.password = value.password;
      value.username = value.username.toLowerCase().trim();
      if (isMail) {
        loginData.email = value.username;
      } else {
        loginData.username = value.username;
      }
      if (courseId && courseType) {
        additionalData.generalLogin = true;
        additionalData.courseType = courseType;
        additionalData.courseId = courseId;
      }
      this.props.onLogin(loginData, additionalData);
    }
  }

  render() {
    const {
      handleSubmit,
      error,
      loading,
      redirectTo,
      courseId,
      courseType
    } = this.props;
    const { isForgetPassword, isResetPassword, isSignup } = this.state;
    const locale = this.props.locale.learnerLogin;
    return (
      <div className="container-fluid">
        <Loader loading={loading} />
        <div className="row droplets">
          <div className="col-lg-12 p-0">
            <div className="d-flex flex-row">
              <div className="col-12 p-0">
                <div className="learner-login-panel">
                  {isForgetPassword &&
                    <div
                      className="col-2 back-to-login pb-3"
                      onClick={this.setForgetPassword}
                      role="presentation"
                    >
                      <i className="fa fa-angle-left left-angle" />
                      <span className="c-pointer">{locale.back}</span>
                    </div>
                  }
                  <div className="close-signin-popup">
                    <span className="admin">
                      <img
                        role="presentation"
                        src={CloseIcon}
                        alt="close"
                        className="icon close-icon c-pointer"
                        onClick={this.props.onClosePopup}
                      />
                    </span>
                  </div>
                  <div className="d-flex flex-row">
                    <div htmlFor="title" className="col-10 col-md-11 login-panel-title">
                      { isSignup ? locale.createYourAccount : locale.loginTitle}
                    </div>
                  </div>
                  {
                    !isForgetPassword &&
                    <Fragment>
                      <div className="container-fluid">
                        <div className="row mt-4">
                          <div className="col-12 col-sm-12">
                            <LinkedInLogin loginUserRole="LEARNER" />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div className="col-5 p-0 left-border" />
                        <div className="col-2 p-0 view-all">
                          {locale.or}
                        </div>
                        <div className="col-5 p-0 right-border" />
                      </div>
                    </Fragment>
                  }
                  {(error && !isForgetPassword) && !isSignup &&
                    <div className="error-message invalid-credential mt-2">
                      {locale.incorrectEmailLabel}
                    </div>
                  }
                  {
                    !isResetPassword && !isSignup &&
                    <Fragment>
                      {
                        !isForgetPassword &&
                        <Fragment>
                          <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit)}>
                            <TextField
                              name="username"
                              htmlFor="Email or username"
                              type="text"
                              className="form-control mb-2"
                              placeholder={locale.emailPlaceholder}
                              validate={[required]}
                            />
                            <TextField
                              name="password"
                              htmlFor="Password"
                              type="password"
                              className="form-control mt-4"
                              placeholder={locale.passwordPlaceholder}
                              validate={[required]}
                            />
                            <div className="login-input-field mt-0 d-flex justify-content-end">
                              <span
                                className="p-0 text-primary text-right link-text c-pointer"
                                onClick={this.setForgetPassword}
                                role="presentation"
                              >
                                {locale.forgetPassword}
                              </span>
                            </div>
                            <Button type="submit" className="mt-4" value={locale.signIn} />
                          </form>
                        </Fragment>
                      }
                      {
                        isForgetPassword &&
                        <Fragment>
                          <ForgetPassword onCloseForgetPassword={this.setForgetPassword} requestFrom="LEARNER" />
                        </Fragment>
                      }
                      <div className="account-exists">
                        <span className="pr-1">{locale.dontHaveAccount}</span>
                        <span onClick={this.toggleSignUp} role="presentation" className="link-text c-pointer">
                          {locale.signup}
                        </span>
                      </div>
                    </Fragment>
                  }
                  { isResetPassword &&
                    <Fragment>
                      <div className="title-header login-header">{locale.resetPassword}</div>
                      <ResetPassword
                        token={this.props.location.search.replace('?token=', '')}
                        onCloseResetPassword={this.onCloseResetPassword}
                      />
                    </Fragment>
                  }

                  {
                    isSignup &&
                    <Fragment>
                      <LearnerSignup
                        onCloseSignup={this.toggleSignUp}
                        redirectTo={redirectTo}
                        courseId={courseId}
                        courseType={courseType}
                      />
                    </Fragment>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LearnerLogin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  resetLoginError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.any.isRequired,
  error: PropTypes.any.isRequired,
  onClosePopup: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  untouch: PropTypes.func.isRequired,
  isSignUp: PropTypes.bool,
  courseType: PropTypes.string,
  courseId: PropTypes.string,
  redirectTo: PropTypes.string
};

LearnerLogin.defaultProps = {
  isSignUp: false,
  courseType: '',
  courseId: '',
  redirectTo: ''
};

const mapStateToProps = state => ({
  error: state.user.get('error'),
  loading: state.user.get('loading'),
  userId: state.user.get('userId'),
  isContentEnrolled: state.careerTrack.get('isCourseEnrolled'),
  enrolledCareer: state.careerTrack.get('enrolledCareer'),
  enrolledLearningPath: state.learningPath.get('enrolledLearningPath')
});

const mapDispatchToProps = dispatch => ({
  onLogin: (loginData, additionalData) => dispatch(loginUser(loginData, 'learner', additionalData)),
  resetLoginError: () => dispatch(resetLoginError()),
  isCourseEnrolled: (courseType, courseId) => dispatch(isCourseEnrolled(courseType, courseId)),
  enrollMyLearningPath: enroll => dispatch(enrollLearningPath(enroll)),
  enrollMyCareer: enroll => dispatch(enrollMyCareer(enroll))
});

const LearnerLoginComponent = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(translatable(locale => locale)(LearnerLogin)));
export default reduxForm({
  form: 'LearnerLoginComponent'
})(LearnerLoginComponent);
