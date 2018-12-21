import React, { Component } from 'react';
import GoogleLoginButton from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginWithGmail } from '../../actions/login';

class GoogleLogin extends Component {
  componentDidMount() {
    document.getElementsByClassName('gmail-btn')[0].innerHTML =
    '<i class="fa fa-envelope"></i> Gmail';
  }

  successResponseFromGoogle = googleResponse => {
    const { loginUserRole } = this.props;
    if (googleResponse.accessToken) {
      this.props.onLoginWithGoogle(googleResponse.accessToken, loginUserRole);
    }
  }

  errorResponseFromGoogle = googleResponse => {
    console.log('google error', googleResponse);
  }

  render() {
    const { GOOGLE_CLIENT_ID } = process.env;
    return (
      <GoogleLoginButton
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign In with gmail"
        onSuccess={this.successResponseFromGoogle}
        onFailure={this.errorResponseFromGoogle}
        className="btn gmail-btn"
        // isSignedIn={false}
      />
    );
  }
}

GoogleLogin.propTypes = {
  onLoginWithGoogle: PropTypes.func.isRequired,
  loginUserRole: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  onLoginWithGoogle: (accessToken, role) =>
    dispatch(loginWithGmail(accessToken, role))
});

export default connect(null, mapDispatchToProps)(GoogleLogin);
