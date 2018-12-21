import { fromJS } from 'immutable';

import videoAction from '../constants/VideoAction';

const initialState = fromJS({
  loading: false,
  video: {},
  error: ''
});

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case videoAction.ADD_VIDEO:
      return state.set('loading', true);
    case videoAction.ADD_VIDEO_SUCCESS:
      return state
        .set('loading', false)
        .set('video', action.response);
    case videoAction.ADD_VIDEO_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case videoAction.UPDATE_VIDEO:
      return state.set('loading', true);
    case videoAction.UPDATE_VIDEO_SUCCESS:
      return state
        .set('loading', false)
        .set('video', action.response);
    case videoAction.UPDATE_VIDEO_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default videoReducer;
