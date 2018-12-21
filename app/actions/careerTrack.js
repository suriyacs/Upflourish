import careerTrackAction from '../constants/CareerTrackAction';

const fetchCareerTrack = careerTrackId => ({
  type: careerTrackAction.FETCH_CAREER_TRACK,
  careerTrackId
});

const fetchCareerTrackSuccess = response => ({
  type: careerTrackAction.FETCH_CAREER_TRACK_SUCCESS,
  response
});

const fetchCareerTrackError = error => ({
  type: careerTrackAction.FETCH_CAREER_TRACK_ERROR,
  error
});

const fetchSkillTracksByCTId = careerTrackId => ({
  type: careerTrackAction.FETCH_SKILL_TRACKS_BY_CT_ID,
  careerTrackId
});

const fetchSkillTracksByCTIdSuccess = response => ({
  type: careerTrackAction.FETCH_SKILL_TRACKS_BY_CT_ID_SUCCESS,
  response
});

const fetchSkillTracksByCTIdError = error => ({
  type: careerTrackAction.FETCH_SKILL_TRACKS_BY_CT_ID_ERROR,
  error
});

const isCourseEnrolled = (courseType, courseId) => ({
  type: careerTrackAction.CHECK_IS_COURSE_ENROLLED,
  courseType,
  courseId
});

const isCourseEnrolledSuccess = response => ({
  type: careerTrackAction.CHECK_IS_COURSE_ENROLLED_SUCCESS,
  response
});

const isCourseEnrolledError = error => ({
  type: careerTrackAction.CHECK_IS_COURSE_ENROLLED_ERROR,
  error
});

const enrollMyCareer = enroll => ({
  type: careerTrackAction.ENROLL_MY_CAREER,
  enroll
});

const enrollMyCareerSuccess = response => ({
  type: careerTrackAction.ENROLL_MY_CAREER_SUCCESS,
  response
});

const enrollMyCareerError = error => ({
  type: careerTrackAction.ENROLL_MY_CAREER_ERROR,
  error
});

const clearEnrolledCareerTrack = () => ({
  type: careerTrackAction.CLEAR_ENROLLED_CAREER_TRACK
});

const checkIfDashboardCourseEnrolled = (courseType, courseId) => ({
  type: careerTrackAction.CHECK_IS_DASHBOARD_COURSE_ENROLLED,
  courseType,
  courseId
});

const checkIfDashboardCourseEnrolledSuccess = response => ({
  type: careerTrackAction.CHECK_IS_DASHBOARD_COURSE_ENROLLED_SUCCESS,
  response
});

const checkIfDashboardCourseEnrolledError = error => ({
  type: careerTrackAction.CHECK_IS_DASHBOARD_COURSE_ENROLLED_ERROR,
  error
});

const createSkillTrackByCareerTrackId = (careerTrackId, courseDetail, closePopupCb) => ({
  type: careerTrackAction.CREATE_SKILL_TRACK_BY_CAREER_TRACK,
  careerTrackId,
  courseDetail,
  closePopupCb
});

const createSkillTrackByCareerTrackIdSuccess = response => ({
  type: careerTrackAction.CREATE_SKILL_TRACK_BY_CAREER_TRACK_SUCCESS,
  response
});

const createSkillTrackByCareerTrackIdError = error => ({
  type: careerTrackAction.CREATE_SKILL_TRACK_BY_CAREER_TRACK_ERROR,
  error
});

const updateSkillTrack = (courseDetail, closePopupCb) => ({
  type: careerTrackAction.UPDATE_SKILL_TRACK,
  courseDetail,
  closePopupCb
});

const updateSkillTrackSuccess = response => ({
  type: careerTrackAction.UPDATE_SKILL_TRACK_SUCCESS,
  response
});

const updateSkillTrackError = error => ({
  type: careerTrackAction.UPDATE_SKILL_TRACK_ERROR,
  error
});

const deleteSkillTrack = (careerTrackId, skillTrackId, closePopupCb) => ({
  type: careerTrackAction.DELETE_SKILL_TRACK,
  skillTrackId,
  careerTrackId,
  closePopupCb
});

const deleteSkillTrackSuccess = response => ({
  type: careerTrackAction.DELETE_SKILL_TRACK_SUCCESS,
  response
});

const deleteSkillTrackError = error => ({
  type: careerTrackAction.DELETE_SKILL_TRACK_ERROR,
  error
});

const updateSkillTrackOrder = (careerTrackId, skillTrackList) => ({
  type: careerTrackAction.UPDATE_SKILL_TRACK_ORDER,
  careerTrackId,
  skillTrackList
});

const updateSkillTrackOrderSuccess = response => ({
  type: careerTrackAction.UPDATE_SKILL_TRACK_ORDER_SUCCESS,
  response
});

const updateSkillTrackOrderError = error => ({
  type: careerTrackAction.UPDATE_SKILL_TRACK_ORDER_ERROR,
  error
});

module.exports = {
  fetchCareerTrack,
  fetchCareerTrackSuccess,
  fetchCareerTrackError,
  fetchSkillTracksByCTId,
  fetchSkillTracksByCTIdSuccess,
  fetchSkillTracksByCTIdError,
  isCourseEnrolled,
  isCourseEnrolledSuccess,
  isCourseEnrolledError,
  enrollMyCareer,
  enrollMyCareerSuccess,
  createSkillTrackByCareerTrackId,
  createSkillTrackByCareerTrackIdSuccess,
  createSkillTrackByCareerTrackIdError,
  updateSkillTrack,
  updateSkillTrackSuccess,
  updateSkillTrackError,
  deleteSkillTrack,
  deleteSkillTrackSuccess,
  deleteSkillTrackError,
  enrollMyCareerError,
  clearEnrolledCareerTrack,
  checkIfDashboardCourseEnrolled,
  checkIfDashboardCourseEnrolledSuccess,
  checkIfDashboardCourseEnrolledError,
  updateSkillTrackOrder,
  updateSkillTrackOrderSuccess,
  updateSkillTrackOrderError
};
