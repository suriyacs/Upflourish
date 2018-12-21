import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import { translatable } from 'react-multilingual';

const renderCheckButton = (
  selectedQuestion, questions,
  isOptionSelected, checkIfCorrectAndSaveOption,
  tooltipOpen, toggleToolTip, assessmentNavigation
) => {
  if (selectedQuestion.question &&
    selectedQuestion.question.id === questions[questions.length - 1].question_id) {
    return (
      <Fragment>
        <button
          className="btn btn-secondary skip-btn"
          onClick={() => { checkIfCorrectAndSaveOption('getFinalScore', true); }}
        >
          {assessmentNavigation.skip}
        </button>
        <button
          className="check-answer submit-test-btn"
          disabled={isOptionSelected}
          onClick={() => { checkIfCorrectAndSaveOption('getFinalScore', false); }}
        >
          <span>
            {assessmentNavigation.checkAndSubmit}
          </span>
        </button>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <button
        className="btn btn-secondary skip-btn"
        onClick={() => { checkIfCorrectAndSaveOption(null, true); }}
      >
        {assessmentNavigation.skip}
      </button>
      <button
        className="check-answer"
        disabled={isOptionSelected}
        onClick={() => { checkIfCorrectAndSaveOption(); }}
      >
        <span id="chooseOption">
          {assessmentNavigation.check}
        </span>
      </button>
      {
        isOptionSelected &&
        <Tooltip
          className="tooltip-text"
          placement="top"
          isOpen={tooltipOpen}
          target="chooseOption"
          toggle={() => toggleToolTip()}
        >
          {assessmentNavigation.chooseAnOption}
        </Tooltip>
      }
    </Fragment>
  );
};

const AssessmentNavigationBar = ({
  questions,
  selectedQuestion,
  setSelectedQuestion,
  isOptionSelected,
  checkIfCorrectAndSaveOption,
  isAnswerChecked,
  tooltipOpen,
  toggleToolTip,
  learnerAssessmentAnswers,
  currentQuestionNumber,
  locale
}) => {
  const { assessmentNavigation } = locale;
  return (
    <div className="assessment-navigation">
      <div className="current-question">
        {
          assessmentNavigation.totalQuestions
            .replace('{attempted}', currentQuestionNumber + 1)
            .replace('{total}', questions.length)
        }
      </div>
      <div className="question-dots">
        {
          !isAnswerChecked ?
            renderCheckButton(
              selectedQuestion,
              questions,
              isOptionSelected,
              checkIfCorrectAndSaveOption,
              tooltipOpen,
              toggleToolTip,
              assessmentNavigation
            )
            :
            <Fragment>
              {learnerAssessmentAnswers.score === 0 &&
                <button className="check-answer" onClick={() => { setSelectedQuestion(); }}>
                  {assessmentNavigation.next}
                </button>
              }
            </Fragment>
        }
      </div>
    </div>
  );
};

AssessmentNavigationBar.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedQuestion: PropTypes.object,
  setSelectedQuestion: PropTypes.func.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired,
  isOptionSelected: PropTypes.bool,
  tooltipOpen: PropTypes.bool.isRequired,
  checkIfCorrectAndSaveOption: PropTypes.func.isRequired,
  toggleToolTip: PropTypes.func.isRequired,
  isAnswerChecked: PropTypes.bool.isRequired,
  learnerAssessmentAnswers: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

AssessmentNavigationBar.defaultProps = {
  selectedQuestion: {},
  isOptionSelected: false
};

export default (translatable(locale => locale)(AssessmentNavigationBar));
