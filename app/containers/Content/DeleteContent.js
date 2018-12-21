import React from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/components/Section.scss';

const DeleteContent = ({
  onCloseDeleteContent,
  deleteSectionContent,
  locale
}) => (
  <div className="delete-section-container">
    <div className="col-12 delete-section-title">{locale.removeTitle}</div>
    <div className="col-12 deleted-section-content1">
      {locale.removeQuestion}
    </div>
    <div className="col-12">
      <button
        className="btn btn-danger"
        onClick={deleteSectionContent}
      >{locale.removeYesButton}
      </button>
      <button
        className="col-4 btn btn-default btn-edit ml-3"
        onClick={onCloseDeleteContent}
      >{locale.cancel}
      </button>
    </div>
  </div>
);

DeleteContent.propTypes = {
  onCloseDeleteContent: PropTypes.func.isRequired,
  deleteSectionContent: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};
export default DeleteContent;
