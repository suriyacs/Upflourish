import documentAction from '../constants/DocumentAction';

const createDocument = document => ({
  type: documentAction.ADD_DOCUMENT,
  document
});

const createDocumentSuccess = response => ({
  type: documentAction.ADD_DOCUMENT_SUCCESS,
  response
});

const createDocumentError = error => ({
  type: documentAction.ADD_DOCUMENT_ERROR,
  error
});

const updateDocument = document => ({
  type: documentAction.UPDATE_DOCUMENT,
  document
});

const updateDocumentSuccess = response => ({
  type: documentAction.UPDATE_DOCUMENT_SUCCESS,
  response
});

const updateDocumentError = error => ({
  type: documentAction.UPDATE_DOCUMENT_ERROR,
  error
});

module.exports = {
  createDocument,
  createDocumentSuccess,
  createDocumentError,
  updateDocument,
  updateDocumentSuccess,
  updateDocumentError
};
