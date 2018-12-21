import { fromJS } from 'immutable';

import bookAction from '../constants/BookAction';

const initialState = fromJS({
  loading: false,
  book: {},
  error: ''
});

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case bookAction.ADD_BOOK:
      return state.set('loading', true);
    case bookAction.ADD_BOOK_SUCCESS:
      return state
        .set('loading', false)
        .set('book', action.response);
    case bookAction.ADD_BOOK_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case bookAction.UPDATE_BOOK:
      return state.set('loading', true);
    case bookAction.UPDATE_BOOK_SUCCESS:
      return state
        .set('loading', false)
        .set('book', action.response);
    case bookAction.UPDATE_BOOK_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default bookReducer;
