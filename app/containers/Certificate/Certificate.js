import React, { PureComponent, Fragment } from 'react';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import Confetti from 'react-confetti';

import { routeConstant } from '../../globals/AppConstant';
import TrophySvg from '../../../assets/images/trophy.svg';
import DownloadSvg from '../../../assets/images/download.svg';
import '../../../assets/styles/components/Certificate.scss';

class Certificate extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLinkCopied: false
    };
  }

  copyToClipboard = () => {
    if (!this.state.isLinkCopied) {
      const { certificate } = this.props;
      const textField = document.createElement('textarea');
      textField.innerText = certificate.share_url;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
      this.toggleLinkCopy();
      setTimeout(() => {
        this.toggleLinkCopy();
      }, 2000);
    }
  };

  toggleLinkCopy = () => {
    this.setState(({ isLinkCopied }) => ({
      isLinkCopied: !isLinkCopied
    }));
  };

  render() {
    const {
      locale,
      sharedCertificate,
      size,
      isShare,
      certificate,
      isInvalidToken,
      isInvalidCourse,
      shareUrl
    } = this.props;
    const { isLinkCopied } = this.state;
    const userName = certificate.user ? certificate.user.first_name : '';
    return (
      <div className="col-12">
        {
          !isInvalidToken && !isInvalidCourse && (certificate.user || sharedCertificate.user) &&
            <Fragment>
              <div className="col-12 col-md-10 offset-md-1 pt-5">
                <div className={`row ${isShare ? 'pt-5 mt-5' : ''}`}>
                  <div className="col-12 col-lg-6 download-section mt-5">
                    <div className="col-12 p-0">
                      <div className="trophy-image-section text-center col-12 col-lg-6 offset-lg-2 offset-xl-1">
                        <img src={TrophySvg} className="trophy-icon" alt="Won" />
                      </div>
                      <div className="col-12 col-lg-10 col-xl-9 congrats-text p-4 text-center">
                        {
                          isShare && sharedCertificate.user ?
                            `${sharedCertificate.user.first_name}
                              ${locale.certificate.completed} ${sharedCertificate.course.name}` :
                            `${locale.certificate.congratsMessage} ${userName} ${locale.certificate.earn}`
                        }
                      </div>
                      {
                        !isShare &&
                        <Fragment>
                          <div className="col-12 col-lg-10 col-xl-9 download-btn-section px-4">
                            <button
                              className="d-flex download-btn justify-content-center align-items-center c-pointer"
                              onClick={() => { this.props.downloadCertificate(); }}
                            >
                              <span className="label pr-2">
                                {locale.certificate.download}
                              </span>
                              <span>
                                <img src={DownloadSvg} className="download-icon" alt="Won" />
                              </span>
                            </button>
                          </div>
                          {
                            shareUrl &&
                            <Fragment>
                              <div className="share-section px-4 pt-3">
                                <div className="share-text pt-3">
                                  {locale.certificate.share}
                                </div>
                              </div>
                              <div
                                className="col-12 col-lg-10 col-xl-9 link-section px-4 c-pointer"
                                onClick={() => { this.copyToClipboard(); }}
                                role="presentation"
                                title={shareUrl}
                              >
                                {
                                  isLinkCopied &&
                                  <div className="copy-indicator">
                                    {locale.certificate.copied}
                                  </div>
                                }
                                <div
                                  className={
                                    `link-outer d-flex align-items-center justify-content-center ${!isLinkCopied ?
                                      'mt-3' : ''}`
                                  }
                                >
                                  <div className="link px-3">
                                    {shareUrl}
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          }
                          <div className="col-12 mt-3">
                            <a href={routeConstant.DASHBOARD} className="take-me-home col-12 pl-2">
                              {locale.certificate.takeMeHome}
                            </a>
                          </div>
                        </Fragment>
                      }
                      {
                        isShare &&
                        <div className="col-12 col-lg-10 col-xl-9 download-btn-section px-4">
                          <button
                            className="btn d-flex download-btn justify-content-center align-items-center c-pointer"
                            onClick={this.props.verify}
                          >
                            <span className="label pr-2">
                              {locale.certificate.verify}
                            </span>
                          </button>
                        </div>
                      }

                    </div>
                    {/* <button className="btn common-btn mt-3" >
                      {locale.certificate.verify}
                    </button> */}
                  </div>
                  <div className="col-12 col-lg-6 mt-5">
                    <div className="col-12 certificate-section">
                      <img
                        src="https://s3-us-west-2.amazonaws.com/udacity-printer/production/certificates/91f67b72-9353-4d68-90a7-11f799da1a7e.svg"
                        alt="certificate"
                        className="certificate-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Confetti {...size} numberOfPieces={250} recycle={false} />
            </Fragment>
        }

        { isInvalidToken &&
          <div className="error-section col-12 col-md-10 offset-md-1 pt-5">
            <div className="error invalid-token-error">
              {locale.certificate.invalidToken}
            </div>
          </div>
        }
        {
          isInvalidCourse &&
          <div className="error-section col-12 col-md-10 offset-md-1 pt-5">
            <div className="error pt-5">
              {locale.certificate.certNotFound}
            </div>
          </div>
        }
      </div>
    );
  }
}

Certificate.propTypes = {
  locale: PropTypes.object.isRequired,
  verify: PropTypes.func,
  size: PropTypes.object,
  isShare: PropTypes.bool,
  downloadCertificate: PropTypes.func,
  certificate: PropTypes.object,
  sharedCertificate: PropTypes.object,
  isInvalidToken: PropTypes.bool,
  isInvalidCourse: PropTypes.bool,
  shareUrl: PropTypes.string
};

Certificate.defaultProps = {
  size: null,
  isShare: false,
  downloadCertificate: null,
  certificate: {},
  sharedCertificate: {},
  isInvalidToken: false,
  isInvalidCourse: false,
  verify: null,
  shareUrl: ''
};

const ConfettiCertificate = sizeMe({
  monitorHeight: true,
  monitorWidth: true
})(Certificate);

// const mapStateToProps = state => ({
//   certificateUrl: state.profile.get('certificateUrl'),
//   isVerifiedCertificate: state.profile.get('isVerifiedCertificate'),
//   loading: state.profile.get('loading')
// });

// const mapDispatchToProps = dispatch => ({
//   getCertificateFromToken: token => dispatch(getCertificateFromToken(token)),
//   verifyCertificate: token => dispatch(verifyCertificate(token))
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VeriyCertificate));
export default withRouter(translatable(locale => locale)(ConfettiCertificate));
