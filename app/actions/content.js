import contentAction from '../constants/ContentAction';

const fetchContentDetails = ({
  contentType,
  contentId,
  sectionId,
  learningPathId
}) => ({
  type: contentAction.FETCH_CONTENT_DETAILS,
  contentType,
  contentId,
  sectionId,
  learningPathId
});

const fetchContentDetailsSuccess = response => ({
  type: contentAction.FETCH_CONTENT_DETAILS_SUCCESS,
  response
});

const fetchContentDetailsError = error => ({
  type: contentAction.FETCH_CONTENT_DETAILS_ERROR,
  error
});

const clearContentDetails = () => ({
  type: contentAction.CLEAR_CONTENT_DETAILS
});

const enrollMyContent = enroll => ({
  type: contentAction.ENROLL_CONTENT,
  enroll
});

const enrollMyContentSuccess = response => ({
  type: contentAction.ENROLL_CONTENT_SUCCESS,
  response
});

const enrollMyContentError = error => ({
  type: contentAction.ENROLL_CONTENT_ERROR,
  error
});

const completeContent = data => ({
  type: contentAction.COMPLETE_CONTENT,
  data
});

const completeContentSuccess = response => ({
  type: contentAction.COMPLETE_CONTENT_SUCCESS,
  response
});

const completeContentError = error => ({
  type: contentAction.COMPLETE_CONTENT_ERROR,
  error
});

const enrollAll = data => ({
  type: contentAction.ENROLL_ALL,
  data
});

const enrollAllSuccess = response => ({
  type: contentAction.ENROLL_ALL_SUCCESS,
  response
});

const enrollAllError = error => ({
  type: contentAction.ENROLL_ALL_ERROR,
  error
});

const updateLatestContentForUser = (sectionId, contentId) => ({
  type: contentAction.UPDATE_LATEST_CONTENT_FOR_USER,
  sectionId,
  contentId
});

const updateLatestContentForUserSuccess = response => ({
  type: contentAction.UPDATE_LATEST_CONTENT_FOR_USER_SUCCESS,
  response
});

const updateLatestContentForUserError = error => ({
  type: contentAction.UPDATE_LATEST_CONTENT_FOR_USER_ERROR,
  error
});

const markContentAsCompleted = (contentCompletionData, redirectToCertificate) => ({
  type: contentAction.MARK_CONTENT_COMPLETED,
  contentCompletionData,
  redirectToCertificate
});

const markContentAsCompletedSuccess = response => ({
  type: contentAction.MARK_CONTENT_COMPLETED_SUCCESS,
  response
});

const markContentAsCompletedError = error => ({
  type: contentAction.MARK_CONTENT_COMPLETED_ERROR,
  error
});

const fetchAssessmentTest = assessmentData => ({
  type: contentAction.FETCH_ASSESSMENT_TEST,
  assessmentData
});

const fetchAssessmentTestSuccess = response => ({
  type: contentAction.FETCH_ASSESSMENT_TEST_SUCCESS,
  response
});

const fetchAssessmentTestError = error => ({
  type: contentAction.FETCH_ASSESSMENT_TEST_ERROR,
  error
});

const checkIfCorrectAnswer = answerData => ({
  type: contentAction.CHECK_CORRECT_ANSWER,
  answerData
});

const checkIfCorrectAnswerSuccess = response => ({
  type: contentAction.CHECK_CORRECT_ANSWER_SUCCESS,
  response
});

const checkIfCorrectAnswerError = error => ({
  type: contentAction.CHECK_CORRECT_ANSWER_ERROR,
  error
});

const clearAssessmentData = () => ({
  type: contentAction.CLEAR_ASSESSMENT_DATA
});

const clearAssessmentAnswers = () => ({
  type: contentAction.CLEAR_ASSESSMENT_ANSWERS
});

const getBadgeReady = data => ({
  type: contentAction.GET_BADGE,
  data
});

const getBadgeSuccess = response => ({
  type: contentAction.GET_BADGE_SUCCESS,
  response
});

const getBadgeError = error => ({
  type: contentAction.GET_BADGE_ERROR,
  error
});

const getRelatedContentReady = contentId => ({
  type: contentAction.GET_RELATED_CONTENT,
  contentId
});

const getRelatedContentSuccess = response => ({
  type: contentAction.GET_RELATED_CONTENT_SUCCESS,
  response
});

const getRelatedContentError = error => ({
  type: contentAction.GET_RELATED_CONTENT_ERROR,
  error
});

const clearCompletedContent = () => ({
  type: contentAction.CLEAR_COMPLETED_CONTENT
});

const createContent = (content, sectionId, file) => ({
  type: contentAction.CREATE_CONTENT,
  content,
  sectionId,
  file
});

const createContentSuccess = response => ({
  type: contentAction.CREATE_CONTENT_SUCCESS,
  response
});

const createContentError = error => ({
  type: contentAction.CREATE_CONTENT_ERROR,
  error
});

const updateContent = (content, sectionId, file) => ({
  type: contentAction.UPDATE_CONTENT,
  content,
  sectionId,
  file
});

const updateContentSuccess = response => ({
  type: contentAction.UPDATE_CONTENT_SUCCESS,
  response
});

const updateContentError = error => ({
  type: contentAction.UPDATE_CONTENT_ERROR,
  error
});

const fetchSectionContentList = sectionId => ({
  type: contentAction.FETCH_SECTION_CONTENT_LIST,
  sectionId
});

const fetchSectionContentListSuccess = response => ({
  type: contentAction.FETCH_SECTION_CONTENT_LIST_SUCCESS,
  response
});

const fetchSectionContentListError = error => ({
  type: contentAction.FETCH_SECTION_CONTENT_LIST_ERROR,
  error
});

const reorderContent = (sectionId, contentOrder) => ({
  type: contentAction.REORDER_CONTENT_LIST,
  sectionId,
  contentOrder
});

const reorderContentSuccess = response => ({
  type: contentAction.REORDER_CONTENT_LIST_SUCCESS,
  response
});

const reorderContentError = error => ({
  type: contentAction.REORDER_CONTENT_LIST_ERROR,
  error
});

const deleteContent = (sectionId, contentId, closePopupCb) => ({
  type: contentAction.DELETE_CONTENT_LIST,
  sectionId,
  contentId,
  closePopupCb
});

const deleteContentSuccess = response => ({
  type: contentAction.DELETE_CONTENT_LIST_SUCCESS,
  response
});

const deleteContentError = error => ({
  type: contentAction.DELETE_CONTENT_LIST_ERROR,
  error
});

const getDefaultQuestionType = () => ({
  type: contentAction.GET_QUESTION_TYPE
});

const getDefaultQuestionTypeSuccess = response => ({
  type: contentAction.GET_QUESTION_TYPE_SUCCESS,
  response
});

const getDefaultQuestionTypeError = error => ({
  type: contentAction.GET_QUESTION_TYPE_ERROR,
  error
});

const saveQuestion = (question, contentId) => ({
  type: contentAction.SAVE_QUESTION,
  question,
  contentId
});

const saveQuestionSuccess = response => ({
  type: contentAction.SAVE_QUESTION_SUCCESS,
  response
});

const saveQuestionError = error => ({
  type: contentAction.SAVE_QUESTION_ERROR,
  error
});

const updateQuestion = (question, contentId) => ({
  type: contentAction.UPDATE_QUESTION,
  question,
  contentId
});

const updateQuestionSuccess = response => ({
  type: contentAction.UPDATE_QUESTION_SUCCESS,
  response
});

const updateQuestionError = error => ({
  type: contentAction.UPDATE_QUESTION_ERROR,
  error
});

const fetchAssessmentQuestions = contentId => ({
  type: contentAction.FETCH_ASSESSMENT_QUESTIONS,
  contentId
});

const fetchAssessmentQuestionsSuccess = response => ({
  type: contentAction.FETCH_ASSESSMENT_QUESTIONS_SUCCESS,
  response
});

const fetchAssessmentQuestionsError = error => ({
  type: contentAction.FETCH_ASSESSMENT_QUESTIONS_ERROR,
  error
});

const saveQuestionContent = (contentId, questionId) => ({
  type: contentAction.SAVE_QUESTION_CONTENT,
  contentId,
  questionId
});

const saveQuestionContentSuccess = response => ({
  type: contentAction.SAVE_QUESTION_CONTENT_SUCCESS,
  response
});

const saveQuestionContentError = error => ({
  type: contentAction.SAVE_QUESTION_CONTENT_ERROR,
  error
});

const updateQuestionContent = (contentId, questionId) => ({
  type: contentAction.UPDATE_QUESTION_CONTENT,
  contentId,
  questionId
});

const updateQuestionContentSuccess = response => ({
  type: contentAction.UPDATE_QUESTION_CONTENT_SUCCESS,
  response
});

const updateQuestionContentError = error => ({
  type: contentAction.UPDATE_QUESTION_CONTENT_ERROR,
  error
});

const gamifyLearner = (sectionId, contentId) => ({
  type: contentAction.GAMIFY_LEARNER,
  sectionId,
  contentId
});

const gamifyLearnerSuccess = response => ({
  type: contentAction.GAMIFY_LEARNER_SUCCESS,
  response
});

const gamifyLearnerError = error => ({
  type: contentAction.GAMIFY_LEARNER_ERROR,
  error
});

const gamifyLearnerAssessment = (questionId, answerId) => ({
  type: contentAction.GAMIFY_LEARNER_ASSESSMENT,
  questionId,
  answerId
});

const gamifyLearnerAssessmentSuccess = response => ({
  type: contentAction.GAMIFY_LEARNER_ASSESSMENT_SUCCESS,
  response
});

const gamifyLearnerAssessmentError = error => ({
  type: contentAction.GAMIFY_LEARNER_ASSESSMENT_ERROR,
  error
});

const clearGamifyLearnerAssessment = () => ({
  type: contentAction.CLEAR_GAMIFY_LEARNER_ASSESSMENT
});

const createRelatedContent = (content, contentId, file) => ({
  type: contentAction.CREATE_RELATED_CONTENT,
  content,
  contentId,
  file
});

const createRelatedContentSuccess = response => ({
  type: contentAction.CREATE_RELATED_CONTENT_SUCCESS,
  response
});

const createRelatedContentError = error => ({
  type: contentAction.CREATE_RELATED_CONTENT_ERROR,
  error
});

const deleteRelatedContent = (contentId, relatedContentId) => ({
  type: contentAction.DELETE_RELATED_CONTENT,
  contentId,
  relatedContentId
});

const deleteRelatedContentSuccess = response => ({
  type: contentAction.DELETE_RELATED_CONTENT_SUCCESS,
  response
});

const deleteRelatedContentError = error => ({
  type: contentAction.DELETE_RELATED_CONTENT_ERROR,
  error
});

module.exports = {
  fetchContentDetails,
  fetchContentDetailsSuccess,
  fetchContentDetailsError,
  clearContentDetails,
  enrollMyContent,
  enrollMyContentSuccess,
  enrollMyContentError,
  completeContent,
  completeContentSuccess,
  completeContentError,
  enrollAll,
  enrollAllSuccess,
  enrollAllError,
  updateLatestContentForUser,
  updateLatestContentForUserSuccess,
  updateLatestContentForUserError,
  markContentAsCompleted,
  markContentAsCompletedSuccess,
  markContentAsCompletedError,
  fetchAssessmentTest,
  fetchAssessmentTestSuccess,
  fetchAssessmentTestError,
  checkIfCorrectAnswer,
  checkIfCorrectAnswerSuccess,
  checkIfCorrectAnswerError,
  clearAssessmentData,
  getBadgeReady,
  getBadgeSuccess,
  getBadgeError,
  getRelatedContentReady,
  getRelatedContentSuccess,
  getRelatedContentError,
  clearCompletedContent,
  clearAssessmentAnswers,
  createContent,
  createContentSuccess,
  createContentError,
  updateContent,
  updateContentSuccess,
  updateContentError,
  fetchSectionContentList,
  fetchSectionContentListSuccess,
  fetchSectionContentListError,
  reorderContent,
  reorderContentSuccess,
  reorderContentError,
  deleteContent,
  deleteContentSuccess,
  deleteContentError,
  getDefaultQuestionType,
  getDefaultQuestionTypeSuccess,
  getDefaultQuestionTypeError,
  saveQuestion,
  saveQuestionSuccess,
  saveQuestionError,
  updateQuestion,
  updateQuestionSuccess,
  updateQuestionError,
  fetchAssessmentQuestions,
  fetchAssessmentQuestionsSuccess,
  fetchAssessmentQuestionsError,
  saveQuestionContent,
  saveQuestionContentSuccess,
  saveQuestionContentError,
  updateQuestionContent,
  updateQuestionContentSuccess,
  updateQuestionContentError,
  gamifyLearner,
  gamifyLearnerSuccess,
  gamifyLearnerError,
  gamifyLearnerAssessment,
  gamifyLearnerAssessmentSuccess,
  gamifyLearnerAssessmentError,
  clearGamifyLearnerAssessment,
  createRelatedContent,
  createRelatedContentSuccess,
  createRelatedContentError,
  deleteRelatedContent,
  deleteRelatedContentSuccess,
  deleteRelatedContentError
};
