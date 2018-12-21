import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldsProps } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();

const renderDatePicker = ({
  input, minDate, maxDate, meta: { error, touched }, name,
  showTime, dropUp, label, dateFormat, errorLabel
}) => (
  <Fragment>
    <DateTimePicker
      {...input}
      label={label}
      name={name}
      value={!input.value ? null : new Date(input.value)}
      format={dateFormat}
      onChange={e => { input.onChange(e); }}
      onBlur={() => input.onBlur()}
      min={minDate}
      max={maxDate}
      time={showTime}
      dropUp={dropUp}
    />
    {
      error && touched && <div className="error-message">{errorLabel || label} {error}</div>
    }
  </Fragment>
);

const DatePicker = ({
  isLableRequired, validate, name, minDate, maxDate, dropUp,
  showTime, onChange, dateFormat, htmlFor, labelName, errorLabel
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
      label={htmlFor}
      labelName={labelName}
      name={name}
      component={renderDatePicker}
      validate={validate}
      dateFormat={dateFormat}
      minDate={minDate}
      maxDate={maxDate}
      dropUp={dropUp}
      showTime={showTime}
      onChange={onChange}
      errorLabel={errorLabel}
    />
  </Fragment>
);

DatePicker.defaultProps = {
  label: '',
  name: '',
  dateFormat: 'DD/MM/YYYY',
  minDate: new Date('1910-01-01 00:00:00'),
  maxDate: new Date(),
  dropUp: false,
  showTime: false,
  isLableRequired: false,
  validate: null,
  onChange: null,
  isRequired: false,
  errorLabel: ''
};

DatePicker.propTypes = {
  name: PropTypes.string,
  dateFormat: PropTypes.string,
  isLableRequired: PropTypes.bool,
  validate: PropTypes.any,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  dropUp: PropTypes.bool,
  showTime: PropTypes.bool,
  onChange: PropTypes.func,
  htmlFor: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  errorLabel: PropTypes.string
};

renderDatePicker.propTypes = FieldsProps;

export default DatePicker;
