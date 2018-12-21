import bookAction from '../constants/BookAction';

const createBook = book => ({
  type: bookAction.ADD_BOOK,
  book
});

const createBookSuccess = response => ({
  type: bookAction.ADD_BOOK_SUCCESS,
  response
});

const createBookError = error => ({
  type: bookAction.ADD_BOOK_ERROR,
  error
});

const updateBook = book => ({
  type: bookAction.UPDATE_BOOK,
  book
});

const updateBookSuccess = response => ({
  type: bookAction.UPDATE_BOOK_SUCCESS,
  response
});

const updateBookError = error => ({
  type: bookAction.UPDATE_BOOK_ERROR,
  error
});

module.exports = {
  createBook,
  createBookSuccess,
  createBookError,
  updateBook,
  updateBookSuccess,
  updateBookError
};
