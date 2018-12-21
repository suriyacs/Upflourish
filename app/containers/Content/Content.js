import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';
import { reduxForm, isDirty } from 'redux-form';
import { translatable } from 'react-multilingual';

import SelectList from '../../components/FormComponents/Select';
import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import {
  getMasterSkillList,
  clearMasterSkillList
} from '../../actions/profile';
import ImageURL from '../../components/Image/ImageURL';
import { required, greaterThanZero } from '../../utils/Validations';
import { getYTVideoId, getYTPlayListId } from '../../utils/Common';
import { fetchAllCategories } from '../../actions/learningPath';

import UploadImage from '../../../assets/images/upload-image.svg';
import UploadDocument from '../../../assets/images/upload-file.svg';
import UploadVideo from '../../../assets/images/upload-video.svg';
import NoImage from '../../../assets/images/no-image.svg';
import PdfIcon from '../../../assets/images/pdf.svg';
import DeleteSvg from '../../../assets/images/delete-photo.svg';

let formData = new FormData();

class Content extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.contentDetails && !prevState.flag) {
      nextProps.initialize({
        link: nextProps.contentDetails.link,
        title: nextProps.contentDetails.title,
        description: nextProps.contentDetails.description,
        minutes: nextProps.contentDetails.minutes,
        category: nextProps.contentDetails.category_id
      });
      return {
        file: ImageURL('Contents', nextProps.contentDetails.id),
        imageForDocAndVideo: ImageURL('Contents', nextProps.contentDetails.id),
        flag: true,
        youtubeVideoId: getYTVideoId(nextProps.contentDetails.link),
        contentLink: nextProps.contentDetails.link || '',
        selectedSkillList: nextProps.contentDetails.skills || []
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      defaultFile: props.labelName === 'document' ? UploadDocument : this.getDefaultThumbnail(props),
      isImageDragged: false,
      fileFormat: 'image',
      isFormChanged: false,
      imageForDocAndVideo: UploadImage,
      youtubeVideoId: '',
      youTubePlayListId: '',
      playListVideoIds: [],
      playListDetails: [],
      value: '',
      selectedSkillList: [],
      showError: false,
      isSkillNotAdded: false,
      contentLink: '',
      isFileUploaded: true
    };
    this.totalYTPlayListDuration = 0;
    this.deletedSkills = [];
    this.fileUploadedFlag = false;
  }

  componentDidMount() {
    const { initialize, category } = this.props;
    if (category) {
      initialize({ category });
    }
    this.props.fetchAllCategories(true);
  }

  componentWillUnmount() {
    this.props.clearContentDetails();
  }

  onReadyPlayListYTVideo = video => {
    const duration = (video.target.getDuration() / 60).toFixed(2);
    const durationInMinutes = `${parseInt(duration, 10)}.${((duration % 1) * 60).toFixed(0)}`;
    this.setState(state => ({
      playListDetails: [...state.playListDetails, {
        title: video.target.getVideoData().title,
        description: video.target.getVideoData().title,
        link: `https://www.youtube.com/watch?v=${video.target.getVideoData().video_id}`,
        minutes: durationInMinutes,
        playlist_order: video.target.g - 1
      }]
    }));
    this.totalYTPlayListDuration += parseFloat(durationInMinutes);
    if (this.state.playListVideoIds.length === this.state.playListDetails.length && this.state.youTubePlayListId) {
      this.props.change('minutes', this.totalYTPlayListDuration.toFixed(2));
    }
  }

  getDefaultThumbnail = props => (
    props.labelName === 'video' ? UploadVideo : UploadImage
  );

  getVideoLength = video => {
    if (this.state.youtubeVideoId && video.target.getPlaylist()) {
      this.setState({
        playListVideoIds: [...video.target.getPlaylist()]
      });
    }
    let totalMinutes;
    if (video) {
      totalMinutes = (video.target.getDuration() / 60).toFixed(2);
    } else {
      const uploadedVideo = document.getElementById('uploadVideo');
      const canvas = document.getElementById('canvas');
      totalMinutes = (uploadedVideo.duration / 60).toFixed(2);
      canvas.width = uploadedVideo.videoWidth;
      canvas.height = uploadedVideo.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(uploadedVideo, 0, 0, uploadedVideo.videoWidth, uploadedVideo.videoHeight);
      this.setState({
        imageForDocAndVideo: canvas.toDataURL()
      });
      canvas.toBlob(blob => {
        formData = new FormData();
        formData.append('file', blob);
        this.props.getImage(formData);
      });
    }
    this.props.change('minutes', `${parseInt(totalMinutes, 10)}.${((totalMinutes % 1) * 60).toFixed(0)}`);
  }

  getFileFormat = fileFormat => {
    if (fileFormat === 'document') {
      return 'application/pdf';
    } if (fileFormat === 'video') {
      return 'video/mp4';
    }
    return 'image/jpeg,image/jpg,image/png,image/svg+xml';
  }

  showYoutubePlayer = link => {
    if (this.props.itemType === 'YTVideos' && link.includes('www.youtube.com')) {
      this.setState({
        youtubeVideoId: getYTVideoId(link),
        youTubePlayListId: getYTPlayListId(link),
        playListDetails: []
      });
    }
  }

  handleChange = value => {
    if (value) {
      this.setState({
        showError: false
      });
      this.props.getMasterSkillList(value);
    }
  };

  handleSelect = value => {
    if (value.id) {
      const tempList = this.state.selectedSkillList.slice();
      if (!_.find(tempList, { id: value.id }) && !_.find(tempList, { skill_id: value.id })) {
        tempList.push(value);
        this.setState({
          selectedSkillList: tempList,
          showError: false,
          isSkillNotAdded: false
        });
      } else {
        this.setState({
          showError: true
        });
      }
    } else {
      this.setState({
        showError: false,
        isSkillNotAdded: false
      });
      this.props.clearMasterSkillList();
    }
  };

  handleDrop = acceptedFiles => {
    this.setState({ isFormChanged: true });
    if (acceptedFiles[0].type.indexOf('video') === 0) {
      this.setState({ defaultFile: acceptedFiles[0].preview, fileFormat: 'video', isFileUploaded: true });
      this.fileUploadedFlag = true;
    } else if (acceptedFiles[0].type.indexOf('image') === 0) {
      this.setState({
        defaultFile: acceptedFiles[0].preview,
        isImageDragged: true,
        fileFormat: 'image'
      });
    } else if (acceptedFiles[0].type.indexOf('application') === 0) {
      this.setState({
        defaultFile: acceptedFiles[0],
        fileFormat: 'document',
        contentLink: '',
        isFileUploaded: true
      });
      this.fileUploadedFlag = true;
    }
    formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file, file.name);
    });
    this.props.getFormData(formData);
  }

  handleFormSubmit = content => {
    const { labelName, contentDetails } = this.props;
    const { selectedSkillList } = this.state;
    if (!contentDetails.id && (labelName === 'document' || labelName === 'video')
      && !this.fileUploadedFlag) { // set upload document or video mandotary only on create
      this.setState({ isFileUploaded: false });
    } else {
      content.category_id = content.category.id ? content.category.id : content.category;
      content = _.omit(content, ['category']);
      if (selectedSkillList.length) {
        content.skillIds = selectedSkillList.map(value => value.id);
        this.props.getData(content, this.state.playListDetails);
      } else {
        this.setState({
          isSkillNotAdded: true
        });
      }
    }
  }

  isFormChanged = () => {
    this.setState({ isFormChanged: true });
  }
  handleDropImage = acceptedFiles => {
    this.setState({ isFormChanged: true });
    if (acceptedFiles[0].type.indexOf('image') === 0) {
      this.setState({ imageForDocAndVideo: acceptedFiles[0].preview });
    }
    formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file, file.name);
    });
    this.props.getImage(formData);
  }

  deleteSkill = skill => {
    let tempList = this.state.selectedSkillList.slice();
    tempList = _.reject(tempList, { id: skill.id });
    if (skill.skill_id) {
      this.deletedSkills.push(skill.id);
    }
    this.setState({
      selectedSkillList: tempList,
      isFormChanged: true
    });
  }

  render() {
    const {
      file,
      isImageDragged,
      defaultFile,
      fileFormat,
      isFormChanged,
      imageForDocAndVideo,
      youtubeVideoId,
      youTubePlayListId,
      playListVideoIds,
      playListDetails,
      value,
      selectedSkillList,
      showError,
      isSkillNotAdded,
      contentLink,
      isFileUploaded
    } = this.state;
    const {
      labelName,
      handleSubmit,
      onCloseContent,
      reduxState,
      itemType,
      categories,
      contentDetails,
      options
    } = this.props;
    const locale = this.props.locale.contentForm;
    const opts = {
      playerVars: {
        rel: 0,
        autoplay: 1,
        list: youTubePlayListId,
        origin: 'https://www.youtube.com'
      }
    };
    let disableButton = false;
    if (youTubePlayListId && playListVideoIds.length !== playListDetails.length) {
      disableButton = true;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="content-header title-header">{locale.title} {labelName}</div>
            <div className="form-content container-fluid">
              <form className="row" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="col-12 col-sm-6 my-4">
                  {
                    youtubeVideoId &&
                    <div className="col-12">
                      <YouTube
                        videoId={youtubeVideoId}
                        id={youtubeVideoId}
                        opts={opts}
                        className="upload-youtube-player"
                        onPlay={this.getVideoLength}
                      />
                    </div>
                  }
                  {itemType !== 'YTVideos' &&
                    <div className="col-12 image-upload-section">
                      {(itemType === 'Documents' || itemType === 'Videos') &&
                        <Dropzone
                          className="dragAndDropArea"
                          onDropAccepted={this.handleDropImage}
                          accept={this.getFileFormat('image')}
                          multiple={false}
                        >
                          <img
                            className="mb-4 DragnDropDP"
                            src={imageForDocAndVideo}
                            alt="UploadImage"
                            onError={event => { event.target.src = NoImage; }}
                          />
                        </Dropzone>
                      }
                      <Dropzone
                        className="dragAndDropArea"
                        onDropAccepted={this.handleDrop}
                        accept={this.getFileFormat(labelName)}
                        multiple={false}
                      >
                        {fileFormat === 'image' && !contentLink.includes('.pdf') &&
                          <img
                            className="DragnDropDP"
                            src={(!isImageDragged && file && !defaultFile.startsWith('blob'))
                              && labelName !== 'document' && labelName !== 'video' ? file : defaultFile}
                            alt="UploadImage"
                            onError={event => { event.target.src = NoImage; }}
                          />
                        }
                        {fileFormat === 'video' &&
                          <Fragment>
                            <video
                              key={defaultFile}
                              id="uploadVideo"
                              onLoadedData={() => { this.getVideoLength(); }}
                              controls
                              className="w-75"
                            >
                              <track kind="captions" />
                              <source src={defaultFile} type="video/mp4" />
                            </video>
                            <canvas id="canvas" className="d-none" />
                          </Fragment>
                        }
                        {(fileFormat === 'document' || contentLink.includes('.pdf')) &&
                          <div className="row document-name mb-3">
                            <div className="col-10 offset-2 offset-lg-3">
                              <div className="d-flex flex-row align-items-center">
                                <span>
                                  <img src={PdfIcon} className="doc-icon" alt="Document" />
                                </span>
                                <span>
                                  <div className="col-9">
                                    { defaultFile.name || contentLink.split('document/')[1] }
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        }
                      </Dropzone>
                      <u className="text-primary">
                        <Dropzone
                          className="dragAndDropArea"
                          onDropAccepted={this.handleDrop}
                          accept={this.getFileFormat(labelName)}
                          multiple={false}
                        >
                          {(labelName !== 'video' && labelName !== 'document') &&
                            locale.uploadImage
                          }
                          {labelName === 'video' && locale.uploadVideo}
                          {labelName === 'document' && locale.uploadDocument}
                        </Dropzone>
                      </u> {locale.dragText}
                        {
                          !isFileUploaded &&
                            <div className="col-12 error-message">{locale.pleaseUpload} {labelName}</div>
                        }
                    </div>}
                  <div className="skill-set col-12 p-0">
                    <SelectList
                      htmlFor="Skill "
                      value={value}
                      labelName="Related skill"
                      name="searchskill"
                      isLableRequired
                      onInputChange={this.handleChange}
                      options={_.isArray(options) ? options : []}
                      handleChange={this.handleSelect}
                      labelKey="name"
                      valueKey="id"
                      className="search-box"
                      placeholder="Start typing to add skills (ex: Data Analysis)"
                    />
                    {
                      showError &&
                      <div className="col-12 text-left error-message">
                        {locale.error}
                      </div>
                    }
                    {
                      isSkillNotAdded &&
                      <div className="col-12 text-left error-message">
                        {locale.noSkillError}
                      </div>
                    }
                    <div className="container-fluid mt-3 mb-4 skill-list p-0">
                      <div className="col-12 p-0">
                        <div className="title mb-2 text-left">
                          {locale.skills}
                        </div>
                        <div className="row my-3 mx-1 skill-contents">
                          {
                            selectedSkillList && selectedSkillList.length ?
                              <div className="col-11 p-0">
                                {
                                  selectedSkillList.map(skill => (
                                    <div key={skill.id} className="badge badge-secondary individual-skill mr-3 mb-3">
                                      <span className="align-items-center m-2">
                                        <span className="skill-name mr-3">
                                          {skill.name}
                                        </span>
                                        <span>
                                          <img
                                            src={DeleteSvg}
                                            alt="delete"
                                            className="delete-svg c-pointer"
                                            role="presentation"
                                            onClick={() => { this.deleteSkill(skill); }}
                                          />
                                        </span>
                                      </span>
                                    </div>
                                  ))
                                }
                              </div>
                              :
                              <Fragment>
                                <span className="col-12 col-md-6 text-center empty-skill-error">
                                  {locale.emptySkill}
                                </span>
                              </Fragment>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  {(labelName !== 'document' && labelName !== 'video') &&
                    <TextField
                      name="link"
                      isLableRequired
                      htmlFor="Link"
                      labelName={`${locale.linkLabel} ${labelName}`}
                      type="text"
                      className="form-control"
                      validate={[required]}
                      handleBlur={(event, textFieldValue) => { this.showYoutubePlayer(textFieldValue); }}
                    />
                  }
                  <TextField
                    name="title"
                    isLableRequired
                    htmlFor="Name"
                    labelName={`${locale.nameLabel} ${labelName}`}
                    type="text"
                    className="form-control"
                    validate={[required]}
                  />
                  <TextField
                    name="description"
                    isLableRequired
                    htmlFor="Description"
                    labelName={locale.descriptionLabel.replace('{labelName}', labelName)}
                    type="textArea"
                    className="form-control input-textArea"
                    validate={[required]}
                  />
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
                  <TextField
                    name="minutes"
                    readonly={itemType === 'YTVideos' || itemType === 'Videos'}
                    isLableRequired
                    htmlFor={locale.timeLimit}
                    labelName={locale.timeLimit}
                    type="number"
                    className="form-control"
                    validate={[required, greaterThanZero]}
                  />
                  {contentDetails && !contentDetails.id &&
                    <Button
                      type="submit"
                      value={locale.createButton.replace('{labelName}', labelName)}
                      className=""
                      disabled={disableButton}
                    />
                  }
                  {contentDetails && contentDetails.id &&
                    <div className="row justify-content-center p-4">
                      <button
                        className="col-4 btn btn-edit mr-5"
                        onClick={onCloseContent}
                        type="button"
                      >{locale.closeButton}
                      </button>
                      <button
                        className="col-4 btn button m-0"
                        type="submit"
                        disabled={!isFormChanged && !isDirty('Content')(reduxState)}
                      >{locale.saveButton}
                      </button>
                    </div>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
        {playListVideoIds.map(playVideo => (
          <YouTube
            key={playVideo}
            className="d-none"
            videoId={`${playVideo}`}
            id={`${playVideo}`}
            onReady={this.onReadyPlayListYTVideo}
          />
        ))}
      </div>
    );
  }
}

Content.propTypes = {
  labelName: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getFormData: PropTypes.func,
  contentDetails: PropTypes.any.isRequired,
  clearContentDetails: PropTypes.any.isRequired,
  onCloseContent: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  itemType: PropTypes.string,
  getImage: PropTypes.func,
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  options: PropTypes.any.isRequired,
  clearMasterSkillList: PropTypes.func.isRequired,
  getMasterSkillList: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  initialize: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  fetchAllCategories: isBasedOnRole => dispatch(fetchAllCategories(isBasedOnRole)),
  getMasterSkillList: searchTerm => dispatch(getMasterSkillList(searchTerm)),
  clearMasterSkillList: () => dispatch(clearMasterSkillList())
});

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  categories: Array.from(state.learningPath.get('categories')),
  options: state.profile.get('masterSkillList')
});

Content.defaultProps = {
  itemType: '',
  getImage: () => {},
  getFormData: () => {}
};

export default (translatable(locale => locale)(reduxForm({
  form: 'Content'
})(connect(mapStateToProps, mapDispatchToProps)(Content))));
