import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { create } from '../service/YouTube';
import {
  createYouTubeVideoSuccess,
  createYouTubeVideoError
} from '../actions/youtube';
import { fetchSectionContents } from '../actions/section';

function* createYouTubeVideo(action) {
  try {
    const { video } = action;
    const response = yield call(create, video);
    yield put(createYouTubeVideoSuccess(response));
    yield put(fetchSectionContents(video.sectionId, ''));
    toast.success('YouTube video created successfully');
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(createYouTubeVideoError(error));
  }
}

module.exports = {
  createYouTubeVideo
};
