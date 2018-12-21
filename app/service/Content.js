import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const getContentById = (
  contentType, contentId, sectionId,
  roleType, roleId
) => {
  let url = '';
  if (roleType === 'LEARNER') {
    const fixedUrl = `${apiConstant[roleType]}/${roleId}/` +
      `${apiConstant.SECTION}/${sectionId}/${apiConstant.CONTENT}/${contentId}`;
    url = fixedUrl + (contentType === apiConstant.ASSESSMENT ? `/${contentType}` : '');
  } else {
    url = `${apiConstant[roleType]}${contentType}/${contentId}`;
  }
  return axios({
    method: 'get',
    url
  });
};

const enrollMyContent = data => axios({
  method: 'post',
  url: '/EnrolmentContentProgresses',
  data: {
    section_id: data.sectionId,
    content_id: data.contentId,
    enrolment_section_id: data.sectionEnrollmentId,
    user_id: data.userId,
    learner_id: data.learnerId
  }
});

const completeMyContent = (data, roleType, roleId) => axios({
  method: 'post',
  url: `${apiConstant[roleType]}/${roleId}/${apiConstant.CONTENT_COMPLETE}`,
  data: {
    userId: data.userId,
    id: data.contentId
  }
});

const enrollAllFromMyPath = (data, roleType, roleId) => axios({
  method: 'post',
  url: `${apiConstant[roleType]}/${roleId}/${apiConstant.ENROLL}`,
  data: {
    userId: data.userId,
    learningPathId: data.pathId,
    sectionId: data.sectionId,
    contentId: data.sectionContentId
  }
});

const updateLatestContentIdForUser = (sectionId, contentId, roleType, roleId) => {
  const url = `${apiConstant[roleType]}/${roleId}/` +
  `${apiConstant.SECTION}/${sectionId}/${apiConstant.CONTENT}/${contentId}/latestContent`;
  return axios({
    method: 'patch',
    url
  });
};

const markAsComplete = (data, roleType, roleId) => {
  const url = `${apiConstant[roleType]}/${roleId}/` +
    `${apiConstant.SECTION}/${data.sectionId}/${apiConstant.CONTENT}/` +
    `${data.contentId}/contentComplete`;
  return axios({
    method: 'patch',
    url
  });
};

const getAssessmentTest = (data, roleType, roleId) => {
  const url = `${apiConstant[roleType]}/${roleId}/` +
    `${apiConstant.SECTION}/${data.sectionId}/${apiConstant.CONTENT}/` +
    `${data.contentId}/takeAssessment`;
  return axios({
    method: 'get',
    url
  });
};

const checkIfAnswerIsCorrect = (answerData, roleType, roleId) => {
  const {
    contentId,
    questionId,
    learnerAssessmentId,
    answerId,
    isFinalScore,
    questionNumber,
    sectionId
  } = answerData;
  let url;
  if (isFinalScore) {
    url = `${apiConstant[roleType]}/${roleId}/${apiConstant.SECTION}/${sectionId}/${apiConstant.CONTENT}/` +
    `${contentId}/checkAndSubmitAssessment`;
  } else {
    url = `${apiConstant[roleType]}/${roleId}/${apiConstant.CONTENT}/` +
    `${contentId}/submitQuestion`;
  }
  return axios({
    method: 'post',
    url,
    data: {
      questionId,
      learnerAssessmentId,
      answerId,
      questionNumber
    }
  });
};

const getRelatedContent = contentId => axios({
  method: 'get',
  url: `/Contents/${contentId}/relatedContent`
});

const createExpertContent = (data, sectionId) => axios({
  method: 'post',
  url: `${apiConstant.ALL_SECTIONS}/${sectionId}/${apiConstant.CREATECONTENT}`,
  data
});

const fetchSectionContents = sectionId => axios({
  method: 'get',
  url: `${apiConstant.ALL_SECTIONS}/${sectionId}/${apiConstant.CONTENT_LIST}`
});

const uploadContentImage = (contentId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `${apiConstant.CONTENTS}/${contentId}/thumbnail`,
  data
});

const updateSectionContent = data => axios({
  method: 'patch',
  url: `${apiConstant.CONTENTS}/${data.id}`,
  data
});

const uploadVideo = (contentId, data) => axios({
  method: 'post',
  url: `${apiConstant.CONTENTS}/${contentId}/${apiConstant.VIDEO}`,
  headers: { 'Content-Type': 'multipart/form-data' },
  data
});

const uploadDocument = (contentId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `${apiConstant.CONTENTS}/${contentId}/${apiConstant.DOCUMENT}`,
  data
});

const changeContentOrder = (sectionId, data) => axios({
  method: 'patch',
  url: `${apiConstant.ALL_SECTIONS}/${sectionId}/${apiConstant.CONTENT}/order`,
  data
});

const deleteContent = (sectionId, contentId) => axios({
  method: 'delete',
  url: `${apiConstant.ALL_SECTIONS}/${sectionId}/${apiConstant.CONTENT}/${contentId}`
});

const getQuestionType = () => axios({
  method: 'get',
  url: `${apiConstant.QUESTION_TYPES}/${apiConstant.DEFAULT}`
});

const saveAssesmentQuestion = (question, contentId) => axios({
  method: 'post',
  url: `${apiConstant.CONTENTS}/${contentId}/${apiConstant.CREATE_QUESTION}`,
  data: question
});

const fetchQuestions = contentId => axios({
  method: 'get',
  url: `${apiConstant.CONTENTS}/${contentId}/${apiConstant.LIST_QUESTIONS}`
});

const updateAssessmentQuestion = data => axios({
  method: 'patch',
  url: `${apiConstant.QUESTIONS}/${data.id}`,
  data
});

const gamifyLearnerService = (roleType, roleId, sectionId, contentId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/section/${sectionId}/content/${contentId}/gamification`
});

const gamifyLearnerAssessmentService = (roleType, roleId, questionId, answerId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/question/${questionId}/answer/${answerId}/gamification`
});

const saveRelatedContent = (data, contentId) => axios({
  method: 'post',
  url: `${apiConstant.CONTENTS}/${contentId}/${apiConstant.RELATED_CONTENT}`,
  data
});

const deleteRelatedContent = (contentId, relatedContentId) => axios({
  method: 'delete',
  url: `${apiConstant.CONTENTS}/${contentId}/${apiConstant.RELATED_CONTENT}/${relatedContentId}`
});

module.exports = {
  getContentById,
  enrollMyContent,
  completeMyContent,
  enrollAllFromMyPath,
  updateLatestContentIdForUser,
  markAsComplete,
  getAssessmentTest,
  checkIfAnswerIsCorrect,
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
};
