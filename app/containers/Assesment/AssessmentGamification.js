import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { Modal } from 'reactstrap';

import ActiveCircle from '../../../assets/images/completed.svg';

class AssessmentGamification extends Component {
  render() {
    const {
      questionResult,
      showNextQuestionAndRemoveOverlay,
      score
    } = this.props;
    const locale = this.props.locale.assessmentGamification;
    return (
      questionResult.score !== 0 &&
      <Modal
        modalClassName="min-h-100 reactstrab-modal assessment-container"
        backdropClassName="modal-bg opacity-1"
        isOpen={questionResult.score !== 0}
        onClose={() => { showNextQuestionAndRemoveOverlay(); }}
        centered={questionResult.score !== 0}
      >
        <div className="overlay-box p-4 text-center">
          <div className="assessment-score-container mb-4">
            <img src={ActiveCircle} alt="profile" className="icon" />
            <span className="assessment-score">
              {locale.totalXP.replace('{count}', score[0].details.score)}
            </span>
          </div>
          <div
            className="assessment-description mb-5"
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: questionResult.correctAnswer && questionResult.correctAnswer.comment }}
          />
          <div className="assessment-footer">
            <button
              className="btn btn-primary assessment-continue-button"
              onClick={() => { showNextQuestionAndRemoveOverlay(); }}
              type="submit"
            >
              {locale.continue}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

AssessmentGamification.propTypes = {
  questionResult: PropTypes.object.isRequired,
  showNextQuestionAndRemoveOverlay: PropTypes.func.isRequired,
  score: PropTypes.array.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default (translatable(locale => locale)(AssessmentGamification));
