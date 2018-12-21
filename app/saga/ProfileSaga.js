import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  getPersonalDetailInfo,
  updatePersonalDetailInfo,
  uploadProfile,
  addEmploymentInfo,
  getEmploymentInfo,
  updateEmploymentInfo,
  deleteEmploymentInfo,
  getEducationInfo,
  addEducationInfo,
  updateEducationInfo,
  deleteEducationInfo,
  getLearnerSkillInfo,
  getCompletedCourses,
  addSkillListInfo,
  getBadgeListInfo,
  getUserPointsInfo,
  getMasterSkillListInfo,
  getLearnerCertificateUrl,
  verifyCertificateFromToken,
  fetchIntrestedCategoriesService,
  createIntrestedCategoriesService
} from '../service/Profile';

import {
  getPersonalDetailSuccess,
  getPersonalDetailError,
  getEmploymentHistory,
  getEmploymentHistorySuccess,
  getEmploymentHistoryError,
  updateEmploymentHistorySuccess,
  updateEmploymentHistoryError,
  addEmploymentHistorySuccess,
  addEmploymentHistoryError,
  deleteEmploymentHistorySuccess,
  deleteEmploymentHistoryError,
  getEducationDetailSuccess,
  getEducationDetailError,
  getEducationDetail,
  addEducationDetailSuccess,
  addEducationDetailError,
  updateEducationDetailSuccess,
  updateEducationDetailError,
  deleteEducationDetailSuccess,
  deleteEducationDetailError,
  getLearnerSpecificSkillSuccess,
  getLearnerSpecificSkillError,
  addSelectedSkillSuccess,
  addSelectedSkillError,
  getLearnerSpecificSkill,
  getBadgeListSuccess,
  getBadgeListError,
  getUserPointsSuccess,
  getUserPointsError,
  getMasterSkillListSuccess,
  getMasterSkillListError,
  getCertificateFromTokenSuccess,
  getCertificateFromTokenError,
  verifyCertificateSuccess,
  verifyCertificateError,
  fetchCompletedCoursesSuccess,
  fetchCompletedCoursesError,
  fetchIntrestedCategoriesSuccess,
  fetchIntrestedCategoriesError,
  createIntrestedCategoriesSuccess,
  createIntrestedCategoriesError
} from '../actions/profile';

import { getStateFromStore } from '../utils/Common.js';
import { reduxConstant, rewardType } from '../globals/AppConstant';
import storage from '../globals/localStorage';

function* getPersonalDetail(action) {
  try {
    const response = yield call(getPersonalDetailInfo, action.userId);
    yield put(getPersonalDetailSuccess(response));
  } catch (e) {
    yield put(getPersonalDetailError(e));
  }
}

function* updatePersonalDetail(action) {
  try {
    let uploadedImageStatus = '';
    if (action.profileImage) {
      uploadedImageStatus = yield call(uploadProfile, action.profileImage, action.userId);
      action.updatedInfo.profile_path = uploadedImageStatus;
    }
    const response = yield call(updatePersonalDetailInfo, action.updatedInfo, action.userId);
    toast.success('Personal details updated successfully');
    yield put(getPersonalDetailSuccess(response));
  } catch (e) {
    yield put(getPersonalDetailError(e));
  }
}

function* getEmploymentHistoryDetail() {
  try {
    const response = yield call(
      getEmploymentInfo,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(getEmploymentHistorySuccess(response));
  } catch (e) {
    yield put(getEmploymentHistoryError(e));
  }
}

function* updateEmploymentHistory(action) {
  try {
    const response = yield call(
      updateEmploymentInfo,
      action.updatedInfo,
      action.id,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    toast.success('Employment history updated successfully');
    yield put(updateEmploymentHistorySuccess(response));
    yield put(getEmploymentHistory());
  } catch (e) {
    yield put(updateEmploymentHistoryError(e));
  }
}

function* deleteEmploymentHistory(action) {
  try {
    const response = yield call(
      deleteEmploymentInfo,
      action.employmentId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    toast.success('Employment history deleted successfully');
    yield put(deleteEmploymentHistorySuccess(response));
    yield put(getEmploymentHistory());
  } catch (e) {
    yield put(deleteEmploymentHistoryError(e));
  }
}

function* addEmploymentDetail(action) {
  try {
    const response = yield call(
      addEmploymentInfo,
      action.updatedInfo,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    toast.success('Employment details added successfully');
    yield put(addEmploymentHistorySuccess(response));
    yield put(getEmploymentHistory());
  } catch (e) {
    yield put(addEmploymentHistoryError(e));
  }
}

function* getEducationDetailList() {
  try {
    const response = yield call(
      getEducationInfo,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(getEducationDetailSuccess(response));
  } catch (e) {
    yield put(getEducationDetailError(e));
  }
}

function* addEducationDetail(action) {
  try {
    const response = yield call(
      addEducationInfo,
      action.updatedInfo,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    toast.success('Education details added successfully');
    yield put(addEducationDetailSuccess(response));
    yield put(getEducationDetail());
  } catch (e) {
    yield put(addEducationDetailError(e));
  }
}

function* updateEducationDetail(action) {
  try {
    const response = yield call(
      updateEducationInfo,
      action.updatedInfo,
      action.id,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    toast.success('Education details updated successfully');
    yield put(updateEducationDetailSuccess(response));
    yield put(getEducationDetail());
  } catch (e) {
    yield put(updateEducationDetailError(e));
  }
}

function* deleteEducationDetail(action) {
  try {
    const response = yield call(
      deleteEducationInfo,
      action.educationId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    toast.success('Education details deleted successfully');
    yield put(deleteEducationDetailSuccess(response));
    yield put(getEducationDetail());
  } catch (e) {
    yield put(deleteEducationDetailError(e));
  }
}

function* getLearnerSkillList() {
  try {
    const response = yield call(
      getLearnerSkillInfo,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(getLearnerSpecificSkillSuccess(response));
  } catch (e) {
    yield put(getLearnerSpecificSkillError(e));
  }
}

function* addSkillList(action) {
  try {
    const response = yield call(
      addSkillListInfo,
      action.updatedInfo,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    toast.success('Skill list updated successfully');
    yield put(addSelectedSkillSuccess(response));
    yield put(getLearnerSpecificSkill());
  } catch (e) {
    yield put(addSelectedSkillError(e));
  }
}

function* getBadgeList() {
  try {
    const response = yield call(
      getBadgeListInfo,
      {
        reward_type: rewardType.badge,
        user_id: storage.getItem('user')
      }
    );
    yield put(getBadgeListSuccess(response));
  } catch (e) {
    yield put(getBadgeListError(e));
  }
}

function* getUserPoints() {
  try {
    const response = yield call(
      getUserPointsInfo,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(getUserPointsSuccess(response));
  } catch (e) {
    yield put(getUserPointsError(e));
  }
}

function* getMasterSkillList(action) {
  try {
    const response = yield call(getMasterSkillListInfo, { searchTerm: action.searchTerm });
    yield put(getMasterSkillListSuccess(response));
  } catch (e) {
    yield put(getMasterSkillListError(e));
  }
}

function* getLearnerCertficate(action) {
  try {
    const response = yield call(getLearnerCertificateUrl, { token: action.token });
    yield put(getCertificateFromTokenSuccess(response));
  } catch (e) {
    yield put(getCertificateFromTokenError(e));
  }
}

function* verifyLearnerCertificate(action) {
  try {
    const { token } = action;
    const response = yield call(verifyCertificateFromToken, { token });
    yield put(verifyCertificateSuccess(response));
  } catch (e) {
    yield put(verifyCertificateError(e));
  } finally {
    const { generateSuccessStepsCB } = action;
    generateSuccessStepsCB();
  }
}

function* fetchCompletedCourses(action) {
  try {
    const { userId } = action;
    const response = yield call(
      getCompletedCourses,
      userId
    );
    yield put(fetchCompletedCoursesSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchCompletedCoursesError(error));
  }
}

function* fetchIntrestedCategoriesSaga() {
  try {
    const response = yield call(
      fetchIntrestedCategoriesService,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(fetchIntrestedCategoriesSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchIntrestedCategoriesError(error));
  }
}

function* createIntrestedCategoriesSaga(action) {
  try {
    const { categories } = action;
    const response = yield call(
      createIntrestedCategoriesService,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      categories
    );
    yield put(createIntrestedCategoriesSuccess(response));
    toast.success('Interested categories added successfully');
  } catch (error) {
    toast.error(error.message);
    yield put(createIntrestedCategoriesError(error));
  }
}

module.exports = {
  getPersonalDetail,
  updatePersonalDetail,
  getEmploymentHistoryDetail,
  updateEmploymentHistory,
  addEmploymentDetail,
  deleteEmploymentHistory,
  getEducationDetailList,
  addEducationDetail,
  updateEducationDetail,
  deleteEducationDetail,
  getLearnerSkillList,
  addSkillList,
  getBadgeList,
  getUserPoints,
  getMasterSkillList,
  getLearnerCertficate,
  verifyLearnerCertificate,
  fetchCompletedCourses,
  fetchIntrestedCategoriesSaga,
  createIntrestedCategoriesSaga
};
