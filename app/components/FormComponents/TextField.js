import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldsProps } from 'redux-form';
import { Input } from 'reactstrap';

import '../../../assets/styles/common.scss';

const InputBox = ({
  input,
  className,
  type,
  label,
  placeholder,
  errorLabel,
  readOnly,
  valid,
  invalid,
  meta: { touched, error }
}) => (
  <Fragment>
    <Input
      {...input}
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={input.onChange}
      readOnly={readOnly}
      valid={valid}
      invalid={invalid}
    />
    {
      error && touched && <div className="error-message">{errorLabel || label} {error}</div>
    }
  </Fragment>
);

const TextArea = ({
  input,
  className,
  type,
  readOnly,
  label,
  meta: { touched, error }
}) => (
  <Fragment>
    <textarea {...input} className={className} type={type} readOnly={readOnly} />
    {
      error && touched && <div className="error-message">{label} {error}</div>
    }
  </Fragment>
);

const TextField = ({
  name,
  type,
  htmlFor,
  labelName,
  className,
  isLableRequired,
  validate,
  placeholder,
  errorLabel,
  normalize,
  handleChange,
  handleBlur,
  valid,
  invalid,
  readOnly,
  isStarNeeded
}) => (
  <Fragment>
    {isLableRequired &&
      <div className="input-field">
        <label htmlFor={htmlFor}>{labelName}</label>
        {validate.map(field => (
          field.name === 'required' && isStarNeeded && <span className="required-field" key={field.name}>*</span>
        ))}
      </div>
    }
    {type === 'textArea' &&
      <Field
        name={name}
        component={TextArea}
        type={type}
        className={className}
        validate={validate}
        label={htmlFor}
        readOnly={readOnly}
      />
    }
    {(type === 'text' || type === 'password') &&
      <Field
        name={name}
        component={InputBox}
        type={type}
        className={className}
        validate={validate}
        errorLabel={errorLabel}
        label={htmlFor}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        readOnly={readOnly}
        valid={valid}
        invalid={invalid}
      />
    }
    {type === 'number' &&
      <Field
        name={name}
        component={InputBox}
        type={type}
        className={className}
        validate={validate}
        label={htmlFor}
        normalize={normalize}
        readOnly={readOnly}
      />
    }
  </Fragment>
);

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.any.isRequired,
  htmlFor: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  className: PropTypes.string,
  isLableRequired: PropTypes.bool,
  validate: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  errorLabel: PropTypes.string,
  normalize: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  readOnly: PropTypes.bool,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  isStarNeeded: PropTypes.bool
};

TextField.defaultProps = {
  isLableRequired: false,
  placeholder: '',
  errorLabel: '',
  normalize: null,
  handleChange: null,
  handleBlur: null,
  readOnly: false,
  valid: false,
  invalid: false,
  labelName: '',
  className: '',
  isStarNeeded: true
};

InputBox.propTypes = FieldsProps;

TextArea.propTypes = {
  input: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.any.isRequired,
  readOnly: PropTypes.bool
};
TextArea.defaultProps = {
  readOnly: false
};
export default TextField;
