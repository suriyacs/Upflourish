import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';

import Profile from './Profile';
import ManageCategories from './ManageCategories';
import ManageUsers from './ManageUsers';
import { admin, isTabView } from '../../globals/AppConstant';

import '../../../assets/styles/components/HomePage.scss';

import ProfilePng from '../../../assets/images/man.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'manageUsers'
    };
  }

  setActiveSideMenu = moveTo => {
    this.setState({ activeMenu: moveTo });
  }

  render() {
    const { userDetails } = this.props;
    const { activeMenu } = this.state;
    const { home: { adminSideMenu } } = admin;
    const locale = this.props.locale.adminHome;
    return (
      <div className="container-fluid">
        <a href="#sidebar" data-toggle="collapse" className="d-lg-none toggler" aria-expanded="false">
          <i className="fa fa-bars" />
        </a>
        <div className="row admin-home-container">
          <div
            className={`col-3 sidemenu collapse in ${isTabView ? '' : 'show'}`}
            id="sidebar"
          >
            <div className="list-group-item pt-4 pb-4">
              <div className="row m-0">
                <img
                  className="profileIcon"
                  src={ProfilePng}
                  alt="profile icon"
                />
                <div className="row m-0 d-block">
                  <div className="username pl-3">{userDetails.first_name}</div>
                  <div className="role pl-3">{userDetails.roles[0].description}</div>
                </div>
              </div>
            </div>
            <div className="list-group">
              {adminSideMenu &&
                adminSideMenu.map(menu => (
                  <a
                    key={menu.id}
                    className={`c-pointer ${activeMenu === menu.id ?
                      'list-group-item active' : 'list-group-item'}`
                    }
                    onClick={() => this.setActiveSideMenu(menu.id)}
                    href={isTabView ? '#sidebar' : '#none'}
                    data-toggle="collapse"
                  >
                    <i className={menu.img} />{locale[menu.id]}
                  </a>
                ))
              }
            </div>
          </div>
          <div className="col-lg-9 tabView">
            {activeMenu === 'manageUsers' &&
              <ManageUsers />
            }
            {activeMenu === 'profile' &&
              <Profile locale={locale} />
            }
            {activeMenu === 'manageCategories' &&
              <ManageCategories locale={locale} />
            }
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  userDetails: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  userDetails: state.user.get('userDetails')
});

export default connect(mapStateToProps, null)(translatable(locale => locale)(Home));
