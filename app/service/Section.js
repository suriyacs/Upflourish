import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const create = (section, skillTrackId) => {
  let url = 'Sections';
  if (skillTrackId) {
    url = `/${apiConstant.SKILLTRACKS}/${skillTrackId}/${apiConstant.SECTION}`;
  }
  return axios({
    method: 'post',
    url,
    data: section
  });
};

const deleteSectionBySTId = (sectionId, skillTrackId) => axios({
  method: 'delete',
  url: `/${apiConstant.SKILLTRACKS}/${skillTrackId}/${apiConstant.SECTION}/${sectionId}`
});

const getSectionById = (data, roleType, roleId) => {
  let url = '';
  if (roleType === 'LEARNER') {
    url = `${apiConstant[roleType]}/${roleId}/${apiConstant.LEARNINGPATH}/` +
      `${data.pathId}/${apiConstant.SECTION}/${data.sectionId}`;
  } else {
    url = `${apiConstant[roleType]}/${apiConstant.LEARNINGPATH}/${data.pathId}/` +
      `${apiConstant.SECTION}/${data.sectionId}`;
  }
  return axios({
    method: 'get',
    url
  });
};

const updateSectionById = section => axios({
  method: 'patch',
  url: `/${apiConstant.ALL_SECTIONS}/${section.id}`,
  data: section
});

const getSectionContents = (reqParam, roleType, roleId) => {
  let data = {};
  let url = '';
  if (roleType === 'LEARNER') {
    data = {
      searchTerm: reqParam.searchTerm
    };
    url = `${apiConstant[roleType]}/${roleId}/` +
    `${apiConstant.SECTION}/${reqParam.sectionId}/${apiConstant.CONTENTLIST}`;
  } else {
    data = {
      learningPathId: reqParam.learningPathId,
      sectionId: reqParam.sectionId,
      searchTerm: reqParam.searchTerm
    };
    url = `${apiConstant[roleType]}/${apiConstant.CONTENTLIST}`;
  }
  return axios({
    method: 'post',
    url,
    data
  });
};

const updateSectionOrderById = (skillTrackId, data) => axios({
  method: 'patch',
  url: `/${apiConstant.SKILLTRACKS}/${skillTrackId}/${apiConstant.SECTION}/${apiConstant.ORDER}`,
  data
});

const enrollMySection = enroll => axios({
  method: 'post',
  url: '/EnrolmentSectionProgresses',
  data: {
    skill_track_id: enroll.pathId,
    section_id: enroll.sectionId,
    user_id: enroll.userId,
    learner_id: enroll.learnerId,
    is_auto_enrolled: enroll.isOverview ? !enroll.isOverview : true
  }
});

const updateLatestSectionIdForUser = (learningPathId, sectionId, roleType, roleId) => {
  const url = `${apiConstant[roleType]}/${roleId}/${apiConstant.SKILLTRACK}/` +
    `${learningPathId}/${apiConstant.SECTION}/${sectionId}/latestSection`;
  return axios({
    method: 'patch',
    url
  });
};

const getSectionEnrollment = (roleType, roleId, sectionId, contentId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/section/${sectionId}/content/${contentId}/status`
});

module.exports = {
  create,
  deleteSectionBySTId,
  getSectionById,
  updateSectionById,
  getSectionContents,
  updateSectionOrderById,
  enrollMySection,
  updateLatestSectionIdForUser,
  getSectionEnrollment
};
