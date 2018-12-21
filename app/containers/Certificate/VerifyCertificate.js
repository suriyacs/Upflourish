import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, SubmissionError } from 'redux-form';
import { translatable } from 'react-multilingual';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

import {
  createPassPhrase,
  getCertificate,
  getDownloadURL,
  uploadCertificate
} from '../../actions/certificate';
import TextField from '../../components/FormComponents/TextField';
import Certificate from './Certificate';
import { required, checkFieldLength, checkAlphaNumeric } from '../../utils/Validations';
import Loader from '../../components/Loader/Loader';

import '../../../assets/styles/components/Certificate.scss';
import CloseIcon from '../../../assets/images/close_grey.svg';

class VeriyCertificate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPhrasePopupOpen: false
    };
  }

  componentDidMount = () => {
    const { learner } = this.props.userDetails;
    const { courseId } = this.props.match.params;
    this.props.getCertificate(courseId, this.uploadCertificate);
    if (learner.is_blockchain_enabled && !learner.wallet_password) {
      this.openCreatePassPhrasePopup();
    }
  }

  uploadCertificate = certificate => {
    const { learner } = this.props.userDetails;
    if (learner.is_blockchain_enabled &&
      learner.wallet_password &&
      !certificate.is_blockchain_enabled) {
      this.props.uploadCertificate(certificate.id);
    }
  };

  openCreatePassPhrasePopup = () => {
    setTimeout(() => {
      this.setState({ isPhrasePopupOpen: true });
    }, 5000);
  };

  closeCreatePassPhrasePopup = () => {
    this.setState({ isPhrasePopupOpen: false });
  }

  passwordLength = checkFieldLength(9);

  generateIframeUrl = link => {
    if (link) {
      return `https://docs.google.com/viewer?url=${encodeURI(link)}&embedded=true`;
    }
  }

  handleSubmit = values => {
    if (values.phrase === values.confirm_phrase) {
      const { certificate } = this.props;
      this.props.createPassPhrase(values.phrase, this.closeCreatePassPhrasePopup, certificate.id);
    } else {
      throw new SubmissionError({
        _error: 'Password mismatch!'
      });
    }
  }

  triggerDownload = fileUrl => {
    const link = document.createElement('a');
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  downloadCertificate = () => {
    const { certificate } = this.props;
    this.props.getDownloadURL(certificate.id, this.triggerDownload);
  };

  render() {
    const {
      loading,
      handleSubmit,
      error,
      certificateLoader,
      locale,
      certificate,
      isInvalidCourse,
      uploadStatus
    } = this.props;
    const { isPhrasePopupOpen } = this.state;
    return (
      <div className="row certificate">
        <Loader loading={loading || certificateLoader} />
        <Certificate
          downloadCertificate={this.downloadCertificate}
          certificate={certificate}
          isInvalidCourse={isInvalidCourse}
          shareUrl={certificate.share_url ? certificate.share_url : uploadStatus.share_url}
        />
        <Modal
          modalClassName="min-h-100 profile-popup reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
          isOpen={isPhrasePopupOpen}
          centered={isPhrasePopupOpen}
        >
          <div className="pass-phrase-modal">
            <div className="d-flex flex-row heading align-items-center">
              <div className="col-10 col-md-10 title">
                {locale.certificate.generateWalletHeading}
              </div>
              <div className="col-2 admin">
                <span>
                  <img
                    role="presentation"
                    src={CloseIcon}
                    alt="close"
                    className="icon profile-popup-close-icon c-pointer"
                    onClick={() => { this.closeCreatePassPhrasePopup(); }}
                  />
                </span>
              </div>
            </div>
            <form className="phrase-form" onSubmit={handleSubmit(this.handleSubmit)}>
              <ModalBody>
                <div className="col-12 container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <TextField
                        name="phrase"
                        isLableRequired
                        htmlFor="Enter Phrase"
                        labelName="Enter Phrase"
                        type="password"
                        className="form-control profile-form-text-box"
                        validate={[required, this.passwordLength, checkAlphaNumeric]}
                      />
                    </div>
                    <div className="col-12">
                      <TextField
                        name="confirm_phrase"
                        isLableRequired
                        htmlFor="Confirm Phrase"
                        labelName="Confirm Phrase"
                        type="password"
                        className="form-control profile-form-text-box"
                        validate={[required]}
                      />
                    </div>
                  </div>
                </div>
                {error &&
                  <div className="contact-sales">
                    <span className="error">{error}</span>
                  </div>
                }
              </ModalBody>
              <ModalFooter className="py-2">
                <div className="container-fluid">
                  <button className="btn save-btn float-right">
                    {locale.certificate.save}
                  </button>
                </div>
              </ModalFooter>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

VeriyCertificate.propTypes = {
  loading: PropTypes.bool.isRequired,
  userDetails: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  createPassPhrase: PropTypes.func.isRequired,
  certificateLoader: PropTypes.bool.isRequired,
  getCertificate: PropTypes.func.isRequired,
  certificate: PropTypes.object.isRequired,
  getDownloadURL: PropTypes.func.isRequired,
  uploadCertificate: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  isInvalidCourse: PropTypes.bool.isRequired,
  uploadStatus: PropTypes.object.isRequired
};

VeriyCertificate.defaultProps = {
  error: ''
};

const mapStateToProps = state => ({
  loading: state.profile.get('loading'),
  userDetails: state.user.get('userDetails'),
  certificateLoader: state.certificate.get('loading'),
  passPhraseResponse: state.certificate.get('passPhraseResponse'),
  certificate: state.certificate.get('certificate'),
  isInvalidCourse: state.certificate.get('isInvalidCourse'),
  uploadStatus: state.certificate.get('uploadStatus')
});

const mapDispatchToProps = dispatch => ({
  createPassPhrase: (passPhrase, closeCreatePassPhrasePopupCb, certificateId) => dispatch(createPassPhrase(
    passPhrase,
    closeCreatePassPhrasePopupCb,
    certificateId
  )),
  getCertificate: (courseId, uploadCB) => dispatch(getCertificate(courseId, uploadCB)),
  getDownloadURL: (certificateId, cb) => dispatch(getDownloadURL(certificateId, cb)),
  uploadCertificate: certificateId => dispatch(uploadCertificate(certificateId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale)(reduxForm({
  form: 'PhraseGenerationForm'
})(VeriyCertificate)))));
