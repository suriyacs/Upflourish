import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  create,
  uploadImage,
  getCourseList,
  getCourseDetails,
  getLearningPathSections,
  getLearningPathDetailsForLearner,
  updateCourseById,
  publish,
  getAllCategories,
  enrollMyLearningPath,
  getCurrentLearningPaths,
  getAllLearningMaterials,
  getAllLearningMaterialsByCategory,
  topSkillTracks,
  latestSkillTracks,
  trendingSkillTracks,
  getAllRecommendedLearnings,
  getMicroLearningById,
  getMyCourses
} from '../service/LearningPath';
import {
  fetchCourseList as getAllLearningPaths,
  createCourseSuccess,
  createCourseError,
  fetchCourseListSuccess,
  fetchCourseListError,
  fetchCourseDetailForExpertSuccess,
  fetchCourseDetailForExpertError,
  fetchLearningPathSectionsSuccess,
  fetchLearningPathSectionsError,
  fetchLearningPathDetailsForLearner,
  fetchLearningPathDetailsForLearnerSuccess,
  fetchLearningPathDetailsForLearnerError,
  updateCourseDetailSuccess,
  updateCourseDetailError,
  publishChangesSuccess,
  publishChangesError,
  fetchAllCategoriesSuccess,
  fetchAllCategoriesError,
  fetchCurrentLearningPathsSuccess,
  fetchCurrentLearningPathsError,
  enrollLearningPathSuccess,
  enrollLearningPathError,
  getAllLearningPathMaterialsSuccess,
  getAllLearningPathMaterialsError,
  getAllLearningPathMaterialsByCategorySuccess,
  getAllLearningPathMaterialsByCategoryError,
  getTopSkillTracksSuccess,
  getTopSkillTracksError,
  getLatestSkillTracksSuccess,
  getLatestSkillTracksError,
  getTrendingSkillTracksSuccess,
  getTrendingSkillTracksError,
  getRecommendedLearningsSuccess,
  getRecommendedLearningsError,
  fetchMicroLearningByIdSuccess,
  fetchMicroLearningByIdError,
  fetchMyCoursesSuccess,
  fetchMyCoursesError
} from '../actions/learningPath';
import { isCourseEnrolled } from '../actions/careerTrack';
import { reduxConstant } from '../globals/AppConstant';
import { getStateFromStore } from '../utils/Common.js';

function* createCourse(action) {
  try {
    const { learningPath, closePopupCb } = action;
    const response = yield call(
      create,
      learningPath,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userId)
    );
    if (response !== '') {
      if (learningPath.file) {
        yield call(uploadImage, learningPath, response.id);
      }
      yield put(createCourseSuccess(response));
      yield put(getAllLearningPaths(''));
      toast.success(`${learningPath.coursetype.name} created successfully`);
      closePopupCb();
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(createCourseError(error));
  }
}

function* fetchAllCourseList(action) {
  try {
    const { data } = action;
    const response = yield call(
      getCourseList,
      data,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole)
    );
    yield put(fetchCourseListSuccess(response));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchCourseListError(error));
  }
}

function* fetchCourseDetails(action) {
  try {
    const { careerTrackId, courseType } = action;
    const careerTrackDetail = yield call(getCourseDetails, courseType, careerTrackId);
    yield put(fetchCourseDetailForExpertSuccess(
      careerTrackDetail,
      careerTrackDetail.unpublishedCount || 0
    ));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchCourseDetailForExpertError(error));
  }
}

function* fetchLearningPathSections(action) {
  try {
    const learningPathSections = yield call(
      getLearningPathSections,
      action,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(fetchLearningPathSectionsSuccess(learningPathSections));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchLearningPathSectionsError(error));
  }
}

function* fetchLearningPathDetailsForLearnerSaga(action) {
  try {
    const { learningPathId } = action;
    const learningPathDetails = yield call(
      getLearningPathDetailsForLearner,
      learningPathId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(fetchLearningPathDetailsForLearnerSuccess(learningPathDetails));
    const enrolmentDetails = learningPathDetails.enrolment;
    if (enrolmentDetails && enrolmentDetails.id) {
      const learningPathSections =
        yield call(
          getLearningPathSections,
          { learningPathId, enrolmentId: enrolmentDetails ? enrolmentDetails.id : null, searchTerm: '' },
          yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
          yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
        );
      yield put(fetchLearningPathSectionsSuccess(learningPathSections));
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchLearningPathDetailsForLearnerError(error));
  }
}

function* updateCourse(action) {
  try {
    const { learningPath, closePopup } = action;
    if (learningPath.file) {
      yield call(uploadImage, learningPath, learningPath.courseId);
    }
    const response = yield call(
      updateCourseById,
      learningPath,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userId)
    );
    yield put(updateCourseDetailSuccess(response));
    yield put(getAllLearningPaths(''));
    toast.success('Learning Path Updated Successfully');
    closePopup('isEditCourse');
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateCourseDetailError(error));
  }
}

function* publishChanges(action) {
  try {
    const { courseType, courseId } = action;
    const publishResponse = yield call(
      publish,
      courseType,
      courseId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole)
    );
    yield put(publishChangesSuccess(publishResponse));
    toast.success('Changes published successfully');
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(publishChangesError(error));
  }
}

function* fetchCurrentLearningPaths(action) {
  try {
    const { roleId } = action;
    const response = yield call(
      getCurrentLearningPaths,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      roleId
    );
    yield put(fetchCurrentLearningPathsSuccess(response));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchCurrentLearningPathsError(error));
  }
}

function* fetchAllCategories(action) {
  try {
    const { isBasedOnRole } = action;
    const response = yield call(
      getAllCategories,
      isBasedOnRole ?
        yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId) :
        ''
    );
    yield put(fetchAllCategoriesSuccess(response));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchAllCategoriesError(error));
  }
}

function* enrollLearningPath(action) {
  try {
    const { enroll } = action;
    enroll.learnerId = yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId);
    const response = yield call(enrollMyLearningPath, enroll);
    yield put(enrollLearningPathSuccess(response));
    yield put(fetchLearningPathDetailsForLearner(enroll.pathId, enroll.userId));
    yield put(isCourseEnrolled('skillTrack', enroll.pathId));
    toast.success('Successfully enrolled into the skill track');
  } catch (error) {
    toast.error(error.message);
    yield put(enrollLearningPathError(error));
  }
}

function* getAllLearningPathMaterials(action) {
  try {
    const { subCategoryId } = action;
    const response = yield call(
      getAllLearningMaterials,
      subCategoryId
    );
    yield put(getAllLearningPathMaterialsSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getAllLearningPathMaterialsError(error));
  }
}

function* getAllLearningPathMaterialsByCategory(action) {
  try {
    const { categoryId } = action;
    const response = yield call(getAllLearningMaterialsByCategory, categoryId);
    yield put(getAllLearningPathMaterialsByCategorySuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getAllLearningPathMaterialsByCategoryError(error));
  }
}

function* getTopSkillTracks(action) {
  try {
    const { limit } = action;
    const response = yield call(
      topSkillTracks,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      limit
    );
    yield put(getTopSkillTracksSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getTopSkillTracksError(error));
  }
}

function* getLatestSkillTracks(action) {
  try {
    const { limit } = action;
    const response = yield call(
      latestSkillTracks,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      limit
    );
    yield put(getLatestSkillTracksSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getLatestSkillTracksError(error));
  }
}

function* getTrendingSkillTracks(action) {
  try {
    const { limit, days } = action;
    const response = yield call(
      trendingSkillTracks,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      limit,
      days
    );
    yield put(getTrendingSkillTracksSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getTrendingSkillTracksError(error));
  }
}

function* getRecommendedLearnings() {
  try {
    const response = yield call(
      getAllRecommendedLearnings,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(getRecommendedLearningsSuccess(response));
  } catch (e) {
    yield put(getRecommendedLearningsError(e));
  }
}

function* getMicroLearningByIdForLearner(action) {
  try {
    const { learningPathId } = action;
    const learningPathDetails = yield call(getMicroLearningById, learningPathId);
    yield put(fetchMicroLearningByIdSuccess(learningPathDetails));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchMicroLearningByIdError(error));
  }
}

function* fetchMyCourseList(action) {
  try {
    const { id } = action;
    const response = yield call(getMyCourses, id);
    yield put(fetchMyCoursesSuccess(response));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchMyCoursesError(error));
  }
}

module.exports = {
  createCourse,
  fetchAllCourseList,
  fetchCourseDetails,
  fetchLearningPathSections,
  fetchLearningPathDetailsForLearnerSaga,
  updateCourse,
  publishChanges,
  fetchAllCategories,
  enrollLearningPath,
  fetchCurrentLearningPaths,
  getAllLearningPathMaterials,
  getAllLearningPathMaterialsByCategory,
  getTopSkillTracks,
  getLatestSkillTracks,
  getTrendingSkillTracks,
  getRecommendedLearnings,
  getMicroLearningByIdForLearner,
  fetchMyCourseList
};
