import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { translatable } from 'react-multilingual';

import { getYTVideoId, getYTPlayListId } from '../../utils/Common';
import ContentIntroduction from './ContentIntroduction';
import RelatedContent from './RelatedContent';

import { constantValues } from '../../globals/AppConstant';
import '../../../assets/styles/components/Video.scss';
import '../../../assets/styles/components/LearningPath.scss';

// import Completed from '../../../assets/images/completed.svg';

class YouTubeVideo extends Component {
  constructor() {
    super();
    this.state = {
      playingVideo: ''
    };
    this.redirectToPage = '';
    this.youtubePlayer = React.createRef();
    window.onbeforeunload = this.beforeLoad;
    this.isContentEnrolled = true;
  }

  onClickPlayListVideo = videoId => {
    this.setState({
      playingVideo: videoId
    });
  }

  beforeLoad = () => {
    const confirmationMessage = 'Do you want to close';
    this.trackVideo();
    return confirmationMessage;
  };

  render() {
    const {
      contentDetails,
      handleEdit
    } = this.props;
    const { playingVideo } = this.state;
    const opts = {
      playerVars: {
        rel: 0,
        autoplay: 1,
        list: getYTPlayListId(contentDetails && contentDetails.link),
        origin: 'https://www.youtube.com'
      }
    };
    return (
      <div className="video-container p-5 p-t-10">
        <div className="p-0 right-panel">
          <div className="content-header-section">
            {
              contentDetails && contentDetails.id &&
              <ContentIntroduction
                contentTitle={contentDetails.title}
                contentDescription={contentDetails.description}
                contentDetails={contentDetails}
                handleEdit={handleEdit}
              />
            }
          </div>
          <div className="row">
            <div className="col-8">
              <div className="main-div">
                <div className="video-player">
                  {contentDetails && contentDetails.link &&
                    <YouTube
                      videoId={!playingVideo ? getYTVideoId(contentDetails && contentDetails.link) : playingVideo}
                      id={!playingVideo ? getYTVideoId(contentDetails && contentDetails.link) : playingVideo}
                      opts={opts}
                      onEnd={this.onEndYoutubeVideo}
                      onStateChange={this.onStateChangeYoutubeVideo}
                      ref={this.youtubePlayer}
                    />
                  }
                </div>
              </div>
            </div>
            <div className="col-4">
              {
                contentDetails && contentDetails.id &&
                <RelatedContent
                  selectedContent={contentDetails}
                />
              }
            </div>
            <div id="expandableContent" className="content-description-expandable content-title mt-3">
              <p id="detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                {contentDetails.description}
              </p>
              {contentDetails.description && contentDetails.description.length > constantValues.expandableLimit &&
                <span
                  className="expand content-expand collapsed"
                  data-toggle="collapse"
                  href="#detail"
                  aria-expanded="false"
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

YouTubeVideo.propTypes = {
  contentDetails: PropTypes.object,
  handleEdit: PropTypes.func.isRequired
};

YouTubeVideo.defaultProps = {
  contentDetails: {}
};

export default (translatable(locale => locale)(YouTubeVideo));
