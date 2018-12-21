import courseAction from '../constants/CourseAction';

const getCourseDetails = (courseType, courseId) => ({
  type: courseAction.FETCH_COURSE_DETAILS,
  courseType,
  courseId
});

const getCourseDetailsSuccess = response => ({
  type: courseAction.FETCH_COURSE_DETAILS_SUCCESS,
  response
});

const getCourseDetailsError = error => ({
  type: courseAction.FETCH_COURSE_DETAILS_ERROR,
  error
});

const clearCoureDetails = () => ({
  type: courseAction.CLEAR_COURSE_DETAILS
});

const searchCourse = searchTerm => ({
  type: courseAction.SEARCH_COURSE,
  searchTerm
});

const searchCourseSuccess = response => ({
  type: courseAction.SEARCH_COURSE_SUCCESS,
  response
});

const searchCourseError = error => ({
  type: courseAction.SEARCH_COURSE_ERROR,
  error
});

const getSearchedCourse = filterData => ({
  type: courseAction.GET_SEARCHED_COURSE,
  filterData
});

const getSearchedCourseSuccess = response => ({
  type: courseAction.GET_SEARCHED_COURSE_SUCCESS,
  response
});

const getSearchedCourseError = error => ({
  type: courseAction.GET_SEARCHED_COURSE_ERROR,
  error
});

const getExpertSearchedCourse = filterData => ({
  type: courseAction.GET_EXPERT_SEARCHED_COURSE,
  filterData
});

const getExpertSearchedCourseSuccess = response => ({
  type: courseAction.GET_EXPERT_SEARCHED_COURSE_SUCCESS,
  response
});

const getExpertSearchedCourseError = error => ({
  type: courseAction.GET_EXPERT_SEARCHED_COURSE_ERROR,
  error
});

const updateMicrolearning = (microlearning, closePopupCb) => ({
  type: courseAction.UPDATE_MICROLEARNING,
  microlearning,
  closePopupCb
});

const updateMicrolearningSuccess = response => ({
  type: courseAction.UPDATE_MICROLEARNING_SUCCESS,
  response
});

const updateMicrolearningError = error => ({
  type: courseAction.UPDATE_MICROLEARNING_ERROR,
  error
});

module.exports = {
  getCourseDetails,
  getCourseDetailsSuccess,
  getCourseDetailsError,
  clearCoureDetails,
  searchCourse,
  searchCourseSuccess,
  searchCourseError,
  getSearchedCourse,
  getSearchedCourseSuccess,
  getSearchedCourseError,
  updateMicrolearning,
  updateMicrolearningSuccess,
  updateMicrolearningError,
  getExpertSearchedCourse,
  getExpertSearchedCourseSuccess,
  getExpertSearchedCourseError
};
