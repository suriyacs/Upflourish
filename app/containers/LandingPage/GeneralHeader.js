import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { Modal } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { routeConstant } from '../../globals/AppConstant';
import LearnerLogin from '../Login/LearnerLogin';
import SearchSelect from '../../components/SearchSelect/SearchSelect';

import '../../../assets/styles/components/GeneralHeader.scss';

class GeneralHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginPopupOpen: false,
      signInOrSignUp: '',
      selectedValue: ''
    };
  }

  componentDidMount() {
    if (this.props.isLanding) {
      window.addEventListener('scroll', this.scrollFunction);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
  }

  setSelectedValue = selectedValue => {
    this.setState({ selectedValue });
  }

  openLoginPopup = signInOrSignUp => {
    this.setState({ isLoginPopupOpen: true, signInOrSignUp });
  };

  closeLoginPopup = () => {
    this.setState({ isLoginPopupOpen: false });
  };

  scrollFunction = () => {
    if ((document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)) {
      document.getElementsByClassName('general-header')[0].classList.remove('transparent-header');
    } else {
      document.getElementsByClassName('general-header')[0].classList.add('transparent-header');
    }
  }

  render() {
    const headerLocale = this.props.locale.learnerLandingPage.header;
    const { app } = this.props.locale;
    const { isLoginPopupOpen, signInOrSignUp, selectedValue } = this.state;
    const { isLanding } = this.props;
    return (
      <Fragment>
        <div className={`general-header ${isLanding ? 'transparent-header' : ''}`}>
          <nav className="navbar navbar-expand-md navbar-custom-style navbar-custom navbar-dark py-0">
            <NavLink
              exact
              to="/"
              className="app-header pr-5 py-0"
            >
              {app.capsAppName}
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarHeaderContent"
              aria-controls="navbarHeaderContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarHeaderContent">
              <div className="header-content">
                <NavLink exact to={`${routeConstant.COURSES}`}>
                  <div className="d-md-flex dropdown show m-3">
                    <li
                      className="c-pointer dropdown-open"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {headerLocale.explore}
                      {/* <i className="ml-2 fa fa-angle-down" /> */}
                    </li>
                    {/* <CareerAndSkillTrack locale={headerLocale} /> */}
                  </div>
                </NavLink>
                <div className="search-course">
                  <SearchSelect setSelectedValue={this.setSelectedValue} selectedValue={selectedValue} />
                </div>
              </div>
              <div className="header-btns">
                <li>
                  <button
                    className="btn signin-btn"
                    onClick={() => { this.openLoginPopup('signIn'); }}
                  >
                    {headerLocale.signIn}
                  </button>
                </li>
                <li>
                  <button
                    className="btn signup-btn"
                    onClick={() => { this.openLoginPopup('signUp'); }}
                  >
                    {headerLocale.signUp}
                  </button>
                </li>
              </div>
            </div>
          </nav>
        </div>
        <Modal
          modalClassName="min-h-100 learner-login-popup reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
          isOpen={isLoginPopupOpen}
          onClose={this.closeLoginPopup}
          centered={isLoginPopupOpen}
          toggle={this.closeLoginPopup}
        >
          {/* eslint-disable-next-line */}
          <LearnerLogin onClosePopup={this.closeLoginPopup} isSignUp={signInOrSignUp !== 'signIn' ? true : false} />
        </Modal>
      </Fragment>
    );
  }
}

GeneralHeader.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  isLanding: PropTypes.bool
};

GeneralHeader.defaultProps = {
  isLanding: false
};

export default (translatable(locale => locale)(GeneralHeader));
