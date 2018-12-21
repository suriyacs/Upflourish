import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const getCareerTrackById = (roleType, roleId, careerTrackId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/careerTrack/${careerTrackId}`
});

const getSkillTrackByCareerTrack = (roleType, roleId, careerTrackId) => {
  let url = '';
  if (roleType === 'LEARNER') {
    url = `${apiConstant[roleType]}/${roleId}/careerTrack/${careerTrackId}/skillTracks`;
  } else {
    url = `${apiConstant.CAREERTRACKS}/${careerTrackId}/skillTracks`;
  }
  return axios({
    method: 'get',
    url
  });
};

const checkEnroll = (roleType, roleId, courseType, courseId) => {
  let type = courseType;
  if (courseType === 'skilltrack') {
    type = 'skillTrack';
  } else if (courseType === 'careertrack') {
    type = 'careerTrack';
  } else if (courseType === 'microlearning') {
    type = 'microLearning';
  }
  return axios({
    method: 'get',
    url: `${apiConstant[roleType]}/${roleId}/checkEnroll/${courseId}?type=${type}`
  });
};

const enrollMyCareerTrack = enroll => axios({
  method: 'post',
  url: '/EnrolmentCareerTrackProgresses',
  data: {
    learner_id: enroll.learnerId,
    user_id: enroll.userId,
    career_track_id: enroll.careerId,
    is_auto_enrolled: enroll.isOverview ? !enroll.isOverview : true
  }
});

const createSkillTrack = (careerTrackId, data) => axios({
  method: 'post',
  url: `CareerTracks/${careerTrackId}/skillTrack`,
  data
});

const updateSkillTrackById = courseDetail => axios({
  method: 'patch',
  url: `SkillTracks/${courseDetail.id}`,
  data: {
    id: courseDetail.id,
    name: courseDetail.name,
    description: courseDetail.description,
    category_id: courseDetail.category.id ? courseDetail.category.id : courseDetail.category
  }
});

const deleteCareerTrackById = (careerTrackId, skillTrackId) => axios({
  method: 'delete',
  url: `${apiConstant.CAREERTRACKS}/${careerTrackId}/skillTrack/${skillTrackId}`
});

const updateSkillTrackOrder = (careerTrackId, data) => axios({
  method: 'patch',
  url: `${apiConstant.CAREERTRACKS}/${careerTrackId}/skillTrack/order`,
  data
});

module.exports = {
  getCareerTrackById,
  getSkillTrackByCareerTrack,
  checkEnroll,
  enrollMyCareerTrack,
  createSkillTrack,
  updateSkillTrackById,
  deleteCareerTrackById,
  updateSkillTrackOrder
};
