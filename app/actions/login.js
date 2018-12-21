import constants from '../constants/UserAction';

/**
 * Click action on Login
 * @param loginData
 */

const loginUser = (loginData, userType, additionalData) => ({
  type: constants.USER_LOGIN,
  loginData,
  userType,
  additionalData
});

const logoutUser = () => ({
  type: constants.LOGOUT_USER
});

const loginWithFaceBook = (accessToken, role) => ({
  type: constants.FB_USER_LOGIN,
  accessToken,
  role
});

const loginWithGmail = (accessToken, role) => ({
  type: constants.GOOGLE_USER_LOGIN,
  accessToken,
  role
});

const loginWithLinkedIn = (code, role) => ({
  type: constants.LINKEDIN_USER_LOGIN,
  code,
  role
});

const forgetPassword = mailId => ({
  type: constants.FORGETPASSWORD,
  mailId
});

const forgetPasswordSuccess = response => ({
  type: constants.FORGETPASSWORD_SUCCESS,
  response
});

const forgetPasswordError = error => ({
  type: constants.FORGETPASSWORD_ERROR,
  error
});

const resetPassword = password => ({
  type: constants.RESETPASSWORD,
  password
});

const resetPasswordSuccess = response => ({
  type: constants.RESETPASSWORD_SUCCESS,
  response
});

const resetPasswordError = error => ({
  type: constants.RESETPASSWORD_ERROR,
  error
});

const verifyToken = token => ({
  type: constants.VERIFYTOKEN,
  token
});

const verifyTokenSuccess = response => ({
  type: constants.VERIFYTOKEN_SUCCESS,
  response
});

const verifyTokenError = error => ({
  type: constants.VERIFYTOKEN_ERROR,
  error
});

const learnerSignup = (data, redirectTo, additionalData) => ({
  type: constants.LEARNER_SIGNUP,
  data,
  redirectTo,
  additionalData
});

const learnerSignupSuccess = response => ({
  type: constants.LEARNER_SIGNUP_SUCCESS,
  response
});

const learnerSignupError = error => ({
  type: constants.LEARNER_SIGNUP_ERROR,
  error
});

const resetLoginError = () => ({
  type: constants.RESET_LOGIN_ERROR
});

module.exports = {
  loginUser,
  logoutUser,
  loginWithFaceBook,
  loginWithGmail,
  loginWithLinkedIn,
  forgetPassword,
  forgetPasswordSuccess,
  forgetPasswordError,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordError,
  verifyToken,
  verifyTokenSuccess,
  verifyTokenError,
  learnerSignup,
  learnerSignupSuccess,
  learnerSignupError,
  resetLoginError
};
