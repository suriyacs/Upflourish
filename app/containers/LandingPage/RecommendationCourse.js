import React from 'react';
import PropTypes from 'prop-types';

const RecommendationCourse = ({ landingLocale, openLoginPopup }) => {
  const locale = landingLocale.recommendations;
  return (
    <div className="container recommendation-course p-5">
      <div className="recommendation-content px-4 py-5">
        <div className="title">{locale.title}
        </div>
        <p className="description">{locale.description}
        </p>
        <button
          className="btn recommendation-btn"
          onClick={openLoginPopup ? () => { openLoginPopup('signUp'); } : () => {}}
        >
          {locale.recommendationBtn}
        </button>
      </div>
    </div>
  );
};

RecommendationCourse.propTypes = {
  landingLocale: PropTypes.objectOf(PropTypes.any).isRequired,
  openLoginPopup: PropTypes.func.isRequired
};

export default RecommendationCourse;
