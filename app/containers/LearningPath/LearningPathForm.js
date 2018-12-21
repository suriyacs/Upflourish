import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { reduxForm, isDirty } from 'redux-form';
import _ from 'lodash';
import { translatable } from 'react-multilingual';

import SelectList from '../../components/FormComponents/Select';
import ImageURL from '../../components/Image/ImageURL';
import { required } from '../../utils/Validations';
import Loader from '../../components/Loader/Loader';
import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import { courseTypeList, thumnailCourseType } from '../../globals/AppConstant';
import { fetchAllCategories } from '../../actions/learningPath';

import '../../../assets/styles/components/LearningPath.scss';

import UploadImage from '../../../assets/images/upload-image.svg';
import NoImage from '../../../assets/images/no-image.svg';
// import EmptyCircle from '../../../assets/images/empty-circle.svg';
// import ActiveCircle from '../../../assets/images/circle-with-check-symbol.svg';

let formData = new FormData();

class LearningPathForm extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let flag = false;
    if (nextProps.courseDetails.size !== 0 && !prevState.flag &&
      nextProps.courseId === nextProps.courseDetails.id
    ) {
      flag = true;
    }
    if (prevState.flag || nextProps.courseId === '') {
      return null;
    }
    return {
      file: ImageURL(thumnailCourseType[nextProps.courseDetails.display_name].url, nextProps.courseDetails.id),
      courseId: nextProps.courseId,
      flag
    };
  }

  constructor() {
    super();
    this.isUpdate = false;
    this.state = {
      file: UploadImage,
      fileData: '',
      courseId: '',
      isFormChanged: false,
      isMicroLearning: true
      // showMicrolearningFlag: false
    };
  }

  componentDidMount() {
    const { courseDetails } = this.props;
    if (courseDetails.id) {
      this.props.initialize({
        id: courseDetails.id,
        name: courseDetails.name,
        description: courseDetails.description,
        category: courseDetails.category_id,
        coursetype: courseDetails.display_name
      });
    }
    this.props.fetchAllCategories(true);
  }

  handleDrop = acceptedFiles => {
    this.setState({ isFormChanged: true });
    formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file, file.name);
    });
    this.setState({ file: acceptedFiles[0].preview, fileData: formData });
  }

  // handleChange = value => {
  //   this.setState({
  //     showMicrolearningFlag: value.name === 'Microlearning/Section',
  //     isMicroLearning: true
  //   });
  // }

  handleFormSubmit = courseDetail => {
    const { fileData, courseId } = this.state;
    courseDetail.file = fileData;
    courseDetail.isMicroLearning = this.state.isMicroLearning;

    // this.props.closeOnEscape();
    if (courseId === '') {
      this.props.handleCreate(courseDetail);
    } else if (courseId !== '') {
      courseDetail.courseId = courseId;
      courseDetail.coursetype = _.find(courseTypeList, { name: courseDetail.coursetype });
      this.props.handleUpdate(courseDetail);
    }
  }

  changeMicrolearning = () => {
    this.setState(({ isMicroLearning }) => ({
      isMicroLearning: !isMicroLearning
    }
    ));
  }

  render() {
    const {
      file,
      courseId,
      isFormChanged
      // isMicroLearning,
      // showMicrolearningFlag
    } = this.state;
    const {
      handleSubmit,
      categories,
      reduxState,
      isMappingCourse,
      skillTrackLoader,
      isEditPopup,
      sectionLoader,
      titleLabel,
      microlearningLoader
    } = this.props;
    const locale = this.props.locale.learningPathForm;
    const loaderFlag = this.props.loading || skillTrackLoader || sectionLoader || microlearningLoader;
    return (
      <div className="container-fluid create-skill-track-popup">
        <Loader loading={loaderFlag} />
        <div className="row">
          <div className="col-12 p-3">
            <div className="title-header">{titleLabel}</div>
            <div className="row form-learning-path">
              <div className="upload-image col-5 mr-5">
                <Dropzone
                  className="dragAndDropArea"
                  onDropAccepted={this.handleDrop}
                  accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                  multiple={false}
                >
                  <img
                    className="DragnDropDP"
                    src={file}
                    alt="UploadImage"
                    onError={event => { event.target.src = NoImage; }}
                  />
                </Dropzone>
                <u className="text-primary">
                  <Dropzone
                    className="dragAndDropArea"
                    onDropAccepted={this.handleDrop}
                    accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                    multiple={false}
                  >
                    {!courseId &&
                      locale.uploadImage
                    }
                    {courseId &&
                      locale.changeImage
                    }
                  </Dropzone>
                </u> {locale.dragText}
              </div>
              <form className="col-6 pl-5 form-data" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <TextField
                  name="name"
                  isLableRequired
                  htmlFor="Path name"
                  labelName={locale.nameLabel}
                  type="text"
                  className="form-control"
                  validate={[required]}
                />
                <TextField
                  name="description"
                  isLableRequired
                  htmlFor="Path description"
                  labelName={locale.descriptionLabel}
                  type="textArea"
                  className="form-control input-textArea"
                  validate={[required]}
                />
                {
                  !isMappingCourse &&
                  <Fragment>
                    <SelectList
                      isLableRequired
                      htmlFor="Course Type"
                      labelName={locale.courseType}
                      name="coursetype"
                      options={courseTypeList}
                      placeholder={locale.courseType}
                      validate={[required]}
                      labelKey="name"
                      valueKey="name"
                      // handleChange={this.handleChange}
                      disabled={isEditPopup}
                    />
                    {/* {
                      showMicrolearningFlag &&
                      <div className="col-12 col-md-6 mt-3 pl-0">
                        <div className="row align-items-center">
                          <span
                            className="col-1 c-pointer"
                            role="presentation"
                            onClick={() => { this.changeMicrolearning(); }}
                          >
                            <img src={isMicroLearning ? ActiveCircle : EmptyCircle} alt="profile" className="icon" />
                          </span>
                          <span className="col-10">
                            {locale.isMicroLearning}
                          </span>
                        </div>
                      </div>
                    } */}
                  </Fragment>
                }
                <SelectList
                  isLableRequired
                  htmlFor="Category"
                  labelName={locale.categoryLabel}
                  name="category"
                  options={categories}
                  placeholder={locale.categoryPlaceHolder}
                  className="mb-4"
                  validate={[required]}
                  labelKey="name"
                  valueKey="id"
                  simpleValue
                />
                {!courseId &&
                  <Button type="submit" className="" value={locale.createButtonText} />
                }
                {courseId &&
                  <div className="container-fluid mt-4">
                    <div className="row justify-content-center">
                      <button
                        className="col-4 btn btn-edit mr-5"
                        onClick={this.props.onClose}
                        type="button"
                      >{locale.closeButtonText}
                      </button>
                      <button
                        className="col-4 btn button m-0"
                        type="submit"
                        disabled={!isFormChanged && !isDirty('LearningPathComponent')(reduxState)}
                      >{locale.saveButtonText}
                      </button>
                    </div>
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LearningPathForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleCreate: PropTypes.func,
  handleUpdate: PropTypes.func,
  isMappingCourse: PropTypes.bool,
  courseDetails: PropTypes.object,
  skillTrackLoader: PropTypes.bool.isRequired,
  sectionLoader: PropTypes.bool.isRequired,
  isEditPopup: PropTypes.bool,
  titleLabel: PropTypes.string,
  microlearningLoader: PropTypes.bool
};

LearningPathForm.defaultProps = {
  handleCreate: null,
  handleUpdate: null,
  isMappingCourse: false,
  courseDetails: {},
  isEditPopup: false,
  titleLabel: '',
  microlearningLoader: false
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  skillTrackLoader: state.careerTrack.get('loading'),
  sectionLoader: state.section.get('loading'),
  microlearningLoader: state.course.get('loading'),
  categories: Array.from(state.learningPath.get('categories')),
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: isBasedOnRole => dispatch(fetchAllCategories(isBasedOnRole))
});

export default translatable(locale => locale)(reduxForm({
  form: 'LearningPathComponent'
})(connect(mapStateToProps, mapDispatchToProps)(LearningPathForm)));
