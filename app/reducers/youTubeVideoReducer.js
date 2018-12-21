import { fromJS } from 'immutable';

import youTubeAction from '../constants/YouTubeAction';

const initialState = fromJS({
  loading: false,
  youTubeVideo: {},
  error: ''
});

const youTubeVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case youTubeAction.ADD_YOUTUBE_VIDEO:
      return state.set('loading', true);
    case youTubeAction.ADD_YOUTUBE_VIDEO_SUCCESS:
      return state
        .set('loading', false)
        .set('youTubeVideo', action.response);
    case youTubeAction.ADD_YOUTUBE_VIDEO_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default youTubeVideoReducer;
