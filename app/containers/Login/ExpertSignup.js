import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';
import { reduxForm, SubmissionError, formValueSelector } from 'redux-form';

import Loader from '../../components/Loader/Loader';
import { verifyToken, expertSignUp } from '../../actions/admin';
import { required, checkFieldLength, checkPasswordMismatch } from '../../utils/Validations';
import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';

import '../../../assets/styles/components/Login.scss';

import Verified from '../../../assets/images/verified.svg';
import Wrong from '../../../assets/images/wrong.svg';

const selector = formValueSelector('ExpertSignupForm');

// To be implemented
const mapStateToProps = state => ({
  tokenResponse: state.admin.get('tokenResponse'),
  loading: state.admin.get('loading')
});

// To be implemented
const mapDispatchToProps = dispatch => ({
  verifyToken: token => dispatch(verifyToken(token)),
  expertSignUp: data => dispatch(expertSignUp(data))
});

class ExpertSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      invalid: false
    };
    this.isFormInitialized = false;
  }

  componentDidMount() {
    this.props.verifyToken(this.props.token);
  }

  componentDidUpdate() {
    if (this.props.tokenResponse.id && !this.isFormInitialized) {
      this.props.initialize(this.props.tokenResponse);
      this.isFormInitialized = true;
    }
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
    if (value.password === value.confirmpassword) {
      value = _.omit(value, 'confirmpassword');
      value.id = this.props.tokenResponse.id;
      value.verificationToken = this.props.token;
      this.props.expertSignUp(value);
    } else {
      throw new SubmissionError({
        _error: 'Password mismatch!'
      });
    }
  }

  render() {
    const {
      handleSubmit,
      error,
      loading,
      tokenResponse
    } = this.props;
    const {
      valid,
      invalid
    } = this.state;
    const locale = this.props.locale.expertSignup;
    return (
      <Fragment>
        <Loader loading={loading} />
        <Container fluid>
          {
            tokenResponse && tokenResponse.errorMessage &&
            <div className="row">
              <h6 className="col token-expire">
                {tokenResponse.errorMessage}
              </h6>
            </div>
          }

          {
            tokenResponse && tokenResponse.id &&
            <Fragment>
              <div className="title-header login-header">{locale.createAccount}</div>
              <div className="title-header login-subheader">
                {locale.welcomeText}
              </div>
              <form name="expert-signup" className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="row form-group vertical-align">
                  <div className="col-md-6 col-sm-6 col-xs-6 pr-md-2 bottom-spacing">
                    <TextField
                      name="first_name"
                      labelName={`${locale.firstName}`}
                      htmlFor="First Name"
                      type="text"
                      placeholder="First Name"
                      className="form-control field-placeholder"
                      validate={[required]}
                    />
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-6 pl-md-2">
                    <TextField
                      name="last_name"
                      labelName={`${locale.lastName}`}
                      htmlFor="Last Name"
                      type="text"
                      placeholder="Last Name"
                      className="form-control field-placeholder"
                      validate={[required]}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <span className="col-12 p-0">
                    <TextField
                      name="password"
                      htmlFor="Password"
                      labelName={`${locale.password}`}
                      type="password"
                      placeholder="Enter a password for your account"
                      className="form-control form-align-fields field-placeholder"
                      validate={[required, this.passwordLength]}
                      handleChange={e => { this.indicatePasswordMismatch(e, 'confirmpassword'); }}
                      valid={valid}
                    />
                  </span>
                  {
                    valid &&
                    <span className="col-1 p-0 pl-1">
                      <img src={Verified} alt="profile" className="icon m-t-30px" />
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
                      placeholder="Confirm password"
                      className="form-control form-align-fields field-placeholder"
                      validate={[required]}
                      valid={valid}
                      invalid={invalid}
                      handleChange={e => { this.indicatePasswordMismatch(e, 'password'); }}
                    />
                  </span>
                  {
                    valid &&
                    <span className="col-1 p-0 pl-1">
                      <img src={Verified} alt="profile" className="icon m-t-30px" />
                    </span>
                  }
                  {
                    invalid &&
                    <span className="col-1 p-0 pl-1">
                      <img src={Wrong} alt="profile" className="icon m-t-30px" />
                    </span>
                  }
                </div>
                {error &&
                  <div className="contact-sales">
                    <span className="error">{error}</span>
                  </div>
                }
                <Button value={`${locale.getStarted}`} className="" type="submit" />
              </form>
            </Fragment>
          }
        </Container>
      </Fragment>
    );
  }
}

ExpertSignup.defaultProps = {
  error: '',
  token: '',
  passwordObject: {}
};

ExpertSignup.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.any,
  token: PropTypes.any,
  tokenResponse: PropTypes.object.isRequired,
  verifyToken: PropTypes.func.isRequired,
  expertSignUp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  passwordObject: PropTypes.object,
  initialize: PropTypes.func.isRequired
};

let ExpertSignupComponent =
connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(ExpertSignup));
ExpertSignupComponent = connect(state => ({
  passwordObject: selector(state, 'password', 'confirmpassword')
}))(ExpertSignupComponent);

export default reduxForm({
  form: 'ExpertSignupForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(ExpertSignupComponent);
