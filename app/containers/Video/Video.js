import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createVideo, updateVideo } from '../../actions/video';
import {
  fetchContentDetails,
  clearContentDetails,
  createContent,
  updateContent,
  createRelatedContent
} from '../../actions/content';
import Content from '../Content/Content';
import Loader from '../../components/Loader/Loader';

class Video extends Component {
  constructor() {
    super();
    this.state = {
      formData: '',
      image: ''
    };
    this.isCreate = false;
  }

  onCloseContent = () => {
    this.props.onClickVideo();
  }

  getFormData = file => {
    this.setState({ formData: file });
  }

  getData = video => {
    /* eslint-disable no-unused-vars */
    const { formData, image } = this.state;
    const {
      sectionId,
      contentDetails,
      isRelatedContent,
      contentId
    } = this.props;
    this.props.closeBothModal();
    video.content_type = 'Video';
    if (isRelatedContent) {
      this.props.createRelatedContent(video, contentId, formData);
      return;
    }
    if (contentDetails && contentDetails.id) {
      video.id = contentDetails.id;
      this.props.updateContent(video, sectionId, formData);
    } else {
      this.props.createContent(video, sectionId, formData);
      this.isCreate = true;
    }
  }

  handleImage = image => {
    this.setState({ image });
  }

  render() {
    const {
      videoId,
      loading,
      reduxState,
      contentDetailsLoaded,
      contentDetails,
      category
    } = this.props;
    return (
      <Fragment>
        <Loader loading={loading} />
        <Content
          labelName="video"
          getFormData={this.getFormData}
          contentDetails={contentDetails}
          clearContentDetails={this.props.clearContentDetails}
          contentDetailsLoaded={contentDetailsLoaded}
          onCloseContent={this.onCloseContent}
          getData={this.getData}
          contentId={videoId}
          reduxState={reduxState}
          itemType="Videos"
          getImage={this.handleImage}
          category={category}
        />
      </Fragment>
    );
  }
}

Video.propTypes = {
  loading: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
  onClickVideo: PropTypes.func.isRequired,
  clearContentDetails: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  contentDetailsLoaded: PropTypes.bool.isRequired,
  createContent: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  closeBothModal: PropTypes.func.isRequired,
  createRelatedContent: PropTypes.func.isRequired,
  isRelatedContent: PropTypes.bool.isRequired,
  contentId: PropTypes.string,
  category: PropTypes.string.isRequired
};

Video.defaultProps = {
  contentDetails: {},
  contentId: ''
};

const mapStateToProps = state => ({
  loading: state.video.get('loading'),
  reduxState: state,
  video: state.video.get('video'),
  contentDetailsLoaded: state.content.get('contentDetailsLoaded')
});

const mapDispatchToProps = dispatch => ({
  createVideo: video => dispatch(createVideo(video)),
  updateVideo: video => dispatch(updateVideo(video)),
  clearContentDetails: () => dispatch(clearContentDetails()),
  fetchContentDetails: (contentType, contentId) =>
    dispatch(fetchContentDetails(contentType, contentId)),
  createContent: (content, sectionId, file) => dispatch(createContent(content, sectionId, file)),
  updateContent: (content, sectionId, file) => dispatch(updateContent(content, sectionId, file)),
  createRelatedContent: (content, contentId, file) => dispatch(createRelatedContent(content, contentId, file))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);

