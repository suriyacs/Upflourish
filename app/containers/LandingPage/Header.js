import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginWithLinkedIn } from '../../actions/login';
import GeneralHeader from './GeneralHeader';

class Header extends Component {
  componentDidMount() {
    if (this.props.location.search) {
      const code = this.props.location.search.split('=')[1].split('&')[0];
      if (this.props.location.search.split('=')[0] === '?code') {
        this.props.onLogin(code);
      }
    }
  }

  render() {
    const locale = this.props.landingLocale.learnerLandingPage.header;
    return (
      <Fragment>
        <GeneralHeader isLanding />
        <div className="container landing-header p-0">
          <div className="landing-content">
            <div className="col-12">
              <div className="content">
                <div className="job-title">{locale.title}</div>
                <p className="mt-3 mb-4">
                  {locale.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Header.propTypes = {
  landingLocale: PropTypes.objectOf(PropTypes.any).isRequired,
  onLogin: PropTypes.func.isRequired,
  location: PropTypes.any.isRequired
};

const mapDispatchToProps = dispatch => ({
  onLogin: code => dispatch(loginWithLinkedIn(code, 'expert'))
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
