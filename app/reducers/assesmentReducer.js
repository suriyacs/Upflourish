import { fromJS } from 'immutable';

import assesmentAction from '../constants/AssesmentAction';

const initialState = fromJS({
  loading: false,
  assesment: {},
  error: '',
  learnerAssessment: {},
  assessmentResult: {}
});

const assesmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case assesmentAction.ADD_ASSESMENT:
      return state.set('loading', true);
    case assesmentAction.ADD_ASSESMENT_SUCCESS:
      return state
        .set('loading', false)
        .set('assesment', action.response);
    case assesmentAction.ADD_ASSESMENT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case assesmentAction.UPDATE_ASSESMENT:
      return state.set('loading', true);
    case assesmentAction.UPDATE_ASSESMENT_SUCCESS:
      return state
        .set('loading', false)
        .set('assesment', action.response);
    case assesmentAction.UPDATE_ASSESMENT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case assesmentAction.GET_ASSESSMENT:
      return state.set('loadingLearnerAssessment', true);
    case assesmentAction.GET_ASSESSMENT_SUCCESS:
      return state
        .set('loadingLearnerAssessment', false)
        .set('learnerAssessment', action.response);
    case assesmentAction.GET_ASSESSMENT_ERROR:
      return state
        .set('loadingLearnerAssessment', false)
        .set('error', action.error);
    case assesmentAction.SUBMIT_ASSESSMENT:
      return state.set('submittingAssessment', true);
    case assesmentAction.SUBMIT_ASSESSMENT_SUCCESS:
      return state
        .set('submittingAssessment', false)
        .set('assessmentResult', action.response.assessmentResult);
    case assesmentAction.SUBMIT_ASSESSMENT_ERROR:
      return state
        .set('submittingAssessment', false)
        .set('error', action.error);
    case assesmentAction.GET_ASSESSMENT_RESULT:
      return state.set('loadingAssessmentResult', true);
    case assesmentAction.GET_ASSESSMENT_RESULT_SUCCESS:
      return state
        .set('loadingAssessmentResult', false)
        .set('assessmentResult', action.response.assessmentResult);
    case assesmentAction.GET_ASSESSMENT_RESULT_ERROR:
      return state
        .set('loadingAssessmentResult', false)
        .set('error', action.error);
    default:
      return state;
  }
};

export default assesmentReducer;
