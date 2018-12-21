import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { create, update, uploadImage, getAssessmentById, submitAssessment, getResult } from '../service/Assesment';
import {
  createAssesmentSuccess,
  createAssesmentError,
  updateAssesmentSuccess,
  updateAssesmentError,
  getAssessmentSuccess,
  getAssessmentError,
  submitAssessmentSuccess,
  submitAssessmentError,
  getAssessmentResultSuccess,
  getAssessmentResultError
} from '../actions/assesment';
import { fetchSectionContents } from '../actions/section';
import { reduxConstant } from '../globals/AppConstant';
import { getStateFromStore } from '../utils/Common.js';

function* createAssesment(action) {
  try {
    const { assesment } = action;
    const response = yield call(create, assesment);
    if (response !== '') {
      yield put(createAssesmentSuccess(response));
      yield put(fetchSectionContents(assesment.section_id, ''));
      toast.success('Assesment created successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(createAssesmentError(error));
  }
}

function* updateAssesment(action) {
  try {
    const { assesment } = action;
    if (assesment.file) {
      const imageResponse = yield call(
        uploadImage,
        assesment.learningPathId,
        assesment.assesmentId,
        assesment.file
      );
      if (imageResponse) {
        const response = yield call(update, assesment);
        yield put(updateAssesmentSuccess(response));
        yield put(fetchSectionContents(assesment.sectionId, ''));
        toast.success('Assesment updated successfully');
      }
    } else {
      const response = yield call(update, assesment);
      yield put(updateAssesmentSuccess(response));
      yield put(fetchSectionContents(assesment.sectionId, ''));
      toast.success('Assesment updated successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateAssesmentError(error));
  }
}

function* getAssessment(action) {
  try {
    const { assessmentId } = action;
    const response = yield call(
      getAssessmentById,
      assessmentId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    if (response !== '') {
      yield put(getAssessmentSuccess(response));
    }
  } catch (err) {
    toast.error(err.message, {
      position: toast.POSITION_TOP_RIGHT
    });
    yield put(getAssessmentError(err));
  }
}

function* submitAssessmentAnswers(action) {
  try {
    const { assessmentData } = action;
    const response = yield call(submitAssessment, assessmentData);
    if (response !== '') {
      yield put(submitAssessmentSuccess(response));
    }
  } catch (err) {
    toast.error(err.message, {
      position: toast.POSITION_TOP_RIGHT
    });
    yield put(submitAssessmentError(err));
  }
}

function* getAssessmentResult(action) {
  try {
    const { assessmentId } = action;
    const response = yield call(
      getResult,
      assessmentId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    if (response !== '') {
      yield put(getAssessmentResultSuccess(response));
    }
  } catch (err) {
    toast.error(err.message, {
      position: toast.POSITION_TOP_RIGHT
    });
    yield put(getAssessmentResultError(err));
  }
}

module.exports = {
  createAssesment,
  updateAssesment,
  getAssessment,
  submitAssessmentAnswers,
  getAssessmentResult
};
