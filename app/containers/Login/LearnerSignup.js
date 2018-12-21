import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { reduxForm, formValueSelector, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';

import Button from '../../components/Button/Button';
import TextField from '../../components/FormComponents/TextField';
import Loader from '../../components/Loader/Loader';
import { required, email, checkFieldLength, checkPasswordMismatch } from '../../utils/Validations';
import { learnerSignup } from '../../actions/login';

import '../../../assets/styles/components/Login.scss';

import Verified from '../../../assets/images/verified.svg';
import Wrong from '../../../assets/images/wrong.svg';

const selector = formValueSelector('LearnerSignupForm');

const mapStateToProps = state => ({
  loading: state.user.get('loading')
});

const mapDispatchToProps = dispatch => ({
  learnerSignup: (data, redirectTo, additionalData) => dispatch(learnerSignup(data, redirectTo, additionalData))
});

class LearnerSignUp extends Component {
  constructor() {
    super();
    this.state = {
      valid: false,
      invalid: false
    };
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

  submitUserCredentials = value => {
    const { courseId, courseType } = this.props;
    const additionalData = {};
    if (value.password === value.confirmpassword) {
      value = _.omit(value, 'confirmpassword');
      if (courseId && courseType) {
        additionalData.generalLogin = true;
        additionalData.courseType = courseType;
        additionalData.courseId = courseId;
      }
      value.email = value.email.toLowerCase().trim();
      this.props.learnerSignup(value, this.props.redirectTo, additionalData);
    } else {
      throw new SubmissionError({
        _error: 'Password mismatch!'
      });
    }
  }

  render() {
    const { handleSubmit, error, loading } = this.props;
    const { valid, invalid } = this.state;
    const locale = this.props.locale.learnerSignup;
    return (
      <Fragment>
        <Loader loading={loading} />
        <div className="learner-signup">
          <form name="learner-signup" className="form-signin" onSubmit={handleSubmit(this.submitUserCredentials)}>
            <div className="row vertical-align">
              <div className="col-md-6 col-sm-6 col-xs-6 pr-md-2 bottom-spacing">
                <TextField
                  name="first_name"
                  labelName={`${locale.firstName}`}
                  htmlFor="First Name"
                  type="text"
                  placeholder={`${locale.firstName}`}
                  className="form-control"
                  validate={[required]}
                />
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6 pl-md-2">
                <TextField
                  name="last_name"
                  labelName={`${locale.lastName}`}
                  htmlFor="Last Name"
                  type="text"
                  placeholder={`${locale.lastName}`}
                  className="form-control"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="d-flex flex-row">
              <span className="col-12 p-0">
                <TextField
                  name="email"
                  htmlFor="Email"
                  labelName={`${locale.email}`}
                  type="text"
                  placeholder={`${locale.email}`}
                  className="form-control"
                  validate={[required, email]}
                />
              </span>
            </div>
            <div className="d-flex flex-row">
              <span className="col-12 p-0">
                <TextField
                  name="password"
                  htmlFor="Password"
                  labelName={`${locale.password}`}
                  type="password"
                  placeholder="Enter a password for your account"
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
                  htmlFor="Confirm Password"
                  labelName={`${locale.confirmPassword}`}
                  type="password"
                  placeholder={`${locale.confirmPassword}`}
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
            <Button value={`${locale.signup}`} className="mt-4" type="submit" />
            <div className="account-exists signup-terms mt-2">
              <span className="pr-1">{locale.termAccept}</span>
              <u>{locale.termsAndService}</u>
            </div>
          </form>
          <div className="account-exists mt-3">
            <span className="pr-1">{locale.alreadyHaveAccount}</span>
            <u onClick={this.props.onCloseSignup} role="presentation">{locale.signIn}</u>
          </div>
        </div>
      </Fragment>
    );
  }
}

LearnerSignUp.defaultProps = {
  passwordObject: {},
  error: '',
  redirectTo: '',
  courseId: '',
  courseType: ''
};

LearnerSignUp.propTypes = {
  onCloseSignup: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  passwordObject: PropTypes.object,
  error: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  learnerSignup: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  courseId: PropTypes.string,
  courseType: PropTypes.string
};

let LearnerSignUpComponent =
connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(LearnerSignUp));
LearnerSignUpComponent = connect(state => ({
  passwordObject: selector(state, 'password', 'confirmpassword')
}))(LearnerSignUpComponent);

export default withRouter(reduxForm({
  form: 'LearnerSignupForm'
})(LearnerSignUpComponent));
