import { fromJS } from 'immutable';

import onlineCourseAction from '../constants/OnlineCourseAction';

const initialState = fromJS({
  loading: false,
  onlineCourse: {},
  error: ''
});

const onlineCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case onlineCourseAction.ADD_ONLINE_COURSE:
      return state.set('loading', true);
    case onlineCourseAction.ADD_ONLINE_COURSE_SUCCESS:
      return state
        .set('loading', false)
        .set('onlineCourse', action.response);
    case onlineCourseAction.ADD_ONLINE_COURSE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case onlineCourseAction.UPDATE_ONLINE_COURSE:
      return state.set('loading', true);
    case onlineCourseAction.UPDATE_ONLINE_COURSE_SUCCESS:
      return state
        .set('loading', false)
        .set('onlineCourse', action.response);
    case onlineCourseAction.UPDATE_ONLINE_COURSE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default onlineCourseReducer;
