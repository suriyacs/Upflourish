import { fromJS } from 'immutable';

import learningPathActions from '../constants/LearningPathAction';
import courseActions from '../constants/CourseAction';

const formatLearningPathsResponse = response => {
  const courses = {
    totalCount: response.totalCount,
    careerTrack: [],
    skillTrack: [],
    microLearning: []
  };
  let count = 8;
  courses.careerTrack = response.careerTrack.slice(0, 8);
  if ((count - courses.careerTrack.length) === 0) {
    return courses;
  }
  count -= courses.careerTrack.length;
  courses.skillTrack = response.skillTrack.slice(0, count);
  if ((count - courses.skillTrack.length) === 0) {
    return courses;
  }
  count -= courses.skillTrack.length;
  courses.microLearning = response.microLearning.slice(0, count);
  if ((count - courses.microLearning.length) === 0) {
    return courses;
  }
};

const initialState = fromJS({
  loading: false,
  courseDetails: {},
  learningPathSections: [],
  learningPathDetailsForLearner: {},
  learningPathSectionsForLearner: [],
  learningPaths: [],
  currentLearningPaths: [],
  learningPathsCount: 0,
  unpublishedCount: 0,
  categories: [],
  error: '',
  allLearningPathMaterials: {},
  enrolledLearningPath: {},
  categoryLearningPathMaterials: {},
  topSkillTracks: [],
  latestSkillTracks: [],
  trendingSkillTracks: [],
  isLoaderEnable: false,
  microLearningDetails: {},
  myCourses: [],
  loadingEnrollments: false
});

const learningPathReducer = (state = initialState, action) => {
  switch (action.type) {
    case learningPathActions.CREATE_COURSE:
      return state.set('loading', true);
    case learningPathActions.CREATE_COURSE_SUCCESS:
      return state
        .set('courseDetails', action.response)
        .set('loading', false);
    case learningPathActions.CREATE_COURSE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case learningPathActions.FETCH_ALL_COURSE_LIST:
      return state.set('loading', true);
    case learningPathActions.FETCH_ALL_COURSE_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('learningPaths', action.response)
        .set('learningPathsCount', parseInt(action.response.count || 0, 10));
    case learningPathActions.FETCH_ALL_COURSE_LIST_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case learningPathActions.FETCH_COURSE_DETAIL:
      return state.set('loading', true);
    case learningPathActions.FETCH_COURSE_DETAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('courseDetails', action.careerTrackDetail)
        .set('unpublishedCount', action.unpublishedCount);
    case learningPathActions.FETCH_COURSE_DETAIL_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case learningPathActions.FETCH_LEARNING_PATH_DETAILS_FOR_LEARNER:
      return state.set('loading', true);
    case learningPathActions.FETCH_LEARNING_PATH_DETAILS_FOR_LEARNER_SUCCESS:
      return state
        .set('loading', false)
        .set('learningPathDetailsForLearner', action.learningPathDetailsForLearner);
    case learningPathActions.FETCH_LEARNING_PATH_DETAILS_FOR_LEARNER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case learningPathActions.FETCH_LEARNING_PATH_SECTIONS:
      return state.set('loading', true);
    case learningPathActions.FETCH_LEARNING_PATH_SECTIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('learningPathSections', action.learningPathSections);
    case learningPathActions.FETCH_LEARNING_PATH_SECTIONS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case learningPathActions.UPDATE_COURSE:
      return state.set('loading', true);
    case learningPathActions.UPDATE_COURSE_SUCCESS:
      return state.set('loading', false)
        .set('courseDetails', action.response);
    case learningPathActions.UPDATE_COURSE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case learningPathActions.FETCH_ALL_CATEGORIES:
      return state.set('loading', true);
    case learningPathActions.FETCH_ALL_CATEGORIES_SUCCESS:
      return state.set('loading', false)
        .set('categories', action.response);
    case learningPathActions.FETCH_ALL_CATEGORIES_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case learningPathActions.PUBLISH_CHANGES_SUCCESS:
      return state
        .set('loading', false)
        .set('unpublishedCount', action.response.unpublishedCount);
    case learningPathActions.FETCH_CURRENT_LEARNING_PATHS:
      return state
        .set('loading', true)
        .set('loadingEnrollments', true);
    case learningPathActions.FETCH_CURRENT_LEARNING_PATHS_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingEnrollments', false)
        .set('currentLearningPaths', action.response);
    case learningPathActions.FETCH_CURRENT_LEARNING_PATHS_ERROR:
      return state
        .set('loading', false)
        .set('loadingEnrollments', false)
        .set('currentLearningPaths', []);
    case learningPathActions.ENROLL_LEARNING_PATH:
      return state.set('loading', true);
    case learningPathActions.ENROLL_LEARNING_PATH_SUCCESS:
      return state
        .set('loading', false)
        .set('enrolledLearningPath', action.response);
    case learningPathActions.ENROLL_LEARNING_PATH_ERROR:
      return state
        .set('loading', false);
    case learningPathActions.GET_ALL_LEARNING_PATH_MATERIALS:
      return state.set('loading', true);
    case learningPathActions.GET_ALL_LEARNING_PATH_MATERIALS_SUCCESS:
      return state
        .set('allLearningPathMaterials', action.response)
        .set('loading', false);
    case learningPathActions.GET_ALL_LEARNING_PATH_MATERIALS_ERROR:
      return state
        .set('loading', false);
    case learningPathActions.GET_ALL_LEARNING_PATH_MATERIALS_BY_CATEGORY:
      return state.set('loading', true);
    case learningPathActions.GET_ALL_LEARNING_PATH_MATERIALS_BY_CATEGORY_SUCCESS:
      return state
        .set('categoryLearningPathMaterials', formatLearningPathsResponse(action.response))
        .set('loading', false);
    case learningPathActions.GET_ALL_LEARNING_PATH_MATERIALS_BY_CATEGORY_ERROR:
      return state
        .set('loading', false);
    case learningPathActions.GET_TOP_SKILL_TRACK:
      return state.set('loading', true);
    case learningPathActions.GET_TOP_SKILL_TRACK_SUCCESS:
      return state
        .set('topSkillTracks', action.response)
        .set('loading', false);
    case learningPathActions.GET_TOP_SKILL_TRACK_ERROR:
      return state
        .set('loading', false);
    case learningPathActions.GET_LATEST_SKILL_TRACK:
      return state.set('loading', true);
    case learningPathActions.GET_LATEST_SKILL_TRACK_SUCCESS:
      return state
        .set('latestSkillTracks', action.response)
        .set('loading', false);
    case learningPathActions.GET_LATEST_SKILL_TRACK_ERROR:
      return state
        .set('loading', false);
    case learningPathActions.GET_TRENDING_SKILL_TRACK:
      return state.set('loading', true);
    case learningPathActions.GET_TRENDING_SKILL_TRACK_SUCCESS:
      return state
        .set('trendingSkillTracks', action.response)
        .set('loading', false);
    case learningPathActions.GET_TRENDING_SKILL_TRACK_ERROR:
      return state
        .set('loading', false);
    case learningPathActions.CLEAR_ENROLLED_LEARNING_PATH:
      return state
        .set('enrolledLearningPath', {});
    case learningPathActions.GET_RECOMMENDED_LEARNINGS:
      return state
        .set('isLoaderEnable', true);
    case learningPathActions.GET_RECOMMENDED_LEARNINGS_SUCCESS:
      return state
        .set('allLearningPathMaterials', action.response)
        .set('isLoaderEnable', false);
    case learningPathActions.GET_RECOMMENDED_LEARNINGS_ERROR:
      return state
        .set('isLoaderEnable', false)
        .set('allLearningPathMaterials', {});
    case learningPathActions.FETCH_MICRO_LEARNING:
      return state.set('loading', true);
    case learningPathActions.FETCH_MICRO_LEARNING_SUCCESS:
      return state
        .set('microLearningDetails', action.microLearning)
        .set('loading', false);
    case learningPathActions.FETCH_MICRO_LEARNING_ERROR:
      return state.set('loading', false);
    case learningPathActions.FETCH_MY_COURSES:
      return state.set('loading', true);
    case learningPathActions.FETCH_MY_COURSES_SUCCESS:
      return state
        .set('loading', false)
        .set('myCourses', action.response);
    case learningPathActions.FETCH_MY_COURSES_ERROR:
      return state
        .set('loading', false)
        .set('myCourses', []);
    case courseActions.GET_EXPERT_SEARCHED_COURSE:
      return state.set('loading', true);
    case courseActions.GET_EXPERT_SEARCHED_COURSE_SUCCESS:
      return state
        .set('loading', false)
        .set('learningPaths', action.response)
        .set('learningPathsCount', parseInt(action.response.count || 0, 10));
    case courseActions.GET_EXPERT_SEARCHED_COURSE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default learningPathReducer;
