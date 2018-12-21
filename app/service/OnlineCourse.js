import axios from 'axios/index';

const create = onlineCourse => axios({
  method: 'post',
  url: '/Courses',
  data: {
    hours: onlineCourse.hours,
    minutes: onlineCourse.minutes,
    total_lectures: onlineCourse.noOfLecturers,
    learning_path_id: onlineCourse.learningPathId,
    section_id: onlineCourse.sectionId,
    link: onlineCourse.link,
    title: onlineCourse.name,
    description: onlineCourse.about
  }
});

const uploadImage = (learningPathId, onlineCourseId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `/LearningPaths/${learningPathId}/course/${onlineCourseId}/thumbnail`,
  data
});

const update = onlineCourse => axios({
  method: 'post',
  url: `/Courses/${onlineCourse.courseId}`,
  data: {
    hours: onlineCourse.hours,
    minutes: onlineCourse.minutes,
    total_lectures: onlineCourse.noOfLecturers,
    learning_path_id: onlineCourse.learningPathId,
    section_id: onlineCourse.sectionId,
    link: onlineCourse.link,
    title: onlineCourse.name,
    description: onlineCourse.about
  }
});

module.exports = {
  create,
  uploadImage,
  update
};
