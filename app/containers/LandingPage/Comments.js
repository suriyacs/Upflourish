import React from 'react';
import PropTypes from 'prop-types';

import QuoteLeft from '../../../assets/images/quote-left.svg';

const Comments = ({ landingLocale }) => {
  const locale = landingLocale.comments;
  return (
    <div className="container">
      <div className="row comments">
        <div className="col-12 col-md-6 col-lg-6 p-0 commenter" />
        <div className="col-12 col-md-6 col-lg-6 commenter-content">
          <div className="details">
            <img src={QuoteLeft} alt="quote" className="pr-2" />
            <div className="pl-5">
              <p>
                {locale.comment}
              </p>
              <div className="commenter-name">{locale.commenterName}</div>
              <div className="commenter-designation">
                {locale.commenterPosition}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comments.propTypes = {
  landingLocale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Comments;
