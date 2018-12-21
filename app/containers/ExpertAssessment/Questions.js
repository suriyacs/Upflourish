import React from 'react';
import PropTypes from 'prop-types';

const Questions = props => (
  <ul className="question-list">
    {
      props.questions.map((question, index) => (
        <li
          className="question"
          key={question.id ? question.id : index}
          role="presentation"
          onClick={() => props.handleEditQuestion(question)}
        >
          {question.title}
        </li>
      ))
    }
  </ul>
);

Questions.propTypes = {
  questions: PropTypes.any
};

Questions.defaultProps = {
  questions: []
};

export default Questions;
