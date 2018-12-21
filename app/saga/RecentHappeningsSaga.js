import { call, put } from 'redux-saga/effects';

import {
  getRecentHappenings,
  getMyRecentHappenings,
  getRecentHappeningTypes,
  saveRecentHappening,
  uploadImage,
  editRecentHappening
} from '../service/RecentHappenings';

import {
  fetchRecentHappeningsSuccess,
  fetchRecentHappeningsError,
  fetchMyRecentHappeningsSuccess,
  fetchMyRecentHappeningsError,
  fetchRecentHappeningTypesSuccess,
  fetchRecentHappeningTypesError,
  createRecentHappeningSuccess,
  createRecentHappeningError,
  fetchMyRecentHappenings as myRecentHappenings,
  editRecentHappeningSuccess,
  editRecentHappeningError
} from '../actions/recentHappenings';

function* fetchAllRecentHappenings() {
  try {
    const response = yield call(getRecentHappenings);
    yield put(fetchRecentHappeningsSuccess(response));
  } catch (e) {
    yield put(fetchRecentHappeningsError(e));
  }
}

function* fetchMyRecentHappenings(action) {
  try {
    const { userId } = action;
    const response = yield call(getMyRecentHappenings, userId);
    yield put(fetchMyRecentHappeningsSuccess(response));
  } catch (e) {
    yield put(fetchMyRecentHappeningsError(e));
  }
}

function* fetchRecentHappeningTypes() {
  try {
    const response = yield call(getRecentHappeningTypes);
    yield put(fetchRecentHappeningTypesSuccess(response));
  } catch (e) {
    yield put(fetchRecentHappeningTypesError(e));
  }
}

function* createRecentHappening(action) {
  try {
    const {
      categoryId,
      recentHappening,
      file,
      closeModal
    } = action;
    const response = yield call(saveRecentHappening, categoryId, recentHappening);
    if (file) {
      yield call(uploadImage, response.id, file);
    }
    yield put(createRecentHappeningSuccess(response));
    yield put(myRecentHappenings(response.owner_id));
    if (typeof closeModal === 'function') {
      closeModal(false);
    }
  } catch (e) {
    yield put(createRecentHappeningError(e));
  }
}

function* updateRecentHappening(action) {
  try {
    const { recentHappening, file, closeModal } = action;
    const response = yield call(editRecentHappening, recentHappening);
    if (file) {
      yield call(uploadImage, response.id, file);
    }
    yield put(editRecentHappeningSuccess(response));
    yield put(myRecentHappenings(response.owner_id));
    if (typeof closeModal === 'function') {
      closeModal(false);
    }
  } catch (e) {
    yield editRecentHappeningError(e);
  }
}

module.exports = {
  fetchAllRecentHappenings,
  fetchMyRecentHappenings,
  fetchRecentHappeningTypes,
  createRecentHappening,
  updateRecentHappening
};
