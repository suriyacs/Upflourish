import { fromJS } from 'immutable';

import userActions from '../constants/UserAction';

const initialState = fromJS({
  loading: false,
  userId: '',
  userDetails: null,
  linkToResetPassword: {},
  resetPasswordResponse: {},
  tokenStatus: {},
  error: '',
  userRole: '',
  roleId: '',
  resumeStatus: {}
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.UPDATE_USER_ID:
      return state.set('userId', action.userId);
    case userActions.USER_LOGIN:
      return state.set('loading', true);
    case userActions.USER_LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('userId', action.userId)
        .set('userDetails', action.userData)
        .set('userRole', action.userData.roles[0].name)
        .set('roleId', (action.userData.roles[0].name === 'LEARNER' ||
          action.userData.roles[0].name === 'EXPERT') ?
          action.userData[(action.userData.roles[0].name).toLowerCase()].id :
          '')
        .set('redirectTo', action.redirectTo);
    case userActions.USER_LOGIN_ERROR:
      return state.set('loading', false)
        .set('error', action.error);
    case userActions.LOAD_USER:
      return state.set('userId', action.userId);
    case userActions.LOGOUT_USER:
      return state
        .set('userId', null);
    case userActions.FETCH_USER_DETAILS:
      return state.set('loading', true);
    case userActions.FETCH_USER_DETAILS_SUCCESS:
      return state
        .set('loading', false)
        .set('userDetails', action.userDetails)
        .set('userRole', action.userDetails.roles[0].name)
        .set('roleId', (action.userDetails.roles[0].name === 'LEARNER' ||
          action.userDetails.roles[0].name === 'EXPERT') ?
          action.userDetails[(action.userDetails.roles[0].name).toLowerCase()].id :
          '');
    case userActions.FETCH_USER_DETAILS_ERROR:
      return state.set('loading', false);
    case userActions.FORGETPASSWORD:
      return state.set('loading', true);
    case userActions.FORGETPASSWORD_SUCCESS:
      return state
        .set('loading', false)
        .set('linkToResetPassword', action.response);
    case userActions.FORGETPASSWORD_ERROR:
      return state
        .set('loading', false)
        .set('linkToResetPassword', action.error);
    case userActions.RESETPASSWORD:
      return state
        .set('loading', true);
    case userActions.RESETPASSWORD_SUCCESS:
      return state
        .set('loading', false)
        .set('resetPasswordResponse', action.response)
        .set('tokenStatus', {});
    case userActions.RESETPASSWORD_ERROR:
      return state
        .set('loading', false);
    case userActions.VERIFYTOKEN:
      return state
        .set('loading', true);
    case userActions.VERIFYTOKEN_SUCCESS:
      return state
        .set('loading', false)
        .set('tokenStatus', action.response);
    case userActions.VERIFYTOKEN_ERROR:
      return state
        .set('loading', false)
        .set('tokenStatus', action.error);
    case userActions.UPDATE_USER:
      return state.set('loading', true);
    case userActions.UPDATE_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('userDetails', action.response);
    case userActions.UPDATE_USER_ERROR:
      return state.set('loading', false);
    case userActions.LEARNER_SIGNUP:
      return state.set('loading', true);
    case userActions.LEARNER_SIGNUP_SUCCESS:
      return state
        .set('loading', false);
    case userActions.LEARNER_SIGNUP_ERROR:
      return state
        .set('loading', false);
    case userActions.RESET_LOGIN_ERROR:
      return state
        .set('error', '');
    case userActions.UPLOAD_RESUME:
      return state
        .set('loading', true);
    case userActions.UPLOAD_RESUME_SUCCESS:
      return state
        .set('loading', false)
        .set('resumeStatus', action.response);
    case userActions.UPLOAD_RESUME_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default userReducer;
