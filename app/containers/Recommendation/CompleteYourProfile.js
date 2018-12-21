import React from 'react';
import PropTypes from 'prop-types';

const CompleteYourProfile = ({ locale, onClickCompleteProfile }) => {
  const { completeYourProfile } = locale;
  return (
    <div className="row m-0 complete-profile">
      <div className="col-12">
        <div className="title">
          {completeYourProfile.title}
        </div>
        <p>
          {completeYourProfile.description}
        </p>
      </div>
      <div className="col-12 text-center complete-profile-action">
        <button
          className="w-100 btn complete-profile-btn"
          onClick={() => { onClickCompleteProfile(); }}
        >
          {completeYourProfile.completeBtn}
        </button>
      </div>
    </div>
  );
};

CompleteYourProfile.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  onClickCompleteProfile: PropTypes.func.isRequired
};

export default CompleteYourProfile;
