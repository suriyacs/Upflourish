import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import Button from '../../components/Button/Button';
import { required } from '../../utils/Validations';
import TextField from '../../components/FormComponents/TextField';
import RenderAnswers from './RenderAnswers';

import '../../../assets/styles/common.scss';

const renderQuestionFields = (question, index, fields) => {
  const questionType = fields.get(index).type;
  return (
    <li key={`question_${index}`} className="questionSection">
      <div className="text-right">
        <span
          className="actionIcon m-r-10 bo-add-color c-pointer"
          role="presentation"
          title="Add Question"
          onClick={() => { fields.push({ type: questionType }); }}
        >
          <i className="fa fa-plus add" aria-hidden="true" />
        </span>
        <span
          className="actionIcon bo-delete-color c-pointer"
          role="presentation"
          title="Delete Question"
          onClick={() => {
            fields.remove(index);
          }}
        >
          <i className="fa fa-trash delete" aria-hidden="true" />
        </span>
      </div>
      <TextField
        name={`${question}.question`}
        isLableRequired
        htmlFor={`${question}.question`}
        labelName={`Question #${index + 1}`}
        type="text"
        errorLabel="Question"
        className="form-control ques"
        placeholder="Enter the question"
        validate={[required]}
      />
      <FieldArray
        name={`${question}.options`}
        component={RenderAnswers}
        question={question}
      />
    </li>
  );
};

const RenderQuestions = ({ fields, locale }) => {
  const { assessment: { addQuestion, mcq } } = locale;
  return (
    <ul>
      <li className="float-right m-20px-0px">
        <div className="dropdown">
          <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
            {addQuestion}
          </button>
          <div className="dropdown-menu">
            <div
              id="mcq"
              className="dropdown-item c-pointer"
              role="presentation"
              onClick={() => {
                fields.push({ type: 'mcq' });
              }}
            >
              {mcq}
            </div>
          </div>
        </div>
      </li>
      {fields.map(renderQuestionFields)}
      {fields.length > 0 &&
        <li className="m-10px-0px">
          <Button
            value="Submit questions"
            className="submit-btn"
            type="submit"
          />
        </li>
      }
    </ul>
  );
};

RenderQuestions.propTypes = {
  fields: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default RenderQuestions;
