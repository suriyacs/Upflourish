import { fromJS } from 'immutable';

import goalAction from '../constants/GoalAction';

const initialState = fromJS({
  loading: false,
  goalStatus: {},
  error: ''
});

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case goalAction.GET_DAILY_GOALS:
      return state.set('loading', true);
    case goalAction.GET_DAILY_GOALS_SUCCESS:
      return state
        .set('loading', false)
        .set('goalStatus', action.response);
    case goalAction.GET_DAILY_GOALS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case goalAction.UPDATE_DAILY_GOAL:
      return state.set('loading', true);
    case goalAction.UPDATE_DAILY_GOAL_SUCCESS:
      return state
        .set('loading', false)
        .set('goalStatus', action.response);
    case goalAction.UPDATE_DAILY_GOAL_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default goalReducer;
