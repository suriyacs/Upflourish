import React, { Component } from 'react';
import { reduxForm, isDirty } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';

import ResetPassword from './ResetPassword';
import { required, email } from '../../utils/Validations';
import TextField from '../../components/FormComponents/TextField';
import UserActions from '../../actions/user';

import '../../../assets/styles/components/Profile.scss';

import ProfileIcon from '../../../assets/images/man.svg';
import CloseIcon from '../../../assets/images/close.svg';

class Profile extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { userDetails } = nextProps;
    if (userDetails && !prevState.flag) {
      nextProps.initialize({
        firstName: userDetails.first_name,
        lastName: userDetails.last_name,
        email: userDetails.email
      });
      return { flag: true };
    }
    return null;
  }

  constructor() {
    super();
    this.state = {
      isChangePassword: false
    };
  }

  onClickChangePassword = () => {
    this.setState({ isChangePassword: true });
  }

  onCloseChangePassword = () => {
    this.setState({ isChangePassword: false });
  }

  handleFormSubmit = user => {
    const userData = {
      first_name: user.firstName,
      last_name: user.lastName,
      id: this.props.userId,
      isPasswordUpdate: false
    };
    this.props.onUpdateUser(userData);
  }

  externalCloseButton = functionName => (
    <div className="common-close-icon">
      <img
        role="presentation"
        src={CloseIcon}
        alt="close"
        className="icon close-icon c-pointer"
        onClick={functionName}
      />
    </div>
  );

  render() {
    const { handleSubmit, reduxState, locale } = this.props;
    const { isChangePassword } = this.state;
    return (
      <div className="admin-profile-container">
        <div className="profile-image">
          <img src={ProfileIcon} alt="Profile Icon" />
          <button className="btn profile-btn mt-4 mb-4">{locale.changeImage}
          </button>
        </div>
        <form className="form-update-profile" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="row profile m-0">
            <div className="col-6">
              <div className="row pr-2">
                <TextField
                  name="firstName"
                  htmlFor="First name"
                  labelName={locale.firstName}
                  type="text"
                  className="form-control mt-3"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="row pl-2">
                <TextField
                  name="lastName"
                  htmlFor="Last name"
                  labelName={locale.lastName}
                  type="text"
                  className="form-control float-right mt-3"
                  validate={[required]}
                />
              </div>
            </div>
          </div>
          <TextField
            name="email"
            htmlFor="Email"
            labelName={locale.email}
            type="text"
            className="form-control mt-4"
            validate={[required, email]}
            readonly
          />
          <button
            className="btn update-btn mt-4"
            type="submit"
            disabled={!isDirty('ProfileComponent')(reduxState)}
          >{locale.saveChanges}
          </button>
        </form>
        <span
          className="change-password c-pointer"
          onClick={this.onClickChangePassword}
          role="presentation"
        >
          {locale.changePasswordForAccount}
        </span>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
          isOpen={isChangePassword}
          onClose={this.onCloseChangePassword}
          centered={isChangePassword}
          toggle={this.onCloseChangePassword}
          external={this.externalCloseButton(this.onCloseChangePassword)}
        >
          <ResetPassword onCloseChangePassword={this.onCloseChangePassword} locale={locale} />
        </Modal>
      </div>
    );
  }
}

Profile.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.string.isRequired,
  onUpdateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userDetails: state.user.get('userDetails'),
  userId: state.user.get('userId'),
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  onUpdateUser: user => dispatch(UserActions.updateUser(user))
});

const ProfileComponent = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default reduxForm({
  form: 'ProfileComponent'
})(ProfileComponent);
