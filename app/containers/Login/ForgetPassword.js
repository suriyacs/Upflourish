import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { translatable } from 'react-multilingual';

import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import { required, email } from '../../utils/Validations';
import { forgetPassword } from '../../actions/login';

const mapDispatchToProps = dispatch => ({
  forgetPassword: emailId => dispatch(forgetPassword(emailId))
});

const mapStateToProps = state => ({
  linkToResetPassword: state.user.get('linkToResetPassword')
});

class ForgetPassword extends Component {
  componentWillUnmount() {
    this.props.forgetPassword('');
  }

  handleFormSubmit = value => {
    if (value.email) {
      value.email = value.email.toLowerCase().trim();
      this.props.forgetPassword({ email: value.email, role: this.props.requestFrom });
    }
  }

  render() {
    const {
      handleSubmit,
      linkToResetPassword
    } = this.props;
    const locale = this.props.locale.forgetPassword;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 loginForm px-3 pt-3 pb-0">
            <form className="form-signin forgot-pwd" onSubmit={handleSubmit(this.handleFormSubmit)}>
              <TextField
                name="email"
                htmlFor={locale.heading}
                labelName={locale.heading}
                type="text"
                className="form-control"
                placeholder="Enter your email"
                validate={[required, email]}
              />
              { linkToResetPassword &&
                <div className="contact-sales">
                  <span
                    className={`${linkToResetPassword.name === 'CLIENT_ERROR' ?
                      'error' : ''}`}
                  >
                    {linkToResetPassword.message}
                  </span>
                </div>
              }
              <Button value={locale.resetButtonLabel} className="" type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ForgetPassword.propTypes = {
  forgetPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  requestFrom: PropTypes.string.isRequired,
  linkToResetPassword: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const ForgetPasswordComponent =
  connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(ForgetPassword));

export default reduxForm({
  form: 'ForgetPasswordForm'
})(ForgetPasswordComponent);
