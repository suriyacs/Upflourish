import React from 'react';
import { Progress } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';

import { routeConstant } from '../../globals/AppConstant';

import NotePadIcon from '../../../assets/images/notepad.svg';
import GraduateIcon from '../../../assets/images/graduate.svg';
import ReferenceIcon from '../../../assets/images/reference.svg';
import BriefcaseIcon from '../../../assets/images/briefcase.svg';
import ConnectIcon from '../../../assets/images/connection.svg';
import LinkedInIcon from '../../../assets/images/linkedin.svg';
import FacebookIcon from '../../../assets/images/facebook.svg';
import GmailIcon from '../../../assets/images/gmail.svg';

const ProfileScore = ({ locale }) => {
  const profileScoreLocale = locale.profile.profileScore;
  return (
    <div className="improvement-section">
      <div className="d-flex flex-column m-20px-0px">
        <h3 className="heading m-10px-0px">{profileScoreLocale.title}</h3>
        <span className="common-content-text font-size-15 mb-4">
          {profileScoreLocale.description}
        </span>
        <button className="btn btn-default common-content-text font-size-15 mb-3">
          {profileScoreLocale.myWeakness}
        </button>
        <button className="btn btn-default common-content-text font-size-15 mb-4">
          {profileScoreLocale.myStrengths}
        </button>
        <NavLink exact to={`${routeConstant.CATALOG}`}>
          <button className="btn btn-success profile-button success-button font-size-15 w-100">
            {profileScoreLocale.suggestedLP}
          </button>
        </NavLink>
      </div>
      <div className="d-flex flex-column m-20px-0px">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h3 className="heading m-10px-0px">{profileScoreLocale.profileScore}</h3>
          <h3 className="heading score m-20px-0px">40 {profileScoreLocale.pts}</h3>
        </div>
        <div className="mb-4">
          <Progress value={40} />
        </div>
        <div className="d-flex flex-column mb-4">
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row col-lg-8 p-0 align-items-center">
              <span className="col-1 p-0 text-center">
                <img className="profile-common-icon assessment" src={NotePadIcon} alt="summary" />
              </span>
              <span className="common-content-text font-size-15 col-11">{profileScoreLocale.addSummary}</span>
            </div>
            <span className="common-content-text font-size-15 common-link">
              +10{profileScoreLocale.pts}
            </span>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row col-lg-8 p-0 align-items-center">
              <span className="col-1 p-0 text-center">
                <img className="profile-common-icon assessment" src={GraduateIcon} alt="education" />
              </span>
              <span className="common-content-text font-size-15 col-11">{profileScoreLocale.education}</span>
            </div>
            <span className="common-content-text font-size-15 common-link">
              +20{profileScoreLocale.pts}
            </span>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row col-lg-8 p-0 align-items-center">
              <span className="col-1 p-0 text-center">
                <img className="profile-common-icon assessment" src={ReferenceIcon} alt="reference" />
              </span>
              <span className="common-content-text font-size-15 col-11">{profileScoreLocale.references}</span>
            </div>
            <span className="common-content-text font-size-15 common-link">
              50{profileScoreLocale.pts}
            </span>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row col-lg-8 p-0 align-items-center">
              <span className="col-1 p-0 text-center">
                <img className="profile-common-icon assessment" src={BriefcaseIcon} alt="edit" />
              </span>
              <span className="common-content-text font-size-15 col-11">{profileScoreLocale.workExperience}</span>
            </div>
            <span className="common-content-text font-size-15 common-link">
              70{profileScoreLocale.pts}
            </span>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-row col-lg-8 p-0 align-items-center">
              <span className="col-1 p-0 text-center">
                <img className="profile-common-icon assessment" src={ConnectIcon} alt="social media" />
              </span>
              <span className="common-content-text font-size-15 col-11">{profileScoreLocale.connectSocialMedia}</span>
            </div>
            <span className="common-content-text font-size-15 common-link">
              +30{profileScoreLocale.pts}
            </span>
          </div>
        </div>
        <button className="btn btn-success profile-button add-profile-button font-size-15">
          {profileScoreLocale.addProfileSection}
        </button>
      </div>
      <div className="d-flex flex-column">
        <h3 className="heading m-10px-0px">{profileScoreLocale.connectSocialAcc}</h3>
        <div className="profile-common-container">
          <div className="d-flex flex-column m-25">
            <button
              className={
                'btn btn-success profile-button ' +
                'linked-in-button font-size-15 mb-3 ' +
                'flex-row align-items-center'}
            >
              <span className="mr-2">
                <img
                  className="profile-common-icon social-network"
                  src={LinkedInIcon}
                  alt="linkedIn"
                />
              </span>
              <span>
                {profileScoreLocale.connectwithLinkedIn}
              </span>
            </button>
            <button
              className={
              'btn btn-success profile-button ' +
              'facebook-button font-size-15 mb-3 ' +
              'flex-row align-items-center'}
            >
              <span className="mr-2">
                <img
                  className="profile-common-icon social-network"
                  src={FacebookIcon}
                  alt="facebook"
                />
              </span>
              <span>
                {profileScoreLocale.connectwithFacebook}
              </span>
            </button>
            <button
              className="btn btn-success profile-button gmail-button font-size-15 flex-row align-items-center"
            >
              <span className="mr-2">
                <img
                  className="profile-common-icon social-network"
                  src={GmailIcon}
                  alt="gmail"
                />
              </span>
              <span>
                {profileScoreLocale.connectwithGmail}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileScore.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default (translatable(locale => locale)(ProfileScore));
