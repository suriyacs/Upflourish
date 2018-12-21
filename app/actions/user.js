import BaseAction from './BaseAction';
import constants from '../constants/UserAction';

class UserAction extends BaseAction {
  constructor() {
    super({
      onLoginUser: {
        type: constants.USER_LOGIN,
        params: ['username', 'password']
      },
      onLoginUserSuccess: {
        type: constants.USER_LOGIN_SUCCESS,
        params: ['userId', 'userData', 'redirectTo']
      },
      onLoginUserError: {
        type: constants.USER_LOGIN_ERROR,
        params: ['error']
      },
      onLogoutUser: {
        type: constants.LOGOUT_USER,
        params: []
      },
      onAppLoad: {
        type: constants.LOAD_USER,
        params: ['userId']
      },
      getUserDetails: {
        type: constants.FETCH_USER_DETAILS,
        params: ['userId']
      },
      getUserDetailsSuccess: {
        type: constants.FETCH_USER_DETAILS_SUCCESS,
        params: ['userDetails']
      },
      getUserDetailsError: {
        type: constants.FETCH_USER_DETAILS_ERROR,
        params: ['error']
      },
      updateUser: {
        type: constants.UPDATE_USER,
        params: ['user']
      },
      updateUserSuccess: {
        type: constants.UPDATE_USER_SUCCESS,
        params: ['response']
      },
      updateUserError: {
        type: constants.UPDATE_USER_ERROR,
        params: ['error']
      },
      uploadResume: {
        type: constants.UPLOAD_RESUME,
        params: ['resumeToUpload']
      },
      uploadResumeSuccess: {
        type: constants.UPLOAD_RESUME_SUCCESS,
        params: ['response']
      },
      uploadResumeError: {
        type: constants.UPLOAD_RESUME_ERROR,
        params: ['error']
      }
    });
  }
}

export default new UserAction();
