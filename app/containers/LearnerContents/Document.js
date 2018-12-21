import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import storage from '../../globals/localStorage';
import SectionBreadCrumb from '../../components/BreadCrumb/SectionBreadCrumb';
import redirect from '../../utils/Redirect';
import { loadDisqus } from '../../utils/Common';
import { fetchContentDetails, completeContent, enrollMyContent } from '../../actions/content';
import { fetchSectionContents, getSectionEnrollmentStatus } from '../../actions/section';
import { routeConstant, constantValues } from '../../globals/AppConstant';
import Button from '../../components/Button/Button';
import ContentIntroduction from './ContentIntroduction';
import RecentHappenings from '../RecentHappenings/RecentHappenings';
import CompleteMyContent from './CompleteMyContent';

import '../../../assets/styles/components/Video.scss';
import '../../../assets/styles/components/LearningPath.scss';
import RelatedContent from '../RelatedContent/RelatedContent';

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true
    };
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
    this.setState({
      isModalOpen: true
    });
  }

  onCompleteReadingContent = () => {
    const { contentId } = this.props.match.params;
    this.props.completeMyContent({
      contentId,
      userId: this.props.userId
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

  fetchContentDetails = () => {
    const { contentId, sectionId } = this.props.match.params;
    this.props.fetchContentDetails({
      contentType: routeConstant.DOCUMENT,
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

  generateIframeUrl = link => {
    if (link) {
      return `https://docs.google.com/viewer?embedded=true&url=${encodeURI(link)}`;
    }
  }

  redirectToSectionDetails = () => {
    clearInterval(this.incrementer);
    redirect(this.props, this.redirectToPage, routeConstant.DOCUMENT);
  }

  togglePopup = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    const {
      contentDetails,
      markContentAsComplete,
      contentRoutes
    } = this.props;
    const { learningpathName } = JSON.parse(storage.getItem('breadCrumb'));
    loadDisqus(this.props);
    const locale = this.props.locale.document;
    return (
      <div className="row">
        <div className="col-12 col-md-8 content-container pr-lg-5">
          <div className="content-header-section">
            <SectionBreadCrumb
              learningPathName={learningpathName}
              content={{ title: contentDetails ? contentDetails.title : '', type: routeConstant.ARTICLE }}
            />
            {
              contentDetails && contentDetails.id &&
              <ContentIntroduction
                contentTitle={contentDetails.title}
                contentDescription={contentDetails.description}
              />
            }
          </div>
          <div className="iframe-wrapper">
            <div className="iframe-layer">
              <iframe
                title="viewer"
                src={this.generateIframeUrl(contentDetails && contentDetails.link)}
                frameBorder="0"
                allowFullScreen
                onLoad={this.startTimer}
              />
            </div>
            <div className="block-preview d-flex justify-content-center align-items-center">
              <Button
                value={locale.readTheArticle}
                className="m-0 read-btn"
                type="button"
                onClick={this.togglePopup}
              />
            </div>
          </div>
          <div className="my-4">
            <div id="expandableContent" className="content-description-expandable">
              <p id="document-detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                {contentDetails.description}
              </p>
              { contentDetails.description && contentDetails.description.length > constantValues.expandableLimit &&
                <span
                  className="expand content-expand collapsed"
                  data-toggle="collapse"
                  href="#document-detail"
                  aria-expanded="false"
                />
              }
            </div>
          </div>
          <div id="disqus_thread" />
          <Modal
            isOpen={this.state.isModalOpen}
            toggle={this.togglePopup}
            modalClassName="min-h-100 content-view-modal"
          >
            <ModalHeader toggle={this.togglePopup}>{locale.testArticle}</ModalHeader>
            <ModalBody>
              <iframe
                title="viewer"
                width="100%"
                src={this.generateIframeUrl(contentDetails && contentDetails.link)}
                frameBorder="0"
                allowFullScreen
                onLoad={this.startTimer}
              />
            </ModalBody>
          </Modal>
        </div>
        <div className="col-12 col-md-4">
          {contentRoutes && contentRoutes.length > 0 &&
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
  contentDetails: state.content.get('contentDetails'),
  userDetails: state.user.get('userDetails'),
  userId: state.user.get('userId'),
  enrolledContent: state.content.get('enrolledContent'),
  sectionContentsForLearner: Array.from(state.section.get('sectionContents')),
  sectionEnrollment: state.section.get('sectionEnrollment')
});

const mapDispatchToProps = dispatch => ({
  enrollContent: enroll => dispatch(enrollMyContent(enroll)),
  fetchContentDetails: (contentType, contentId) => dispatch(fetchContentDetails(contentType, contentId)),
  completeMyContent: data => dispatch(completeContent(data)),
  fetchSectionContents: (sectionId, searchTerm, userId) =>
    dispatch(fetchSectionContents(sectionId, searchTerm, userId)),
  getSectionEnrollmentStatus: (sectionId, contentId, contentType) =>
    dispatch(getSectionEnrollmentStatus(sectionId, contentId, contentType))
});

Document.propTypes = {
  fetchContentDetails: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  match: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  completeMyContent: PropTypes.func.isRequired,
  enrollContent: PropTypes.func.isRequired,
  contentId: PropTypes.string.isRequired,
  enrolledContent: PropTypes.object,
  fetchSectionContents: PropTypes.func.isRequired,
  componentContentType: PropTypes.string,
  history: PropTypes.object.isRequired,
  markContentAsComplete: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  sectionEnrollment: PropTypes.object,
  getSectionEnrollmentStatus: PropTypes.func.isRequired,
  contentRoutes: PropTypes.array.isRequired
};

Document.defaultProps = {
  contentDetails: {},
  enrolledContent: {},
  componentContentType: '',
  sectionEnrollment: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(Document)));
