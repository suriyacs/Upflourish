import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Player, ControlBar, ReplayControl,
  ForwardControl, CurrentTimeDisplay,
  TimeDivider, PlaybackRateMenuButton, VolumeMenuButton,
  BigPlayButton
} from 'video-react';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';

import storage from '../../globals/localStorage';
import SectionBreadCrumb from '../../components/BreadCrumb/SectionBreadCrumb';
import ContentIntroduction from './ContentIntroduction';

import { fetchSectionContents, getSectionEnrollmentStatus } from '../../actions/section';
import { fetchContentDetails, enrollMyContent } from '../../actions/content';
import { routeConstant, constantValues } from '../../globals/AppConstant';
import redirect from '../../utils/Redirect';
import { loadDisqus } from '../../utils/Common';
import RecentHappenings from '../RecentHappenings/RecentHappenings';
import CompleteMyContent from './CompleteMyContent';

import '../../../assets/styles/components/Video.scss';
import '../../../assets/styles/components/LearningPath.scss';
import '../../../node_modules/video-react/styles/scss/video-react.scss';
import RelatedContent from '../RelatedContent/RelatedContent';

class Video extends Component {
  constructor() {
    super();
    this.player = React.createRef();
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

  componentWillUnmount() {
    const video = document.querySelector('video');
    if (video) {
      video.removeEventListener('ended', () => {
        const { player } = this.player.current.getState();
        if (player.ended) {
          this.setState(({ isFullVideoWatched }) => ({
            isFullVideoWatched: !isFullVideoWatched
          }));
        }
      });
    }
  }

  onRouteChange = () => {
    this.isContentEnrolled = true;
  }

  fetchContentDetails = () => {
    const { contentId, sectionId } = this.props.match.params;
    this.props.fetchContentDetails({
      contentType: routeConstant.CONTENT,
      contentId,
      sectionId
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

  redirectToSectionDetails = redirectToPage => {
    redirect(this.props, redirectToPage, routeConstant.CONTENT);
  }

  render() {
    const {
      contentDetails,
      markContentAsComplete,
      contentRoutes
    } = this.props;
    const { learningpathName } = JSON.parse(storage.getItem('breadCrumb'));
    loadDisqus(this.props);
    return (
      <div className="row">
        <div className="col-12 col-md-8 pr-lg-5">
          <div className="content-header-section">
            <SectionBreadCrumb
              learningPathName={learningpathName}
              content={{ title: contentDetails ? contentDetails.title : '', type: routeConstant.CONTENT }}
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
              {contentDetails && contentDetails.link &&
                <Player
                  fluid={false}
                  width="100%"
                  height={500}
                  ref={this.player}
                  autoPlay
                >
                  <source src={contentDetails && contentDetails.link} />
                  <ControlBar autoHide={false}>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton
                      rates={[2, 1.5, 1.25, 1, 0.75, 0.5]}
                      order={7.1}
                    />
                    <VolumeMenuButton enabled />
                  </ControlBar>
                  <BigPlayButton position="center" />
                </Player>
              }
            </div>
            <div className="my-4">
              <div id="expandableContent" className="content-description-expandable">
                <p id="video-detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                  {contentDetails.description}
                </p>
                { contentDetails.description && contentDetails.description.length > constantValues.expandableLimit &&
                  <span
                    className="expand content-expand collapsed"
                    data-toggle="collapse"
                    href="#video-detail"
                    aria-expanded="false"
                  />
                }
              </div>
            </div>
          </div>
          <div id="disqus_thread" />
        </div>
        <div className="col-12 col-md-4">
          { contentRoutes && contentRoutes.length > 0 &&
            <CompleteMyContent
              isCompleted={contentDetails.is_completed}
              contentId={contentDetails.id}
              markContentAsComplete={markContentAsComplete}
              {...this.props}
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

Video.propTypes = {
  fetchContentDetails: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  match: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  enrolledContent: PropTypes.object,
  enrollContent: PropTypes.func.isRequired,
  contentId: PropTypes.string.isRequired,
  fetchSectionContents: PropTypes.func.isRequired,
  componentContentType: PropTypes.string,
  history: PropTypes.object.isRequired,
  markContentAsComplete: PropTypes.func.isRequired,
  sectionEnrollment: PropTypes.object,
  getSectionEnrollmentStatus: PropTypes.func.isRequired,
  contentRoutes: PropTypes.array.isRequired
};

Video.defaultProps = {
  contentDetails: {},
  enrolledContent: {},
  componentContentType: '',
  sectionEnrollment: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(Video)));
