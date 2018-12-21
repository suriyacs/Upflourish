import learningPathAction from '../constants/LearningPathAction';

const createCourse = (learningPath, closePopupCb) => ({
  type: learningPathAction.CREATE_COURSE,
  learningPath,
  closePopupCb
});

const createCourseSuccess = response => ({
  type: learningPathAction.CREATE_COURSE_SUCCESS,
  response
});

const createCourseError = error => ({
  type: learningPathAction.CREATE_COURSE_ERROR,
  error
});

const fetchCourseList = data => ({
  type: learningPathAction.FETCH_ALL_COURSE_LIST,
  data
});

const fetchCourseListSuccess = response => ({
  type: learningPathAction.FETCH_ALL_COURSE_LIST_SUCCESS,
  response
});

const fetchCourseListError = error => ({
  type: learningPathAction.FETCH_ALL_COURSE_LIST_ERROR,
  error
});

const fetchCourseDetailForExpert = (courseType, careerTrackId) => ({
  type: learningPathAction.FETCH_COURSE_DETAIL,
  courseType,
  careerTrackId
});

const fetchCourseDetailForExpertSuccess = (careerTrackDetail, unpublishedCount) => ({
  type: learningPathAction.FETCH_COURSE_DETAIL_SUCCESS,
  careerTrackDetail,
  unpublishedCount
});

const fetchCourseDetailForExpertError = error => ({
  type: learningPathAction.FETCH_COURSE_DETAIL_ERROR,
  error
});

const fetchLearningPathSections = (learningPathId, searchTerm) => ({
  type: learningPathAction.FETCH_LEARNING_PATH_SECTIONS,
  learningPathId,
  searchTerm
});

const fetchLearningPathSectionsSuccess = (learningPathSections, unpublishedCount) => ({
  type: learningPathAction.FETCH_LEARNING_PATH_SECTIONS_SUCCESS,
  learningPathSections,
  unpublishedCount
});

const fetchLearningPathSectionsError = error => ({
  type: learningPathAction.FETCH_LEARNING_PATH_SECTIONS_ERROR,
  error
});

const fetchLearningPathDetailsForLearner = learningPathId => ({
  type: learningPathAction.FETCH_LEARNING_PATH_DETAILS_FOR_LEARNER,
  learningPathId
});

const fetchLearningPathDetailsForLearnerSuccess = learningPathDetailsForLearner => ({
  type: learningPathAction.FETCH_LEARNING_PATH_DETAILS_FOR_LEARNER_SUCCESS,
  learningPathDetailsForLearner
});

const fetchLearningPathDetailsForLearnerError = error => ({
  type: learningPathAction.FETCH_LEARNING_PATH_DETAILS_FOR_LEARNER_ERROR,
  error
});

const updateCourseDetail = (learningPath, closePopup) => ({
  type: learningPathAction.UPDATE_COURSE,
  learningPath,
  closePopup
});

const updateCourseDetailSuccess = response => ({
  type: learningPathAction.UPDATE_COURSE_SUCCESS,
  response
});

const updateCourseDetailError = error => ({
  type: learningPathAction.UPDATE_COURSE_ERROR,
  error
});

const publishChanges = (courseType, courseId) => ({
  type: learningPathAction.PUBLISH_CHANGES,
  courseType,
  courseId
});

const publishChangesSuccess = response => ({
  type: learningPathAction.PUBLISH_CHANGES_SUCCESS,
  response
});

const publishChangesError = error => ({
  type: learningPathAction.PUBLISH_CHANGES_ERROR,
  error
});

const fetchAllCategories = (isBasedOnRole = false) => ({
  type: learningPathAction.FETCH_ALL_CATEGORIES,
  isBasedOnRole
});

const fetchAllCategoriesSuccess = response => ({
  type: learningPathAction.FETCH_ALL_CATEGORIES_SUCCESS,
  response
});

const fetchAllCategoriesError = error => ({
  type: learningPathAction.FETCH_ALL_CATEGORIES_ERROR,
  error
});

const fetchCurrentLearningPaths = roleId => ({
  type: learningPathAction.FETCH_CURRENT_LEARNING_PATHS,
  roleId
});

const fetchCurrentLearningPathsSuccess = response => ({
  type: learningPathAction.FETCH_CURRENT_LEARNING_PATHS_SUCCESS,
  response
});

const fetchCurrentLearningPathsError = error => ({
  type: learningPathAction.FETCH_CURRENT_LEARNING_PATHS_ERROR,
  error
});

const enrollLearningPath = enroll => ({
  type: learningPathAction.ENROLL_LEARNING_PATH,
  enroll
});

const enrollLearningPathSuccess = response => ({
  type: learningPathAction.ENROLL_LEARNING_PATH_SUCCESS,
  response
});

const enrollLearningPathError = error => ({
  type: learningPathAction.ENROLL_LEARNING_PATH_ERROR,
  error
});

const getAllLearningPathMaterials = subCategoryId => ({
  type: learningPathAction.GET_ALL_LEARNING_PATH_MATERIALS,
  subCategoryId
});

const getAllLearningPathMaterialsSuccess = response => ({
  type: learningPathAction.GET_ALL_LEARNING_PATH_MATERIALS_SUCCESS,
  response
});

const getAllLearningPathMaterialsError = error => ({
  type: learningPathAction.GET_ALL_LEARNING_PATH_MATERIALS_ERROR,
  error
});

const getAllLearningPathMaterialsByCategory = categoryId => ({
  type: learningPathAction.GET_ALL_LEARNING_PATH_MATERIALS_BY_CATEGORY,
  categoryId
});

const getAllLearningPathMaterialsByCategorySuccess = response => ({
  type: learningPathAction.GET_ALL_LEARNING_PATH_MATERIALS_BY_CATEGORY_SUCCESS,
  response
});

const getAllLearningPathMaterialsByCategoryError = error => ({
  type: learningPathAction.GET_ALL_LEARNING_PATH_MATERIALS_BY_CATEGORY_ERROR,
  error
});

const getTopSkillTracks = limit => ({
  type: learningPathAction.GET_TOP_SKILL_TRACK,
  limit
});

const getTopSkillTracksSuccess = response => ({
  type: learningPathAction.GET_TOP_SKILL_TRACK_SUCCESS,
  response
});

const getTopSkillTracksError = error => ({
  type: learningPathAction.GET_TOP_SKILL_TRACK_ERROR,
  error
});

const getLatestSkillTracks = limit => ({
  type: learningPathAction.GET_LATEST_SKILL_TRACK,
  limit
});

const getLatestSkillTracksSuccess = response => ({
  type: learningPathAction.GET_LATEST_SKILL_TRACK_SUCCESS,
  response
});

const getLatestSkillTracksError = error => ({
  type: learningPathAction.GET_LATEST_SKILL_TRACK_ERROR,
  error
});

const getTrendingSkillTracks = (limit, days) => ({
  type: learningPathAction.GET_TRENDING_SKILL_TRACK,
  limit,
  days
});

const getTrendingSkillTracksSuccess = response => ({
  type: learningPathAction.GET_TRENDING_SKILL_TRACK_SUCCESS,
  response
});

const getTrendingSkillTracksError = error => ({
  type: learningPathAction.GET_TRENDING_SKILL_TRACK_ERROR,
  error
});

const clearEnrolledLearningPath = () => ({
  type: learningPathAction.CLEAR_ENROLLED_LEARNING_PATH
});

const getRecommendedLearnings = () => ({
  type: learningPathAction.GET_RECOMMENDED_LEARNINGS
});

const getRecommendedLearningsSuccess = response => ({
  type: learningPathAction.GET_RECOMMENDED_LEARNINGS_SUCCESS,
  response
});

const getRecommendedLearningsError = error => ({
  type: learningPathAction.GET_RECOMMENDED_LEARNINGS_ERROR,
  error
});

const fetchMicroLearningById = learningPathId => ({
  type: learningPathAction.FETCH_MICRO_LEARNING,
  learningPathId
});

const fetchMicroLearningByIdSuccess = microLearning => ({
  type: learningPathAction.FETCH_MICRO_LEARNING_SUCCESS,
  microLearning
});

const fetchMicroLearningByIdError = error => ({
  type: learningPathAction.FETCH_MICRO_LEARNING_ERROR,
  error
});

const fetchMyCourses = id => ({
  type: learningPathAction.FETCH_MY_COURSES,
  id
});

const fetchMyCoursesSuccess = response => ({
  type: learningPathAction.FETCH_MY_COURSES_SUCCESS,
  response
});

const fetchMyCoursesError = error => ({
  type: learningPathAction.FETCH_MY_COURSES_ERROR,
  error
});

module.exports = {
  createCourse,
  createCourseSuccess,
  createCourseError,
  fetchCourseList,
  fetchCourseListSuccess,
  fetchCourseListError,
  fetchCourseDetailForExpert,
  fetchCourseDetailForExpertSuccess,
  fetchCourseDetailForExpertError,
  fetchCurrentLearningPaths,
  fetchCurrentLearningPathsSuccess,
  fetchCurrentLearningPathsError,
  fetchLearningPathSections,
  fetchLearningPathSectionsSuccess,
  fetchLearningPathSectionsError,
  fetchLearningPathDetailsForLearner,
  fetchLearningPathDetailsForLearnerSuccess,
  fetchLearningPathDetailsForLearnerError,
  updateCourseDetail,
  updateCourseDetailSuccess,
  updateCourseDetailError,
  publishChanges,
  publishChangesSuccess,
  publishChangesError,
  fetchAllCategories,
  fetchAllCategoriesSuccess,
  fetchAllCategoriesError,
  enrollLearningPath,
  enrollLearningPathSuccess,
  enrollLearningPathError,
  getAllLearningPathMaterials,
  getAllLearningPathMaterialsSuccess,
  getAllLearningPathMaterialsError,
  getAllLearningPathMaterialsByCategory,
  getAllLearningPathMaterialsByCategorySuccess,
  getAllLearningPathMaterialsByCategoryError,
  getTopSkillTracks,
  getTopSkillTracksSuccess,
  getTopSkillTracksError,
  getLatestSkillTracks,
  getLatestSkillTracksSuccess,
  getLatestSkillTracksError,
  getTrendingSkillTracks,
  getTrendingSkillTracksSuccess,
  getTrendingSkillTracksError,
  clearEnrolledLearningPath,
  getRecommendedLearnings,
  getRecommendedLearningsSuccess,
  getRecommendedLearningsError,
  fetchMicroLearningById,
  fetchMicroLearningByIdSuccess,
  fetchMicroLearningByIdError,
  fetchMyCourses,
  fetchMyCoursesSuccess,
  fetchMyCoursesError
};
