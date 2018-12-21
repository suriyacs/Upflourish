import React from 'react';
import PropTypes from 'prop-types';

const IntroCard = props => (
  <div className="assessment-intro-card">
    <div className="row">
      <div className="col-12 title mb-1">
        {props.title}
        <button
          className="complete-btn fl-right col-md-2"
          onClick={props.handleEdit}
        >
          {props.locale.edit}
        </button>
      </div>
      <div className="col-12">
        <div className="description">{props.description}</div>
      </div>
    </div>
  </div>
);

IntroCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  handleEdit: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

IntroCard.defaultProps = {
  description: ''
};

export default IntroCard;
