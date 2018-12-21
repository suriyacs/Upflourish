// eslint-disable-next-line
const isEmpty = value => value === undefined || value === null || value === '' || (value && value.length === 0);

const required = value => {
  if (isEmpty(value)) {
    return 'is required';
  }
  return '';
};

const checkFieldLength = min => value =>
  (value && value.length < min ? `must be ${min} characters or more` : '');

const checkPasswordMismatch = (password, confirmPassword) =>
  (password.length >= 6 && confirmPassword === password);

const isNumber = value => {
  if (value && !Number(value)) {
    return 'Must be a number';
  }
  return '';
};

const checkAlphaNumeric = value => {
  if (!value.match(/^[A-Za-z0-9]+$/)) {
    return 'Must contain alphanumeric characters only';
  }
};

const isEmail = value => {
  const at = value.indexOf('@');
  const dot = value.lastIndexOf('.');
  if (at < 1 || dot < at + 2 || dot + 2 >= value.length) {
    return false;
  }
  return true;
};

const email = value => {
  value = value.trim();
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(value)) {
    return 'is invalid';
  }
};

const maxLength = (value, allowedLength) => (
  value.slice(0, allowedLength)
);

const validateMonth = (value, allvalues, props) => {
  if (allvalues[`${props.name}_year`] === new Date().getFullYear() &&
    allvalues[`${props.name}_month`] > new Date().getMonth()) {
    return 'can’t be past today’s date';
  }
  return '';
};

const validateEndMonth = (value, allvalues, props) => {
  if ((allvalues[`${props.name}_year`] === allvalues[`${props.opName}_year`]) &&
  (allvalues[`${props.name}_month`] < allvalues[`${props.opName}_month`])) {
    return 'can’t be less than start month';
  }
  return '';
};

const validateEndYear = (value, allvalues, props) => {
  if (allvalues[`${props.name}_year`] < allvalues[`${props.opName}_year`]) {
    return 'can’t be less than start year';
  }
  return '';
};

const greaterThanZero = value => parseInt(value, 10) > 0 ? '' : 'can\'t be less than one';

module.exports = {
  required,
  isNumber,
  isEmail,
  email,
  maxLength,
  checkFieldLength,
  checkPasswordMismatch,
  validateMonth,
  validateEndMonth,
  validateEndYear,
  greaterThanZero,
  checkAlphaNumeric
};
