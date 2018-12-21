import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form';
import { translatable } from 'react-multilingual';

import TextField from '../../components/FormComponents/TextField';
import { required, checkFieldLength, checkPasswordMismatch } from '../../utils/Validations';
import Button from '../../components/Button/Button';
import { resetPassword, verifyToken } from '../../actions/login';

import Verified from '../../../assets/images/verified.svg';
import Wrong from '../../../assets/images/wrong.svg';

const selector = formValueSelector('ResetPasswordForm');

const mapDispatchToProps = dispatch => ({
  resetPassword: password => dispatch(resetPassword(password)),
  verifyToken: token => dispatch(verifyToken(token))
});

const mapStateToProps = state => ({
  resetPasswordResponse: state.user.get('resetPasswordResponse'),
  tokenStatus: state.user.get('tokenStatus')
});

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      valid: false,
      invalid: false
    };
  }

  componentDidMount() {
    this.props.verifyToken(this.props.token);
  }

  indicatePasswordMismatch = (e, fieldValue) => {
    const { passwordObject } = this.props;
    if (passwordObject.confirmpassword) {
      if (checkPasswordMismatch(e.target.value, passwordObject[fieldValue])) {
        this.setState({ valid: true, invalid: false });
      } else {
        this.setState({ valid: false, invalid: true });
      }
    }
  }

  passwordLength = checkFieldLength(6);

  handleFormSubmit = value => {
    const locale = this.props.locale.resetPassword;
    if (value.password === value.confirmpassword) {
      this.props.resetPassword({
        password: value.password,
        confirmPassword: value.confirmpassword,
        token: this.props.tokenStatus.token
      });
    } else {
      throw new SubmissionError({
        _error: locale.mismatchPassword
      });
    }
  }

  render() {
    const {
      onCloseResetPassword,
      handleSubmit,
      resetPasswordResponse,
      error,
      tokenStatus
    } = this.props;
    const { valid, invalid } = this.state;
    const locale = this.props.locale.resetPassword;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 loginForm">
            {
              tokenStatus && tokenStatus.name === 'VALID' &&
              <Fragment>
                <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit)}>
                  <div className="d-flex flex-row">
                    <span className="col-12 p-0">
                      <TextField
                        name="password"
                        isLableRequired
                        htmlFor="Password"
                        labelName={locale.newPassword}
                        type="password"
                        className="form-control"
                        validate={[required, this.passwordLength]}
                        handleChange={e => { this.indicatePasswordMismatch(e, 'confirmpassword'); }}
                        valid={valid}
                      />
                    </span>
                    {
                      valid &&
                      <span className="col-1 p-0 pl-1">
                        <img src={Verified} alt="profile" className="icon mt-4 ml-2" />
                      </span>
                    }
                  </div>
                  <div className="d-flex flex-row">
                    <span className="col-12 p-0">
                      <TextField
                        name="confirmpassword"
                        isLableRequired
                        htmlFor="Confirm Password"
                        labelName={locale.confirmNewPassword}
                        type="password"
                        className="form-control"
                        validate={[required]}
                        valid={valid}
                        invalid={invalid}
                        handleChange={e => { this.indicatePasswordMismatch(e, 'password'); }}
                      />
                    </span>
                    {
                      valid &&
                      <span className="col-1 p-0 pl-1">
                        <img src={Verified} alt="profile" className="icon mt-4 ml-2" />
                      </span>
                    }
                    {
                      invalid &&
                      <span className="col-1 p-0 pl-1">
                        <img src={Wrong} alt="profile" className="icon mt-4 ml-2" />
                      </span>
                    }
                  </div>
                  {error &&
                    <div className="contact-sales">
                      <span className="error">{error}</span>
                    </div>
                  }
                  <Button value="Reset" className="btn btn-info" type="submit" />
                </form>
              </Fragment>
            }
            {
              tokenStatus && tokenStatus.name === 'CLIENT_ERROR' &&
              <Fragment>
                <div className="login-input-field row">
                  <span className="col-12 token-expire">
                    {tokenStatus.message}!!
                  </span>
                  <span
                    className="col-12 text-primary link-text c-pointer token-expire"
                    onClick={onCloseResetPassword}
                    role="presentation"
                  >
                    {locale.login}
                  </span>
                </div>
              </Fragment>
            }
            {
              resetPasswordResponse && resetPasswordResponse.name === 'SUCCESS' &&
              <Fragment>
                <div className="login-input-field row">
                  <span className="col-12 token-expire">
                    {resetPasswordResponse.message}!
                  </span>
                  <span
                    className="col-12 text-primary link-text c-pointer token-expire"
                    onClick={onCloseResetPassword}
                    role="presentation"
                  >
                    {locale.login}
                  </span>
                </div>
              </Fragment>
            }
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.defaultProps = {
  error: '',
  token: '',
  passwordObject: {}
};

ResetPassword.propTypes = {
  onCloseResetPassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  verifyToken: PropTypes.func.isRequired,
  resetPasswordResponse: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  error: PropTypes.any,
  token: PropTypes.any,
  passwordObject: PropTypes.object,
  locale: PropTypes.object.isRequired
};

let ResetPasswordComponent = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
ResetPasswordComponent = connect(state => ({
  passwordObject: selector(state, 'password', 'confirmpassword')
}))(ResetPasswordComponent);

export default (translatable(locale => locale)(reduxForm({
  form: 'ResetPasswordForm'
})(ResetPasswordComponent)));
