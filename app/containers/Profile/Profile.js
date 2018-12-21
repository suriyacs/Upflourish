import React from 'react';
import { Modal } from 'reactstrap';

import Recommend from './Recommend';
import ProfileScore from './ProfileScore';
import Skill from './Skill';
import EmployementHistory from './EmployementHistory';
import EducationHistory from './EducationHistory';
import Certificate from './Certificate';
import PersonalDetail from './PersonalDetail';
import Achievement from './Achievement';
import CommonNavigation from '../Navigation/CommonNavigation';
import { profileTabList } from '../../globals/AppConstant';
import InterestedCategories from './InterestedCategories';
import FormComponentList from './ProfileForm/FormComponentList';
import ProfileForm from './ProfileForm/ProfileForm';
import '../../../assets/styles/components/Profile.scss';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'personal',
      isProfileFormOpen: false,
      selectedComponent: {}
    };
    this.navBarHeight = 0;
  }

  componentDidMount() {
    this.navBarHeight = this.childCanvas.elemHeight;
    this.handleSelect();
  }

  handleSelect = (event, selectedTab = 'personal') => {
    const node = document.getElementById(selectedTab).offsetTop - (this.navBarHeight + 10);
    if (event) {
      event.preventDefault();
    }
    try {
      window.scroll({
        top: node,
        behavior: 'smooth'
      });
    } catch (e) {
      window.scroll(0, node);
    }
  }

  openFormPopup = selectedComponent => {
    console.log('selectedComponent', selectedComponent);
    this.setState({
      isProfileFormOpen: true,
      selectedComponent
    });
  };

  closeFormPopup = () => {
    this.setState({ isProfileFormOpen: false });
  };

  render() {
    const {
      activeTab,
      isProfileFormOpen,
      selectedComponent
    } = this.state;
    return (
      <div className="row profile-section">
        <CommonNavigation
          handleSelect={this.handleSelect}
          ref={event => { this.childCanvas = event; }}
          tabHeaderList={profileTabList}
          isProfile
          activeSection={activeTab}
        />
        <div className="container-fluid">
          <div
            className={
              'd-flex flex-column flex-md-row ' +
              'justify-content-around profile-detail'}
          >
            <div className="d-flex flex-column m-20">
              <div className="d-flex flex-column width">
                <PersonalDetail
                  openFormPopup={this.openFormPopup}
                />
                <Skill
                  openFormPopup={this.openFormPopup}
                />
                <EmployementHistory openFormPopup={this.openFormPopup} />
                <EducationHistory openFormPopup={this.openFormPopup} />
                <Certificate openFormPopup={this.openFormPopup} />
                <Achievement />
                <Recommend />
                <InterestedCategories
                  openFormPopup={this.openFormPopup}
                />
              </div>
            </div>
            <div className="d-flex flex-column m-20 profile-score-section width profile-score-width">
              <ProfileScore />
            </div>
          </div>
          <Modal
            modalClassName="min-h-100 profile-popup reactstrab-modal"
            backdropClassName="modal-bg d-flex overlay-opacity"
            isOpen={isProfileFormOpen}
            centered={isProfileFormOpen}
          >
            <ProfileForm
              FormToRender={FormComponentList[selectedComponent.formName]}
              closeFormPopup={this.closeFormPopup}
              selectedComponent={selectedComponent}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Profile;
