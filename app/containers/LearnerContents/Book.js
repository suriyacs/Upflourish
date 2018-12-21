import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { withRouter } from 'react-router-dom';

import storage from '../../globals/localStorage';
import SectionBreadCrumb from '../../components/BreadCrumb/SectionBreadCrumb';
import redirect from '../../utils/Redirect';
import { loadDisqus } from '../../utils/Common';
import { fetchSectionContents, getSectionEnrollmentStatus } from '../../actions/section';
import { fetchContentDetails, completeContent, enrollMyContent } from '../../actions/content';
import { routeConstant, constantValues } from '../../globals/AppConstant';
import ContentIntroduction from './ContentIntroduction';
import RecentHappenings from '../RecentHappenings/RecentHappenings';
import CompleteMyContent from './CompleteMyContent';
import RelatedContent from '../RelatedContent/RelatedContent';

import '../../../assets/styles/components/Video.scss';
import '../../../assets/styles/components/LearningPath.scss';

class Book extends Component {
  constructor() {
    super();
    this.redirectToPage = '';
    this.secondsViewed = 0;
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

  onCompleteReadingContent = () => {
    const { contentId } = this.props.match.params;
    this.props.completeMyContent({
      contentId,
      userId: this.props.userId
    });
  }

  fetchContentDetails = () => {
    const { contentId, sectionId } = this.props.match.params;
    this.props.fetchContentDetails({
      contentType: routeConstant.BOOK,
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

  startTimer = () => {
    this.incrementer = setInterval(
      () => {
        (this.secondsViewed += 1);
      }
      , 1000
    );
  }

  generateIframeUrl = link => {
    if (link) {
      return `https://docs.google.com/viewer?embedded=true&url=${encodeURI(link)}`;
    }
  }

  redirectToSectionDetails = () => {
    clearInterval(this.incrementer);
    redirect(this.props, this.redirectToPage, routeConstant.BOOK);
  }

  render() {
    const {
      contentDetails,
      markContentAsComplete,
      match,
      contentRoutes
    } = this.props;
    const { learningpathName } = JSON.parse(storage.getItem('breadCrumb'));
    loadDisqus(this.props);
    return (
      <div className="row">
        <div className="col-12 col-md-8 content-header-section pr-lg-5">
          <div>
            <SectionBreadCrumb
              learningPathName={learningpathName}
              content={{ title: contentDetails ? contentDetails.title : '', type: routeConstant.BOOK }}
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
              <iframe
                title="viewer"
                width="640"
                height="900"
                src={this.generateIframeUrl(contentDetails && contentDetails.link)}
                frameBorder="0"
                allowFullScreen
                onLoad={this.startTimer}
              />
            </div>
            <div className="my-4">
              <div id="expandableContent" className="content-description-expandable">
                <p id="book-detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                  {contentDetails.description}
                </p>
                { contentDetails.description && contentDetails.description.length > constantValues.expandableLimit &&
                  <span
                    className="expand content-expand collapsed"
                    data-toggle="collapse"
                    href="#book-detail"
                    aria-expanded="false"
                  />
                }
              </div>
            </div>
          </div>
          <div className="m-0 mt-4 " id="disqus_thread" />
        </div>
        <div className="col-12 col-md-4">
          {contentRoutes && contentRoutes.length > 0 &&
            <CompleteMyContent
              isCompleted={contentDetails.is_completed}
              contentId={match.params.contentId}
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
  completeMyContent: data => dispatch(completeContent(data)),
  getSectionEnrollmentStatus: (sectionId, contentId, contentType) =>
    dispatch(getSectionEnrollmentStatus(sectionId, contentId, contentType))
});

Book.propTypes = {
  fetchContentDetails: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  match: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  completeMyContent: PropTypes.func.isRequired,
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

Book.defaultProps = {
  contentDetails: {},
  enrolledContent: {},
  componentContentType: '',
  sectionEnrollment: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(Book)));
