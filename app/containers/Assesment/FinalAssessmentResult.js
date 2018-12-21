import React from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

import { routeConstant } from '../../globals/AppConstant';
import SectionBreadCrumb from '../../components/BreadCrumb/SectionBreadCrumb';
import resultImage from '../../../assets/images/assessment-result.svg';
import correctImage from '../../../assets/images/completed.svg';
import wrongImage from '../../../assets/images/wrong.svg';
import CompleteMyContent from '../LearnerContents/CompleteMyContent';

const FinalAssessmentResult = ({
  contentDetails,
  learningpathName,
  assessmentResults,
  locale,
  redirectToCertificate,
  updateLatestContentIdForUser,
  contentRoutes,
  contentId
}) => {
  const { finalAssessmentResult } = locale;
  return (
    <div className="content-container p-t-10">
      <div className="content-header-section">
        <SectionBreadCrumb
          learningPathName={learningpathName}
          content={{ title: contentDetails ? contentDetails.title : '', type: routeConstant.ARTICLE }}
        />
        <div className="introduction-section col-lg-12 p-0">
          <div className="col-lg-6 p-0 image-section">
            <div className="image-container">
              <img src={resultImage} alt="assessment-result" />
            </div>
            <div className="assessment-time-section">
              {finalAssessmentResult.description}
            </div>
            {contentRoutes && contentRoutes.length > 0 &&
            <CompleteMyContent
              contentRoutes={contentRoutes}
              updateLatestContentIdForUser={updateLatestContentIdForUser}
              contentType="assessment"
              contentId={contentId}
            />
          }
          </div>
          <div className="col-lg-6 p-0 assessment-intro">
            <div className="intro-heading">
              {finalAssessmentResult.title}
            </div>
            <div className="intro-description p-r-10">
              {
                assessmentResults.learnerAssessmentAnswers.map((answer, index) => (
                  <div key={answer.id} className="question-answer-response">
                    <span>{finalAssessmentResult.question} {index + 1}</span>
                    <span className="answer-image">{answer.score !== 0 ?
                      <img src={correctImage} alt="correct" /> : <img src={wrongImage} alt="wrong" />
                    }
                    </span>
                  </div>
                ))
              }
            </div>
            <div
              className={`intro-heading text-center m-t-10 ${assessmentResults.isCourseCompleted ?
                'course-complete' : ''}`}
            >
              {
                finalAssessmentResult.finalScore
                  .replace('{yourScore}', assessmentResults.total_correct_questions)
                  .replace('{totalScore}', assessmentResults.total_questions)
              }
            </div>
            {
              assessmentResults.isCourseCompleted &&
              <div className="intro-heading text-center">
                <span>
                  {finalAssessmentResult.congratsMessage}
                </span>
                <button
                  className="ml-2 btn view-cert"
                  onClick={() => { redirectToCertificate(); }}
                >
                  {finalAssessmentResult.viewCertificate}
                </button>
              </div>
            }
            {/* TO DO: Button for retest */}
            {/* <div className="start-test-section">
              <span>{contentDetails.totalQuestions} questions</span>
              <Button
                className="start-btn m-0"
                value="Start assessment"
                type="button"
                onClick={getAssessmentTest}
              />
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};
FinalAssessmentResult.propTypes = {
  assessmentResults: PropTypes.object.isRequired,
  contentDetails: PropTypes.object.isRequired,
  learningpathName: PropTypes.string.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  redirectToCertificate: PropTypes.func.isRequired,
  updateLatestContentIdForUser: PropTypes.func.isRequired,
  contentRoutes: PropTypes.array.isRequired,
  contentId: PropTypes.string.isRequired
};

export default (translatable(locale => locale)(FinalAssessmentResult));
