import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  getCourseDetailsById,
  getSearchCourseList,
  getFilterSearchCourse,
  expertFilterSearchCourse
} from '../service/Course';
import { uploadImage } from '../service/LearningPath';
import {
  getCourseDetailsSuccess,
  getCourseDetailsError,
  searchCourseSuccess,
  searchCourseError,
  getSearchedCourseSuccess,
  getSearchedCourseError,
  updateMicrolearningSuccess,
  updateMicrolearningError,
  getExpertSearchedCourseSuccess,
  getExpertSearchedCourseError
} from '../actions/course';
import { fetchCourseDetailForExpert } from '../actions/learningPath';
import { updateSectionById } from '../service/Section';

function* getCourseDetails(action) {
  try {
    const { courseType, courseId } = action;
    const response = yield call(getCourseDetailsById, courseType, courseId);
    yield put(getCourseDetailsSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getCourseDetailsError(error));
  }
}

function* searchCourse(action) {
  try {
    const { searchTerm } = action;
    const response = yield call(getSearchCourseList, searchTerm);
    yield put(searchCourseSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(searchCourseError(error));
  }
}

function* getSearchedCourses(action) {
  try {
    const { filterData } = action;
    const response = yield call(getFilterSearchCourse, filterData);
    yield put(getSearchedCourseSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getSearchedCourseError(error));
  }
}

function* expertSearchedCourses(action) {
  try {
    const { filterData } = action;
    const response = yield call(expertFilterSearchCourse, filterData);
    yield put(getExpertSearchedCourseSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getExpertSearchedCourseError(error));
  }
}

function* updateMicrolearning(action) {
  try {
    const { microlearning, closePopupCb } = action;
    const response = yield call(
      updateSectionById,
      microlearning
    );
    if (response) {
      if (microlearning.file) {
        microlearning.coursetype = {
          apiName: 'Sections'
        };
        yield call(uploadImage, microlearning, response.id);
      }
      yield put(updateMicrolearningSuccess(response));
      yield put(fetchCourseDetailForExpert('Sections', response.id));
      closePopupCb();
      toast.success('Microlearning updated successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateMicrolearningError(error));
  }
}

module.exports = {
  getCourseDetails,
  searchCourse,
  getSearchedCourses,
  updateMicrolearning,
  expertSearchedCourses
};
