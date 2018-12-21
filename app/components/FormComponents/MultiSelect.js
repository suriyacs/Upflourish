import React, { Fragment } from 'react';
import { Field, FieldsProps } from 'redux-form';
import PropTypes from 'prop-types';
import Multiselect from 'react-widgets/lib/Multiselect';

import '../../../assets/styles/common.scss';

const renderMultiSelect = ({
  label,
  data,
  placeholder,
  textKey,
  valueKey,
  input,
  errorLabel,
  allowCreate,
  onCreate,
  meta: { touched, error }
}) => (
  <Fragment>
    <Multiselect
      {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []}
      textField={textKey}
      valueField={valueKey}
      data={data}
      allowCreate={allowCreate}
      onCreate={onCreate}
      placeholder={placeholder}
    />
    {
      error && touched && <div className="error-message">{errorLabel || label} {error}</div>
    }
  </Fragment>
);

const MultiSelectField = ({
  name,
  htmlFor,
  options,
  labelName,
  isLableRequired,
  validate,
  handleChange,
  onCreate,
  placeholder,
  labelKey,
  valueKey,
  errorLabel,
  allowCreate
}) => (
  <Fragment>
    {isLableRequired &&
      <div className="input-field">
        <label htmlFor={htmlFor}>{labelName}</label>
        {validate.map(field => (
          field.name === 'required' && <span className="required-field" key={field.name}>*</span>
        ))}
      </div>
    }
    <Field
      name={name}
      component={renderMultiSelect}
      validate={validate}
      label={htmlFor}
      errorLabel={errorLabel}
      data={options}
      onChange={handleChange}
      onCreate={onCreate}
      placeholder={placeholder}
      textKey={labelKey}
      valueKey={valueKey}
      allowCreate={allowCreate}
    />
  </Fragment>
);

MultiSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  isLableRequired: PropTypes.bool,
  validate: PropTypes.any,
  options: PropTypes.array,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  errorLabel: PropTypes.string,
  onCreate: PropTypes.func,
  allowCreate: PropTypes.any
};

MultiSelectField.defaultProps = {
  isLableRequired: false,
  handleChange: null,
  validate: [],
  options: [],
  errorLabel: '',
  allowCreate: null,
  onCreate: null
};

renderMultiSelect.propTypes = FieldsProps;

export default MultiSelectField;
