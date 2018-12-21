import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { translatable } from 'react-multilingual';

import { required, isEmail } from '../../utils/Validations';
import { loginUser, resetLoginError } from '../../actions/login';
import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import { routeConstant } from '../../globals/AppConstant';
import ExpertSignup from './ExpertSignup';

import '../../../assets/styles/components/Login.scss';

import Analytics from '../../../assets/images/login/analytics.svg';

class Login extends Component {
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.match.path.includes(routeConstant.EXPERTPASSWORDRESET)) {
      return { isResetPassword: true };
    }
    const { expertSignIn } = nextProps;
    if (expertSignIn && expertSignIn.size !== 0 && expertSignIn.userId) {
      nextProps.history.push(`${routeConstant.DASHBOARD}`);
    }
    return { isResetPassword: false };
  }

  constructor() {
    super();
    this.state = {
      isForgetPassword: false,
      isResetPassword: false
    };
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    if (!search.includes('token')) {
      this.props.history.push('/admin');
    }
  }

  componentWillUnmount() {
    if (this.props.error) this.props.resetLoginError();
  }

  onCloseResetPassword = () => {
    this.props.history.push('/');
  }

  setForgetPassword = () => {
    this.setState(({ isForgetPassword }) => ({
      isForgetPassword: !isForgetPassword
    }));
  }

  handleFormSubmit = value => {
    const loginData = {};
    if (value.username && value.password) {
      value.username = value.username.toLowerCase().trim();
      const isMail = isEmail(value.username);
      loginData.password = value.password;
      if (isMail) {
        loginData.email = value.username;
      } else {
        loginData.username = value.username;
      }
      this.props.onLogin(loginData);
    }
  }

  render() {
    const { handleSubmit, error, location: { pathname } } = this.props;
    const { isForgetPassword, isResetPassword } = this.state;
    const { app, expertLogin } = this.props.locale;
    return (
      <div className="container-fluid login-background min-h-100">
        <div className="row w-100">
          <div className="col-md-6 offset-lg-1 col-lg-5 align-items-center d-flex">
            <div className="row login">
              <div className="col-lg-12 find-more">
                <div className="col-lg-12">
                  <img
                    className="find-more-image"
                    src={Analytics}
                    alt="Analytics"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row login">
              <div className="col-12 col-md-12 col-md-offset-3 col-lg-10 col-xl-8 loginForm">
                <div className="application-name">{app.capsAppName}</div>
                <div className="account-wall">
                  { !isResetPassword && pathname !== routeConstant.INVITESIGNUP &&
                    <Fragment>
                      {(error && !isForgetPassword) &&
                        <div className="error-message invalid-credential mb-2">
                          {expertLogin.errorMsg}
                        </div>
                      }
                      {
                        !isForgetPassword &&
                        <Fragment>
                          <div className="title-header login-header">{expertLogin.signInTitle}</div>
                          <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit)}>
                            <TextField
                              name="username"
                              isLableRequired
                              htmlFor={expertLogin.email}
                              labelName={expertLogin.email}
                              type="text"
                              className="form-control"
                              validate={[required]}
                              isStarNeeded={false}
                            />
                            <div className="login-input-field">
                              <span className="col p-0">
                                {expertLogin.password}
                              </span>
                              <span
                                className="col p-0 text-right link-text c-pointer"
                                onClick={this.setForgetPassword}
                                role="presentation"
                              >
                                {expertLogin.forgotPassword}
                              </span>
                            </div>
                            <TextField
                              name="password"
                              htmlFor="Password"
                              type="password"
                              className="form-control"
                              validate={[required]}
                              isStarNeeded={false}
                            />
                            <Button value={expertLogin.signIn} type="submit" />
                          </form>
                        </Fragment>
                      }
                      {
                        isForgetPassword &&
                        <Fragment>
                          <div
                            className="back-to-login c-pointer"
                            onClick={this.setForgetPassword}
                            role="presentation"
                          >
                            <i className="fa fa-angle-left left-angle" />{expertLogin.back}
                          </div>
                          <div className="title-header login-header">{expertLogin.forgotYourPassword}</div>
                          <div className="reset-pwd-instruction mt-2">
                            {expertLogin.message}
                          </div>
                          <ForgetPassword onCloseForgetPassword={this.setForgetPassword} requestFrom="EXPERT" />
                        </Fragment>
                      }
                      <div className="contact-sales">
                        <span>
                          {expertLogin.learnerLogin}
                          <NavLink
                            exact
                            to="/"
                            className="p-l-5 link-text"
                          >
                            {expertLogin.learnerLoginLink}
                          </NavLink>
                        </span>
                      </div>
                    </Fragment>
                  }
                  { isResetPassword && pathname !== routeConstant.INVITESIGNUP &&
                    <Fragment>
                      <div className="title-header login-header">{expertLogin.resetPassword}</div>
                      <ResetPassword
                        token={this.props.location.search.replace('?token=', '')}
                        onCloseResetPassword={this.onCloseResetPassword}
                      />
                    </Fragment>
                  }
                  { pathname === routeConstant.INVITESIGNUP &&
                    <Fragment>
                      <ExpertSignup
                        token={this.props.location.search.replace('?token=', '')}
                        onCloseResetPassword={this.onCloseResetPassword}
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

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetLoginError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.any.isRequired,
  error: PropTypes.any.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  error: state.user.get('error'),
  expertSignIn: state.admin.get('expertSignIn')
});

const mapDispatchToProps = dispatch => ({
  onLogin: loginData => dispatch(loginUser(loginData, 'expert', {})),
  resetLoginError: () => dispatch(resetLoginError())
});

const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);

export default translatable(locale => locale)(reduxForm({
  form: 'LoginComponent'
})(LoginComponent));
