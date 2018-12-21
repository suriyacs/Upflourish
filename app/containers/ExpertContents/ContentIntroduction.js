import React from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

import { constantValues } from '../../globals/AppConstant';

import '../../../assets/styles/components/LearningPath.scss';

const ContentIntroduction = ({
  contentTitle,
  locale,
  handleEdit
}) => {
  const { contentIntroduction } = locale;
  return (
    <div className="col-12 padding-0 path-detail mb-2">
      <div className="path-detail-title col-lg-9 padding-0">
        <div id="expandableContent" className="content-description-expandable content-title">
          <p id="title" className="collapse col-lg-12 padding-0 content-title mb-2" aria-expanded="false">
            {contentTitle}
          </p>
          { contentTitle && contentTitle.length > constantValues.contentTitleLimit &&
            <span
              className="expand content-expand collapsed"
              data-toggle="collapse"
              href="#title"
              aria-expanded="false"
            />
          }
        </div>
      </div>
      <button
        className="complete-btn float-right col-md-2 padding-0"
        onClick={handleEdit}
      >
        {contentIntroduction.edit}
      </button>
    </div>
  );
};

ContentIntroduction.propTypes = {
  contentTitle: PropTypes.string,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleEdit: PropTypes.func.isRequired
};

ContentIntroduction.defaultProps = {
  contentTitle: ''
};

export default (translatable(locale => locale)(ContentIntroduction));
