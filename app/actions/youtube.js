import youTubeAction from '../constants/YouTubeAction';

const createYouTubeVideo = video => ({
  type: youTubeAction.ADD_YOUTUBE_VIDEO,
  video
});

const createYouTubeVideoSuccess = response => ({
  type: youTubeAction.ADD_YOUTUBE_VIDEO_SUCCESS,
  response
});

const createYouTubeVideoError = error => ({
  type: youTubeAction.ADD_YOUTUBE_VIDEO_ERROR,
  error
});

module.exports = {
  createYouTubeVideo,
  createYouTubeVideoSuccess,
  createYouTubeVideoError
};
