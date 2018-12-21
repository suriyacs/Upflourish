import { fromJS } from 'immutable';

import courseAction from '../constants/CourseAction';

const initialState = fromJS({
  loading: false,
  courseDetails: {},
  searchCourseList: [],
  searchCourseData: [],
  error: ''
});

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case courseAction.FETCH_COURSE_DETAILS:
      return state.set('loading', true);
    case courseAction.FETCH_COURSE_DETAILS_SUCCESS:
      return state
        .set('loading', false)
        .set('courseDetails', action.response);
    case courseAction.FETCH_COURSE_DETAILS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case courseAction.SEARCH_COURSE:
      return state.set('loading', true);
    case courseAction.SEARCH_COURSE_SUCCESS:
      return state
        .set('loading', false)
        .set('searchCourseList', action.response);
    case courseAction.SEARCH_COURSE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('searchCourseList', []);
    case courseAction.GET_SEARCHED_COURSE:
      return state.set('loading', true);
    case courseAction.GET_SEARCHED_COURSE_SUCCESS:
      return state
        .set('loading', false)
        .set('searchCourseData', action.response);
    case courseAction.GET_SEARCHED_COURSE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('searchCourseData', []);
    case courseAction.CLEAR_COURSE_DETAILS:
      return state
        .set('courseDetails', {});
    case courseAction.UPDATE_MICROLEARNING:
      return state
        .set('loading', true);
    case courseAction.UPDATE_MICROLEARNING_SUCCESS:
      return state
        .set('loading', false);
    case courseAction.UPDATE_MICROLEARNING_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default courseReducer;
