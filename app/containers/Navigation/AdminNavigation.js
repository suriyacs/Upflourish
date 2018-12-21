import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';
import { Popover, PopoverBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { logoutUser } from '../../actions/login';
import { routeConstant } from '../../globals/AppConstant';

import '../../../assets/styles/components/Navigation.scss';

import NotificationIcon from '../../../assets/images/bell.svg';

class AdminNavigation extends Component {
  constructor() {
    super();
    this.state = {
      isProfileDropDownOpen: false
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  onClickProfile = () => {
    if (!this.state.isProfileDropDownOpen) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(({ isProfileDropDownOpen }) => (
      { isProfileDropDownOpen: !isProfileDropDownOpen }
    ));
  }

  handleOutsideClick() {
    this.onClickProfile();
  }

  render() {
    const {
      isProfileDropDownOpen
    } = this.state;
    const { userDetails } = this.props;
    const locale = this.props.locale.learnerHeader;
    const { app } = this.props.locale;
    return (
      <div className="responsive-navigation">
        <nav className="navbar navbar-expand-md fixed-top navbar-dark navbar-custom py-md-0">
          <div
            className="navbar-brand mr-auto brand-name"
          >
            <NavLink exact to={`${routeConstant.HOME}`}>{app.capsAppName}
            </NavLink>
          </div>
          <div className="d-md-none d-inline-flex non-collapsible-menus">
            <div className="notification">
              <img
                src={NotificationIcon}
                alt="Notification"
              />
            </div>
            <div id="profile_mobile" className="profile-icon" role="presentation" onClick={this.onClickProfile}>
              {userDetails.first_name.charAt(0).toUpperCase()}{userDetails.last_name.charAt(0).toUpperCase()}
            </div>
            <Popover placement="bottom" isOpen={isProfileDropDownOpen} target="profile_mobile" toggle={this.toggle}>
              <PopoverBody>
                <div
                  className="logout d-md-none d-inline-flex"
                  role="presentation"
                  onClick={() => this.props.onLogout()}
                >
                  {locale.logout}
                </div>
              </PopoverBody>
            </Popover>
          </div>
          <button
            className="navbar-toggler custom-toggler-style"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapsiblemenus"
            aria-controls="navbarCollapsiblemenus"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="d-md-inline-flex d-none non-collapsible-menus h-70px">
            <UncontrolledDropdown setActiveFromChild className="c-pointer">
              <DropdownToggle tag="a" className="profile-section" caret>
                <div className="profile-icon" role="presentation" onClick={this.onClickProfile}>
                  {userDetails.first_name.charAt(0).toUpperCase()}{userDetails.last_name.charAt(0).toUpperCase()}
                </div>
                <div className="px-3 profile-name">
                  <div className="one-row-ellipsis w-100">
                    {userDetails.first_name}
                  </div>
                </div>
              </DropdownToggle>
              <DropdownMenu className="w-100 credit-dropdown">
                <DropdownItem className="c-pointer" onClick={() => this.props.onLogout()}>{locale.logout}</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </nav>
      </div>
    );
  }
}

AdminNavigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  userDetails: state.user.get('userDetails')
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(AdminNavigation));
