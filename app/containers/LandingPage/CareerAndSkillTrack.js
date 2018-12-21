import React from 'react';
import PropTypes from 'prop-types';

import { RLanguages, pythonLanguages, design, otherCategories } from '../../globals/AppConstant';

import '../../../assets/styles/components/CareerAndSkillTrack.scss';

const CareerAndSkillTrack = ({ locale }) => (
  <div className="dropdown-menu custom-dropdown">
    <div className="row m-0 p-20 pb-5">
      <div className="col-4 border-right title">
        R LANGUAGE
        <div className="see-all float-right text-right c-pointer">{locale.seeAllButton}</div>
        {RLanguages.map((language, index) => (
          <div
            key={language.name}
            className={`item-content ${index === 0 ? 'pt-4' : 'pt-2'} pb-2 border-bottom c-pointer`}
          >
            {language.name}
            <i className="fa fa-angle-right right-arrow" />
          </div>
        ))}
        <div className="pt-3">
          PYTHON
          <div className="see-all float-right text-right c-pointer">{locale.seeAllButton}</div>
        </div>
        {pythonLanguages.map((language, index) => (
          <div
            key={language.name}
            className={`item-content ${index === 0 ? 'pt-4' : 'pt-2'} pb-2 border-bottom c-pointer`}
          >
            {language.name}
            <i className="fa fa-angle-right right-arrow" />
          </div>
        ))}
      </div>
      <div className="col-4 border-right title">
        DESIGN
        <div className="see-all float-right text-right c-pointer">{locale.seeAllButton}</div>
        {design.map((language, index) => (
          <div
            key={language.name}
            className={`item-content ${index === 0 ? 'pt-4' : 'pt-2'} pb-2 border-bottom c-pointer`}
          >
            {language.name}
            <i className="fa fa-angle-right right-arrow" />
          </div>
        ))}
      </div>
      <div className="col-4 title">
        OTHER CATEGORIES
        <div className="see-all float-right text-right c-pointer">{locale.seeAllButton}</div>
        {otherCategories.map((language, index) => (
          <div key={language.name} className={`item-content ${index === 0 ? 'pt-4' : 'pt-2'} pb-2 c-pointer`}>
            {language.name}
            <i className="fa fa-caret-right right-icon" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

CareerAndSkillTrack.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default CareerAndSkillTrack;
