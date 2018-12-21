import profileConstants from '../constants/ProfileAction.js';

const getPersonalDetail = userId => ({
  type: profileConstants.GET_PERSONAL_DETAIL,
  userId
});

const getPersonalDetailSuccess = response => ({
  type: profileConstants.GET_PERSONAL_DETAIL_SUCCESS,
  response
});

const getPersonalDetailError = error => ({
  type: profileConstants.GET_PERSONAL_DETAIL_ERROR,
  error
});

const updatePersonalDetail = personalDetail => ({
  type: profileConstants.UPDATE_PERSONAL_DETAIL,
  ...personalDetail
});

const updatePersonalDetailSuccess = response => ({
  type: profileConstants.UPDATE_PERSONAL_DETAIL_SUCCESS,
  response
});

const updatePersonalDetailError = error => ({
  type: profileConstants.UPDATE_PERSONAL_DETAIL_ERROR,
  error
});

const addEmploymentHistory = employment => ({
  type: profileConstants.ADD_EMPLOYMENT_HISTORY,
  ...employment
});

const addEmploymentHistorySuccess = response => ({
  type: profileConstants.ADD_EMPLOYMENT_HISTORY_SUCCESS,
  response
});

const addEmploymentHistoryError = error => ({
  type: profileConstants.ADD_EMPLOYMENT_HISTORY_ERROR,
  error
});

const getEmploymentHistory = () => ({
  type: profileConstants.GET_EMPLOYMENT_HISTORY
});

const getEmploymentHistorySuccess = response => ({
  type: profileConstants.GET_EMPLOYMENT_HISTORY_SUCCESS,
  response
});

const getEmploymentHistoryError = error => ({
  type: profileConstants.GET_EMPLOYMENT_HISTORY_ERROR,
  error
});

const updateEmploymentHistory = employementDetail => ({
  type: profileConstants.UPDATE_EMPLOYMENT_HISTORY,
  ...employementDetail
});

const updateEmploymentHistorySuccess = response => ({
  type: profileConstants.UPDATE_EMPLOYMENT_HISTORY_SUCCESS,
  response
});

const updateEmploymentHistoryError = error => ({
  type: profileConstants.UPDATE_EMPLOYMENT_HISTORY_ERROR,
  error
});

const deleteEmploymentHistory = employmentId => ({
  type: profileConstants.DELETE_EMPLOYMENT_HISTORY,
  employmentId
});

const deleteEmploymentHistorySuccess = response => ({
  type: profileConstants.DELETE_EMPLOYMENT_HISTORY_SUCCESS,
  response
});

const deleteEmploymentHistoryError = error => ({
  type: profileConstants.DELETE_EMPLOYMENT_HISTORY_ERROR,
  error
});

const getEducationDetail = () => ({
  type: profileConstants.GET_EDUCATION_DETAIL
});

const getEducationDetailSuccess = response => ({
  type: profileConstants.GET_EDUCATION_DETAIL_SUCCESS,
  response
});

const getEducationDetailError = error => ({
  type: profileConstants.GET_EDUCATION_DETAIL_ERROR,
  error
});

const addEducationDetail = educationDetail => ({
  type: profileConstants.ADD_EDUCATION_DETAIL,
  ...educationDetail
});

const addEducationDetailSuccess = response => ({
  type: profileConstants.ADD_EDUCATION_DETAIL_SUCCESS,
  response
});

const addEducationDetailError = error => ({
  type: profileConstants.ADD_EDUCATION_DETAIL_ERROR,
  error
});

const updateEducationDetail = educationDetail => ({
  type: profileConstants.UPDATE_EDUCATION_DETAIL,
  ...educationDetail
});

const updateEducationDetailSuccess = response => ({
  type: profileConstants.UPDATE_EDUCATION_DETAIL_SUCCESS,
  response
});

const updateEducationDetailError = error => ({
  type: profileConstants.UPDATE_EDUCATION_DETAIL_ERROR,
  error
});

const deleteEducationDetail = educationId => ({
  type: profileConstants.DELETE_EDUCATION_DETAIL,
  educationId
});

const deleteEducationDetailSuccess = response => ({
  type: profileConstants.DELETE_EDUCATION_DETAIL_SUCCESS,
  response
});

const deleteEducationDetailError = error => ({
  type: profileConstants.DELETE_EDUCATION_DETAIL_ERROR,
  error
});

const getLearnerSpecificSkill = () => ({
  type: profileConstants.GET_LEARNER_SKILLS
});

const getLearnerSpecificSkillSuccess = response => ({
  type: profileConstants.GET_LEARNER_SKILLS_SUCCESS,
  response
});

const getLearnerSpecificSkillError = error => ({
  type: profileConstants.GET_LEARNER_SKILLS_ERROR,
  error
});

const addSelectedSkill = skillList => ({
  type: profileConstants.ADD_SKILL_LIST,
  ...skillList
});

const addSelectedSkillSuccess = response => ({
  type: profileConstants.ADD_SKILL_LIST_SUCCESS,
  response
});

const addSelectedSkillError = error => ({
  type: profileConstants.ADD_SKILL_LIST_ERROR,
  error
});

const getBadgeListReady = () => ({
  type: profileConstants.GET_BADGE_LIST
});

const getBadgeListSuccess = response => ({
  type: profileConstants.GET_BADGE_LIST_SUCCESS,
  response
});

const getBadgeListError = error => ({
  type: profileConstants.GET_BADGE_LIST_ERROR,
  error
});

const getUserPointsReady = () => ({
  type: profileConstants.GET_USER_POINTS
});

const getUserPointsSuccess = response => ({
  type: profileConstants.GET_USER_POINTS_SUCCESS,
  response
});

const getUserPointsError = error => ({
  type: profileConstants.GET_USER_POINTS_ERROR,
  error
});

const getMasterSkillList = searchTerm => ({
  type: profileConstants.GET_MASTER_SKILL_LIST,
  searchTerm
});

const getMasterSkillListSuccess = response => ({
  type: profileConstants.GET_MASTER_SKILL_LIST_SUCCESS,
  response
});

const getMasterSkillListError = error => ({
  type: profileConstants.GET_MASTER_SKILL_LIST_ERROR,
  error
});

const clearMasterSkillList = () => ({
  type: profileConstants.CLEAR_MASTER_SKILL_LIST
});

const getCertificateFromToken = token => ({
  type: profileConstants.GET_CERTIFICATE_FROM_TOKEN,
  token
});

const getCertificateFromTokenSuccess = response => ({
  type: profileConstants.GET_CERTIFICATE_FROM_TOKEN_SUCCESS,
  response
});

const getCertificateFromTokenError = error => ({
  type: profileConstants.GET_CERTIFICATE_FROM_TOKEN_ERROR,
  error
});

const verifyCertificate = (token, generateSuccessStepsCB) => ({
  type: profileConstants.VERIFY_CERTIFICATE,
  token,
  generateSuccessStepsCB
});

const verifyCertificateSuccess = response => ({
  type: profileConstants.VERIFY_CERTIFICATE_SUCCESS,
  response
});

const verifyCertificateError = error => ({
  type: profileConstants.VERIFY_CERTIFICATE_ERROR,
  error
});

const fetchCompletedCourses = userId => ({
  type: profileConstants.FETCH_COMPLETED_COURSES,
  userId
});

const fetchCompletedCoursesSuccess = response => ({
  type: profileConstants.FETCH_COMPLETED_COURSES_SUCCESS,
  response
});

const fetchCompletedCoursesError = error => ({
  type: profileConstants.FETCH_COMPLETED_COURSES_ERROR,
  error
});

const fetchIntrestedCategories = () => ({
  type: profileConstants.FETCH_INTRESTED_CATEGORIES
});

const fetchIntrestedCategoriesSuccess = response => ({
  type: profileConstants.FETCH_INTRESTED_CATEGORIES_SUCCESS,
  response
});

const fetchIntrestedCategoriesError = error => ({
  type: profileConstants.FETCH_INTRESTED_CATEGORIES_ERROR,
  error
});

const createIntrestedCategories = categories => ({
  type: profileConstants.CREATE_INTRESTED_CATEGORIES,
  categories
});

const createIntrestedCategoriesSuccess = response => ({
  type: profileConstants.CREATE_INTRESTED_CATEGORIES_SUCCESS,
  response
});

const createIntrestedCategoriesError = error => ({
  type: profileConstants.CREATE_INTRESTED_CATEGORIES_ERROR,
  error
});

module.exports = {
  getPersonalDetail,
  getPersonalDetailSuccess,
  getPersonalDetailError,
  updatePersonalDetail,
  updatePersonalDetailSuccess,
  updatePersonalDetailError,
  getEmploymentHistory,
  getEmploymentHistorySuccess,
  getEmploymentHistoryError,
  updateEmploymentHistory,
  updateEmploymentHistorySuccess,
  updateEmploymentHistoryError,
  addEmploymentHistory,
  addEmploymentHistorySuccess,
  addEmploymentHistoryError,
  deleteEmploymentHistory,
  deleteEmploymentHistorySuccess,
  deleteEmploymentHistoryError,
  getEducationDetail,
  getEducationDetailSuccess,
  getEducationDetailError,
  addEducationDetail,
  addEducationDetailSuccess,
  addEducationDetailError,
  updateEducationDetail,
  updateEducationDetailSuccess,
  updateEducationDetailError,
  deleteEducationDetail,
  deleteEducationDetailSuccess,
  deleteEducationDetailError,
  getLearnerSpecificSkill,
  getLearnerSpecificSkillSuccess,
  getLearnerSpecificSkillError,
  addSelectedSkill,
  addSelectedSkillSuccess,
  addSelectedSkillError,
  getBadgeListReady,
  getBadgeListSuccess,
  getBadgeListError,
  getUserPointsReady,
  getUserPointsSuccess,
  getUserPointsError,
  getMasterSkillList,
  getMasterSkillListSuccess,
  getMasterSkillListError,
  clearMasterSkillList,
  getCertificateFromToken,
  getCertificateFromTokenSuccess,
  getCertificateFromTokenError,
  verifyCertificate,
  verifyCertificateSuccess,
  verifyCertificateError,
  fetchCompletedCourses,
  fetchCompletedCoursesSuccess,
  fetchCompletedCoursesError,
  fetchIntrestedCategories,
  fetchIntrestedCategoriesSuccess,
  fetchIntrestedCategoriesError,
  createIntrestedCategories,
  createIntrestedCategoriesSuccess,
  createIntrestedCategoriesError
};
