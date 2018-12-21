import React from 'react';
import PropTypes from 'prop-types';

import { courseSection } from '../../globals/AppConstant';

import AddQuestionIcon from '../../../assets/images/plus-icon.svg';

const FrequentQuestion = ({ locale }) => {
  const { questionList } = courseSection.careerImpact;
  return (
    <div className="container-fluid question-section" id="faq">
      <div className="row">
        <div className="col-12 offset-lg-4 col-lg-8 offset-xl-3 col-xl-9 content">
          <div className="header mb-3">
            {locale.faq.title}
          </div>
          <div className="col-12 col-md-10 col-lg-9 col-xl-8 p-0 question-div">
            {
              questionList.map(value => (
                <div key={value.id} className="parent d-flex flex-row align-items-start justify-content-between">
                  <span className="question">
                    {locale.faq.question}{value.id}. {value.question}
                  </span>
                  <span className="icon">
                    <img src={AddQuestionIcon} alt="Add Question" />
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

FrequentQuestion.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default FrequentQuestion;
