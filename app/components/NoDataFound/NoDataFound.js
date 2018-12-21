import React from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

import Button from '../Button/Button';
import userImg from '../../../assets/images/user_emptystate.svg';

const NoDataFound = props => {
  const { buttonText, locale, description } = props;
  return (
    <div className="col-sm-12 col-xs-12 mt-2 text-center py-5">
      <img
        className="img-fluid"
        src={userImg}
        alt="No data"
      />
      <p className="empty-state-header">
        {locale.noDataFound.title}
      </p>
      <p className="col-md-7 empty-state-subheader">
        {description}
      </p>
      <div className="col-md-4 mx-auto">
        <Button
          type="submit"
          value={buttonText}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};

NoDataFound.propTypes = {
  buttonText: PropTypes.string.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string
};

NoDataFound.defaultProps = {
  description: ''
};

export default translatable(locale => locale)(NoDataFound);
