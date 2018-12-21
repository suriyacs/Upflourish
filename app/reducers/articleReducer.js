import { fromJS } from 'immutable';

import articleConstants from '../constants/ArticleAction';

const initialState = fromJS({
  loading: false,
  article: {},
  error: ''
});

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case articleConstants.ADD_ARTICLE:
      return state.set('loading', true);
    case articleConstants.ADD_ARTICLE_SUCCESS:
      return state
        .set('loading', false)
        .set('article', action.response);
    case articleConstants.ADD_ARTICLE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case articleConstants.UPDATE_ARTICLE:
      return state.set('loading', true);
    case articleConstants.UPDATE_ARTICLE_SUCCESS:
      return state
        .set('loading', false)
        .set('article', action.response);
    case articleConstants.UPDATE_ARTICLE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default articleReducer;
