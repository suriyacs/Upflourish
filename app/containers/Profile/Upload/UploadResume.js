import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const UploadResume = ({
  locale,
  onDropAccepted,
  uploadResume,
  defaultFile
}) => (
  <div className="upload-resume">
    <div className="container-fluid">
      <div className="row align-items-center my-4 mx-2">
        <div className="col-12 col-md-8 col-lg-9">
          <div className="upload-resume-title">
            {locale.uploadLatestResume}
          </div>
          <div className="upload-resume-description py-2">
            {locale.uploadResumeDescription}
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3">
          <button
            className="btn proceed-btn mt-3 mt-md-0 float-md-right w-100"
            onClick={() => { uploadResume(); }}
            disabled={!defaultFile.name}
          >
            <span>
              {locale.proceed}
            </span>
            <span>
              <i className="fa fa-angle-right ml-2 right-angle" />
            </span>
          </button>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 drop-section">
          <div className="dotted-line m-3 m-lg-5">
            <Dropzone
              className="dragAndDropArea"
              onDropAccepted={onDropAccepted}
              accept=".doc, .docx, .pdf"
              multiple={false}
            >
              <div className="col-12 col-md-8 offset-md-2 my-4  c-pointer">
                <div className="text-center title mb-2">
                  {locale.dropTitle}
                </div>
                <div className="text-center sub-title mb-3">
                  {locale.dropSubTitle}
                </div>
                {
                  defaultFile.name &&
                  <div className="text-center title dropped-file mb-3">
                    {defaultFile.name}
                  </div>
                }
                <div className="text-center">
                  <button className="btn upload-btn">
                    {defaultFile.name ? locale.upateYourResume : locale.selectResume}
                  </button>
                </div>
              </div>
            </Dropzone>
          </div>
        </div>
      </div>
    </div>
  </div>
);

UploadResume.propTypes = {
  locale: PropTypes.object.isRequired,
  onDropAccepted: PropTypes.func.isRequired,
  uploadResume: PropTypes.func.isRequired,
  defaultFile: PropTypes.object.isRequired
};

export default UploadResume;
