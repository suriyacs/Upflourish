import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { create, uploadImage, update } from '../service/OnlineCourse';
import {
  createOnlineCourseSuccess,
  createOnlineCourseError,
  updateOnlineCourseSuccess,
  updateOnlineCourseError
} from '../actions/onlineCourse';
import { fetchSectionContents } from '../actions/section';

function* createOnlineCourse(action) {
  try {
    const { onlineCourse } = action;
    const response = yield call(create, onlineCourse);
    if (response !== '') {
      if (onlineCourse.file) {
        yield call(uploadImage, onlineCourse.learningPathId, response.id, onlineCourse.file);
      }
      yield put(createOnlineCourseSuccess(response));
      yield put(fetchSectionContents(onlineCourse.sectionId, ''));
      toast.success('Online Course created successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(createOnlineCourseError(error));
  }
}

function* updateOnlineCourse(action) {
  try {
    const { onlineCourse } = action;
    if (onlineCourse.file) {
      const imageResponse = yield call(
        uploadImage,
        onlineCourse.learningPathId,
        onlineCourse.courseId,
        onlineCourse.file
      );
      if (imageResponse) {
        const response = yield call(update, onlineCourse);
        yield put(updateOnlineCourseSuccess(response));
        yield put(fetchSectionContents(onlineCourse.sectionId, ''));
        toast.success('Online Course updated successfully');
      }
    } else {
      const response = yield call(update, onlineCourse);
      yield put(updateOnlineCourseSuccess(response));
      yield put(fetchSectionContents(onlineCourse.sectionId, ''));
      toast.success('Online Course updated successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateOnlineCourseError(error));
  }
}

module.exports = {
  createOnlineCourse,
  updateOnlineCourse
};
