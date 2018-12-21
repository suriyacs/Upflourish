import React from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/common.scss';

const Button = ({
  value,
  className,
  onClick,
  type,
  disabled
}) => (
  <button
    className={className !== '' ? `${className} btn btn-block button` : 'btn btn-block button'}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);

Button.propTypes = {
  value: PropTypes.any.isRequired,
  className: PropTypes.any,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  type: 'submit',
  className: ''
};

export default Button;
