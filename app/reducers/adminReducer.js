import { fromJS } from 'immutable';

import AdminAction from '../constants/AdminAction';

const initialState = fromJS({
  experts: [],
  expertCount: 0,
  loading: false,
  error: '',
  inviteResponse: {},
  userCategories: [],
  userCategoryUpdatedResponse: '',
  tokenResponse: {},
  expertSignIn: {},
  createCategory: {},
  updateCategory: {}
});

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case AdminAction.FETCH_EXPERTS:
      return state.set('loading', true);
    case AdminAction.FETCH_EXPERTS_SUCCESS:
      return state
        .set('loading', false)
        .set('expertCount', parseInt(action.response.count, 10))
        .set('experts', action.response.users);
    case AdminAction.FETCH_EXPERTS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.FETCH_USER_CATEGORY:
      return state.set('loading', true);
    case AdminAction.FETCH_USER_CATEGORY_SUCCESS:
      return state
        .set('loading', false)
        .set('userCategories', action.response);
    case AdminAction.FETCH_USER_CATEGORY_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.INVITE_EXPERT:
      return state.set('loading', true);
    case AdminAction.INVITE_EXPERT_SUCCESS:
      return state
        .set('loading', false)
        .set('inviteResponse', action.response);
    case AdminAction.INVITE_EXPERT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.UPDATE_USER_CATEGORY:
      return state.set('loading', true);
    case AdminAction.UPDATE_USER_CATEGORY_SUCCESS:
      return state
        .set('loading', false)
        .set('userCategoryUpdatedResponse', action.response);
    case AdminAction.UPDATE_USER_CATEGORY_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.UPDATE_USER_CATEGORY_RESPONSE:
      return state
        .set('userCategoryUpdatedResponse', '');
    case AdminAction.DELETE_EXPERT:
      return state.set('loading', true);
    case AdminAction.DELETE_EXPERT_SUCCESS:
      return state.set('loading', false);
    case AdminAction.DELETE_EXPERT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.VERIFY_TOKEN:
      return state.set('loading', true);
    case AdminAction.VERIFY_TOKEN_SUCCESS:
      return state
        .set('loading', false)
        .set('tokenResponse', action.response);
    case AdminAction.VERIFY_TOKEN_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.EXPERT_SIGN_IN:
      return state
        .set('loading', true);
    case AdminAction.EXPERT_SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('expertSignIn', action.response);
    case AdminAction.EXPERT_SIGN_IN_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.EXPERT_RESEND_INVITE:
      return state
        .set('loading', true);
    case AdminAction.EXPERT_RESEND_INVITE_SUCCESS:
      return state
        .set('loading', false);
    case AdminAction.EXPERT_RESEND_INVITE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.CREATE_CATEGORY:
      return state
        .set('loading', true);
    case AdminAction.CREATE_CATEGORY_SUCCESS:
      return state
        .set('loading', false)
        .set('createCategory', action.response);
    case AdminAction.CREATE_CATEGORY_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.UPDATE_CATEGORY:
      return state
        .set('loading', true);
    case AdminAction.UPDATE_CATEGORY_SUCCESSS:
      return state
        .set('loading', false)
        .set('updateCategory', action.response);
    case AdminAction.UPDATE_CATEGORY_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case AdminAction.CLEAR_CREATE_UPDATED_CATEGORY:
      return state
        .set('createCategory', {})
        .set('updateCategory', {});
    default:
      return state;
  }
};

export default AdminReducer;
