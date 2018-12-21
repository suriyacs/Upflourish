import ArticleConstants from '../constants/ArticleAction';

const createArticle = article => ({
  type: ArticleConstants.ADD_ARTICLE,
  article
});

const createArticleSuccess = response => ({
  type: ArticleConstants.ADD_ARTICLE_SUCCESS,
  response
});

const createArticleError = error => ({
  type: ArticleConstants.ADD_ARTICLE_ERROR,
  error
});

const updateArticle = article => ({
  type: ArticleConstants.UPDATE_ARTICLE,
  article
});

const updateArticleSuccess = response => ({
  type: ArticleConstants.UPDATE_ARTICLE_SUCCESS,
  response
});

const updateArticleError = error => ({
  type: ArticleConstants.UPDATE_ARTICLE_ERROR,
  error
});

module.exports = {
  createArticle,
  createArticleSuccess,
  createArticleError,
  updateArticle,
  updateArticleSuccess,
  updateArticleError
};
