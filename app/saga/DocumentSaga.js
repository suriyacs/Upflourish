import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { create, update, uploadDocument, uploadImage } from '../service/Document';
import {
  createDocumentSuccess,
  createDocumentError,
  updateDocumentSuccess,
  updateDocumentError
} from '../actions/document';
import { fetchSectionContents } from '../actions/section';

function* createDocument(action) {
  try {
    const { document } = action;
    const response = yield call(create, document);
    if (response !== '') {
      if (document.image) {
        yield call(uploadImage, document.learningPathId, response.id, document.image);
      }
      if (document.file) {
        yield call(uploadDocument, document.learningPathId, response.id, document.file);
      }
      yield put(createDocumentSuccess(response));
      yield put(fetchSectionContents(document.sectionId, ''));
      toast.success('Document created successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(createDocumentError(error));
  }
}

function* updateDocument(action) {
  try {
    const { document } = action;
    if (document.file) {
      const imageResponse = yield call(uploadDocument, document.learningPathId, document.documentId, document.file);
      if (document.image) {
        yield call(uploadImage, document.learningPathId, document.documentId, document.image);
      }
      if (imageResponse) {
        const response = yield call(update, document);
        yield put(updateDocumentSuccess(response));
        yield put(fetchSectionContents(document.sectionId, ''));
        toast.success('Document updated successfully');
      }
    } else {
      if (document.image) {
        yield call(uploadImage, document.learningPathId, document.documentId, document.image);
      }
      const response = yield call(update, document);
      yield put(updateDocumentSuccess(response));
      yield put(fetchSectionContents(document.sectionId, ''));
      toast.success('Document updated successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateDocumentError(error));
  }
}

module.exports = {
  createDocument,
  updateDocument
};
