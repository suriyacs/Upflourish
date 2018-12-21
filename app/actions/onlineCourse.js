import onlineCourseAction from '../constants/OnlineCourseAction';

const createOnlineCourse = onlineCourse => ({
  type: onlineCourseAction.ADD_ONLINE_COURSE,
  onlineCourse
});

const createOnlineCourseSuccess = response => ({
  type: onlineCourseAction.ADD_ONLINE_COURSE_SUCCESS,
  response
});

const createOnlineCourseError = error => ({
  type: onlineCourseAction.ADD_ONLINE_COURSE_ERROR,
  error
});

const updateOnlineCourse = onlineCourse => ({
  type: onlineCourseAction.UPDATE_ONLINE_COURSE,
  onlineCourse
});

const updateOnlineCourseSuccess = response => ({
  type: onlineCourseAction.UPDATE_ONLINE_COURSE_SUCCESS,
  response
});

const updateOnlineCourseError = error => ({
  type: onlineCourseAction.UPDATE_ONLINE_COURSE_ERROR,
  error
});

module.exports = {
  createOnlineCourse,
  createOnlineCourseSuccess,
  createOnlineCourseError,
  updateOnlineCourse,
  updateOnlineCourseSuccess,
  updateOnlineCourseError
};
