import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  create,
  uploadImage,
  update
} from '../service/Book';
import {
  createBookSuccess,
  createBookError,
  updateBookSuccess,
  updateBookError
} from '../actions/book';
import { fetchSectionContents } from '../actions/section';

function* createBook(action) {
  try {
    const { book } = action;
    const response = yield call(create, book);
    if (response !== '') {
      if (book.file) {
        yield call(uploadImage, book.learningPathId, response.id, book.file);
      }
      yield put(createBookSuccess(response));
      yield put(fetchSectionContents(book.sectionId, ''));
      toast.success('Book created successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(createBookError(error));
  }
}

function* updateBook(action) {
  try {
    const { book } = action;
    if (book.file) {
      const imageResponse = yield call(uploadImage, book.learningPathId, book.bookId, book.file);
      if (imageResponse) {
        const response = yield call(update, book);
        yield put(updateBookSuccess(response));
        yield put(fetchSectionContents(book.sectionId, ''));
        toast.success('Book updated successfully');
      }
    } else {
      const response = yield call(update, book);
      yield put(updateBookSuccess(response));
      yield put(fetchSectionContents(book.sectionId, ''));
      toast.success('Book updated successfully');
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(updateBookError(error));
  }
}
module.exports = {
  createBook,
  updateBook
};
