import validator from "validator";
import isEmpty from "lodash/isEmpty";

// required object value
export const objRequired = value => (isEmpty(value) ? "Required" : undefined);

// Check required
export const required = value => (value ? undefined : "Required");

// Check max length
export const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
export const maxLength3 = maxLength(3);
export const maxLength9 = maxLength(9);
export const maxLength15 = maxLength(15);
export const maxLength25 = maxLength(25);

// Check min length
export const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
export const minLength2 = minLength(2);
export const minLength4 = minLength(4);
export const minLength6 = minLength(6);
export const minLength8 = minLength(8);

// Check range value
export const strLength = (min = 5, max = 25) => value =>
  value && !validator.isLength(value, { min, max }) ? `It must have length from ${min} to ${max} characters` : undefined;
export const normalLength = strLength();
export const longLength = strLength(5, 255);

// Check min value
export const minValue = min => value => (value && value < min ? `The number muss be greater than ${min}` : undefined);
export const minValue16 = minValue(16);
export const minValue18 = minValue(18);

export const comparePassword = (pattern, value) =>
  value && value === pattern ? undefined : "Password does not match the confirm password";

// Check only input number
export const number = value => (value && !validator.isNumeric(value) ? "Only input number" : undefined);

// Check hasWhiteSpace
export const hasWhiteSpace = value =>
  value && validator.contains(value, " ") ? "Field can't contain space character" : undefined;

// Check email
export const email = value => (value && !validator.isEmail(value) ? "Invalid email address" : undefined);

export const alphaNumeric = value =>
  value && !validator.isAlphanumeric(value) ? "Only alphanumeric characters" : undefined;

// phone validate
export const phoneNumber = value =>
  value && !validator.isMobilePhone(value, "en-US") ? "Invalid phone number" : undefined;

// password validate
export const password = value =>
  value && (!/\d/.test(value) || !/[A-Z]/.test(value))
    ? "Password must contain at least 1 uppercase letter and special character"
    : undefined;

// username validate
export const hasSpecialChart = value =>
  value && (!validator.isAlphanumeric(value) && !validator.isAlpha(value) && !validator.matches(value, /^[\w.]+$/g))
    ? "The username has a special character"
    : undefined;

// username validate
export const chartFirstRequired = value =>
  value && validator.isNumeric(value.charAt(0)) ? "The first character must be a letter" : undefined;
