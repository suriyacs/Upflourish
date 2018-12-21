import React, { Component } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Progress } from 'reactstrap';

import UploadResume from './UploadResume';
import Loader from '../../../components/Loader/Loader';
import UploadSkill from './SkillUpload';
import userActions from '../../../actions/user';

import ProfilePng from '../../../../assets/images/man.svg';

import '../../../../assets/styles/components/UploadResume.scss';

let formData = new FormData();

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      defaultFile: {
        name: ''
      },
      progressStep: 50,
      step: 1
    };
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.resumeStatus, prevProps.resumeStatus)) {
      this.skipResumeUpload();
    }
  }

  handleDrop = uploadedFiles => {
    formData = new FormData();
    this.setState({ defaultFile: uploadedFiles[0] });
    uploadedFiles.forEach(file => {
      formData.append('file', file, file.name);
    });
  };

  skipResumeUpload = () => {
    this.setState({
      step: 2,
      progressStep: 100
    });
  };

  uploadResume = () => {
    if (formData.has('file')) {
      this.props.uploadResume(formData);
    }
  };

  render() {
    const { defaultFile, progressStep, step } = this.state;
    const locale = this.props.locale.uploadResume;
    const { loading } = this.props;
    return (
      <div className="upload-section">
        <Loader loading={loading} />
        <div className="container-fluid header">
          <div className="row m-3 align-items-center">
            <div className="col-12 col-sm-6">
              <div className="steps-font">
                {step}/2 {locale.uploadSteps}
              </div>
              <div className="mt-2">
                <Progress className="steps-progress" value={progressStep} />
              </div>
            </div>
            {
              step === 1 &&
              <div className="col-12 col-sm-6">
                <div className="skip-font text-right">
                  <span
                    className="c-pointer"
                    role="presentation"
                    onClick={() => { this.skipResumeUpload(); }}
                  >
                    {locale.skip}
                  </span>
                </div>
                <div className="not-recommend text-right">
                  <span>
                    ({locale.notRecommended})
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="body">
          <div className="d-flex flex-column align-items-center">
            <img src={ProfilePng} alt="profile" className="profile-png" />
          </div>
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="title">
                {locale.title}
              </div>
            </div>
            <div className="row py-3">
              <div className="col-12 col-sm-8 offset-sm-2 content">
                {
                  step === 1 &&
                  <UploadResume
                    locale={locale}
                    onDropAccepted={this.handleDrop}
                    uploadResume={this.uploadResume}
                    defaultFile={defaultFile}
                  />
                }
                {
                  step === 2 &&
                  <UploadSkill />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Upload.propTypes = {
  uploadResume: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  resumeStatus: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  uploadResume: resumeObject => dispatch(userActions.uploadResume(resumeObject))
});

const mapStateToProps = state => ({
  loading: state.user.get('loading'),
  resumeStatus: state.user.get('resumeStatus')
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale)(Upload)));
