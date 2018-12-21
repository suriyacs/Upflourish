import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookLoginButton from 'react-facebook-login';
import { connect } from 'react-redux';

import { loginWithFaceBook } from '../../actions/login';

class FacebookLogin extends Component {
  responseFromFacebook = fbResponse => {
    const { loginUserRole } = this.props;
    if (fbResponse.accessToken) {
      this.props.onLoginWithFb(fbResponse.accessToken, loginUserRole);
    }
  }

  render() {
    const { FB_APP_ID } = process.env;
    return (
      <FacebookLoginButton
        appId={FB_APP_ID}
        fields="name,email,picture"
        callback={this.responseFromFacebook}
        icon="fa-facebook"
        cssClass="btn facebook-btn"
        textButton="Facebook"
      />
    );
  }
}

FacebookLogin.propTypes = {
  onLoginWithFb: PropTypes.func.isRequired,
  loginUserRole: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  onLoginWithFb: (accessToken, role) =>
    dispatch(loginWithFaceBook(accessToken, role))
});

export default connect(null, mapDispatchToProps)(FacebookLogin);
