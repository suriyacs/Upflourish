import { fromJS } from 'immutable';

import careerTrackAction from '../constants/CareerTrackAction';

const initialState = fromJS({
  loading: false,
  careerTrackDetails: {},
  skillTracks: [],
  error: '',
  isCourseEnrolled: {},
  enrolledCareer: {},
  isDashboardCourseEnrolled: {},
  skillTrackDetail: {}
});

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case careerTrackAction.FETCH_CAREER_TRACK:
      return state.set('loading', true);
    case careerTrackAction.FETCH_CAREER_TRACK_SUCCESS:
      return state
        .set('loading', false)
        .set('careerTrackDetails', action.response);
    case careerTrackAction.FETCH_CAREER_TRACK_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case careerTrackAction.FETCH_SKILL_TRACKS_BY_CT_ID:
      return state.set('loading', true);
    case careerTrackAction.FETCH_SKILL_TRACKS_BY_CT_ID_SUCCESS:
      return state
        .set('loading', false)
        .set('skillTracks', action.response);
    case careerTrackAction.FETCH_SKILL_TRACKS_BY_CT_ID_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case careerTrackAction.CHECK_IS_COURSE_ENROLLED:
      return state.set('loading', true);
    case careerTrackAction.CHECK_IS_COURSE_ENROLLED_SUCCESS:
      return state
        .set('loading', false)
        .set('isCourseEnrolled', action.response);
    case careerTrackAction.CHECK_IS_COURSE_ENROLLED_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case careerTrackAction.ENROLL_MY_CAREER:
      return state.set('loading', true);
    case careerTrackAction.ENROLL_MY_CAREER_SUCCESS:
      return state
        .set('loading', false)
        .set('enrolledCareer', action.response);
    case careerTrackAction.ENROLL_MY_CAREER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case careerTrackAction.CLEAR_ENROLLED_CAREER_TRACK:
      return state
        .set('enrolledCareer', {})
        .set('isCourseEnrolled', {})
        .set('isDashboardCourseEnrolled', {});
    case careerTrackAction.CHECK_IS_DASHBOARD_COURSE_ENROLLED:
      return state.set('loading', true);
    case careerTrackAction.CHECK_IS_DASHBOARD_COURSE_ENROLLED_SUCCESS:
      return state
        .set('loading', false)
        .set('isDashboardCourseEnrolled', action.response);
    case careerTrackAction.CHECK_IS_DASHBOARD_COURSE_ENROLLED_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case careerTrackAction.CREATE_SKILL_TRACK_BY_CAREER_TRACK:
      return state
        .set('loading', true);
    case careerTrackAction.CREATE_SKILL_TRACK_BY_CAREER_TRACK_SUCCESS:
      return state
        .set('skillTrackDetail', action.response)
        .set('loading', false);
    case careerTrackAction.CREATE_SKILL_TRACK_BY_CAREER_TRACK_ERROR:
      return state
        .set('loading', false)
        .set('skillTrackDetail', {});
    case careerTrackAction.UPDATE_SKILL_TRACK:
      return state
        .set('loading', true);
    case careerTrackAction.UPDATE_SKILL_TRACK_SUCCESS:
      return state
        .set('loading', false)
        .set('skillTrackDetail', action.response);
    case careerTrackAction.UPDATE_SKILL_TRACK_ERROR:
      return state
        .set('loading', false)
        .set('skillTrackDetail', {});
    case careerTrackAction.DELETE_SKILL_TRACK:
      return state
        .set('loading', true);
    case careerTrackAction.DELETE_SKILL_TRACK_SUCCESS:
      return state
        .set('loading', false)
        .set('skillTrackDetail', action.response);
    case careerTrackAction.DELETE_SKILL_TRACK_ERROR:
      return state
        .set('loading', false)
        .set('skillTrackDetail', {});
    case careerTrackAction.UPDATE_SKILL_TRACK_ORDER:
      return state
        .set('loading', true);
    case careerTrackAction.UPDATE_SKILL_TRACK_ORDER_SUCCESS:
      return state
        .set('loading', false);
    case careerTrackAction.UPDATE_SKILL_TRACK_ORDER_ERROR:
      return state
        .set('loading', false);
    default:
      return state;
  }
};

export default articleReducer;
