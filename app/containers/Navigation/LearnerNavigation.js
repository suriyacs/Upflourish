import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popover, PopoverBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { translatable } from 'react-multilingual';

import { getUserPointsReady } from '../../actions/profile';
import { logoutUser } from '../../actions/login';
import { routeConstant } from '../../globals/AppConstant';
import SearchSelect from '../../components/SearchSelect/SearchSelect';

import '../../../assets/styles/components/Navigation.scss';

import NotificationIcon from '../../../assets/images/bell.svg';
import dollar from '../../../assets/images/dollar.svg';

class LearnerNavigation extends React.Component {
  constructor(props) {
    super(props);
    let activeRoute = {};
    if (props.match.path.includes(routeConstant.HOME)) {
      activeRoute = { home: true };
    } else if (props.match.path.includes(routeConstant.CATALOG)) {
      activeRoute = { catalog: true };
    } else if (props.match.path.includes(routeConstant.PROFILE)) {
      activeRoute = { profile: true };
    }
    this.state = {
      isProfileDropDownOpen: false,
      activeRoute,
      selectedValue: ''
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    this.props.getUserPoints();
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

  setSelectedValue = selectedValue => {
    this.setState({ selectedValue });
  }

  learnerRoute = moveTo => {
    this.setState({ activeRoute: { [moveTo]: true } });
  }

  handleOutsideClick() {
    this.onClickProfile();
  }

  render() {
    const {
      isProfileDropDownOpen,
      activeRoute,
      selectedValue
    } = this.state;
    const { userDetails, userPoints } = this.props;
    const locale = this.props.locale.learnerHeader;
    const { app } = this.props.locale;
    return (
      <div className="responsive-navigation">
        <nav className="navbar navbar-expand-md fixed-top navbar-dark navbar-custom py-md-0">
          <div
            className="navbar-brand mr-auto brand-name"
            role="presentation"
            onClick={() => this.learnerRoute('dashboard')}
          >
            <NavLink exact to={`${routeConstant.DASHBOARD}`}>{app.capsAppName}
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
          <div
            className="collapse navbar-collapse justify-content-between collapsible-menus"
            id="navbarCollapsiblemenus"
          >
            <div className="search-course">
              <SearchSelect setSelectedValue={this.setSelectedValue} selectedValue={selectedValue} />
            </div>
            <ul className="navbar-nav">
              <li
                className={`nav-item ${activeRoute.catalog ? 'active' : ''}`}
                role="presentation"
                onClick={() => this.learnerRoute('catalog')}
              >
                <NavLink exact to={`${routeConstant.CATALOG}`}>
                  {locale.catalog}
                </NavLink>
              </li>
            </ul>
          </div>
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
                  <div className="credit-details">
                    <img
                      src={dollar}
                      alt="Credits"
                      className="credit-icon"
                    />
                    <div className="credit-points">
                      {userPoints} {locale.credits}
                    </div>
                  </div>
                </div>
              </DropdownToggle>
              <DropdownMenu className="w-100 credit-dropdown">
                <NavLink exact to={`${routeConstant.PROFILE}`}>
                  <DropdownItem onClick={() => this.learnerRoute('profile')}>
                    {locale.profile}
                  </DropdownItem>
                </NavLink>
                <DropdownItem className="c-pointer" onClick={() => this.props.onLogout()}>{locale.logout}</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </nav>
      </div>
    );
  }
}

LearnerNavigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.object.isRequired,
  userPoints: PropTypes.string.isRequired,
  getUserPoints: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userDetails: state.user.get('userDetails'),
  userPoints: state.profile.get('userPoints')
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logoutUser()),
  getUserPoints: () => dispatch(getUserPointsReady())
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(LearnerNavigation));
