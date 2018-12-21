import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getDailyGoalStatus, updateMyDailyGoal } from '../service/Goal';
import {
  getDailyGoalsSuccess,
  getDailyGoalsError,
  updateDailyGoalSuccess,
  updateDailyGoalError,
  getDailyGoals as getDailyGoalsAction
} from '../actions/goal';
import { getStateFromStore } from '../utils/Common.js';
import { reduxConstant } from '../globals/AppConstant';

function* getDailyGoals() {
  try {
    const response = yield call(
      getDailyGoalStatus,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(getDailyGoalsSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getDailyGoalsError(error));
  }
}

function* updateDailyGoal(action) {
  try {
    const { goal } = action;
    const response = yield call(
      updateMyDailyGoal,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      goal
    );
    yield put(updateDailyGoalSuccess(response));
    yield put(getDailyGoalsAction());
  } catch (error) {
    toast.error(error.message);
    yield put(updateDailyGoalError(error));
  }
}

module.exports = {
  getDailyGoals,
  updateDailyGoal
};
