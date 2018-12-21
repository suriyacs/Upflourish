import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const create = assesment => axios({
  method: 'post',
  url: '/Assessments',
  data: assesment
});

const uploadImage = (learningPathId, assesmentId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `/LearningPaths/${learningPathId}/assessment/${assesmentId}/thumbnail`,
  data
});

const update = assesment => axios({
  method: 'post',
  url: `/Assessments/${assesment.assesmentId}`,
  data: {
    title: assesment.name,
    link: assesment.link,
    description: assesment.about,
    learningPathId: assesment.learningPathId,
    sectionId: assesment.sectionId,
    minutes: assesment.minutes
  }
});

const getAssessmentById = (assesmentId, roleType, roleId) => {
  let url = '';
  if (roleType === 'LEARNER') {
    url = `${apiConstant[roleType]}/${roleId}/${apiConstant.ASSESSMENT}/${assesmentId}`;
  } else {
    url = `${apiConstant[roleType]}/${apiConstant.ASSESSMENT}/${assesmentId}`;
  }
  return axios({
    method: 'get',
    url
  });
};

const submitAssessment = assessmentData => axios({
  method: 'post',
  url: 'Assessments/submit',
  data: assessmentData
});

const getResult = (assesmentId, roleType, roleId) => {
  let url = '';
  if (roleType === 'LEARNER') {
    url = `${apiConstant[roleType]}/${roleId}/${apiConstant.ASSESSMENT}/${assesmentId}/${apiConstant.RESULT}`;
  } else {
    url = `${apiConstant[roleType]}/${apiConstant.ASSESSMENT}/${assesmentId}/${apiConstant.RESULT}`;
  }
  return axios({
    method: 'get',
    url
  });
};

module.exports = {
  create,
  update,
  uploadImage,
  getAssessmentById,
  getResult,
  submitAssessment
};
