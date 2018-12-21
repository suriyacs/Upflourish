import {
  call,
  put,
  select
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { setAuthToken } from '../globals/interceptors';
import storage from '../globals/localStorage';
import UserActions from '../actions/user';
import {
  forgetPasswordSuccess,
  forgetPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  verifyTokenSuccess,
  verifyTokenError,
  learnerSignupSuccess,
  learnerSignupError
} from '../actions/login';
import { getUserPointsReady } from '../actions/profile';
import {
  expertLogin,
  learnerLogin,
  logout,
  getUserDetails,
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
} from '../service/User';
import { reduxConstant, routeConstant } from '../globals/AppConstant';
import { getStateFromStore } from '../utils/Common.js';
import { isCourseEnrolled } from '../actions/careerTrack';

function* loginUser(action) {
  try {
    const { loginData, userType, additionalData } = action;
    let response = {};
    if (userType === 'expert') {
      response = yield call(expertLogin, loginData);
    } else if (userType === 'learner') {
      response = yield call(learnerLogin, loginData);
    }
    if (response.userId !== '') {
      storage.setItem('user', response.userId);
      storage.setItem('accessToken', response.id);
      setAuthToken(response.id);
      yield put(UserActions.onLoginUserSuccess((response.userId), (response.userData)));
      if (additionalData.generalLogin) {
        yield put(isCourseEnrolled(additionalData.courseType, additionalData.courseId));
      }
    }
  } catch (e) {
    yield put(UserActions.onLoginUserError(e));
  }
}

function* loginWithFaceBook(action) {
  try {
    const { accessToken, role } = action;
    const response = yield call(loginWithFB, accessToken, role);
    if (response.userId !== '') {
      storage.setItem('user', response.userId);
      storage.setItem('accessToken', response.id);
      setAuthToken(response.id);
      yield put(UserActions.onLoginUserSuccess((response.userId), (response.userData)));
    }
  } catch (e) {
    yield put(UserActions.onLoginUserError(e));
  }
}

function* forgetPassword(action) {
  try {
    if (action.mailId) {
      yield call(sendMailToResetPassword, action.mailId);
      yield put(forgetPasswordSuccess({
        name: 'SUCCESS',
        message: 'Link to reset the passsword has been sent to your mail. Please click that to procced!'
      }));
    } else {
      yield put(forgetPasswordSuccess({}));
    }
  } catch (e) {
    yield put(forgetPasswordError(e));
  }
}

function* resetPassword(action) {
  try {
    yield call(updatePassword, action.password);
    yield put(resetPasswordSuccess({
      name: 'SUCCESS',
      message: 'Password has been changed successfully!'
    }));
  } catch (e) {
    yield put(resetPasswordError(e));
  }
}

function* verifyToken(action) {
  try {
    const response = yield call(getTokenStatus, action.token);
    yield put(verifyTokenSuccess({ name: 'VALID', token: response }));
  } catch (e) {
    yield put(verifyTokenError(e));
  }
}

function* loginWithGoogle(action) {
  try {
    const { accessToken, role } = action;
    const response = yield call(loginWithGgl, accessToken, role);
    if (response.userId !== '') {
      storage.setItem('user', response.userId);
      storage.setItem('accessToken', response.id);
      setAuthToken(response.id);
      yield put(UserActions.onLoginUserSuccess((response.userId), (response.userData)));
    }
  } catch (e) {
    yield put(UserActions.onLoginUserError(e));
  }
}

function* loginWithLinkedIn(action) {
  try {
    const { code, role } = action;
    const response = yield call(loginWithLnkdn, code, role);
    if (response.userId !== '') {
      storage.setItem('user', response.userId);
      storage.setItem('accessToken', response.id);
      setAuthToken(response.id);
      yield put(UserActions.onLoginUserSuccess((response.userId), (response.userData)));
    }
  } catch (e) {
    yield put(UserActions.onLoginUserError(e));
  }
}

function* logoutUser() {
  try {
    yield call(logout);
    yield put(UserActions.onAppLoad(''));
    storage.clearAll();
    const userRole = yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole);
    if (userRole === 'LEARNER') {
      window.location = '/';
    } else {
      window.location = `${routeConstant.ADMIN}`;
    }
  } catch (e) {
    console.log('Error on Logout :: ', e);
  }
}

function* fetchUserDetails(action) {
  try {
    const { userId } = action;
    const userDetails = yield call(getUserDetails, userId);
    yield put(UserActions.getUserDetailsSuccess((userDetails)));
    const userRole = yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole);
    if (userRole === 'LEARNER') {
      yield put(getUserPointsReady());
    }
  } catch (e) {
    storage.clearAll();
    yield put(UserActions.getUserDetailsError(e));
  }
}

function* updateUser(action) {
  try {
    const { user } = action;
    if (user.isPasswordUpdate) {
      yield call(changeProfilePassword, user);
      toast.success('Password updated successfully');
    } else {
      const response = yield call(updateUserProfile, user);
      yield put(UserActions.updateUserSuccess((response)));
      toast.success(`${user.first_name} updated successfully`);
    }
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(UserActions.updateUserError(e));
  }
}

function* learnerSignup(action) {
  try {
    const { data, additionalData } = action;
    const response = yield call(signupLearner, data);
    yield put(learnerSignupSuccess());
    if (response.userId) {
      storage.setItem('user', response.userId);
      storage.setItem('accessToken', response.id);
      if (!response.userData.is_interest_captured) {
        storage.setItem('redirectToCategory', true);
      }
      setAuthToken(response.id);
      yield put(UserActions.onLoginUserSuccess((response.userId), (response.userData), (action.redirectTo)));
      if (additionalData.generalLogin) {
        yield put(isCourseEnrolled(additionalData.courseType, additionalData.courseId));
      }
    }
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(learnerSignupError(e));
  }
}

function* uploadResume(action) {
  try {
    const { resumeToUpload } = action;
    const response = yield call(
      resumeUpload,
      resumeToUpload,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    toast.success('Uploaded Successfully!', {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(UserActions.uploadResumeSuccess(response));
    yield put(UserActions.getUserDetails(yield select(
      getStateFromStore,
      reduxConstant.userRedux, reduxConstant.userId
    )));
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(UserActions.uploadResumeError(e));
  }
}

module.exports = {
  loginUser,
  logoutUser,
  fetchUserDetails,
  loginWithFaceBook,
  loginWithGoogle,
  loginWithLinkedIn,
  forgetPassword,
  resetPassword,
  verifyToken,
  updateUser,
  learnerSignup,
  uploadResume
};
