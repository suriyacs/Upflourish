import { fromJS } from 'immutable';

import profileConstant from '../constants/ProfileAction';

const initialState = fromJS({
  loading: false,
  personalDetail: {},
  employmentList: [],
  employmentDetail: {},
  educationList: [],
  educationDetail: {},
  completedCourses: [],
  learnerSkillList: [],
  skillList: [],
  skillDetail: {},
  userPoints: '0',
  badgeList: [],
  masterSkillList: [],
  certificateUrl: {},
  isVerifiedCertificate: null,
  isInvalidToken: false,
  loadingCurrentCourses: false,
  interestedCategories: []
});

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileConstant.GET_PERSONAL_DETAIL:
      return state.set('loading', true);
    case profileConstant.GET_PERSONAL_DETAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('personalDetail', action.response);
    case profileConstant.GET_PERSONAL_DETAIL_ERROR:
      return state
        .set('loading', false);
    case profileConstant.UPDATE_PERSONAL_DETAIL:
      return state.set('loading', true);
    case profileConstant.UPDATE_PERSONAL_DETAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('personalDetail', action.response);
    case profileConstant.UPDATE_PERSONAL_DETAIL_ERROR:
      return state
        .set('loading', false);
    case profileConstant.ADD_EMPLOYMENT_HISTORY:
      return state.set('loading', true);
    case profileConstant.ADD_EMPLOYMENT_HISTORY_SUCCESS:
      return state
        .set('loading', false)
        .set('employmentDetail', action.response);
    case profileConstant.ADD_EMPLOYMENT_HISTORY_ERROR:
      return state
        .set('loading', false);
    case profileConstant.GET_EMPLOYMENT_HISTORY:
      return state.set('loading', true);
    case profileConstant.GET_EMPLOYMENT_HISTORY_SUCCESS:
      return state
        .set('loading', false)
        .set('employmentList', action.response);
    case profileConstant.GET_EMPLOYMENT_HISTORY_ERROR:
      return state
        .set('loading', false);
    case profileConstant.UPDATE_EMPLOYMENT_HISTORY:
      return state.set('loading', true);
    case profileConstant.UPDATE_EMPLOYMENT_HISTORY_SUCCESS:
      return state
        .set('loading', false)
        .set('employmentDetail', action.response);
    case profileConstant.UPDATE_EMPLOYMENT_HISTORY_ERROR:
      return state
        .set('loading', false);
    case profileConstant.DELETE_EMPLOYMENT_HISTORY:
      return state.set('loading', true);
    case profileConstant.DELETE_EMPLOYMENT_HISTORY_SUCCESS:
      return state
        .set('loading', false)
        .set('employmentDetail', action.response);
    case profileConstant.DELETE_EMPLOYMENT_HISTORY_ERROR:
      return state
        .set('loading', false);
    case profileConstant.FETCH_COMPLETED_COURSES:
      return state
        .set('loading', true)
        .set('loadingCurrentCourses', true);
    case profileConstant.FETCH_COMPLETED_COURSES_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingCurrentCourses', false)
        .set('completedCourses', action.response);
    case profileConstant.FETCH_COMPLETED_COURSES_ERROR:
      return state
        .set('loading', false)
        .set('loadingCurrentCourses', false)
        .set('completedCourses', []);
    case profileConstant.GET_EDUCATION_DETAIL:
      return state.set('loading', true);
    case profileConstant.GET_EDUCATION_DETAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('educationList', action.response);
    case profileConstant.GET_EDUCATION_DETAIL_ERROR:
      return state
        .set('loading', false);
    case profileConstant.ADD_EDUCATION_DETAIL:
      return state.set('loading', true);
    case profileConstant.ADD_EDUCATION_DETAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('educationDetail', action.response);
    case profileConstant.ADD_EDUCATION_DETAIL_ERROR:
      return state
        .set('loading', false);
    case profileConstant.UPDATE_EDUCATION_DETAIL:
      return state.set('loading', true);
    case profileConstant.UPDATE_EDUCATION_DETAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('educationDetail', action.response);
    case profileConstant.UPDATE_EDUCATION_DETAILERROR:
      return state
        .set('loading', false);
    case profileConstant.DELETE_EDUCATION_DETAIL:
      return state.set('loading', true);
    case profileConstant.DELETE_EDUCATION_DETAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('educationDetail', action.response);
    case profileConstant.DELETE_EDUCATION_DETAIL_ERROR:
      return state
        .set('loading', false);
    case profileConstant.GET_LEARNER_SKILLS:
      return state.set('loading', true);
    case profileConstant.GET_LEARNER_SKILLS_SUCCESS:
      return state
        .set('loading', false)
        .set('learnerSkillList', action.response);
    case profileConstant.GET_LEARNER_SKILLS_ERROR:
      return state
        .set('loading', false);
    case profileConstant.ADD_SKILL_LIST:
      return state.set('loading', true);
    case profileConstant.ADD_SKILL_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('skillDetail', action.response);
    case profileConstant.ADD_SKILL_LIST_ERROR:
      return state
        .set('loading', false);
    case profileConstant.GET_BADGE_LIST:
      return state.set('loading', true);
    case profileConstant.GET_BADGE_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('badgeList', action.response.rewards);
    case profileConstant.GET_BADGE_LIST_ERROR:
      return state
        .set('loading', false);
    case profileConstant.GET_USER_POINTS:
      return state.set('loading', true);
    case profileConstant.GET_USER_POINTS_SUCCESS:
      return state
        .set('loading', false)
        .set('userPoints', action.response ? action.response.totalScore : '0');
    case profileConstant.GET_USER_POINTS_ERROR:
      return state
        .set('loading', false);
    case profileConstant.GET_MASTER_SKILL_LIST:
      return state
        .set('loading', false);
    case profileConstant.GET_MASTER_SKILL_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('masterSkillList', action.response);
    case profileConstant.GET_MASTER_SKILL_LIST_ERROR:
      return state
        .set('loading', false)
        .set('masterSkillList', []);
    case profileConstant.CLEAR_MASTER_SKILL_LIST:
      return state
        .set('masterSkillList', []);
    case profileConstant.GET_CERTIFICATE_FROM_TOKEN:
      return state
        .set('loading', true);
    case profileConstant.GET_CERTIFICATE_FROM_TOKEN_SUCCESS:
      return state
        .set('loading', false)
        .set('certificateUrl', action.response)
        .set('isInvalidToken', false);
    case profileConstant.GET_CERTIFICATE_FROM_TOKEN_ERROR:
      return state
        .set('loading', false)
        .set('isInvalidToken', true)
        .set('certificateUrl', {});
    case profileConstant.VERIFY_CERTIFICATE:
      return state
        .set('loading', true);
    case profileConstant.VERIFY_CERTIFICATE_SUCCESS:
      return state
        .set('loading', false)
        .set('isVerifiedCertificate', action.response);
    case profileConstant.VERIFY_CERTIFICATE_ERROR:
      return state
        .set('loading', false)
        .set('isVerifiedCertificate', false);
    case profileConstant.FETCH_INTRESTED_CATEGORIES:
      return state
        .set('loading', true);
    case profileConstant.FETCH_INTRESTED_CATEGORIES_SUCCESS:
      return state
        .set('loading', false)
        .set('interestedCategories', action.response);
    case profileConstant.FETCH_INTRESTED_CATEGORIES_ERROR:
      return state.set('loading', false);
    case profileConstant.CREATE_INTRESTED_CATEGORIES:
      return state
        .set('loading', true);
    case profileConstant.CREATE_INTRESTED_CATEGORIES_SUCCESS:
      return state
        .set('loading', false)
        .set('interestedCategories', action.response);
    case profileConstant.CREATE_INTRESTED_CATEGORIES_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
};

export default profileReducer;
