import recentHappeningsAction from '../constants/RecentHappeningsAction';

const fetchRecentHappenings = () => ({
  type: recentHappeningsAction.FETCH_ALL_RECENT_HAPPENINGS
});

const fetchRecentHappeningsSuccess = response => ({
  type: recentHappeningsAction.FETCH_ALL_RECENT_HAPPENINGS_SUCCESS,
  response
});

const fetchRecentHappeningsError = error => ({
  type: recentHappeningsAction.FETCH_ALL_RECENT_HAPPENINGS_ERROR,
  error
});

const fetchMyRecentHappenings = userId => ({
  type: recentHappeningsAction.FETCH_MY_RECENT_HAPPENINGS,
  userId
});

const fetchMyRecentHappeningsSuccess = response => ({
  type: recentHappeningsAction.FETCH_MY_RECENT_HAPPENINGS_SUCCESS,
  response
});

const fetchMyRecentHappeningsError = error => ({
  type: recentHappeningsAction.FETCH_MY_RECENT_HAPPENINGS_ERROR,
  error
});

const fetchRecentHappeningTypes = () => ({
  type: recentHappeningsAction.FETCH_RECENT_HAPPENING_TYPES
});

const fetchRecentHappeningTypesSuccess = response => ({
  type: recentHappeningsAction.FETCH_RECENT_HAPPENING_TYPES_SUCCESS,
  response
});

const fetchRecentHappeningTypesError = error => ({
  type: recentHappeningsAction.FETCH_RECENT_HAPPENING_TYPES_ERROR,
  error
});

const createRecentHappening = (categoryId, recentHappening, file, closeModal) => ({
  type: recentHappeningsAction.CREATE_RECENT_HAPPENING,
  categoryId,
  recentHappening,
  file,
  closeModal
});

const createRecentHappeningSuccess = response => ({
  type: recentHappeningsAction.CREATE_RECENT_HAPPENING_SUCCESS,
  response
});

const createRecentHappeningError = error => ({
  type: recentHappeningsAction.CREATE_RECENT_HAPPENING_ERROR,
  error
});

const editRecentHappening = (recentHappening, file, closeModal) => ({
  type: recentHappeningsAction.UPDATE_RECENT_HAPPENING,
  recentHappening,
  file,
  closeModal
});

const editRecentHappeningSuccess = response => ({
  type: recentHappeningsAction.UPDATE_RECENT_HAPPENING_SUCCESS,
  response
});

const editRecentHappeningError = error => ({
  type: recentHappeningsAction.UPDATE_RECENT_HAPPENING_ERROR,
  error
});

module.exports = {
  fetchRecentHappenings,
  fetchRecentHappeningsSuccess,
  fetchRecentHappeningsError,
  fetchMyRecentHappenings,
  fetchMyRecentHappeningsSuccess,
  fetchMyRecentHappeningsError,
  fetchRecentHappeningTypes,
  fetchRecentHappeningTypesSuccess,
  fetchRecentHappeningTypesError,
  createRecentHappening,
  createRecentHappeningSuccess,
  createRecentHappeningError,
  editRecentHappening,
  editRecentHappeningSuccess,
  editRecentHappeningError
};
