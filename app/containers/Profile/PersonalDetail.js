import React from 'react';
import PropTypes from 'prop-types';
// import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';

import userActions from '../../actions/user';
import ImageURL from '../../components/Image/ImageURL';
import { getPersonalDetail } from '../../actions/profile';

import PencilIcon from '../../../assets/images/pencil.svg';
import ProfilePng from '../../../assets/images/man.svg';

// let formData = new FormData();

class PersonalDetail extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     defaultFile: {
  //       name: ''
  //     }
  //   };
  // }

  componentDidMount() {
    this.props.getPersonalDetail(this.props.userId);
  }

  // handleDrop = uploadedFiles => {
  //   formData = new FormData();
  //   this.setState({ defaultFile: uploadedFiles[0] });
  //   uploadedFiles.forEach(file => {
  //     formData.append('file', file, file.name);
  //   });
  // };

  // uploadResume = () => {
  //   if (formData.has('file')) {
  //     this.props.uploadResume(formData);
  //   }
  // };

  render() {
    // const { defaultFile } = this.state;
    const { personalDetail } = this.props;
    const locale = this.props.locale.profile;
    return (
      <div id="personal">
        <h3 className="heading m-10px-0px">{locale.personalDetailSection.title}</h3>
        <div className="profile-common-container personal-detail">
          <div className="d-flex flex-column justify-content-around m-30">
            <div className="d-flex flex-row justify-content-around border-bottom">
              <div className="d-flex flex-column flex-sm-row">
                <div className="learner-image m-b-20">
                  <img
                    src={personalDetail.id ? ImageURL('Users', personalDetail.id) :
                      ProfilePng
                    }
                    alt="profile"
                    className="profile-image"
                    onError={event => { event.target.src = ProfilePng; }}
                  />
                </div>
                <div className="d-inline-flex flex-column m-l-10px">
                  <span className="common-header-text">
                    {`${personalDetail.first_name} ${personalDetail.last_name}`}
                  </span>
                  <span className="common-content-text font-size-15">{personalDetail.mobile_number}</span>
                  <span className="common-content-text font-size-15">{personalDetail.email}</span>
                </div>
              </div>
              <div className="ml-auto">
                <span
                  className="c-pointer edit"
                  onClick={() => {
                    this.props.openFormPopup({ formName: 'personalDetail', isEdit: true, formObject: personalDetail });
                  }}
                  role="presentation"
                >
                  <img className="icon pencil-icon" src={PencilIcon} alt="edit" />
                </span>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-around border-bottom p-b-20 m-t-20">
              <span className="common-content-text font-size-15 p-b-10">
                {locale.personalDetailSection.summary}
              </span>
              <span
                className={`
                  common-header-text font-size-15 ${!personalDetail.summary ? 'font-italic' : ''}`
                }
              >
                {personalDetail.summary || locale.personalDetailSection.addSummary}
              </span>
            </div>
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-row m-20px-0px">
                <div className="d-inline-flex flex-column city-section">
                  <span className="common-content-text font-size-14">{locale.personalDetailSection.city}</span>
                  <span
                    className={`
                      common-header-text font-size-15 ${!personalDetail.city ? 'font-italic' : ''}`
                    }
                  >
                    {personalDetail.city || locale.personalDetailSection.addYourCity}
                  </span>
                </div>
                <div className="d-inline-flex flex-column">
                  <span className="common-content-text font-size-14">{locale.personalDetailSection.address}</span>
                  <span
                    className={`
                      common-header-text font-size-15 ${!personalDetail.addYourAddress ? 'font-italic' : ''}`
                    }
                  >
                    {personalDetail.address || locale.personalDetailSection.addYourAddress}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-row m-b-20">
                <div className="d-inline-flex flex-column city-section">
                  <span className="common-content-text font-size-14">
                    {locale.personalDetailSection.birthPlace}
                  </span>
                  <span
                    className={`
                      common-header-text font-size-15 ${!personalDetail.place_of_birth ? 'font-italic' : ''}`
                    }
                  >
                    {personalDetail.place_of_birth || locale.personalDetailSection.addBirthPlace}
                  </span>
                </div>
                <div className="d-inline-flex flex-column">
                  <span className="common-content-text font-size-14">
                    {locale.personalDetailSection.dob}
                  </span>
                  <span
                    className={`
                  common-header-text font-size-15 ${!personalDetail.date_of_birth ? 'font-italic' : ''}`
                    }
                  >
                    {personalDetail.date_of_birth ?
                      new Date(personalDetail.date_of_birth).toLocaleDateString() :
                      locale.personalDetailSection.addDOB
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <h3 className="heading m-10px-0px">Upload Resume</h3> */}
        {/* <div className="upload-resume">
          <Dropzone
            className="dragAndDropArea"
            onDropAccepted={this.handleDrop}
            accept=".doc, .docx, .pdf"
            multiple={false}
          >
            { defaultFile.name.includes('pdf') &&
              <object width="200" height="200" data={defaultFile.preview}>
                {defaultFile.preview}
              </object>
            }
            { !defaultFile.name.includes('pdf') &&
              <img
                className="mb-4 DragnDropDP"
                src="https://cdn0.iconfinder.com/data/icons/simgeler-downloads/512/Upload_Files-512.png"
                alt="UploadImage"
              />
            }
            {
              defaultFile.name &&
              <div className="my-3">
                {defaultFile.name}
              </div>
            }
          </Dropzone>
          <button className="btn btn-primary mt-3" onClick={() => { this.uploadResume(); }}>
            Upload
          </button>
        </div> */}
      </div>
    );
  }
}

PersonalDetail.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  // uploadResume: PropTypes.func.isRequired,
  openFormPopup: PropTypes.func.isRequired,
  getPersonalDetail: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  personalDetail: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  uploadResume: resumeObject => dispatch(userActions.uploadResume(resumeObject)),
  getPersonalDetail: userId => dispatch(getPersonalDetail(userId))
});

const mapStateToProps = state => ({
  userId: state.user.get('userId'),
  personalDetail: state.profile.get('personalDetail')
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(PersonalDetail));
