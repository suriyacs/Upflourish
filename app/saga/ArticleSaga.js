import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { create, update, uploadImage } from '../service/Article';
import {
  createArticleSuccess,
  createArticleError,
  updateArticleSuccess,
  updateArticleError
} from '../actions/article';
import { fetchSectionContents } from '../actions/section';

function* createArticle(action) {
  try {
    const { article } = action;
    const response = yield call(create, article);
    if (response !== '') {
      if (article.file) {
        yield call(uploadImage, article.learningPathId, response.id, article.file);
      }
      yield put(createArticleSuccess(response));
      yield put(fetchSectionContents(article.sectionId, ''));
      toast.success('Article created successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(createArticleError(error));
  }
}

function* updateArticle(action) {
  try {
    const { article } = action;
    if (article.file) {
      const imageResponse = yield call(uploadImage, article.learningPathId, article.articleId, article.file);
      if (imageResponse) {
        const response = yield call(update, article);
        yield put(updateArticleSuccess(response));
        yield put(fetchSectionContents(article.sectionId, ''));
        toast.success('Article updated successfully');
      }
    } else {
      const response = yield call(update, article);
      yield put(updateArticleSuccess(response));
      yield put(fetchSectionContents(article.sectionId, ''));
      toast.success('Article updated successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateArticleError(error));
  }
}

module.exports = {
  createArticle,
  updateArticle
};
