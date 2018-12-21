import axios from 'axios/index';

const create = book => axios({
  method: 'post',
  url: '/Books',
  data: {
    title: book.name,
    link: book.link,
    description: book.about,
    learning_path_id: book.learningPathId,
    section_id: book.sectionId,
    minutes: book.minutes
  }
});

const uploadImage = (learningPathId, bookId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `/LearningPaths/${learningPathId}/book/${bookId}/thumbnail`,
  data
});

const update = book => axios({
  method: 'post',
  url: `/Books/${book.bookId}`,
  data: {
    title: book.name,
    link: book.link,
    description: book.about,
    learning_path_id: book.learningPathId,
    section_id: book.sectionId,
    minutes: book.minutes
  }
});

module.exports = {
  create,
  uploadImage,
  update
};
