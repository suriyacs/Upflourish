import React from 'react';
import PropTypes from 'prop-types';

import { socialMediaList, courseSection } from '../../globals/AppConstant';

import '../../../assets/styles/components/Course.scss';

const copyToClipboard = () => {
  const textField = document.createElement('textarea');
  textField.innerText = courseSection.productManagementUrl;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

const ShareLinkSection = ({ locale }) => (
  <div className="share-link-section" id="overview">
    <div className="container-fluid">
      <div className="row content pl-lg-4">
        <div className="col-12 offset-lg-1 col-lg-10">
          <div className="row">
            <div className="col-12 p-4 col-sm-5 right-section">
              <div className="label mb-4">
                {locale.overview.spreadLove}
              </div>
              <div className="social-media-label mb-2">
                {locale.overview.shareMedia}
              </div>
              <div className="row social-media-list mb-4">
                {
                  socialMediaList.map(socialMedia => (
                    <div
                      key={socialMedia.name}
                      className="col col-lg-2 mt-2"
                      title={socialMedia.name}
                    >
                      <img
                        src={`https://logo.clearbit.com/${socialMedia.url}`}
                        className="social-media-icon c-pointer"
                        alt="Google"
                      />
                    </div>
                  ))
                }
              </div>
              <div className="social-media-label mb-2">
                {locale.overview.shareLink}
              </div>
              <div className="input-group mt-2">
                <input
                  type="text"
                  className="form-control link-copy-box"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value="https://www.blockline.com/product-management"
                  readOnly
                />
                <div className="input-group-append">
                  <button
                    className="btn copy-button"
                    type="button"
                    onClick={() => { copyToClipboard(); }}
                  >
                    {locale.overview.copy}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ShareLinkSection.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ShareLinkSection;
