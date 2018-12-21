import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { routeConstant } from '../../globals/AppConstant';

import BabyOne from '../../../assets/images/baby-one.svg';
import BabyTwo from '../../../assets/images/baby-two.svg';
import BabyThree from '../../../assets/images/baby-three.svg';

const renderCareerGoal = (careerGoal, careerGoalText, openLoginPopup) => (
  <div
    className="card p-4 text-center c-pointer"
    role="presentation"
    onClick={openLoginPopup ? () => { openLoginPopup('signUp'); } : () => {}}
  >
    <div className="h-50">
      <img
        src={careerGoal}
        alt="careerGoal"
      />
    </div>
    <div className="h-50 d-flex align-items-end"><p>{careerGoalText}</p></div>
  </div>
);

const PrimaryCareerGoal = ({ landingLocale, openLoginPopup }) => {
  const locale = landingLocale.primaryCareerGoal;
  return (
    <div className="container">
      <div className="primaryCareerGoal p-5">
        <div className="description ww-75">
          {locale.description}
        </div>
        <div className="pb-2 pt-4 title">
          {locale.title}
        </div>
        <div className="row justify-content-center">
          <NavLink exact to={`${routeConstant.COURSES}`}>
            {renderCareerGoal(BabyTwo, locale.babyTwo)}
          </NavLink>
          {renderCareerGoal(BabyThree, locale.babyThree, openLoginPopup)}
          {renderCareerGoal(BabyOne, locale.babyOne)}
        </div>
      </div>
    </div>
  );
};

PrimaryCareerGoal.propTypes = {
  landingLocale: PropTypes.objectOf(PropTypes.any).isRequired,
  openLoginPopup: PropTypes.func.isRequired
};

export default PrimaryCareerGoal;
