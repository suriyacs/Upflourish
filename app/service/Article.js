import axios from 'axios/index';

const create = article => axios({
  method: 'post',
  url: '/Articles',
  data: {
    title: article.name,
    link: article.link,
    description: article.about,
    learning_path_id: article.learningPathId,
    section_id: article.sectionId,
    minutes: article.minutes,
    is_iframe_enabled: article.isIframeEnabled
  }
});

const uploadImage = (learningPathId, articleId, data) => axios({
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
  url: `/LearningPaths/${learningPathId}/article/${articleId}/thumbnail`,
  data
});

const update = article => axios({
  method: 'post',
  url: `/Articles/${article.articleId}`,
  data: {
    title: article.name,
    link: article.link,
    description: article.about,
    learningPathId: article.learningPathId,
    sectionId: article.sectionId,
    minutes: article.minutes,
    is_iframe_enabled: article.isIframeEnabled
  }
});

module.exports = {
  create,
  update,
  uploadImage
};
