import axios from 'axios/index';

const create = document => axios({
  method: 'post',
  url: '/Documents',
  data: {
    title: document.name,
    link: document.link,
    description: document.about,
    learning_path_id: document.learningPathId,
    section_id: document.sectionId,
    minutes: document.minutes
  }
});

const uploadImage = (learningPathId, documentId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `/LearningPaths/${learningPathId}/document/${documentId}/thumbnail`,
  data
});

const update = document => axios({
  method: 'post',
  url: `/Documents/${document.documentId}`,
  data: {
    title: document.name,
    link: document.link,
    description: document.about,
    learningPathId: document.learningPathId,
    sectionId: document.sectionId,
    minutes: document.minutes
  }
});

const uploadDocument = (learningPathId, documentId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `/LearningPaths/${learningPathId}/document/${documentId}/content`,
  data
});

module.exports = {
  create,
  update,
  uploadImage,
  uploadDocument
};
