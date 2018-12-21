import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const create = (courseDetail, userId) => {
  let data = {};
  if (courseDetail.coursetype.name === 'Microlearning/Section') {
    data = {
      name: courseDetail.name,
      description: courseDetail.description,
      category_id: courseDetail.category,
      is_microlearning: courseDetail.isMicroLearning,
      owner_id: userId
    };
  } else {
    data = {
      name: courseDetail.name,
      description: courseDetail.description,
      category_id: courseDetail.category,
      owner_id: userId
    };
  }
  return axios({
    method: 'post',
    url: `${courseDetail.coursetype.apiName}`,
    data
  });
};

const uploadImage = (data, courseId) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `${data.coursetype.apiName}/${courseId}/thumbnail`,
  data: data.file
});

const getCourseList = (reqParam, roleType) => {
  console.log('reqParam', reqParam, 'roleType', roleType);
  // let data = {};
  // if (roleType === 'LEARNER') {
  //   data = {
  //     searchTerm: reqParam.searchTerm,
  //     limit: reqParam.limit || 10,
  //     offset: reqParam.offset || 0,
  //     orderByColumn: 'name',
  //     orderBy: 'ASC',
  //     category_id: reqParam.categoryId,
  //     sub_category_id: reqParam.subCategoryId
  //   };
  // } else {
  //   data = {
  //     searchTerm: reqParam
  //   };
  // }
  return axios({
    method: 'get',
    url: `${apiConstant.EXPERT}/${apiConstant.ALLCOURSES}`
  });
};

const getCourseDetails = (courseType, courseId) => axios({
  method: 'get',
  url: `/${courseType}/${courseId}`
});

const getLearningPathSections = (reqParam, roleType, roleId) => {
  let reqObj = {};
  if (roleType === 'LEARNER') {
    reqObj = {
      method: 'post',
      url: `${apiConstant[roleType]}/${roleId}/${apiConstant.SKILLTRACK}/` +
      `${reqParam.learningPathId}/${apiConstant.SECTIONS}`,
      data: {
        searchTerm: reqParam.searchTerm,
        learningPathId: reqParam.learningPathId,
        enrolmentId: reqParam.enrolmentId
      }
    };
  }
  if (roleType === 'EXPERT') {
    reqObj = {
      method: 'get',
      url: `/SkillTracks/${reqParam.learningPathId}/sections`
    };
  }
  return axios(reqObj);
};

const getLearningPathDetailsForLearner = (learningPathId, roleType, roleId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/${apiConstant.SKILLTRACK}/${learningPathId}`
});

const updateCourseById = (courseDetail, userId) => {
  let data = {};
  if (courseDetail.coursetype.name === 'Microlearning/Section') {
    data = {
      name: courseDetail.name,
      description: courseDetail.description,
      category_id: courseDetail.category,
      is_microlearning: courseDetail.isMicroLearning,
      owner_id: userId
    };
  } else {
    data = {
      name: courseDetail.name,
      description: courseDetail.description,
      category_id: courseDetail.category,
      owner_id: userId
    };
  }
  return axios({
    method: 'patch',
    url: `/${courseDetail.coursetype.apiName}/${courseDetail.courseId}`,
    data
  });
};

const publish = (courseType, courseId, roleType) => axios({
  method: 'patch',
  url: `${apiConstant[roleType]}/${courseType}/${courseId}/${apiConstant.PUBLISH}`
});

const getAllCategories = roleId => {
  const url = roleId ? `${apiConstant.EXPERT}/${roleId}/categories` : '/Categories';
  return axios({
    method: 'get',
    url,
    headers: {
      Authorization: ''
    }
  });
};

const getCurrentLearningPaths = (roleType, roleId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/${apiConstant.CURRENT_ENTROLLMENT}`
});

const enrollMyLearningPath = enroll => axios({
  method: 'post',
  url: '/Enrolments',
  data: {
    user_id: enroll.userId,
    skill_track_id: enroll.pathId,
    learner_id: enroll.learnerId,
    is_auto_enrolled: enroll.isOverview ? !enroll.isOverview : true
  }
});

const setInterestedCategories = (data, roleId) => axios({
  method: 'post',
  url: `${apiConstant.LEARNER}/${roleId}/${apiConstant.INTERESTCATEGORY}`,
  data: {
    user_id: data.userId,
    categoryIds: data.categoryIds
  }
});

const getAllLearningMaterials = subCategoryId => axios({
  method: 'get',
  url: `Categories/allLearningMaterial?id=${subCategoryId}`
});

const getAllLearningMaterialsByCategory = categoryId => axios({
  method: 'get',
  url: `Learners/allLearningMaterial/category?categoryId=${categoryId}`,
  headers: {
    Authorization: ''
  }
});

const topSkillTracks = (roleType, limit) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/topSkillTracks?limit=${limit}`
});

const latestSkillTracks = (roleType, limit) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/latestSkillTracks?limit=${limit}`
});

const trendingSkillTracks = (roleType, limit, days) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/trendingSkillTracks?limit=${limit}&days=${days}`
});

const getAllRecommendedLearnings = roleId => axios({
  method: 'get',
  url: `${apiConstant.LEARNER}/${roleId}/${apiConstant.GETRECOMMENDEDLEARNINGS}`
});

const getMicroLearningById = (learningPathId, roleType, roleId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/${apiConstant.MICROLEARNING}/${learningPathId}`
});

const getMyCourses = id => axios({
  method: 'get',
  url: `${apiConstant.EXPERT}/${id}/${apiConstant.ALLCOURSES}`
});

module.exports = {
  create,
  uploadImage,
  getCourseList,
  getCourseDetails,
  getLearningPathSections,
  getLearningPathDetailsForLearner,
  getCurrentLearningPaths,
  updateCourseById,
  publish,
  getAllCategories,
  enrollMyLearningPath,
  setInterestedCategories,
  getAllLearningMaterials,
  getAllLearningMaterialsByCategory,
  topSkillTracks,
  trendingSkillTracks,
  latestSkillTracks,
  getAllRecommendedLearnings,
  getMicroLearningById,
  getMyCourses
};
