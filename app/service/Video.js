import axios from 'axios/index';

const create = video => axios({
  method: 'post',
  url: '/Videos',
  data: {
    title: video.name,
    link: video.link,
    description: video.about,
    learning_path_id: video.learningPathId,
    section_id: video.sectionId,
    minutes: video.minutes
  }
});

const uploadImage = (learningPathId, videoId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `/LearningPaths/${learningPathId}/video/${videoId}/thumbnail`,
  data
});

const update = video => axios({
  method: 'post',
  url: `/Videos/${video.videoId}`,
  data: {
    title: video.name,
    link: video.link,
    description: video.about,
    learning_path_id: video.learningPathId,
    section_id: video.sectionId,
    minutes: video.minutes
  }
});

const uploadVideo = (learningPathId, videoId, data) => axios({
  method: 'post',
  url: `/LearningPaths/${learningPathId}/video/${videoId}/content`,
  headers: { 'Content-Type': 'multipart/form-data' },
  data
});

module.exports = {
  create,
  uploadImage,
  update,
  uploadVideo
};
