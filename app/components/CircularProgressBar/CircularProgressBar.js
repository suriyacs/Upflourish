import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import '../../../assets/styles/components/CircularProgressBar.scss';

const CircularProgressBar = props => {
  const { children, ...otherProps } = props;

  return (
    <div className="progressBarWrapper">
      <div className="absolute">
        <CircularProgressbar {...otherProps} />
      </div>
      <div className="progressBarChildren">
        {props.children}
      </div>
    </div>
  );
};

CircularProgressBar.propTypes = {
  children: PropTypes.any.isRequired
};

export default CircularProgressBar;
