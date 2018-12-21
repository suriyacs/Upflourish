import goalAction from '../constants/GoalAction';

const getDailyGoals = () => ({
  type: goalAction.GET_DAILY_GOALS
});

const getDailyGoalsSuccess = response => ({
  type: goalAction.GET_DAILY_GOALS_SUCCESS,
  response
});

const getDailyGoalsError = error => ({
  type: goalAction.GET_DAILY_GOALS_ERROR,
  error
});

const updateDailyGoal = goal => ({
  type: goalAction.UPDATE_DAILY_GOAL,
  goal
});

const updateDailyGoalSuccess = response => ({
  type: goalAction.UPDATE_DAILY_GOAL_SUCCESS,
  response
});

const updateDailyGoalError = error => ({
  type: goalAction.UPDATE_DAILY_GOAL_ERROR,
  error
});

module.exports = {
  getDailyGoals,
  getDailyGoalsSuccess,
  getDailyGoalsError,
  updateDailyGoal,
  updateDailyGoalSuccess,
  updateDailyGoalError
};
