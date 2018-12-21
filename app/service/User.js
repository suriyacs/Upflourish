import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const expertLogin = data => axios({
  method: 'post',
  url: '/Users/login',
  // TODO: Should be a separate login for expert and admin
  // url: '/Users/expert/login',
  data
});

const logout = () => axios({
  method: 'post',
  url: '/Users/logout'
});

const getUserDetails = userId => axios({
  method: 'get',
  url: `/Users/${userId}/me`
});

const learnerLogin = data => axios({
  method: 'post',
  url: '/Users/learner/login',
  data
});

const loginWithFB = (accessToken, role) => axios({
  method: 'post',
  url: 'Users/auth/facebook',
  data: {
    access_token: accessToken,
    role
  }
});

const loginWithGgl = (accessToken, role) => axios({
  method: 'post',
  url: 'Users/auth/google',
  data: {
    access_token: accessToken,
    role
  }
});

const loginWithLnkdn = (code, role) => axios({
  method: 'post',
  url: '/Users/auth/linkedin',
  data: {
    code,
    role
  }
});

const sendMailToResetPassword = reqObject => axios({
  method: 'post',
  url: 'Users/reset',
  data: reqObject
});

const updatePassword = password => axios({
  method: 'post',
  url: 'Users/reset-password',
  headers: {
    Authorization: password.token
  },
  data: {
    newPassword: password.confirmPassword
  }
});

const getTokenStatus = token => axios({
  method: 'get',
  url: `Users/validate/token?verificationToken=${token}`
});

const updateUserProfile = data => axios({
  method: 'put',
  url: `/Users/${data.id}`,
  data
});

const changeProfilePassword = data => axios({
  method: 'POST',
  url: '/Users/change-password',
  data
});

const signupLearner = data => axios({
  method: 'POST',
  url: 'Users/learner/signup',
  data
});

const resumeUpload = (data, roleId) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `${apiConstant.LEARNER}/${roleId}/${apiConstant.UPLOADRESUME}`,
  data
});

module.exports = {
  expertLogin,
  logout,
  getUserDetails,
  learnerLogin,
  loginWithFB,
  loginWithGgl,
  loginWithLnkdn,
  sendMailToResetPassword,
  updatePassword,
  getTokenStatus,
  updateUserProfile,
  changeProfilePassword,
  signupLearner,
  resumeUpload
};
