import videoAction from '../constants/VideoAction';

const createVideo = video => ({
  type: videoAction.ADD_VIDEO,
  video
});

const createVideoSuccess = response => ({
  type: videoAction.ADD_VIDEO_SUCCESS,
  response
});

const createVideoError = error => ({
  type: videoAction.ADD_VIDEO_ERROR,
  error
});

const updateVideo = video => ({
  type: videoAction.UPDATE_VIDEO,
  video
});

const updateVideoSuccess = response => ({
  type: videoAction.UPDATE_VIDEO_SUCCESS,
  response
});

const updateVideoError = error => ({
  type: videoAction.UPDATE_VIDEO_ERROR,
  error
});

module.exports = {
  createVideo,
  createVideoSuccess,
  createVideoError,
  updateVideo,
  updateVideoSuccess,
  updateVideoError
};
