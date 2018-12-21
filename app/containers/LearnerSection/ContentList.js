import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, NavLink, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { routeConstant, iconTypes } from '../../globals/AppConstant';
// import ContentSharingRating from '../LearnerContents/ContentSharingRating';
import LearnerContent from './LearnerContent';
import storage from '../../globals/localStorage';
import {
  fetchSectionContents,
  clearSectionContents
} from '../../actions/section';
import { updateLatestContentForUser, markContentAsCompleted, clearCompletedContent } from '../../actions/content';

import '../../../assets/styles/components/SectionContent.scss';
import CloseIcon from '../../../assets/images/cancel.svg';
import Menu from '../../../assets/images/menu.svg';

const getIconPath = iconType => iconTypes[iconType];

const setRoute = (content, match) => {
  // to get url string till section id
  const { url } = match;
  const { careerId, pathId } = match.params;
  let urlPrefix = '';
  if (careerId) {
    urlPrefix = url.split('/').slice(0, 8).join('/');
  } else if (pathId) {
    urlPrefix = url.split('/').slice(0, 6).join('/');
  } else {
    urlPrefix = url.split('/').slice(0, 4).join('/');
  }
  const {
    id: contentId,
    content_type: contentType,
    title,
    is_completed: isCompleted,
    is_playlist: isPlaylist,
    link,
    isStarted,
    description,
    minutes
  } = content;
  return (
    {
      contentId,
      exact: true,
      path: `${urlPrefix}/${contentType.toLowerCase()}/${contentId}`,
      title,
      contentType,
      isCompleted,
      isPlaylist,
      link,
      iconPath: getIconPath(contentType),
      isStarted,
      description,
      minutes
    }
  );
};

const setContentRoutes = (sectionContents, match) => sectionContents.map(content => setRoute(content, match));

class ContentList extends Component {
  static getDerivedStateFromProps(nextProps) {
    const {
      sectionContentsForLearner,
      match,
      history,
      completedContent
    } = nextProps;
    if (completedContent && completedContent.content_id) {
      return {
        isContentCompleted: completedContent.is_completed
      };
    }
    // to get the content type and content id from the url
    const urlItems = match.url.split('/');
    const { careerId, pathId } = match.params;
    if (sectionContentsForLearner && sectionContentsForLearner.length) {
      if (careerId) {
        return {
          contentRoutes: setContentRoutes(sectionContentsForLearner, match, history),
          selectedContentId: urlItems.length > 8 && urlItems[9],
          selectedContentType: urlItems.length > 8 && urlItems[8],
          isContentCompleted: urlItems.length > 8 && urlItems[9] &&
            _.filter(sectionContentsForLearner, { id: urlItems[9] })[0].is_completed
        };
      } else if (pathId) {
        return {
          contentRoutes: setContentRoutes(sectionContentsForLearner, match, history),
          selectedContentId: urlItems.length > 6 && urlItems[7],
          selectedContentType: urlItems.length > 6 && urlItems[6],
          isContentCompleted: urlItems.length > 6 && urlItems[7] &&
            _.filter(sectionContentsForLearner, { id: urlItems[7] })[0].is_completed
        };
      }
      return {
        contentRoutes: setContentRoutes(sectionContentsForLearner, match, history),
        selectedContentId: urlItems.length > 4 && urlItems[5],
        selectedContentType: urlItems.length > 4 && urlItems[4],
        isContentCompleted: urlItems.length > 4 && urlItems[5] &&
          _.filter(sectionContentsForLearner, { id: urlItems[5] })[0].is_completed
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      isContentCompleted: false,
      contentRoutes: [],
      showSideContent: false
    };
  }

  componentDidMount() {
    const { sectionId } = this.props.match.params;
    this.props.fetchSectionContents(sectionId, '', storage.getItem('user'));
    this.props.history.listen(this.onRouteChange);
  }

  onRouteChange = () => {
    this.props.clearSectionContents();
    this.props.clearCompletedContent();
  }

  setSelectedContent = isCompleted => {
    this.setState({
      isContentCompleted: isCompleted
    });
  }

  setSideContentVisible = sideContent => {
    this.setState({
      showSideContent: sideContent
    });
  }

  updateLatestContentIdForUser = contentId => {
    const { match } = this.props;
    this.props.updateLatestContent(match.params.sectionId, contentId);
  }

  redirectToCertificate = () => {
    const { careerId } = this.props.match.params;
    this.props.history.push(`${routeConstant.CERTIFICATE}${routeConstant.COURSE}/${careerId}`);
  };

  markContentAsComplete = contentId => {
    const { match } = this.props;
    this.props.markAsComplete({
      sectionId: match.params.sectionId,
      contentId,
      contentType: match.params.contentType
    }, this.redirectToCertificate);
  }

  goToLearningPath = () => {
    const { pathId } = this.props.match.params;
    if (!pathId) {
      this.props.history.push(routeConstant.DASHBOARD);
    } else {
      const { url } = this.props.match;
      this.props.history.push(_.split(url, routeConstant.SECTION)[0]);
    }
  }

  render() {
    const {
      contentRoutes,
      isContentCompleted
    } = this.state;
    const { careerId, pathId } = this.props.match.params;
    return (
      <div className="row wrapper">
        <div className={this.state.showSideContent ? 'sidebar' : 'sidebar close-sidebar'} >
          <div className="content-sidebar-section p-0" >
            <div
              className="back-section"
              onClick={() => { this.goToLearningPath(); }}
              role="presentation"
            >
              <i className="fa fa-angle-left left-angle" />
              <span className="back-to">
                {
                  !pathId && 'Back to Home'
                }
                {
                  pathId && 'Back to skill'
                }
              </span>
            </div>
            <ul className="content-list">
              {contentRoutes.map(route => (
                <li key={route.contentId} className="content-item">
                  <NavLink
                    to={{
                      pathname: route.path
                    }}
                    onClick={() => {
                      this.setSelectedContent(route.isCompleted);
                      this.updateLatestContentIdForUser(route.contentId);
                      this.setSideContentVisible(false);
                    }}
                    className="d-flex flex-row align-items-center"
                    activeClassName="active-content"
                    title={route.title}
                  >
                    <img src={route.iconPath} className="content-icon d-flex flex-column col-2" alt="" />
                    <div className="two-row-ellipsis m-0 col-10">{route.title}</div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-sidecontent">
            <span className="close-sidebar">
              <img
                src={CloseIcon}
                role="presentation"
                alt="close"
                title="Close SideBar"
                onClick={() => this.setSideContentVisible(false)}
              />
            </span>
          </div>
        </div>
        <div className="no-content-sidebar-section p-0" >
          <span
            className="open-sidebar
            learner-sidebar"
            role="presentation"
            onClick={() => this.setSideContentVisible(true)}
          >
            <img
              src={Menu}
              alt="opensidenav"
              title="Open SideNav"
            />
          </span>
        </div>
        <div className="p-0 content-outer px-5 pb-5">
          {careerId &&
            <Route
              path={
                `${
                  routeConstant.DASHBOARD
                }${
                  routeConstant.CAREERID
                }${
                  routeConstant.LEARNINGPATHID
                }${
                  routeConstant.SECTIONID
                }${
                  routeConstant.CONTENTID
                }`
              }
              render={() => (
                <LearnerContent
                  contentRoutes={contentRoutes}
                  isCompleted={isContentCompleted}
                  markContentAsComplete={this.markContentAsComplete}
                  updateLatestContentIdForUser={this.updateLatestContentIdForUser}
                  {
                  ...this.props
                  }
                />)
              }
            />
          }
          {pathId &&
            <Route
              path={
                `${
                  routeConstant.DASHBOARD
                }${
                  routeConstant.LEARNINGPATHID
                }${
                  routeConstant.SECTIONID
                }${
                  routeConstant.CONTENTID
                }`
              }
              render={() => (
                <LearnerContent
                  contentRoutes={contentRoutes}
                  isCompleted={isContentCompleted}
                  markContentAsComplete={this.markContentAsComplete}
                  updateLatestContentIdForUser={this.updateLatestContentIdForUser}
                  {
                  ...this.props
                  }
                />)
              }
            />
          }
          {!pathId &&
            <Route
              path={
                `${
                  routeConstant.DASHBOARD
                }${
                  routeConstant.SECTIONID
                }${
                  routeConstant.CONTENTID
                }`
              }
              render={() => (
                <LearnerContent
                  contentRoutes={contentRoutes}
                  isCompleted={isContentCompleted}
                  markContentAsComplete={this.markContentAsComplete}
                  updateLatestContentIdForUser={this.updateLatestContentIdForUser}
                  {
                  ...this.props
                  }
                />)
              }
            />
          }
        </div>
        {/* {selectedContentId && selectedContentType &&
          (selectedContentType.toLowerCase() !== 'assessment') &&
          <Col md={3} lg={3} className="p-t-10">
            <ContentSharingRating
              isCompleted={isContentCompleted}
              contentId={selectedContentId}
              markContentAsComplete={this.markContentAsComplete}
              contentType={(selectedContentType === 'YTVideo' || selectedContentType === 'ytvideo')
                ? 'Video' : selectedContentType}
            />
          </Col>
        } */}
      </div >
    );
  }
}

ContentList.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fetchSectionContents: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  sectionContentsForLearner: PropTypes.array,
  completedContent: PropTypes.object,
  location: PropTypes.any.isRequired,
  updateLatestContent: PropTypes.func.isRequired,
  markAsComplete: PropTypes.func.isRequired,
  clearSectionContents: PropTypes.func.isRequired,
  clearCompletedContent: PropTypes.func.isRequired,
  sectionEnrollment: PropTypes.object.isRequired
};

ContentList.defaultProps = {
  sectionContentsForLearner: [],
  completedContent: {}
};

const mapStateToProps = state => ({
  sectionContentsForLearner: Array.from(state.section.get('sectionContents')),
  completedContent: state.content.get('completedContent'),
  userId: state.user.get('userId'),
  sectionEnrollment: state.section.get('sectionEnrollment')
});

const mapDispatchToProps = dispatch => ({
  fetchSectionContents: (sectionId, searchTerm, userId) =>
    dispatch(fetchSectionContents(sectionId, searchTerm, userId)),
  updateLatestContent: (sectionId, contentId) =>
    dispatch(updateLatestContentForUser(sectionId, contentId)),
  markAsComplete: (data, openPopupCb) => dispatch(markContentAsCompleted(data, openPopupCb)),
  clearSectionContents: () => dispatch(clearSectionContents()),
  clearCompletedContent: () => dispatch(clearCompletedContent())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentList));
