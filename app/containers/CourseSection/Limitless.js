import React from 'react';
import PropTypes from 'prop-types';

const Limitless = ({ locale }) => (
  <div className="container-fluid limitless-section">
    <div className="row content">
      <div className="col-12 offset-lg-4 col-lg-8 offset-xl-3 col-xl-9">
        <div className="col header mb-4">
          {locale.limitLess.title}
        </div>
        <div className="col-12 col-sm-9 description mb-4">
          {locale.limitLess.desc}
        </div>
        <div className="col-12">
          <button className="btn start-learning-button">
            {locale.limitLess.startLearning}
          </button>
        </div>
      </div>
    </div>
  </div>
);

Limitless.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Limitless;
