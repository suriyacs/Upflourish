import React, { Component, Fragment } from 'react';

import { userStatus, admin } from '../../globals/AppConstant';
import CustomGrid from '../../components/Grid/CustomGrid';

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'All users'
    };
  }

  changeTabView = tabName => {
    this.setState({ activeTab: tabName });
  }

  render() {
    const { activeTab } = this.state;
    const { manageUsers: { tabList } } = admin;
    return (
      <Fragment>
        <div className="row m-l-r-0">
          <div className="col-lg-12 p-l-r-0">
            <ul className="nav">
              {tabList &&
                tabList.map(tab => (
                  <li
                    key={tab}
                    className="nav-item c-pointer"
                    role="presentation"
                    onClick={() => this.changeTabView(tab)}
                  >
                    <span className={`nav-link ${activeTab === tab ? 'active' : ''}`}>{tab}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="row m-l-r-0 detailView">
          <div className="col-lg-12 padding">
            {activeTab === 'All users' &&
              <CustomGrid status={userStatus.active} />
            }
            {activeTab === 'Pending invitations' &&
              <CustomGrid status={userStatus.pending} />
            }
            {activeTab === 'Deactivated users' &&
              <CustomGrid status={userStatus.deleted} />
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ManageUsers;
