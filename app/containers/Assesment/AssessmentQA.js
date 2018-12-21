import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translatable } from 'react-multilingual';

import NoImage from '../../../assets/images/path1.png';

const AssessmentQA = ({
  currentQuestion, selectOption, questionResponses, isAnswerChecked,
  toggleHint, openRelatedContent, sectionName, showHint,
  locale
}) => {
  const { question } = currentQuestion;
  const { assessmentQA } = locale;
  return (
    <div className="question-container">
      <div className="path-detail-title mb-3 quiz-title">{sectionName}</div>
      <div className="question-text">{question.title}</div>
      <div
        className={`pb-4 option-container ${isAnswerChecked ? 'disable' : ''}`}
      >
        {
          question.answers.map(option => (
            <label key={option.id}>
              <input
                type="radio"
                name="answer"
                disabled={isAnswerChecked}
                defaultChecked={questionResponses[question.id] === option.id}
                onChange={() => { selectOption(option); }}
              />
              {option.description}
            </label>
          ))
        }
      </div>
      <div className="container-fluid mt-3 hint-section">
        <div className="row related-content">
          <div
            className={`${currentQuestion.question.contents
              && currentQuestion.question.contents.length ? 'col-12 col-md-6 mb-3 pl-md-0' : 'col12'}`}
          >
            {
              currentQuestion.question.contents && currentQuestion.question.contents.length &&
              <Fragment>
                <div className="label mb-3">
                  {assessmentQA.relatedContent}
                </div>
                <Link
                  to={{
                    pathname: `${openRelatedContent(currentQuestion.question.contents)}`
                  }}
                  className="row m-0 related-content-dimension"
                  target="_blank"
                >
                  <div className="col-12 col-lg-5 col-xl-3 pl-0">
                    <img src={NoImage} alt="RelatedContent" className="content-image" />
                  </div>
                  <div className="related-content-text col-12 col-lg-7 col-xl-8">
                    <div className="label one-row-ellipsis">
                      {currentQuestion.question.contents[0].title}
                    </div>
                    <div className="description three-row-ellipsis">
                      {currentQuestion.question.contents[0].description}
                    </div>
                  </div>
                </Link>
              </Fragment>
            }
          </div>
          <div className="col-12 col-md-6 hint-section-wrapper">
            <div className="label mb-3">
              {assessmentQA.ruInStuck}
            </div>
            {
              !showHint ?
                <button className="btn show-hint-btn" onClick={() => { toggleHint(question.hint); }}>
                  {assessmentQA.getAHint}
                </button>
                :
                <button className="btn show-hint-btn" disabled>
                  {assessmentQA.getAHint}
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

AssessmentQA.propTypes = {
  currentQuestion: PropTypes.object.isRequired,
  selectOption: PropTypes.func.isRequired,
  questionResponses: PropTypes.object,
  isAnswerChecked: PropTypes.bool.isRequired,
  toggleHint: PropTypes.func.isRequired,
  openRelatedContent: PropTypes.func.isRequired,
  sectionName: PropTypes.string.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  showHint: PropTypes.bool.isRequired
};

AssessmentQA.defaultProps = {
  questionResponses: {}
};

export default (translatable(locale => locale)(AssessmentQA));
