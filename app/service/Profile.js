import axios from 'axios/index';
import { apiConstant } from '../globals/AppConstant';

const getPersonalDetailInfo = userId => axios({
  method: 'get',
  url: `${apiConstant.USERS}/${userId}/${apiConstant.USERDETAILS}`
});

const updatePersonalDetailInfo = (data, userId) => axios({
  method: 'patch',
  url: `${apiConstant.USERS}/${userId}/${apiConstant.UPDATEPERSONALDETAIL}`,
  data
});

const uploadProfile = (data, userId) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `${apiConstant.USERS}/${userId}/${apiConstant.UPLOADPROFILE}`,
  data
});

const addEmploymentInfo = (data, roleId) => axios({
  method: 'post',
  url: `${apiConstant.LEARNEREMPLOYMENTS}/${roleId}/${apiConstant.EMPLOYMENT}`,
  data
});

const getEmploymentInfo = roleId => axios({
  method: 'get',
  url: `${apiConstant.LEARNEREMPLOYMENTS}/${roleId}/${apiConstant.EMPLOYMENT}`
});

const updateEmploymentInfo = (data, employmentId, roleId) => axios({
  method: 'patch',
  url: `${apiConstant.LEARNEREMPLOYMENTS}/${roleId}/${apiConstant.EMPLOYMENT}/${employmentId}`,
  data
});

const deleteEmploymentInfo = employmentId => axios({
  method: 'delete',
  url: `${apiConstant.LEARNEREMPLOYMENTS}/${apiConstant.EMPLOYMENT}/${employmentId}`
});

const getEducationInfo = roleId => axios({
  method: 'get',
  url: `${apiConstant.LEARNEREDUCATIONS}/${roleId}/${apiConstant.EDUCATION}`
});

const addEducationInfo = (data, roleId) => axios({
  method: 'post',
  url: `${apiConstant.LEARNEREDUCATIONS}/${roleId}/${apiConstant.EDUCATION}`,
  data
});

const updateEducationInfo = (data, educationId, roleId) => axios({
  method: 'patch',
  url: `${apiConstant.LEARNEREDUCATIONS}/${roleId}/${apiConstant.EDUCATION}/${educationId}`,
  data
});

const deleteEducationInfo = educationId => axios({
  method: 'delete',
  url: `${apiConstant.LEARNEREDUCATIONS}/${apiConstant.EDUCATION}/${educationId}`
});

const getLearnerSkillInfo = roleId => axios({
  method: 'get',
  url: `${apiConstant.LEARNERSKILLS}/${roleId}/${apiConstant.SUBLEARNERSKILLS}`
});

const addSkillListInfo = (data, roleId) => axios({
  method: 'post',
  url: `${apiConstant.LEARNERSKILLS}/${roleId}/${apiConstant.ADDLEARNERSKILLS}`,
  data
});

const getBadgeListInfo = data => axios({
  method: 'post',
  url: `${apiConstant.GAMIFICATION}/${apiConstant.USERREWARDS}`,
  data
});

const getUserPointsInfo = (roleType, roleId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/totalRewards`
});

const getMasterSkillListInfo = searchTerm => axios({
  method: 'get',
  url: `Skills/getMasterSkills?data=${JSON.stringify(searchTerm)}`
});

const getLearnerCertificateUrl = tokenObj => axios({
  method: 'get',
  url: `Learners/certificate/view/${tokenObj.token}`
});

const verifyCertificateFromToken = token => axios({
  method: 'get',
  url: `Learners/certificate/verify/${token.token}`
});

const getCompletedCourses = userId => axios({
  method: 'get',
  url: `Learners/${userId}/${apiConstant.COMPLETEDCOURSES}`
});

const fetchIntrestedCategoriesService = (roleType, roleId) => axios({
  method: 'get',
  url: `${apiConstant[roleType]}/${roleId}/${apiConstant.CATEGORIES}`
});

const createIntrestedCategoriesService = (roleType, roleId, data) => axios({
  method: 'post',
  url: `${apiConstant[roleType]}/${roleId}/interestedCategory`,
  data
});

module.exports = {
  getPersonalDetailInfo,
  updatePersonalDetailInfo,
  uploadProfile,
  getEmploymentInfo,
  updateEmploymentInfo,
  addEmploymentInfo,
  deleteEmploymentInfo,
  getEducationInfo,
  addEducationInfo,
  updateEducationInfo,
  deleteEducationInfo,
  getLearnerSkillInfo,
  addSkillListInfo,
  getBadgeListInfo,
  getUserPointsInfo,
  getMasterSkillListInfo,
  getLearnerCertificateUrl,
  verifyCertificateFromToken,
  getCompletedCourses,
  fetchIntrestedCategoriesService,
  createIntrestedCategoriesService
};
