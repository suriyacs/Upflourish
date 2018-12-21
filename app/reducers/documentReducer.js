import { fromJS } from 'immutable';

import documentAction from '../constants/DocumentAction';

const initialState = fromJS({
  loading: false,
  document: {},
  error: ''
});

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case documentAction.ADD_DOCUMENT:
      return state.set('loading', true);
    case documentAction.ADD_DOCUMENT_SUCCESS:
      return state
        .set('loading', false)
        .set('document', action.response);
    case documentAction.ADD_DOCUMENT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case documentAction.UPDATE_DOCUMENT:
      return state.set('loading', true);
    case documentAction.UPDATE_DOCUMENT_SUCCESS:
      return state
        .set('loading', false)
        .set('document', action.response);
    case documentAction.UPDATE_DOCUMENT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default documentReducer;
