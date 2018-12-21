import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';

import storage from '../../globals/localStorage';
import SectionBreadCrumb from '../../components/BreadCrumb/SectionBreadCrumb';
import { getYTVideoId, getYTPlayListId, loadDisqus } from '../../utils/Common';
import { fetchSectionContents, getSectionEnrollmentStatus } from '../../actions/section';
import { fetchContentDetails, enrollMyContent } from '../../actions/content';
import { routeConstant, constantValues } from '../../globals/AppConstant';
import redirect from '../../utils/Redirect';
import ContentIntroduction from './ContentIntroduction';
import RecentHappenings from '../RecentHappenings/RecentHappenings';
import CompleteMyContent from './CompleteMyContent';
import RelatedContent from '../RelatedContent/RelatedContent';

import '../../../assets/styles/components/Video.scss';
import '../../../assets/styles/components/LearningPath.scss';

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

  componentDidMount() {
    const { history } = this.props;
    const { sectionId, contentId, contentType } = this.props.match.params;
    this.props.getSectionEnrollmentStatus(sectionId, contentId, contentType);
    history.listen(this.onRouteChange);
  }

  componentDidUpdate(prevProps) {
    const { sectionId, contentId, contentType } = this.props.match.params;
    if (contentId && prevProps.contentId && contentId !== prevProps.contentId) {
      this.props.getSectionEnrollmentStatus(sectionId, contentId, contentType);
    }
  }

  onRouteChange = () => {
    this.isContentEnrolled = true;
  }

  onClickPlayListVideo = videoId => {
    this.setState({
      playingVideo: videoId
    });
  }

  fetchContentDetails = () => {
    const { contentId, sectionId } = this.props.match.params;
    this.props.fetchContentDetails({
      contentType: routeConstant.YTVIDEO,
      contentId,
      sectionId
    });
  }

  fetchContentDetailsById = contentId => {
    const { pathId, sectionId } = this.props.match.params;
    this.props.fetchContentDetails({
      contentType: routeConstant.YTVIDEO,
      contentId,
      sectionId,
      learningPathId: pathId
    });
  }

  enrollIntoContent = () => {
    const {
      enrollContent,
      userId,
      match,
      sectionEnrollment
    } = this.props;
    enrollContent({
      sectionId: match.params.sectionId,
      contentId: match.params.contentId,
      sectionEnrollmentId: sectionEnrollment.sectionEnrollmentId,
      userId
    });
  }
  beforeLoad = () => {
    const confirmationMessage = 'Do you want to close';
    this.trackVideo();
    return confirmationMessage;
  };

  videoStatusPopup = redirectToPage => {
    redirect(this.props, redirectToPage, routeConstant.YTVIDEO);
  };

  redirectToSectionDetails = redirectToPage => {
    redirect(this.props, redirectToPage, routeConstant.YTVIDEO);
  }

  render() {
    const {
      contentDetails,
      markContentAsComplete,
      match,
      contentRoutes,
      updateLatestContentIdForUser
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
    const { learningpathName } = JSON.parse(storage.getItem('breadCrumb'));
    loadDisqus(this.props);
    return (
      <div className="row video-container">
        <div className="col-12 col-md-8 p-0 right-panel pr-lg-5">
          <div className="content-header-section">
            <SectionBreadCrumb
              learningPathName={learningpathName}
              content={{ title: contentDetails ? contentDetails.title : '', type: routeConstant.YTVIDEO }}
            />
            {
              contentDetails && contentDetails.id &&
              <ContentIntroduction
                contentTitle={contentDetails.title}
                contentDescription={contentDetails.description}
              />
            }
          </div>
          <div className="main-div">
            <div className="video-player">
              {contentDetails && contentDetails.link && contentDetails.id === match.params.contentId &&
                <YouTube
                  videoId={!playingVideo ? getYTVideoId(contentDetails && contentDetails.link) : playingVideo}
                  id={!playingVideo ? getYTVideoId(contentDetails && contentDetails.link) : playingVideo}
                  opts={opts}
                  onStateChange={this.onStateChangeYoutubeVideo}
                  ref={this.youtubePlayer}
                />
              }
            </div>
            <div className="my-4">
              <div id="expandableContent" className="content-description-expandable">
                <p id="youtube-detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                  {contentDetails.description}
                </p>
                { contentDetails.description && contentDetails.description.length > constantValues.expandableLimit &&
                  <span
                    className="expand content-expand collapsed"
                    data-toggle="collapse"
                    href="#youtube-detail"
                    aria-expanded="false"
                  />
                }
              </div>
            </div>
          </div>
          <div className="m-0 mt-4" id="disqus_thread" />
        </div>
        <div className="col-12 col-md-4">
          {contentRoutes && contentRoutes.length > 0 &&
            <CompleteMyContent
              contentRoutes={contentRoutes}
              isCompleted={contentDetails.is_completed}
              contentId={contentDetails.id}
              markContentAsComplete={markContentAsComplete}
              updateLatestContentIdForUser={updateLatestContentIdForUser}
              fetchContentDetails={this.fetchContentDetailsById}
            />
          }
          {contentDetails.id &&
            <RelatedContent
              contentId={contentDetails.id}
            />
          }
          <RecentHappenings />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sectionDetails: state.section.get('section'),
  sectionContents: state.section.get('sectionContents'),
  contentDetails: state.content.get('contentDetails'),
  userId: state.user.get('userId'),
  enrolledContent: state.content.get('enrolledContent'),
  userDetails: state.user.get('userDetails'),
  sectionEnrollment: state.section.get('sectionEnrollment')
});

const mapDispatchToProps = dispatch => ({
  enrollContent: enroll => dispatch(enrollMyContent(enroll)),
  fetchSectionContents: (sectionId, searchTerm) =>
    dispatch(fetchSectionContents(sectionId, searchTerm)),
  fetchContentDetails: (contentType, contentId) => dispatch(fetchContentDetails(contentType, contentId)),
  getSectionEnrollmentStatus: (sectionId, contentId, contentType) =>
    dispatch(getSectionEnrollmentStatus(sectionId, contentId, contentType))
});

YouTubeVideo.propTypes = {
  fetchContentDetails: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  match: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  enrollContent: PropTypes.func.isRequired,
  contentId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  markContentAsComplete: PropTypes.func.isRequired,
  sectionEnrollment: PropTypes.object,
  getSectionEnrollmentStatus: PropTypes.func.isRequired,
  updateLatestContentIdForUser: PropTypes.func.isRequired,
  contentRoutes: PropTypes.array.isRequired
};

YouTubeVideo.defaultProps = {
  contentDetails: {},
  sectionEnrollment: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(YouTubeVideo)));
