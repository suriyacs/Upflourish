import certificateConstant from '../constants/CertificateAction';

const createPassPhrase = (passPhrase, closePopupCb, certificateId) => ({
  type: certificateConstant.CREATE_PASS_PHRASE,
  passPhrase,
  closePopupCb,
  certificateId
});

const createPassPhraseSuccess = response => ({
  type: certificateConstant.CREATE_PASS_PHRASE_SUCCESS,
  response
});

const createPassPhraseError = error => ({
  type: certificateConstant.CREATE_PASS_PHRASE_ERROR,
  error
});

const getCertificate = (courseId, uploadCB) => ({
  type: certificateConstant.GET_CERTIFICATE,
  courseId,
  uploadCB
});

const getCertificateSucces = response => ({
  type: certificateConstant.GET_CERTIFICATE_SUCCESS,
  response
});

const getCertificateError = error => ({
  type: certificateConstant.GET_CERTIFICATE_ERROR,
  error
});

const getDownloadURL = (certificateId, triggerDownloadCB) => ({
  type: certificateConstant.GET_DOWNLOAD_URL,
  certificateId,
  triggerDownloadCB
});

const getDownloadURLSuccess = response => ({
  type: certificateConstant.GET_DOWNLOAD_URL_SUCCESS,
  response
});

const getDownloadURLError = error => ({
  type: certificateConstant.GET_DOWNLOAD_URL_ERROR,
  error
});

const uploadCertificate = certificateId => ({
  type: certificateConstant.UPLOAD_CERTIFICATE,
  certificateId
});

const uploadCertificateSuccess = response => ({
  type: certificateConstant.UPLOAD_CERTIFICATE_SUCCESS,
  response
});

const uploadCertificateError = error => ({
  type: certificateConstant.UPLOAD_CERTIFICATE_ERROR,
  error
});

module.exports = {
  createPassPhrase,
  createPassPhraseSuccess,
  createPassPhraseError,
  getCertificate,
  getCertificateSucces,
  getCertificateError,
  getDownloadURL,
  getDownloadURLSuccess,
  getDownloadURLError,
  uploadCertificate,
  uploadCertificateSuccess,
  uploadCertificateError
};
