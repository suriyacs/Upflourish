import React from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

import { constantValues } from '../../globals/AppConstant';
import '../../../assets/styles/components/LearningPath.scss';

// import toBeCompletedIcon from '../../../assets/images/completed-bl.svg';
// import completedIcon from '../../../assets/images/completed-w.svg';

const ContentIntroduction = ({
  contentTitle
  // contentId,
  // markContentAsComplete,
  // isCompleted,
  // locale
}) =>
  // const { contentIntroduction } = locale;
  (
    <div className="col-12 padding-0 path-detail mb-2">
      <div className="path-detail-title col-lg-9 padding-0">
        <div id="expandableContent" className="content-description-expandable content-title">
          <p id="detail" className="collapse col-lg-12 padding-0 content-title mb-2" aria-expanded="false">
            {contentTitle}
          </p>
          { contentTitle && contentTitle.length > constantValues.contentTitleLimit &&
            <span
              className="expand content-expand collapsed"
              data-toggle="collapse"
              href="#detail"
              aria-expanded="false"
            />
          }
        </div>
      </div>
      {/*      <button
        className={isCompleted ?
          'complete-btn completed col-lg-3 padding-0' : 'complete-btn col-lg-3 padding-0'
        }
        onClick={!isCompleted ? () => markContentAsComplete(contentId) :
          () => {}}
      >
        <img
          className="complete-icon"
          src={isCompleted ? completedIcon : toBeCompletedIcon}
          alt="complete-icon"
        />
        <span>{isCompleted ? contentIntroduction.markedAsDone : contentIntroduction.markAsComplete}</span>
        </button> */}
    </div>
  );

ContentIntroduction.propTypes = {
  contentTitle: PropTypes.string
  // contentId: PropTypes.string,
  // isCompleted: PropTypes.bool,
  // markContentAsComplete: PropTypes.func.isRequired,
  // locale: PropTypes.objectOf(PropTypes.any).isRequired
};

ContentIntroduction.defaultProps = {
  // contentId: '',
  contentTitle: ''
  // isCompleted: false
};

export default (translatable(locale => locale)(ContentIntroduction));
