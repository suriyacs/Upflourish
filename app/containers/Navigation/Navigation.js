import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { translatable } from 'react-multilingual';
import { routeConstant } from '../../globals/AppConstant';

import { logoutUser } from '../../actions/login';
import '../../../assets/styles/components/Navigation.scss';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    let activeRoute = {};
    if (props.match.path.includes(routeConstant.RECENT_HAPPENINGS)) {
      activeRoute = { recentHappenings: true };
    }
    this.state = {
      isProfileDropDownOpen: false,
      activeRoute
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

  navigateTo = moveTo => {
    this.setState({ activeRoute: { [moveTo]: true } });
  }

  render() {
    const { userDetails } = this.props;
    const locale = this.props.locale.header;
    const { app } = this.props.locale;
    const { activeRoute } = this.state;
    return (
      <div className="responsive-navigation">
        <nav
          className="navbar navbar-expand-md fixed-top navbar-dark navbar-custom py-md-0 py-2 h-70px expert-nav"
        >
          <NavLink
            exact
            to={`${routeConstant.DASHBOARD}`}
            onClick={() => this.navigateTo('dashboard')}
          >
            <div className="navbar-brand mr-auto brand-name">
              {app.capsAppName}
            </div>
          </NavLink>
          <div
            className="collapse navbar-collapse justify-content-end collapsible-menus"
            id="navbarCollapsiblemenus"
          >
            <ul className="navbar-nav">
              <li
                className={`nav-item ${activeRoute.recentHappenings ? 'active' : ''}`}
                role="presentation"
                onClick={() => this.navigateTo('recentHappenings')}
              >
                <NavLink exact to={`${routeConstant.RECENT_HAPPENINGS}`}>
                  {locale.recentHappenings}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="d-md-inline-flex non-collapsible-menus h-70px">
            <UncontrolledDropdown setActiveFromChild className="c-pointer">
              <DropdownToggle tag="a" className="profile-section h-100" caret>
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

Navigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userDetails: state.user.get('userDetails')
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(Navigation));
