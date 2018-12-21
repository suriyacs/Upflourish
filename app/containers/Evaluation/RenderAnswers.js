import React from 'react';
import PropTypes from 'prop-types';

import { required } from '../../utils/Validations';
import SelectList from '../../components/FormComponents/Select';
import TextField from '../../components/FormComponents/TextField';

const renderAnswerFields = (answer, index, fields) => (
  <li key={`answer_${index}`} className="answerSection m-10px-0px">
    <TextField
      name={`${answer}.option`}
      isLableRequired
      htmlFor={`${answer}.option`}
      labelName={`Option #${index + 1}`}
      type="text"
      errorLabel="Answer"
      className="form-control ans"
      validate={[required]}
    />
    <div className="text-right m-10px-0px">
      {index === fields.length - 1 && fields.length < 4 &&
        <span
          className="actionIcon bo-add-color c-pointer"
          role="presentation"
          title="Add Option"
          onClick={() => { fields.push({}); }}
        >
          <i className="fa fa-plus add" aria-hidden="true" />
        </span>
      }
      {fields.length > 2 &&
        <span
          className="actionIcon m-l-10px bo-delete-color c-pointer"
          role="presentation"
          title="Delete Option"
          onClick={() => { fields.remove(index); }}
        >
          <i className="fa fa-trash delete" aria-hidden="true" />
        </span>
      }
    </div>
  </li>
);

const RenderAnswers = ({ fields, question, meta: { error } }) => {
  if (fields.length === 0) {
    fields.push({});
    fields.push({});
    fields.push({});
  }
  return (
    <ul className="m-10px-0px">
      {fields.map(renderAnswerFields)}
      <li style={{ clear: 'both' }}>
        <SelectList
          isLableRequired
          htmlFor="Correct Answer"
          labelName="Correct Answer"
          name={`${question}.answer`}
          options={fields.map((answer, index) => ({ id: index + 1, name: `Option ${index + 1}` }))}
          labelKey="name"
          valueKey="name"
          placeholder="Select the correct answer"
          validate={[required]}
        />
      </li>
      {error && <li style={{ clear: 'both' }} className="error">{error}</li>}
    </ul>
  );
};

RenderAnswers.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  question: PropTypes.string.isRequired
};

export default RenderAnswers;
