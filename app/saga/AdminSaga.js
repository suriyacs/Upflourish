import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import storage from '../globals/localStorage';
import { setAuthToken } from '../globals/interceptors';

import {
  fetchExpertsSuccess,
  fetchExpertsError,
  inviteExpertSuccess,
  inviteExpertError,
  fetchExperts,
  deleteExpertSuccess,
  deleteExpertError,
  verifyTokenSuccess,
  verifyTokenError,
  expertSignUpSuccess,
  expertSignUpError,
  expertResendInviteSuccess,
  expertResendInviteError,
  fetchUserCategorySuccess,
  fetchUserCategoryError,
  updateUserCategorySuccess,
  updateUserCategoryError,
  createCategorySuccess,
  createCategoryError,
  updateCategorySuccess,
  updateCategoryError
} from '../actions/admin';

import {
  fetchExpertsService,
  inviteExpertService,
  deleteExpertService,
  verifyTokenService,
  expertSignInService,
  resendSignUpService,
  fetchUserCategoryService,
  updateUserCategoryService,
  createCategoryService,
  updateCategoryService
} from '../service/Admin';

import UserActions from '../actions/user';

function* getExperts(action) {
  try {
    const { data } = action;
    const response = yield call(fetchExpertsService, data);
    yield put(fetchExpertsSuccess(response));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchExpertsError(error));
  }
}

function* getUserCategory(action) {
  try {
    const { expertId } = action;
    if (expertId) {
      const response = yield call(fetchUserCategoryService, expertId);
      yield put(fetchUserCategorySuccess(response));
    } else {
      yield put(fetchUserCategorySuccess([]));
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchUserCategoryError(error));
  }
}

function* inviteExpert(action) {
  try {
    const { data } = action;
    const response = yield call(inviteExpertService, data);
    toast.success('Invite sent successfully!!', {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(inviteExpertSuccess(response));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(inviteExpertError(error));
  }
}

function* updateUserCategory(action) {
  try {
    const { data } = action;
    const response = yield call(updateUserCategoryService, data.userId, data.values);
    toast.success('User Category Updated successfully!!', {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateUserCategorySuccess(response));
    const params = {
      status: data.activeGrid,
      searchTerm: '',
      limit: '10',
      offset: '0'
    };
    yield put(fetchExperts(params));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateUserCategoryError(error));
  }
}

function* checkTokenStatus(action) {
  try {
    const { data } = action;
    const response = yield call(verifyTokenService, data);
    yield put(verifyTokenSuccess(response));
  } catch (error) {
    yield put(verifyTokenError(error));
  }
}

function* deleteExpert(action) {
  try {
    const { expert } = action;
    const response = yield call(deleteExpertService, expert.id);
    yield put(deleteExpertSuccess(response));
    toast.success(`${expert.first_name} deleted successfully`);
    const data = {
      status: expert.gridName,
      searchTerm: '',
      limit: '10',
      offset: '0'
    };
    yield put(fetchExperts(data));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(deleteExpertError(error));
  }
}

function* expertSignIn(action) {
  try {
    const { data } = action;
    const response = yield call(expertSignInService, data);
    if (response.userId !== '') {
      storage.setItem('user', response.userId);
      storage.setItem('accessToken', response.id);
      setAuthToken(response.id);
      yield put(expertSignUpSuccess(response));
      yield put(UserActions.onLoginUserSuccess((response.userId), (response.userData)));
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(expertSignUpError(error));
  }
}

function* expertResendInvite(action) {
  try {
    const { expert } = action;
    const response = yield call(resendSignUpService, expert);
    yield put(expertResendInviteSuccess(response));
    toast.success(`${expert.first_name} has been re-invited.`);
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(expertResendInviteError(error));
  }
}

function* createCategory(action) {
  try {
    const { category } = action;
    const response = yield call(createCategoryService, category);
    yield put(createCategorySuccess(response));
    toast.success('Category created successfully.');
  } catch (error) {
    toast.error(error.message);
    yield put(createCategoryError(error));
  }
}

function* updateCategory(action) {
  try {
    const { category } = action;
    const response = yield call(updateCategoryService, category);
    yield put(updateCategorySuccess(response));
    toast.success('Category updated successfully.');
  } catch (error) {
    toast.error(error.message);
    yield put(updateCategoryError(error));
  }
}

module.exports = {
  getExperts,
  inviteExpert,
  updateUserCategory,
  deleteExpert,
  checkTokenStatus,
  expertSignIn,
  expertResendInvite,
  getUserCategory,
  createCategory,
  updateCategory
};
