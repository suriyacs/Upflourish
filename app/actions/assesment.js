import assesmentAction from '../constants/AssesmentAction';

const createAssesment = assesment => ({
  type: assesmentAction.ADD_ASSESMENT,
  assesment
});

const createAssesmentSuccess = response => ({
  type: assesmentAction.ADD_ASSESMENT_SUCCESS,
  response
});

const createAssesmentError = error => ({
  type: assesmentAction.ADD_ASSESMENT_ERROR,
  error
});

const updateAssesment = assesment => ({
  type: assesmentAction.UPDATE_ASSESMENT,
  assesment
});

const updateAssesmentSuccess = response => ({
  type: assesmentAction.UPDATE_ASSESMENT_SUCCESS,
  response
});

const updateAssesmentError = error => ({
  type: assesmentAction.UPDATE_ASSESMENT_ERROR,
  error
});

const getAssessment = assessmentId => ({
  type: assesmentAction.GET_ASSESSMENT,
  assessmentId
});

const getAssessmentSuccess = response => ({
  type: assesmentAction.GET_ASSESSMENT_SUCCESS,
  response
});

const getAssessmentError = error => ({
  type: assesmentAction.GET_ASSESSMENT_ERROR,
  error
});

const submitAssessment = assessmentData => ({
  type: assesmentAction.SUBMIT_ASSESSMENT,
  assessmentData
});

const submitAssessmentSuccess = response => ({
  type: assesmentAction.SUBMIT_ASSESSMENT_SUCCESS,
  response
});

const submitAssessmentError = error => ({
  type: assesmentAction.SUBMIT_ASSESSMENT_ERROR,
  error
});

const getAssessmentResult = assessmentId => ({
  type: assesmentAction.GET_ASSESSMENT_RESULT,
  assessmentId
});

const getAssessmentResultSuccess = response => ({
  type: assesmentAction.GET_ASSESSMENT_RESULT_SUCCESS,
  response
});

const getAssessmentResultError = error => ({
  type: assesmentAction.GET_ASSESSMENT_RESULT_ERROR,
  error
});

module.exports = {
  createAssesment,
  createAssesmentSuccess,
  createAssesmentError,
  updateAssesment,
  updateAssesmentSuccess,
  updateAssesmentError,
  getAssessment,
  getAssessmentSuccess,
  getAssessmentError,
  submitAssessment,
  submitAssessmentSuccess,
  submitAssessmentError,
  getAssessmentResult,
  getAssessmentResultSuccess,
  getAssessmentResultError
};
