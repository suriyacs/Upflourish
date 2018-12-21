import React, { Fragment } from 'react';
import { Field, FieldsProps } from 'redux-form';
import PropTypes from 'prop-types';
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import '../../../assets/styles/common.scss';

const SelectDropDown = ({
  input,
  label,
  options,
  placeholder,
  simpleValue,
  labelKey,
  valueKey,
  isMultiSelect,
  searchOption,
  onInputChange,
  disabled,
  meta: { touched, error }
}) => (
  <Fragment>
    <Select
      options={options}
      {...input}
      multi={isMultiSelect}
      inputProps={{ maxLength: 15 }}
      onBlur={null}
      autosize={false}
      placeholder={placeholder}
      simpleValue={simpleValue}
      labelKey={labelKey}
      valueKey={valueKey}
      matchProp={searchOption}
      onChange={input.onChange}
      onInputChange={onInputChange}
      onCloseResetsInput={false}
      onBlurResetsInput={false}
      disabled={disabled}
    />
    {
      error && touched && <div className="error-message">{label} {error}</div>
    }
  </Fragment>
);

const SelectList = ({
  name,
  htmlFor,
  options,
  labelName,
  isLableRequired,
  validate,
  handleChange,
  placeholder,
  simpleValue,
  labelKey,
  valueKey,
  isMultiSelect,
  searchOption,
  onInputChange,
  disabled
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
      component={SelectDropDown}
      validate={validate}
      label={htmlFor}
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      simpleValue={simpleValue}
      labelKey={labelKey}
      valueKey={valueKey}
      searchOption={searchOption}
      disabled={disabled}
      isMultiSelect={isMultiSelect}
      onInputChange={onInputChange}
    />
  </Fragment>
);

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  isLableRequired: PropTypes.bool,
  validate: PropTypes.any,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  simpleValue: PropTypes.bool,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  searchOption: PropTypes.string,
  isMultiSelect: PropTypes.bool,
  onInputChange: PropTypes.func,
  disabled: PropTypes.bool
};

SelectList.defaultProps = {
  isLableRequired: false,
  simpleValue: false,
  handleChange: null,
  searchOption: 'label',
  validate: [],
  isMultiSelect: false,
  placeholder: '',
  options: [],
  onInputChange: null,
  disabled: false
};

SelectDropDown.propTypes = FieldsProps;

SelectDropDown.defaultProps = {
  simpleValue: false,
  searchOption: 'label'
};

export default SelectList;
