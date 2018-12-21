import React from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

import Button from '../../components/Button/Button';
import { routeConstant } from '../../globals/AppConstant';
import SectionBreadCrumb from '../../components/BreadCrumb/SectionBreadCrumb';

import introImage from '../../../assets/images/assessment-intro.svg';

const AssessmentIntroduction = ({
  contentDetails,
  getAssessmentTest,
  learningpathName,
  locale
}) => {
  const { assessmentIntroduction } = locale;
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
              <img src={introImage} alt="introduction" />
            </div>
            <div className="assessment-time-section">
              {assessmentIntroduction.assessmentTime.replace('{minutes}', contentDetails.minutes.split('.')[0])}
            </div>
            {
              contentDetails.isAlreadyAttempted &&
              <div className="assessment-time-section mt-3">
                {assessmentIntroduction.attemptedTime.replace('{attemptedTime}', contentDetails.attempt)}
              </div>
            }
          </div>
          <div className="col-lg-6 p-0 assessment-intro">
            <div className="intro-heading">{contentDetails.title}</div>
            <div
              className="intro-description"
              // eslint-disable-next-line
              dangerouslySetInnerHTML={{ __html: contentDetails.description }} 
            />
            <div className="start-test-section mb-3">
              <span>{assessmentIntroduction.totalQuestions.replace('{count}', contentDetails.totalQuestions)}</span>
              <Button
                className="start-btn m-0"
                value={contentDetails.isAlreadyAttempted ? assessmentIntroduction.retake : assessmentIntroduction.start}
                type="button"
                onClick={getAssessmentTest}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AssessmentIntroduction.propTypes = {
  contentDetails: PropTypes.object.isRequired,
  getAssessmentTest: PropTypes.func.isRequired,
  learningpathName: PropTypes.string.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default (translatable(locale => locale)(AssessmentIntroduction));
