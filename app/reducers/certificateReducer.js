import { fromJS } from 'immutable';
import certificateConstant from '../constants/CertificateAction';

const initialState = fromJS({
  loading: false,
  passPhraseResponse: {},
  error: {},
  certificate: {},
  uploadStatus: {},
  isInvalidCourse: false
});

const CertificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case certificateConstant.CREATE_PASS_PHRASE:
      return state
        .set('loading', true);
    case certificateConstant.CREATE_PASS_PHRASE_SUCCESS:
      return state
        .set('loading', false)
        .set('passPhraseResponse', action.response);
    case certificateConstant.CREATE_PASS_PHRASE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case certificateConstant.GET_CERTIFICATE:
      return state
        .set('loading', true);
    case certificateConstant.GET_CERTIFICATE_SUCCESS:
      return state
        .set('loading', false)
        .set('certificate', action.response)
        .set('isInvalidCourse', false);
    case certificateConstant.GET_CERTIFICATE_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('isInvalidCourse', true)
        .set('certificate', {});
    case certificateConstant.GET_DOWNLOAD_URL:
    case certificateConstant.GET_DOWNLOAD_URL_SUCCESS:
    case certificateConstant.GET_DOWNLOAD_URL_ERROR:
    case certificateConstant.UPLOAD_CERTIFICATE:
      return state;
    case certificateConstant.UPLOAD_CERTIFICATE_SUCCESS:
      return state
        .set('loading', false)
        .set('uploadStatus', action.response);
    case certificateConstant.UPLOAD_CERTIFICATE_ERROR:
      return state
        .set('loading', false);
    default:
      return state;
  }
};

export default CertificateReducer;
