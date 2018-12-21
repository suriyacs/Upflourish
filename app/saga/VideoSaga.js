import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  create,
  uploadVideo,
  update,
  uploadImage
} from '../service/Video';
import {
  createVideoSuccess,
  createVideoError,
  updateVideoSuccess,
  updateVideoError
} from '../actions/video';
import { fetchSectionContents } from '../actions/section';

function* createVideo(action) {
  try {
    const { video } = action;
    const response = yield call(create, video);
    if (response !== '') {
      if (video.file) {
        yield call(uploadVideo, video.learningPathId, response.id, video.file);
      }
      if (video.image) {
        yield call(uploadImage, video.learningPathId, response.id, video.image);
      }
      yield put(createVideoSuccess(response));
      yield put(fetchSectionContents(video.sectionId, ''));
      toast.success('Video created successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(createVideoError(error));
  }
}

function* updateVideo(action) {
  try {
    const { video } = action;
    if (video.file) {
      const imageResponse = yield call(uploadVideo, video.learningPathId, video.videoId, video.file);
      if (video.image) {
        yield call(uploadImage, video.learningPathId, video.videoId, video.image);
      }
      if (imageResponse) {
        const response = yield call(update, video);
        yield put(updateVideoSuccess(response));
        yield put(fetchSectionContents(video.sectionId, ''));
        toast.success('video updated successfully');
      }
    } else {
      if (video.image) {
        yield call(uploadImage, video.learningPathId, video.videoId, video.image);
      }
      const response = yield call(update, video);
      yield put(updateVideoSuccess(response));
      yield put(fetchSectionContents(video.sectionId, ''));
      toast.success('video updated successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateVideoError(error));
  }
}

module.exports = {
  createVideo,
  updateVideo
};
