import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { translatable } from 'react-multilingual';
import { connect } from 'react-redux';
import { reduxForm, isDirty } from 'redux-form';
import moment from 'moment';

import SelectList from '../../components/FormComponents/Select';
import TextField from '../../components/FormComponents/TextField';
import DatePicker from '../../components/FormComponents/DatePicker';
import Button from '../../components/Button/Button';
import { required } from '../../utils/Validations';
import { fetchAllCategories } from '../../actions/learningPath';
import { fetchRecentHappeningTypes } from '../../actions/recentHappenings';
import ImageURL from '../../components/Image/ImageURL';

import UploadImage from '../../../assets/images/upload-image.svg';
import NoImage from '../../../assets/images/no-image.svg';

import '../../../assets/styles/components/HomePage.scss';

let formData = new FormData();

class NewRelatedHappening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageDragged: false,
      fileFormat: 'image/jpeg,image/jpg,image/png,image/svg+xml',
      defaultFile: this.getDefaultThumbnail(props),
      isFormChanged: false
    };
  }

  componentDidMount() {
    this.props.fetchAllCategories(true);
    this.props.fetchRecentHappeningTypes();
  }

  getDefaultThumbnail = () => UploadImage;

  setFormChanged = () => {
    this.setState({ isFormChanged: true });
  }

  handleFormSubmit = formValue => {
    this.props.saveRecentHappening(formValue);
  }

  handleDrop = acceptedFiles => {
    if (acceptedFiles[0].type.indexOf('image') === 0) {
      this.setState({ defaultFile: acceptedFiles[0].preview, isImageDragged: true, fileFormat: 'image' });
    }
    formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file, file.name);
    });
    this.props.getFormData(formData);
    this.setFormChanged();
  }

  handleDropImage = acceptedFiles => {
    formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file, file.name);
    });
    this.props.getImage(formData);
    this.setFormChanged();
  }

  render() {
    const {
      recentHappeningLocale,
      handleSubmit,
      categories,
      recentHappeningTypes,
      initialValues,
      reduxState
    } = this.props;
    const {
      isImageDragged,
      fileFormat,
      defaultFile,
      isFormChanged
    } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="content-header title-header">{recentHappeningLocale.createTitle}</div>
            <div className="form-content container-fluid">
              <form className="row" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="col-12 col-sm-6 my-4">
                  <div className="col-12 image-upload-section">
                    <Dropzone
                      className="dragAndDropArea"
                      onDropAccepted={this.handleDrop}
                      accept={fileFormat}
                      multiple={false}
                    >
                      <img
                        className="DragnDropDP"
                        src={(!isImageDragged &&
                          !defaultFile.startsWith('blob')
                          && initialValues && initialValues.id) ?
                          ImageURL('LatestHappenings', initialValues.id) : defaultFile}
                        alt="UploadImage"
                        onError={event => { event.target.src = NoImage; }}
                      />
                    </Dropzone>
                    <u className="text-primary">
                      <Dropzone
                        className="dragAndDropArea"
                        onDropAccepted={this.handleDrop}
                        accept={fileFormat}
                        multiple={false}
                      >
                        {recentHappeningLocale.uploadImage}
                      </Dropzone>
                    </u> {recentHappeningLocale.dragText}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <TextField
                    name="title"
                    isLableRequired
                    htmlFor="Title"
                    labelName={recentHappeningLocale.titleKey}
                    type="text"
                    className="form-control"
                    validate={[required]}
                  />
                  <TextField
                    name="description"
                    isLableRequired
                    htmlFor="Description"
                    labelName={recentHappeningLocale.description}
                    type="textArea"
                    className="form-control input-textArea"
                    validate={[required]}
                  />
                  <TextField
                    name="link"
                    isLableRequired
                    htmlFor="Link"
                    labelName={recentHappeningLocale.link}
                    type="text"
                    className="form-control"
                    validate={[required]}
                  />
                  <SelectList
                    isLableRequired
                    htmlFor="Category"
                    labelName={recentHappeningLocale.category}
                    name="category_id"
                    options={categories}
                    placeholder={recentHappeningLocale.category}
                    className="mb-4"
                    validate={[required]}
                    labelKey="name"
                    valueKey="id"
                    simpleValue
                  />
                  <SelectList
                    isLableRequired
                    htmlFor="Type"
                    labelName={recentHappeningLocale.type}
                    name="type_id"
                    options={recentHappeningTypes}
                    placeholder={recentHappeningLocale.type}
                    className="mb-4"
                    validate={[required]}
                    labelKey="name"
                    valueKey="id"
                    simpleValue
                  />
                  <DatePicker
                    name="expire_at"
                    isLableRequired
                    htmlFor={recentHappeningLocale.expireAt}
                    labelName={recentHappeningLocale.expireAt}
                    type="text"
                    className="form-control profile-form-text-box"
                    validate={[required]}
                    minDate={new Date()}
                    maxDate={new Date(moment().add(6, 'M'))}
                  />
                  {
                    initialValues && !initialValues.id &&
                    <Button
                      type="submit"
                      value={recentHappeningLocale.save}
                      className=""
                    />
                  }
                  {
                    initialValues && initialValues.id &&
                    <Button
                      type="submit"
                      value={recentHappeningLocale.editRelatedHappening}
                      disabled={!isFormChanged && !isDirty('NewRelatedHappening')(reduxState)}
                    />
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewRelatedHappening.propTypes = {
  getFormData: PropTypes.func,
  saveRecentHappening: PropTypes.func.isRequired,
  recentHappeningLocale: PropTypes.objectOf(PropTypes.any).isRequired,
  getImage: PropTypes.func,
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fetchRecentHappeningTypes: PropTypes.func.isRequired,
  recentHappeningTypes: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired
};

NewRelatedHappening.defaultProps = {
  getImage: () => {},
  getFormData: () => {}
};

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: isBasedOnRole => dispatch(fetchAllCategories(isBasedOnRole)),
  fetchRecentHappeningTypes: () => dispatch(fetchRecentHappeningTypes())
});

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  categories: Array.from(state.learningPath.get('categories')),
  recentHappeningTypes: Array.from(state.recentHappenings.get('recentHappeningTypes')),
  reduxState: state
});

export default (translatable(locale => locale)(reduxForm({
  form: 'NewRelatedHappening'
})(connect(mapStateToProps, mapDispatchToProps)(NewRelatedHappening))));
