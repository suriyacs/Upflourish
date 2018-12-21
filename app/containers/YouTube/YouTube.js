import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createYouTubeVideo } from '../../actions/youtube';
import {
  fetchContentDetails,
  clearContentDetails,
  createContent,
  updateContent,
  createRelatedContent
} from '../../actions/content';
import Content from '../Content/Content';
import Loader from '../../components/Loader/Loader';

class YouTube extends Component {
  constructor() {
    super();
    this.isCreate = false;
  }

  onCloseContent = () => {
    this.props.onClickYouTube();
  }

  getData = (video, playListDetails) => {
    const {
      sectionId,
      contentDetails,
      isRelatedContent,
      contentId
    } = this.props;
    if (playListDetails.length > 0) {
      video.isPlaylist = true;
    }
    video.playList = playListDetails;
    video.content_type = 'YTVideo';
    this.props.closeBothModal();
    if (isRelatedContent) {
      this.props.createRelatedContent(video, contentId);
      return;
    }
    if (contentDetails && contentDetails.id) {
      video.id = contentDetails.id;
      this.props.updateContent(video, sectionId);
    } else {
      this.isCreate = true;
      this.props.createContent(video, sectionId);
    }
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
          labelName="youtube video"
          contentDetails={contentDetails}
          contentDetailsLoaded={contentDetailsLoaded}
          onCloseContent={this.onCloseContent}
          clearContentDetails={this.props.clearContentDetails}
          getData={this.getData}
          contentId={videoId}
          itemType="YTVideos"
          reduxState={reduxState}
          category={category}
        />
      </Fragment>
    );
  }
}

YouTube.propTypes = {
  loading: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
  onClickYouTube: PropTypes.func.isRequired,
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

const mapStateToProps = state => ({
  loading: state.video.get('loading'),
  videoDetails: state.content.get('contentDetails'),
  reduxState: state,
  createdVideo: state.video.get('video'),
  contentDetailsLoaded: state.content.get('contentDetailsLoaded')
});

YouTube.defaultProps = {
  contentDetails: {},
  contentId: ''
};

const mapDispatchToProps = dispatch => ({
  createVideo: video => dispatch(createYouTubeVideo(video)),
  // updateVideo: video => dispatch(updateVideo(video)),
  clearContentDetails: () => dispatch(clearContentDetails()),
  fetchContentDetails: (contentType, contentId) =>
    dispatch(fetchContentDetails(contentType, contentId)),
  createContent: (content, sectionId, file) => dispatch(createContent(content, sectionId, file)),
  updateContent: (content, sectionId, file) => dispatch(updateContent(content, sectionId, file)),
  createRelatedContent: (content, contentId, file) => dispatch(createRelatedContent(content, contentId, file))
});

export default connect(mapStateToProps, mapDispatchToProps)(YouTube);

