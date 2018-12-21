import React from 'react';
import PropTypes from 'prop-types';

import '../../../assets/styles/components/Section.scss';

const DeleteSection = ({
  onCloseDeleteSection,
  onDeleteSection,
  locale,
  title
}) => (
  <div className="delete-section-container">
    <div className="col-12 delete-section-title">{locale.removeTitle} {title} ?</div>
    <div className="col-12 deleted-section-content1">
      {locale.removeQuestion} {title} ?
    </div>
    <div className="col-12 deleted-section-content2">
      {locale.removeMessage}
    </div>
    <div className="col-12 ">
      <button
        className="col-6 btn btn-danger"
        onClick={() => { onDeleteSection(); }}
      >{locale.removeYesButton} {title}
      </button>
      <button
        className="col-4 btn btn-default btn-edit ml-3"
        onClick={() => { onCloseDeleteSection(); }}
      >{locale.cancelButton}
      </button>
    </div>
  </div>
);

DeleteSection.propTypes = {
  onCloseDeleteSection: PropTypes.func.isRequired,
  onDeleteSection: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired
};

export default DeleteSection;
