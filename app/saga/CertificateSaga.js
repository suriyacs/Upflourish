import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  generatePassPhrase,
  retrieveCertificate,
  retrieveDownloadUrl,
  loadCertificate
} from '../service/Certificate';

import {
  createPassPhraseSuccess,
  createPassPhraseError,
  getCertificateSucces,
  getCertificateError,
  getDownloadURLSuccess,
  getDownloadURLError,
  uploadCertificate as uploadCertificateAction,
  uploadCertificateSuccess,
  uploadCertificateError
} from '../actions/certificate';
import { reduxConstant } from '../globals/AppConstant';
import { getStateFromStore } from '../utils/Common.js';

function* createPassPhrase(action) {
  try {
    const { passPhrase, closePopupCb, certificateId } = action;
    const response = yield call(
      generatePassPhrase,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      passPhrase
    );
    closePopupCb();
    toast.success('Wallet created successfully!');
    yield put(createPassPhraseSuccess(response));
    yield put(uploadCertificateAction(certificateId));
  } catch (error) {
    toast.error(error.message);
    yield put(createPassPhraseError(error));
  }
}

function* getCertificate(action) {
  try {
    const { courseId, uploadCB } = action;
    const response = yield call(
      retrieveCertificate,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      courseId
    );
    uploadCB(response);
    yield put(getCertificateSucces(response));
  } catch (error) {
    yield put(getCertificateError(error));
  }
}

function* getDownloadURL(action) {
  try {
    const { certificateId, triggerDownloadCB } = action;
    const response = yield call(
      retrieveDownloadUrl,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      certificateId
    );
    triggerDownloadCB(response);
    yield put(getDownloadURLSuccess());
  } catch (error) {
    toast.error(error.message);
    yield put(getDownloadURLError(error));
  }
}

function* uploadCertificate(action) {
  try {
    const { certificateId } = action;
    const response = yield call(
      loadCertificate,
      yield select(getStateFromStore, reduxConstant.userRedux, reduxConstant.roleId),
      certificateId
    );
    toast.success('Certificate successfully uploaded into blockchain!');
    yield put(uploadCertificateSuccess(response));
  } catch (error) {
    toast.error(error.message);
    yield put(uploadCertificateError(error));
  }
}

module.exports = {
  createPassPhrase,
  getCertificate,
  getDownloadURL,
  uploadCertificate
};
