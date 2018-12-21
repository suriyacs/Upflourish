import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const getRecentHappenings = () => axios({
  method: 'get',
  url: '/LatestHappenings'
});

const getMyRecentHappenings = userId => axios({
  method: 'get',
  url: `${apiConstant.USERS}/${userId}/${apiConstant.LATEST_HAPPENINGS}`
});

const getRecentHappeningTypes = () => axios({
  method: 'get',
  url: `${apiConstant.LATEST_HAPPENING_TYPES}`
});

const saveRecentHappening = (categoryId, data) => axios({
  method: 'post',
  url: `${apiConstant.CATEGORY}/${categoryId}/${apiConstant.LATEST_HAPPENINGS}`,
  data
});

const uploadImage = (recentHappeningId, data) => axios({
  method: 'post',
  url: `${apiConstant.LATEST_HAPPENING}/${recentHappeningId}/${apiConstant.THUMBNAIL}`,
  headers: { 'Content-Type': 'multipart/form-data' },
  data
});

const editRecentHappening = data => axios({
  method: 'patch',
  url: `${apiConstant.LATEST_HAPPENING}/${data.id}`,
  data
});

module.exports = {
  getRecentHappenings,
  getMyRecentHappenings,
  getRecentHappeningTypes,
  saveRecentHappening,
  uploadImage,
  editRecentHappening
};
