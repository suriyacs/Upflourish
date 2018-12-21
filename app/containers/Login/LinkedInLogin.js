import React, { Component } from 'react';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';

import LinkedInIcon from '../../../assets/images/linkedin.svg';

class LinkedInLogin extends Component {
  redirectToLinkedInLogin = () => {
    const { LINKED_IN_CLIENT_ID, DEV_HOST, DEV_PROTOCOL } = process.env;
    const linkedInURL1 =
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKED_IN_CLIENT_ID}&`;
    const linkedInURL2 =
    `redirect_uri=${DEV_PROTOCOL}${DEV_HOST}&state=${uuid()}&scope=r_basicprofile+r_emailaddress`;
    window.location = linkedInURL1 + linkedInURL2;
  }

  render() {
    return (
      <button type="button" className="btn linked-btn" onClick={this.redirectToLinkedInLogin}>
        <span className="admin">
          <img
            src={LinkedInIcon}
            alt="linkedin"
            className="icon c-pointer mb-1"
          />
        </span>LinkedIn
      </button>
    );
  }
}

export default withRouter(LinkedInLogin);
