import axios from 'axios/index';

const getCourseDetailsById = (courseType, courseId) => {
  let type = '';
  if (courseType === 'skilltrack') {
    type = 'SkillTracks';
  } else if (courseType === 'careertrack') {
    type = 'CareerTracks';
  } else if (courseType === 'microlearning') {
    type = 'Sections';
  }
  return axios({
    method: 'get',
    url: `/${type}/${courseId}`
  });
};

const getSearchCourseList = searchTerm => axios({
  method: 'post',
  url: 'Learners/searchCourses',
  data: {
    searchTerm,
    limit: 10,
    offset: 0
  }
});

const getFilterSearchCourse = filterData => axios({
  method: 'post',
  url: 'Learners/searchCoursesWithFilter',
  data: {
    ...filterData,
    limit: 10,
    offset: 0
  }
});

const expertFilterSearchCourse = filterData => axios({
  method: 'post',
  url: 'Experts/searchCoursesWithFilter',
  data: {
    ...filterData,
    limit: 10,
    offset: 0
  }
});

module.exports = {
  getCourseDetailsById,
  getSearchCourseList,
  getFilterSearchCourse,
  expertFilterSearchCourse
};
