import React from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/components/SectionContent.scss';

import bookmarksIcon from '../../../assets/images/bookmark-g.svg';
import starIcon from '../../../assets/images/star-g.svg';
import linkIcon from '../../../assets/images/link-g.svg';
import repeatIcon from '../../../assets/images/repeat-g.svg';
import linkedinIcon from '../../../assets/images/linked-in-g.svg';
import twitterIcon from '../../../assets/images/twitter-g.svg';
import facebookIcon from '../../../assets/images/facebook-g.svg';
import toBeCompletedIcon from '../../../assets/images/completed-bl.svg';
import completedIcon from '../../../assets/images/completed-w.svg';

const ContentSharingRating = ({
  contentType,
  contentId,
  isCompleted,
  markContentAsComplete
}) => (
  <div className="sharing-rating-section">
    <button
      className={isCompleted ? 'complete-btn completed' : 'complete-btn'}
      onClick={!isCompleted ? () => markContentAsComplete(contentId) :
        () => {}}
    >
      <img
        className="complete-icon"
        src={isCompleted ? completedIcon : toBeCompletedIcon}
        alt="complete-icon"
      />
      <span>{isCompleted ? 'Marked as done' : 'Mark as complete'}</span>
    </button>
    <div className="sharing-icons sharing-section">
      <span className="mr-2">Share</span>
      <img className="mr-2" src={linkedinIcon} alt="linkedin-icon" />
      <img className="mr-2" src={facebookIcon} alt="facebook-icon" />
      <img className="mr-2" src={twitterIcon} alt="twitter-icon" />
      <img className="mr-2" src={linkIcon} alt="link-icon" style={{ opacity: '0.5' }} />
    </div>
    <div className="rating-content-section sharing-section">
      <img className="m-r-10" src={starIcon} alt="rating-icon" />
      <span className="sharing-text">{`Rate the ${contentType.toLowerCase()}`}</span>
    </div>
    <div className="suggest-content-section sharing-section">
      <img className="m-r-10" src={repeatIcon} alt="suggestion-icon" />
      <span className="sharing-text">{`Suggest a better ${contentType.toLowerCase()}`}</span>
    </div>
    <div
      className="suggest-content-section sharing-section"
      style={{ opacity: '0.5' }}
    >
      <img className="m-r-10" src={bookmarksIcon} alt="link-icon" />
      <span className="sharing-text">View bookmarks</span>
    </div>
  </div>
);

ContentSharingRating.propTypes = {
  contentType: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  markContentAsComplete: PropTypes.func.isRequired
};

ContentSharingRating.defaultProps = {
  isCompleted: false
};

export default ContentSharingRating;
