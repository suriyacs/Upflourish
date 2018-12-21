import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { gamifyBadge, gamifyPoints, gamifyAssessmentMessage } from '../utils/GamifyToaster';

import {
  getContentById,
  enrollMyContent,
  completeMyContent,
  enrollAllFromMyPath,
  updateLatestContentIdForUser,
  markAsComplete,
  getAssessmentTest,
  checkIfAnswerIsCorrect,
  getbadge,
  getRelatedContent,
  createExpertContent,
  fetchSectionContents,
  uploadContentImage,
  updateSectionContent,
  uploadVideo,
  uploadDocument,
  changeContentOrder,
  deleteContent,
  getQuestionType,
  saveAssesmentQuestion,
  fetchQuestions,
  updateAssessmentQuestion,
  gamifyLearnerService,
  gamifyLearnerAssessmentService,
  saveRelatedContent,
  deleteRelatedContent
} from '../service/Content';
import {
  fetchContentDetails,
  fetchContentDetailsSuccess,
  fetchContentDetailsError,
  enrollMyContentSuccess,
  enrollMyContentError,
  completeContentSuccess,
  completeContentError,
  enrollAllSuccess,
  enrollAllError,
  updateLatestContentForUserSuccess,
  updateLatestContentForUserError,
  markContentAsCompletedError,
  markContentAsCompletedSuccess,
  fetchAssessmentTestSuccess,
  fetchAssessmentTestError,
  checkIfCorrectAnswerSuccess,
  checkIfCorrectAnswerError,
  getBadgeReady,
  getBadgeSuccess,
  getBadgeError,
  getRelatedContentSuccess,
  getRelatedContentError,
  createContentSuccess,
  createContentError,
  fetchSectionContentList,
  fetchSectionContentListSuccess,
  fetchSectionContentListError,
  updateContentSuccess,
  updateContentError,
  deleteContentSuccess,
  deleteContentError,
  reorderContentSuccess,
  reorderContentError,
  getDefaultQuestionTypeSuccess,
  getDefaultQuestionTypeError,
  saveQuestionSuccess,
  saveQuestionError,
  fetchAssessmentQuestionsSuccess,
  fetchAssessmentQuestionsError,
  updateQuestionSuccess,
  updateQuestionError,
  fetchAssessmentQuestions,
  fetchContentDetails as getContentDetails,
  gamifyLearner,
  gamifyLearnerSuccess,
  gamifyLearnerError,
  gamifyLearnerAssessment,
  gamifyLearnerAssessmentSuccess,
  gamifyLearnerAssessmentError,
  createRelatedContentSuccess,
  createRelatedContentError,
  getRelatedContentReady,
  deleteRelatedContentSuccess,
  deleteRelatedContentError
} from '../actions/content';

import { reduxConstant, badgeCompletionType } from '../globals/AppConstant';
import { getStateFromStore } from '../utils/Common.js';
import { getUserPointsReady } from '../actions/profile';
import { getSectionEnrollmentStatus } from '../actions/section';

function* fetchContentDetailsSaga(action) {
  try {
    const {
      contentType,
      contentId,
      sectionId
    } = action;
    const response = yield call(
      getContentById, contentType, contentId, sectionId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(fetchContentDetailsSuccess(response));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchContentDetailsError(error));
  }
}

function* enrollContent(action) {
  try {
    const { enroll } = action;
    enroll.learnerId = yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId);
    const response = yield call(enrollMyContent, enroll);
    yield put(enrollMyContentSuccess(response));
    yield put(getContentDetails({
      contentType: enroll.contentType,
      sectionId: enroll.sectionId,
      contentId: enroll.contentId
    }));
  } catch (error) {
    toast.error(error.message);
    yield put(enrollMyContentError(error));
  }
}

function* completeContent(action) {
  try {
    const { data } = action;
    const response = yield call(
      completeMyContent,
      data,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(completeContentSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(completeContentError(error));
  }
}

function* enrollAll(action) {
  try {
    const { data } = action;
    const response = yield call(
      enrollAllFromMyPath,
      data,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(enrollAllSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(enrollAllError(error));
  }
}

function* updateLatestContentForUser(action) {
  try {
    const { sectionId, contentId } = action;
    const response = yield call(
      updateLatestContentIdForUser,
      sectionId,
      contentId,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(updateLatestContentForUserSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(updateLatestContentForUserError(error));
  }
}

function* markContentAsCompleted(action) {
  try {
    const { contentCompletionData, redirectToCertificate } = action;
    const response = yield call(
      markAsComplete,
      contentCompletionData,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(markContentAsCompletedSuccess(response));
    const { contentType, sectionId, contentId } = contentCompletionData;
    yield put(getSectionEnrollmentStatus(sectionId, contentId));
    yield put(fetchContentDetails({ contentType, contentId, sectionId }));
    if (response.isCourseCompleted) {
      redirectToCertificate();
    }
    if (response && response.enrolmentSectionProgress.enrolment &&
      response.enrolmentSectionProgress.enrolment.is_completed) {
      yield put(getBadgeReady({
        type: badgeCompletionType.course,
        section_id: response.section_id,
        learner_id: response.learner_id
      }));
    }
    if (response && response.is_completed) {
      yield put(gamifyLearner(sectionId, contentId));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(markContentAsCompletedError(error));
  }
}

function* fetchAssessmentTest(action) {
  try {
    const { assessmentData } = action;
    const response = yield call(
      getAssessmentTest, assessmentData,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    yield put(fetchAssessmentTestSuccess(response));
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(fetchAssessmentTestError(error));
  }
}

function* checkIfAnswerCorrect(action) {
  try {
    const { answerData } = action;
    const response = yield call(
      checkIfAnswerIsCorrect, answerData,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId)
    );
    // After the whole quiz completion
    if (response.learnerAssessmentAnswers &&
      response.learnerAssessmentAnswers.length > 0 &&
      ((response.score / response.total_score) * 100 > 90)) {
      yield put(gamifyLearnerAssessment(
        answerData.questionId,
        answerData.answerId
      ));
      yield put(gamifyLearner(
        answerData.sectionId,
        answerData.contentId
      ));
    // Incorrect answer
    } else if (answerData.answerId !== null && answerData.answerId !== response.correct_answer_id) {
      gamifyAssessmentMessage(response.answer.comment);
    // Correct answer
    } else if (answerData.answerId !== null && answerData.answerId === response.correct_answer_id) {
      yield put(gamifyLearnerAssessment(
        answerData.questionId,
        answerData.answerId
      ));
      // Last question submission
      if (answerData.isFinalScore) {
        yield put(gamifyLearner(
          answerData.sectionId,
          answerData.contentId
        ));
      }
    }
    if (response.learnerAssessmentAnswers &&
      response.learnerAssessmentAnswers.length > 0) {
      const newResponse = response.learnerAssessmentAnswers[response.learnerAssessmentAnswers.length - 1];
      response.correctAnswer = newResponse.answer;
      response.lastQuestionScore = newResponse.score;
      yield put(checkIfCorrectAnswerSuccess(response));
      // To call here for content completion API
      // yield put(markContentAsCompleted({
      //   learningPathId: response.learningPathId,
      //   sectionId: response.sectionId,
      //   contentId: response.assessment_id
      // }));
    } else {
      yield put(checkIfCorrectAnswerSuccess(response));
    }
  } catch (error) {
    toast.error('Your answer was not submitted. Try again.', {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(checkIfCorrectAnswerError(error));
  }
}

function* getBadgeData(action) {
  try {
    const { data } = action;
    const response = yield call(
      getbadge,
      data,
    );
    yield put(getBadgeSuccess(response));
    if (response.length) {
      response.map(reward => (
        gamifyBadge(reward.details.imageUrl, reward.details.name, reward.details.description)
      ));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(getBadgeError(error));
  }
}

function* fetchRelatedContent(action) {
  try {
    const { contentId } = action;
    const response = yield call(getRelatedContent, contentId);
    yield put(getRelatedContentSuccess(response));
  } catch (error) {
    // toast.error(error.message);
    yield put(getRelatedContentError(error));
  }
}

function* createContentWithSection(action) {
  try {
    const { sectionId, content, file } = action;
    const response = yield call(createExpertContent, content, sectionId);
    if (response) {
      if (response.content_type === 'Video' && file) {
        yield call(uploadVideo, response.id, file);
      } else if (response.content_type === 'Document' && file) {
        yield call(uploadDocument, response.id, file);
      } else if (file) {
        yield call(uploadContentImage, response.id, file);
      }
    }
    yield put(fetchSectionContentList(sectionId));
    yield put(createContentSuccess(response));
    toast.success('Content created successfully');
  } catch (error) {
    toast.error(error.message);
    yield put(createContentError(error));
  }
}

function* getSectionContents(action) {
  try {
    const { sectionId } = action;
    const response = yield call(fetchSectionContents, sectionId);
    yield put(fetchSectionContentListSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchSectionContentListError(error));
  }
}

function* updateContentWithSection(action) {
  try {
    const { content, sectionId, file } = action;
    const response = yield call(updateSectionContent, content);
    if (response) {
      if (response.content_type === 'Video' && file) {
        yield call(uploadVideo, response.id, file);
      } else if (response.content_type === 'Document' && file) {
        yield call(uploadDocument, response.id, file);
      } else if (file) {
        yield call(uploadContentImage, response.id, file);
      }
    }
    yield put(fetchSectionContentList(sectionId));
    yield put(updateContentSuccess(response));
    toast.success('Content updated successfully');
  } catch (error) {
    toast.error(error.message);
    yield put(updateContentError(error));
  }
}

function* reorderContentList(action) {
  try {
    const { sectionId, contentOrder } = action;
    const response = yield call(changeContentOrder, sectionId, contentOrder);
    yield put(reorderContentSuccess(response));
    yield put(fetchSectionContentList(sectionId));
  } catch (error) {
    toast.error(error.message);
    yield put(reorderContentError(error));
  }
}

function* deleteContentBySectionId(action) {
  try {
    const { sectionId, contentId, closePopupCb } = action;
    const response = yield call(deleteContent, sectionId, contentId);
    yield put(deleteContentSuccess(response));
    yield put(fetchSectionContentList(sectionId));
    toast.success('Content removed successfully!');
    closePopupCb();
  } catch (error) {
    toast.error(error.message);
    yield put(deleteContentError(error));
  }
}

function* getDefaultQuestionType() {
  try {
    const response = yield call(getQuestionType);
    yield put(getDefaultQuestionTypeSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(getDefaultQuestionTypeError(error));
  }
}

function* saveQuestion(action) {
  try {
    const { question, contentId } = action;
    const response = yield call(saveAssesmentQuestion, question, contentId);
    yield put(saveQuestionSuccess(response));
    yield put(fetchAssessmentQuestions(contentId));
    toast.success('Question saved successfully');
  } catch (error) {
    toast.error(error.message);
    yield put(saveQuestionError(error));
  }
}

function* updateQuestion(action) {
  try {
    const { question, contentId } = action;
    const response = yield call(updateAssessmentQuestion, question);
    yield put(updateQuestionSuccess(response));
    yield put(fetchAssessmentQuestions(contentId));
    toast.success('Question updated successfully');
  } catch (error) {
    toast.error(error.message);
    yield put(updateQuestionError(error));
  }
}

function* getAssessmentQuestions(action) {
  try {
    const { contentId } = action;
    const response = yield call(fetchQuestions, contentId);
    yield put(fetchAssessmentQuestionsSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchAssessmentQuestionsError(error));
  }
}

function* gamifyLearnerSaga(action) {
  try {
    const { sectionId, contentId } = action;
    const response = yield call(
      gamifyLearnerService,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      sectionId,
      contentId
    );
    yield put(gamifyLearnerSuccess(response));
    // eslint-disable-next-line
    response && response.map(gamify => {
      if (gamify.details.score) {
        return gamifyPoints(
          gamify.details.score,
          gamify.name.includes('Content') ? 'content' : 'section'
        );
      }
      if (gamify.details.badgeId) {
        return gamifyBadge(gamify.details.imageUrl, gamify.details.name, gamify.details.description);
      }
      return null;
    });
    yield put(getUserPointsReady());
  } catch (error) {
    yield put(gamifyLearnerError(error));
  }
}

function* gamifyLearnerAssessmentSaga(action) {
  try {
    const { questionId, answerId } = action;
    const response = yield call(
      gamifyLearnerAssessmentService,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.userRole),
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      questionId,
      answerId
    );
    yield put(gamifyLearnerAssessmentSuccess(response));
    yield put(getUserPointsReady());
  } catch (error) {
    yield put(gamifyLearnerAssessmentError(error));
  }
}

function* createRelatedContent(action) {
  try {
    const { contentId, content, file } = action;
    const response = yield call(saveRelatedContent, content, contentId);
    if (response) {
      if (response.content_type === 'Video' && file) {
        yield call(uploadVideo, response.id, file);
      } else if (response.content_type === 'Document' && file) {
        yield call(uploadDocument, response.id, file);
      } else if (file) {
        yield call(uploadContentImage, response.id, file);
      }
    }
    yield put(getRelatedContentReady(contentId));
    yield put(createRelatedContentSuccess(response));
    toast.success('Content created successfully');
  } catch (error) {
    yield put(createRelatedContentError(error));
  }
}

function* deleteRelatedContentMapping(action) {
  try {
    const { contentId, relatedContentId } = action;
    const response = yield call(deleteRelatedContent, contentId, relatedContentId);
    yield put(getRelatedContentReady(contentId));
    yield put(deleteRelatedContentSuccess(response));
    toast.success('Content deleted successfully');
  } catch (error) {
    yield put(deleteRelatedContentError(error));
  }
}

module.exports = {
  fetchContentDetailsSaga,
  reorderContentList,
  enrollContent,
  completeContent,
  enrollAll,
  updateLatestContentForUser,
  deleteContentBySectionId,
  markContentAsCompleted,
  fetchAssessmentTest,
  checkIfAnswerCorrect,
  getBadgeData,
  fetchRelatedContent,
  createContentWithSection,
  getSectionContents,
  updateContentWithSection,
  getDefaultQuestionType,
  saveQuestion,
  getAssessmentQuestions,
  updateQuestion,
  gamifyLearnerSaga,
  gamifyLearnerAssessmentSaga,
  createRelatedContent,
  deleteRelatedContentMapping
};
