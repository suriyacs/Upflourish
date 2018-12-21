import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserActions from '../../actions/user';
import { required, checkFieldLength, checkPasswordMismatch } from '../../utils/Validations';
import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';

import '../../../assets/styles/components/ResetPassword.scss';

import Verified from '../../../assets/images/verified.svg';
import Wrong from '../../../assets/images/wrong.svg';

const selector = formValueSelector('ResetPasswordForm');

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      isPasswordMismatch: false,
      valid: false,
      invalid: false
    };
  }

  onChangeNewPassword = (e, fieldValue) => {
    const { passwordObject } = this.props;
    if (passwordObject.confirmNewPassword) {
      if (checkPasswordMismatch(e.target.value, passwordObject[fieldValue])) {
        this.setState({
          valid: true,
          invalid: false,
          isPasswordMismatch: false
        });
      } else {
        this.setState({
          valid: false,
          invalid: true,
          isPasswordMismatch: false
        });
      }
    }
  }

  passwordLength = checkFieldLength(6);

  handleFormSubmit = formData => {
    if (formData.newPassword === formData.confirmNewPassword) {
      formData.isPasswordUpdate = true;
      this.props.resetPassword(formData);
    } else {
      this.setState({
        isPasswordMismatch: true
      });
    }
  }

  render() {
    const { handleSubmit, onCloseChangePassword, locale } = this.props;
    const { isPasswordMismatch, valid, invalid } = this.state;
    return (
      <div className="reset-password-container">
        {isPasswordMismatch &&
          <div className="mb-2 invalid-credential">{locale.mismatchPassword}</div>
        }
        <div className="title text-center">{locale.changePassword}</div>
        <p className="text-center">
          {locale.resetPasswordInfo}
        </p>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <TextField
            name="oldPassword"
            htmlFor="Old Password"
            labelName={locale.oldPassword}
            type="password"
            className="form-control mt-4"
            validate={[required]}
            placeholder={locale.oldPasswordPlaceHolder}
          />
          <div className="d-flex flex-row">
            <span className="col-12 p-0">
              <TextField
                name="newPassword"
                htmlFor="New Password"
                labelName={locale.newPassword}
                type="password"
                className="form-control mt-4"
                validate={[required, this.passwordLength]}
                placeholder={locale.newPasswordPlaceHolder}
                valid={valid}
                handleChange={e => { this.onChangeNewPassword(e, 'confirmNewPassword'); }}
              />
            </span>
            {
              valid &&
              <span className="col-1 p-0 pl-1">
                <img src={Verified} alt="profile" className="icon m-t-40px" />
              </span>
            }
          </div>
          <div className="d-flex flex-row">
            <span className="col-12 p-0">
              <TextField
                name="confirmNewPassword"
                htmlFor="Confirm New Password"
                labelName={locale.confirmPassword}
                type="password"
                className="form-control mt-4"
                validate={[required]}
                placeholder={locale.confirmPasswordPlaceHolder}
                valid={valid}
                invalid={invalid}
                handleChange={e => { this.onChangeNewPassword(e, 'newPassword'); }}
              />
            </span>
            {
              valid &&
              <span className="col-1 p-0 pl-1">
                <img src={Verified} alt="profile" className="icon m-t-40px" />
              </span>
            }
            {
              invalid &&
              <span className="col-1 p-0 pl-1">
                <img src={Wrong} alt="profile" className="icon m-t-40px" />
              </span>
            }
          </div>
          <div className="row m-0 mt-4">
            <Button className="col-6 m-0" type="submit" value={locale.changePassword} />
            <button className="btn cancel-btn ml-3" onClick={onCloseChangePassword} type="button">
              {locale.cancelButton}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ResetPassword.defaultProps = {
  passwordObject: {}
};

ResetPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCloseChangePassword: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  resetPassword: PropTypes.func.isRequired,
  passwordObject: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  resetPassword: user => dispatch(UserActions.updateUser(user))
});

let ResetPasswordForm = connect(null, mapDispatchToProps)(ResetPassword);

ResetPasswordForm = connect(state => ({
  passwordObject: selector(state, 'newPassword', 'confirmNewPassword')
}))(ResetPasswordForm);

export default reduxForm({
  form: 'ResetPasswordForm'
})(ResetPasswordForm);
