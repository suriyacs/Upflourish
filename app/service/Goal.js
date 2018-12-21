import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const getDailyGoalStatus = (roleType, roleId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/goalStatus`
});

const updateMyDailyGoal = (roleType, roleId, goal) => axios({
  method: 'patch',
  url: `${apiConstant[roleType]}/${roleId}/goal/${goal.goalId}/update`,
  data: {
    id: goal.id,
    minutes: goal.minutes
  }
});

module.exports = {
  getDailyGoalStatus,
  updateMyDailyGoal
};
