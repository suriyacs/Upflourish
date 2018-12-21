import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, isDirty } from 'redux-form';
import { translatable } from 'react-multilingual';

import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import '../../../assets/styles/components/OnlineCourse.scss';
import UploadImage from '../../../assets/images/upload-image.svg';
import ImageURL from '../../components/Image/ImageURL';
import { required, isNumber, maxLength } from '../../utils/Validations';
import Loader from '../../components/Loader/Loader';
import { createOnlineCourse, updateOnlineCourse } from '../../actions/onlineCourse';
import { fetchContentDetails, clearContentDetails } from '../../actions/content';

let formData = new FormData();

class OnlineCourse extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let flag = false;
    let newFile = UploadImage;
    if (
      nextProps.onlineCourseDetails
      &&
      nextProps.onlineCourseDetails.size !== 0
      &&
      nextProps.onlineCourseDetailsLoaded
      &&
      !prevState.flag
      &&
      nextProps.courseId === nextProps.onlineCourseDetails.id
    ) {
      nextProps.initialize({
        link: nextProps.onlineCourseDetails.new_link,
        name: nextProps.onlineCourseDetails.new_title,
        about: nextProps.onlineCourseDetails.new_description,
        hours: nextProps.onlineCourseDetails.new_hours,
        minutes: nextProps.onlineCourseDetails.new_minutes,
        noOfLecturers: nextProps.onlineCourseDetails.new_total_lectures
      });
      flag = true;
      newFile = ImageURL('Courses', nextProps.onlineCourseDetails.id);
      return {
        file: newFile,
        flag
      };
    }
    return null;
  }
  constructor() {
    super();
    this.state = {
      file: UploadImage,
      fileData: '',
      isFormChanged: false
    };
    this.isCreate = false;
    this.handleDrop = this.handleDrop.bind(this);
  }
  componentDidMount() {
    const { courseId } = this.props;
    if (courseId) {
      this.props.fetchContentDetails('Courses', courseId);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.isCreate && !_.isEqual(prevProps.onlineCourse, this.props.onlineCourse)) {
      this.isCreate = false;
      this.props.closeOnEscape();
      this.props.onClickOnlineCourse();
    } else if (!_.isEqual(prevProps.onlineCourse, this.props.onlineCourse)) {
      this.props.onClickOnlineCourse();
      this.props.closeOnEscape();
    }
  }
  componentWillUnmount() {
    this.props.clearContentDetails();
  }
  handleDrop(acceptedFiles) {
    this.setState({ isFormChanged: true });
    formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file, file.name);
    });
    this.setState({ file: acceptedFiles[0].preview, fileData: formData });
  }
  handleFormSubmit = course => {
    const { fileData } = this.state;
    const { learningPathId, sectionId, courseId } = this.props;
    course.learningPathId = learningPathId;
    course.sectionId = sectionId;
    course.file = fileData;
    this.props.closeOnEscape();
    if (course.link !== '' && course.name !== '' &&
      course.about !== '' && course.minutes !== '' &&
      course.hours !== '' && courseId === ''
    ) {
      this.props.createOnlineCourse(course);
      this.isCreate = true;
    } else if (courseId !== '') {
      course.courseId = courseId;
      this.props.updateOnlineCourse(course);
    }
  }
  checkLength = value => maxLength(value, 2)

  render() {
    const {
      file,
      isFormChanged
    } = this.state;
    const {
      loading, courseId, onClickOnlineCourse, handleSubmit, reduxState
    } = this.props;
    const labelName = 'online course';
    const locale = this.props.locale.contentForm;
    return (
      <Fragment>
        <Loader loading={loading} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-t-40">
              <div className="title-header">{locale.title} {labelName}</div>
              <div className="form-online-course">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                  <div className="upload-image">
                    <Dropzone
                      className="dragAndDropArea"
                      onDropAccepted={this.handleDrop}
                      accept="image/jpeg,image/jpg,image/png"
                      multiple={false}
                      onDropRejected={this.handleDropRejected}
                    >
                      <img
                        className="DragnDropDP"
                        src={file}
                        alt="UploadImage"
                        onError={event => { event.target.src = UploadImage; }}
                      />
                    </Dropzone>
                    <u className="text-primary">{locale.uploadImage}</u> {locale.dragText}
                  </div>
                  <TextField
                    name="link"
                    isLableRequired
                    htmlFor="Link"
                    labelName={`${locale.linkLabel} ${labelName}`}
                    type="text"
                    className="form-control"
                    validate={[required]}
                  />
                  <TextField
                    name="name"
                    isLableRequired
                    htmlFor="Name"
                    labelName={`${locale.nameLabel} ${labelName}`}
                    type="text"
                    className="form-control"
                    validate={[required]}
                  />
                  <TextField
                    name="about"
                    isLableRequired
                    htmlFor="Description"
                    labelName={locale.descriptionLabel.replace('{labelName}', labelName)}
                    type="textArea"
                    className="form-control input-textArea"
                    validate={[required]}
                  />
                  <div className="input-field">
                    <label htmlFor="duration">{locale.durationLabel}</label>
                    <span className="required-field">*</span>
                  </div>
                  <div className="row" style={{ margin: '0px' }}>
                    <div className="col-6">
                      <div className="row">
                        <TextField
                          name="hours"
                          htmlFor="Hours"
                          type="number"
                          className="form-control duration-hours"
                          validate={[required, isNumber]}
                          normalize={this.checkLength}
                        />
                        <div className="duration">{locale.hoursLabel}</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row m-l-0">
                        <TextField
                          name="minutes"
                          htmlFor="Minutes"
                          type="number"
                          className="form-control duration-minutes"
                          validate={[required, isNumber]}
                          normalize={this.checkLength}
                        />
                        <div className="duration">{locale.minutesLabel}</div>
                      </div>
                    </div>
                  </div>
                  <TextField
                    name="noOfLecturers"
                    isLableRequired
                    htmlFor="No of Lectures"
                    labelName={locale.lecturerCountLabel}
                    type="number"
                    className="form-control"
                    validate={[required, isNumber]}
                  />
                  {!courseId &&
                    <Button type="submit" value="Add the course to the section" className="" />
                  }
                  {courseId &&
                    <div className="row" style={{ margin: '0px' }}>
                      <button
                        className="col-4 btn btn-success btn-edit"
                        type="submit"
                        disabled={!isFormChanged && !isDirty('OnlineCourseComponent')(reduxState)}
                      >{locale.saveButton}
                      </button>
                      <button
                        className="col-4 btn btn-danger btn-edit"
                        onClick={onClickOnlineCourse}
                        type="button"
                      >{locale.closeButton}
                      </button>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

OnlineCourse.propTypes = {
  loading: PropTypes.bool.isRequired,
  createOnlineCourse: PropTypes.func.isRequired,
  updateOnlineCourse: PropTypes.func.isRequired,
  learningPathId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  onClickOnlineCourse: PropTypes.func.isRequired,
  fetchContentDetails: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  onlineCourse: PropTypes.object.isRequired,
  closeOnEscape: PropTypes.func.isRequired,
  clearContentDetails: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  loading: state.onlineCourse.get('loading'),
  onlineCourseDetails: state.content.get('contentDetails'),
  reduxState: state,
  onlineCourse: state.onlineCourse.get('onlineCourse'),
  onlineCourseDetailsLoaded: state.content.get('contentDetailsLoaded')
});

const mapDispatchToProps = dispatch => ({
  createOnlineCourse: onlineCourse => dispatch(createOnlineCourse(onlineCourse)),
  updateOnlineCourse: onlineCourse => dispatch(updateOnlineCourse(onlineCourse)),
  clearContentDetails: () => dispatch(clearContentDetails()),
  fetchContentDetails: (contentType, contentId) =>
    dispatch(fetchContentDetails(contentType, contentId))
});

const OnlineCourseComponent = connect(mapStateToProps, mapDispatchToProps)(OnlineCourse);

export default translatable(locale => locale)(reduxForm({
  form: 'OnlineCourseComponent'
})(OnlineCourseComponent));
