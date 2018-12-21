import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Steps, { Step } from 'rc-steps';
import { translatable } from 'react-multilingual';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

import { getCertificateFromToken, verifyCertificate } from '../../actions/profile';
import Certificate from './Certificate';
import CloseIcon from '../../../assets/images/close_grey.svg';
import GeneralHeader from '../LandingPage/GeneralHeader';
import { certificateVerifyUrl } from '../../globals/AppConstant';

import '../../../assets/styles/components/Certificate.scss';

class ShareCertificate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      isVerifyPopupOpen: false,
      successedSteps: 0,
      status: 'finish'
    };
  }

  componentDidMount = () => {
    const token = window.location.href.split('token=')[1];
    if (token) {
      this.setState({ token });
      this.props.getCertificateFromToken(token);
    }
  }

  getIcon = isError => {
    if (!isError) {
      return (
        <svg
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          width="26px"
          height="26px"
          viewBox="0 0 510 510"
          style={{ enableBackground: 'new 0 0 510 510' }}
        >
          <g id="check-circle">
            <path
              d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z
                M204,382.5L76.5,255l35.7-35.7
                      l91.8,91.8l193.8-193.8l35.7,35.7L204,382.5z"
              data-original="#000000"
              className="active-path"
              data-old_color="#1f9aff"
              fill="#1f9aff"
            />
          </g>
        </svg>
      );
    }
    return (
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 496.158 496.158"
        style={{ enableBackground: 'new 0 0 496.158 496.158' }}
        width="26px"
        height="26px"
      >
        <g>
          <path
            fill="#FF9F6E"
            d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.003,0,111.063,0,248.085
              c0,137.002,111.07,248.07,248.082,248.07C385.088,496.155,496.158,385.087,496.158,248.085z"
            data-original="#E04F5F"
            className="active-path"
            data-old_color="#ff9f6e"
          />
          <path
            fill="#FFFFFF"
            d="M277.042,248.082l72.528-84.196c7.91-9.182,
            6.876-23.041-2.31-30.951  c-9.172-7.904-23.032-6.876-30.947,2.306l-68.236,
            79.212l-68.229-79.212c-7.91-9.188-21.771-10.216-30.954-2.306  c-9.186,7.91-10.214,
            21.77-2.304,30.951l72.522,84.196l-72.522,84.192c-7.91,9.182-6.882,23.041,2.304,30.951  c4.143,
            3.569,9.241,5.318,14.316,5.318c6.161,0,12.294-2.586,16.638-7.624l68.229-79.212l68.236,79.212  c4.338,
            5.041,10.47,7.624,16.637,7.624c5.069,0,10.168-1.749,14.311-5.318c9.186-7.91,10.22-21.77,
            2.31-30.951L277.042,248.082z"
            data-original="#FFFFFF"
          />
        </g>
      </svg>
    );
  }

  generateSuccessSteps = () => {
    const { isVerifiedCertificate } = this.props;
    for (let i = 0; i < 3; i += 1) {
      setTimeout(() => {
        this.setState(({ successedSteps }) => ({
          successedSteps: successedSteps + 1,
          status: i === 0 && !isVerifiedCertificate ? 'error' : 'finish'
        }));
      }, i * 4000);
      if (i === 0 && !isVerifiedCertificate) {
        break;
      }
    }
  }

  openVerifyPopup = () => {
    this.setState({
      isVerifyPopupOpen: true
    });
  }

  closeVerifyPopup = () => {
    this.setState({
      isVerifyPopupOpen: false,
      successedSteps: 0,
      status: 'finish'
    });
  }

  verify = () => {
    const { token } = this.state;
    this.openVerifyPopup();
    this.props.verifyCertificate(token, this.generateSuccessSteps);
  }

  render() {
    const {
      certificateUrl,
      loading,
      locale,
      isVerifiedCertificate,
      isInvalidToken
    } = this.props;
    const {
      isVerifyPopupOpen,
      successedSteps,
      status
    } = this.state;
    const icons = {
      finish: this.getIcon(),
      error: this.getIcon(true)
    };
    return (
      <div className="container-fluid">
        <div className="row certificate share">
          <GeneralHeader isLanding />
          <Certificate
            sharedCertificate={certificateUrl}
            verify={this.verify}
            isShare
            isInvalidToken={isInvalidToken}
          />
          <Modal
            modalClassName="min-h-100 profile-popup reactstrab-modal"
            backdropClassName="modal-bg d-flex overlay-opacity"
            isOpen={isVerifyPopupOpen}
            centered={isVerifyPopupOpen}
          >
            <div className="pass-phrase-modal">
              <div className="d-flex flex-row heading align-items-center">
                <div className="col-10 col-md-10 title">
                  {locale.certificate.verifyPopupTitle}
                </div>
                <div className="col-2 admin">
                  {
                    !loading &&
                    <span>
                      <img
                        role="presentation"
                        src={CloseIcon}
                        alt="close"
                        className="icon profile-popup-close-icon c-pointer"
                        onClick={() => { this.closeVerifyPopup(); }}
                      />
                    </span>
                  }
                </div>
              </div>
              <ModalBody>
                <Steps current={successedSteps} status={status} icons={icons} direction="vertical">
                  {
                    locale.certificate.steps.map((value, index) => (
                      successedSteps >= index ?
                        <Step
                          key={value.title}
                          title={value.title}
                          description={index === 1 && !isVerifiedCertificate ?
                            'Certificate is not valid!' : value.description}
                        />
                        :
                            <Step
                              key={value.title}
                              title={value.title}
                            />
                    ))
                  }
                </Steps>
              </ModalBody>
              {
                successedSteps >= 2 &&
                <ModalFooter className="py-2">
                  <div className="container-fluid">
                    <a
                      className="save-btn verify-transaction float-right"
                      href={`${certificateVerifyUrl}/${certificateUrl.transaction_hash}`}
                      target="_blank"
                    >
                      {locale.certificate.verifyTransaction}
                    </a>
                  </div>
                </ModalFooter>
              }
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

ShareCertificate.propTypes = {
  certificateUrl: PropTypes.object.isRequired,
  getCertificateFromToken: PropTypes.func.isRequired,
  verifyCertificate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isVerifiedCertificate: PropTypes.bool,
  locale: PropTypes.object.isRequired,
  isInvalidToken: PropTypes.bool.isRequired
};

ShareCertificate.defaultProps = {
  isVerifiedCertificate: false
};

const mapStateToProps = state => ({
  certificateUrl: state.profile.get('certificateUrl'),
  isVerifiedCertificate: state.profile.get('isVerifiedCertificate'),
  loading: state.profile.get('loading'),
  isInvalidToken: state.profile.get('isInvalidToken')
});

const mapDispatchToProps = dispatch => ({
  getCertificateFromToken: token => dispatch(getCertificateFromToken(token)),
  verifyCertificate: (token, generateSuccessStepsCB) => dispatch(verifyCertificate(token, generateSuccessStepsCB))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)((translatable(locale => locale))(ShareCertificate)));
