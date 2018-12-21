import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { uploadImage } from '../service/LearningPath';
import {
  create,
  deleteSectionBySTId,
  getSectionById,
  updateSectionById,
  getSectionContents,
  updateSectionOrderById,
  enrollMySection,
  updateLatestSectionIdForUser,
  getSectionEnrollment
} from '../service/Section';
import {
  createSectionSuccess,
  createSectionError,
  deleteSectionSuccess,
  deleteSectionError,
  fetchSectionDetailsSuccess,
  fetchSectionDetailsError,
  updateSectionSuccess,
  updateSectionError,
  fetchSectionContentsSuccess,
  fetchSectionContentsError,
  updateSectionOrderSuccess,
  updateSectionOrderError,
  enrollSectionSuccess,
  enrollSectionError,
  updateLatestSectionForUserSuccess,
  updateLatestSectionForUserError,
  getSectionEnrollmentStatusSuccess,
  getSectionEnrollmentStatusError
} from '../actions/section';
import { fetchLearningPathSections } from '../actions/learningPath';
import { enrollMyContent, fetchContentDetails } from '../actions/content';
import { isCourseEnrolled } from '../actions/careerTrack';
import { reduxConstant } from '../globals/AppConstant';
import { getStateFromStore } from '../utils/Common.js';

function* createSection(action) {
  try {
    const { section, skillTrackId, cb } = action;
    const response = yield call(create, section, skillTrackId);
    if (response) {
      if (section.file) {
        section.coursetype = {
          apiName: 'Sections'
        };
        yield call(uploadImage, section, response.id);
      }
      yield put(createSectionSuccess(response));
      yield put(fetchLearningPathSections(skillTrackId, ''));
      cb('isCreateSection');
      toast.success('Section created successfully');
    }
  } catch (error) {
    toast.error(error.message);
    yield put(createSectionError(error));
  }
}

function* deleteSection(action) {
  try {
    const { sectionId, skillTrackId, cb } = action;
    const response = yield call(deleteSectionBySTId, sectionId, skillTrackId);
    yield put(deleteSectionSuccess(response));
    yield put(fetchLearningPathSections(skillTrackId, ''));
    cb('isDeleteSection');
    toast.success('Section removed successfully');
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(deleteSectionError(error));
  }
}

function* fetchSection(action) {
  try {
    const response = yield call(
      getSectionById,
      action.data,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(fetchSectionDetailsSuccess(response.section, response.unpublishedCount));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchSectionDetailsError(error));
  }
}

function* updateSection(action) {
  try {
    const { section, skillTrackId, cb } = action;
    const response = yield call(
      updateSectionById,
      section
    );
    if (response) {
      if (section.file) {
        section.coursetype = {
          apiName: 'Sections'
        };
        yield call(uploadImage, section, response.id);
      }
      yield put(updateSectionSuccess(response));
      yield put(fetchLearningPathSections(skillTrackId, ''));
      cb('isEditSection');
      toast.success('Section updated successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateSectionError(error));
  }
}

function* fetchSectionContents(action) {
  try {
    const response = yield call(
      getSectionContents,
      action,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(fetchSectionContentsSuccess(
      response.contents,
      response.unpublishedCount
    ));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchSectionContentsError(error));
  }
}

function* updateSectionOrder(action) {
  try {
    const { skillTrackId, sectionList } = action;
    const response = yield call(
      updateSectionOrderById,
      skillTrackId,
      sectionList
    );
    yield put(updateSectionOrderSuccess(response));
    yield put(fetchLearningPathSections(skillTrackId, ''));
  } catch (error) {
    toast.error(error.message);
    yield put(updateSectionOrderError(error));
  }
}

function* enrollSection(action) {
  try {
    const { enroll, additionalData, onClickViewSectionContents } = action;
    enroll.learnerId = yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId);
    const response = yield call(enrollMySection, enroll);
    toast.success(`Successfully enrolled into ${(enroll.sectionName).toLowerCase()}`);
    yield put(enrollSectionSuccess(response));
    if (additionalData && additionalData.isGeneralLogin) {
      yield put(isCourseEnrolled('microLearning', enroll.sectionId));
    } else if (onClickViewSectionContents) {
      onClickViewSectionContents(enroll.id, enroll.latestContent);
    }
  } catch (error) {
    toast.error(error.message);
    yield put(enrollSectionError(error));
  }
}

function* updateLatestSectionForUser(action) {
  try {
    const { learningPathId, sectionId } = action;
    const response = yield call(
      updateLatestSectionIdForUser,
      learningPathId,
      sectionId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(updateLatestSectionForUserSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(updateLatestSectionForUserError(error));
  }
}

function* getSectionEnrollmentStatus(action) {
  try {
    const { sectionId, contentId, contentType } = action;
    const response = yield call(
      getSectionEnrollment,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      sectionId,
      contentId
    );
    yield put(getSectionEnrollmentStatusSuccess(response));
    if (response && !response.isContentStarted) {
      yield put(enrollMyContent({
        sectionId,
        contentId,
        sectionEnrollmentId: response.sectionEnrolmentId,
        userId: yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userId),
        contentType
      }));
    } else {
      yield put(fetchContentDetails({
        contentType,
        sectionId,
        contentId
      }));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(getSectionEnrollmentStatusError(error));
  }
}

module.exports = {
  createSection,
  deleteSection,
  fetchSection,
  updateSection,
  fetchSectionContents,
  updateSectionOrder,
  enrollSection,
  updateLatestSectionForUser,
  getSectionEnrollmentStatus
};
