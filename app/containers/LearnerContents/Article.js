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
import Loader from '../../components/Loader/Loader';
import { fetchContentDetails, completeContent, enrollMyContent } from '../../actions/content';
import { fetchSectionContents, getSectionEnrollmentStatus } from '../../actions/section';
import { routeConstant, constantValues } from '../../globals/AppConstant';
import Button from '../../components/Button/Button';
import ContentIntroduction from './ContentIntroduction';
import RecentHappenings from '../RecentHappenings/RecentHappenings';
import CompleteMyContent from './CompleteMyContent';
import RelatedContent from '../RelatedContent/RelatedContent';

import '../../../assets/styles/components/LearningPath.scss';

class Article extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      showLoader: true,
      isModalOpen: true
    };
    this.redirectToPage = '';
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

  fetchContentDetails = () => {
    const { contentId, sectionId } = this.props.match.params;
    this.props.fetchContentDetails({
      contentType: routeConstant.ARTICLE,
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

  redirectToList = () => {
    redirect(this.props, this.redirectToPage, routeConstant.ARTICLE);
  }

  startTimer = () => {
    this.start = setInterval(
      () => {
        (this.timer += 1);
      }
      , 1000
    );
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
      match,
      contentRoutes
    } = this.props;
    const locale = this.props.locale.article;
    const { learningpathName } = JSON.parse(storage.getItem('breadCrumb'));
    loadDisqus(this.props);
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
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                id="iframe_blog"
                width="100%"
                name="iframe_blog"
                title="article"
                src={contentDetails && contentDetails.link}
                onLoad={() => {
                  this.setState({
                    showLoader: false
                  }, this.startTimer);
                }}
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
          <Loader loading={this.state.showLoader} />
          <div className="my-4">
            <div id="expandableContent" className="content-description-expandable">
              <p id="video-title" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                {contentDetails.description}
              </p>
              { contentDetails.description && contentDetails.description.length > constantValues.expandableLimit &&
                <span
                  className="expand content-expand collapsed"
                  data-toggle="collapse"
                  href="#video-title"
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
            <ModalHeader toggle={this.togglePopup}>
              <span className="modal-title" title={contentDetails.title}>
                {contentDetails ? contentDetails.title : ''}
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="row h-100">
                <div className="col-10 offset-1">
                  <iframe
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    id="iframe_blog"
                    width="100%"
                    name="iframe_blog"
                    title="article"
                    src={contentDetails && contentDetails.link}
                    onLoad={() => {
                      this.setState({
                        showLoader: false
                      }, this.startTimer);
                    }}
                  />
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
        <div className="col-12 col-md-4">
          { contentRoutes && contentRoutes.length > 0 &&
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
  contentDetails: state.content.get('contentDetails'),
  userId: state.user.get('userId'),
  enrolledContent: state.content.get('enrolledContent'),
  sectionContentsForLearner: Array.from(state.section.get('sectionContents')),
  userDetails: state.user.get('userDetails'),
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

Article.propTypes = {
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

Article.defaultProps = {
  contentDetails: {},
  enrolledContent: {},
  componentContentType: '',
  sectionEnrollment: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(Article)));
