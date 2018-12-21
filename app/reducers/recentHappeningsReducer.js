import { fromJS } from 'immutable';

import recentHappeningsAction from '../constants/RecentHappeningsAction';

const initialState = fromJS({
  loading: false,
  recentHappeningsList: [],
  recentHappeningTypes: [],
  recentHappening: {}
});

const recentHappeningsReducer = (state = initialState, action) => {
  switch (action.type) {
    case recentHappeningsAction.FETCH_ALL_RECENT_HAPPENINGS:
      return state.set('loading', true);
    case recentHappeningsAction.FETCH_ALL_RECENT_HAPPENINGS_SUCCESS:
      return state
        .set('loading', false)
        .set('recentHappeningsList', action.response);
    case recentHappeningsAction.FETCH_ALL_RECENT_HAPPENINGS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('recentHappeningsList', []);
    case recentHappeningsAction.FETCH_MY_RECENT_HAPPENINGS:
      return state.set('loading', true);
    case recentHappeningsAction.FETCH_MY_RECENT_HAPPENINGS_SUCCESS:
      return state
        .set('loading', false)
        .set('recentHappeningsList', action.response);
    case recentHappeningsAction.FETCH_MY_RECENT_HAPPENINGS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('recentHappeningsList', []);
    case recentHappeningsAction.FETCH_RECENT_HAPPENING_TYPES:
      return state.set('loading', true);
    case recentHappeningsAction.FETCH_RECENT_HAPPENING_TYPES_SUCCESS:
      return state
        .set('loading', false)
        .set('recentHappeningTypes', action.response);
    case recentHappeningsAction.FETCH_RECENT_HAPPENING_TYPES_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('recentHappeningTypes', []);
    case recentHappeningsAction.CREATE_RECENT_HAPPENING:
      return state.set('loading', true);
    case recentHappeningsAction.CREATE_RECENT_HAPPENING_SUCCESS:
      return state
        .set('loading', false)
        .set('recentHappening', action.response);
    case recentHappeningsAction.CREATE_RECENT_HAPPENING_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('recentHappening', {});
    case recentHappeningsAction.UPDATE_RECENT_HAPPENING:
      return state.set('loading', true);
    case recentHappeningsAction.UPDATE_RECENT_HAPPENING_SUCCESS:
      return state
        .set('loading', false)
        .set('recentHappening', action.response);
    case recentHappeningsAction.UPDATE_RECENT_HAPPENING_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('recentHappening', {});
    default:
      return state;
  }
};

export default recentHappeningsReducer;
