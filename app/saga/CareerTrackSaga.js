import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  getCareerTrackById,
  getSkillTrackByCareerTrack,
  checkEnroll,
  enrollMyCareerTrack,
  createSkillTrack,
  updateSkillTrackById,
  deleteCareerTrackById,
  updateSkillTrackOrder
} from '../service/CareerTrack';
import { uploadImage } from '../service/LearningPath';
import {
  fetchCareerTrackSuccess,
  fetchCareerTrackError,
  fetchSkillTracksByCTId as fetchSkillTrack,
  fetchSkillTracksByCTIdSuccess,
  fetchSkillTracksByCTIdError,
  isCourseEnrolled,
  isCourseEnrolledSuccess,
  isCourseEnrolledError,
  enrollMyCareerSuccess,
  enrollMyCareerError,
  checkIfDashboardCourseEnrolledSuccess,
  checkIfDashboardCourseEnrolledError,
  createSkillTrackByCareerTrackIdSuccess,
  createSkillTrackByCareerTrackIdError,
  updateSkillTrackSuccess,
  updateSkillTrackError,
  deleteSkillTrackSuccess,
  deleteSkillTrackError,
  updateSkillTrackOrderSuccess,
  updateSkillTrackOrderError
} from '../actions/careerTrack';
import { reduxConstant } from '../globals/AppConstant';
import { getStateFromStore } from '../utils/Common.js';

function* fetchCareerTrack(action) {
  try {
    const { careerTrackId } = action;
    const response = yield call(
      getCareerTrackById,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      careerTrackId
    );
    yield put(fetchCareerTrackSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchCareerTrackError(error));
  }
}

function* fetchSkillTracksByCTId(action) {
  try {
    const { careerTrackId } = action;
    const response = yield call(
      getSkillTrackByCareerTrack,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      careerTrackId
    );
    yield put(fetchSkillTracksByCTIdSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchSkillTracksByCTIdError(error));
  }
}

function* isCourseEnrolledSaga(action) {
  try {
    const { courseType, courseId } = action;
    const response = yield call(
      checkEnroll,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      courseType,
      courseId
    );
    yield put(isCourseEnrolledSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(isCourseEnrolledError(error));
  }
}

function* enrollMyCareer(action) {
  try {
    const { enroll } = action;
    enroll.learnerId = yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId);
    const response = yield call(enrollMyCareerTrack, enroll);
    toast.success('Successfully enrolled into this career');
    yield put(enrollMyCareerSuccess(response));
    yield put(isCourseEnrolled('careerTrack', enroll.careerId));
  } catch (error) {
    toast.error(error.message);
    yield put(enrollMyCareerError(error));
  }
}

function* checkIfDashboardCourseEnrolled(action) {
  try {
    const { courseType, courseId } = action;
    const response = yield call(
      checkEnroll,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      courseType,
      courseId
    );
    yield put(checkIfDashboardCourseEnrolledSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(checkIfDashboardCourseEnrolledError(error));
  }
}

function* createSkillTrackByCareerTrackId(action) {
  try {
    const { careerTrackId, courseDetail, closePopupCb } = action;
    const response = yield call(createSkillTrack, careerTrackId, courseDetail);
    if (response) {
      if (courseDetail.file) {
        courseDetail.coursetype = {
          apiName: 'SkillTracks'
        };
        yield call(uploadImage, courseDetail, response.id);
      }
      toast.success('Skill track created successfully!');
      yield put(createSkillTrackByCareerTrackIdSuccess(response));
      yield put(fetchSkillTrack(careerTrackId));
      closePopupCb('isCreateSkillTrack');
    }
  } catch (error) {
    toast.error(error.message);
    yield put(createSkillTrackByCareerTrackIdError(error));
  }
}

function* updateSkillTrack(action) {
  try {
    const { courseDetail, closePopupCb } = action;
    const response = yield call(updateSkillTrackById, courseDetail);
    if (response) {
      if (courseDetail.file) {
        courseDetail.coursetype = {
          apiName: 'SkillTracks'
        };
        yield call(uploadImage, courseDetail, response.id);
      }
      toast.success('Skill track updated successfully!');
      yield put(updateSkillTrackSuccess(response));
      yield put(fetchSkillTrack(courseDetail.careerTrackId));
      closePopupCb('isEditSkillTrack');
    }
  } catch (error) {
    toast.error(error.message);
    yield put(updateSkillTrackError(error));
  }
}

function* deleteSkillTrack(action) {
  try {
    const { skillTrackId, careerTrackId, closePopupCb } = action;
    const response = yield call(deleteCareerTrackById, careerTrackId, skillTrackId);
    yield put(deleteSkillTrackSuccess(response));
    toast.success('Skill track removed successfully!');
    yield put(fetchSkillTrack(careerTrackId));
    closePopupCb('isDeleteSkillTrack');
  } catch (error) {
    toast.error(error.message);
    yield put(deleteSkillTrackError(error));
  }
}

function* changeSkillTrackOrder(action) {
  try {
    const { careerTrackId, skillTrackList } = action;
    const response = yield call(
      updateSkillTrackOrder,
      careerTrackId,
      skillTrackList
    );
    yield put(updateSkillTrackOrderSuccess(response));
    yield put(fetchSkillTrack(careerTrackId));
  } catch (error) {
    toast.error(error.message);
    yield put(updateSkillTrackOrderError(error));
  }
}

module.exports = {
  fetchCareerTrack,
  fetchSkillTracksByCTId,
  isCourseEnrolledSaga,
  enrollMyCareer,
  checkIfDashboardCourseEnrolled,
  createSkillTrackByCareerTrackId,
  updateSkillTrack,
  deleteSkillTrack,
  changeSkillTrackOrder
};
