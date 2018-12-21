import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Article from '../LearnerContents/Article';
import Book from '../LearnerContents/Book';
import Document from '../LearnerContents/Document';
import YTVideo from '../LearnerContents/YouTube';
import Video from '../LearnerContents/Video';
import LearnerAssessment from '../LearnerContents/LearnerAssessment';

class LearnerContent extends Component {
  renderContentByContentType = () => {
    const { contentType, contentId } = this.props.match.params;
    const {
      contentRoutes,
      markContentAsComplete,
      updateLatestContentIdForUser
    } = this.props;
    const contentComponents = {
      article: <Article
        contentId={contentId}
        componentContentType={contentType}
        markContentAsComplete={markContentAsComplete}
        updateLatestContentIdForUser={updateLatestContentIdForUser}
        contentRoutes={contentRoutes}
      />,
      book: <Book
        contentId={contentId}
        componentContentType={contentType}
        markContentAsComplete={markContentAsComplete}
        updateLatestContentIdForUser={updateLatestContentIdForUser}
        contentRoutes={contentRoutes}
      />,
      document: <Document
        contentId={contentId}
        componentContentType={contentType}
        markContentAsComplete={markContentAsComplete}
        updateLatestContentIdForUser={updateLatestContentIdForUser}
        contentRoutes={contentRoutes}
      />,
      video: <Video
        contentId={contentId}
        componentContentType={contentType}
        markContentAsComplete={markContentAsComplete}
        updateLatestContentIdForUser={updateLatestContentIdForUser}
        contentRoutes={contentRoutes}
      />,
      ytvideo: <YTVideo
        contentId={contentId}
        componentContentType={contentType}
        markContentAsComplete={markContentAsComplete}
        updateLatestContentIdForUser={updateLatestContentIdForUser}
        contentRoutes={contentRoutes}
      />,
      assessment: <LearnerAssessment
        contentId={contentId}
        componentContentType={contentType}
        updateLatestContentIdForUser={updateLatestContentIdForUser}
        contentRoutes={contentRoutes}
      />
    };
    return contentComponents[contentType];
  }

  render() {
    return (
      <div className="p-3 p-t-10">
        <div className="container-fluid">
          { this.renderContentByContentType() }
        </div>
      </div>
    );
  }
}

LearnerContent.propTypes = {
  match: PropTypes.object.isRequired,
  contentRoutes: PropTypes.array.isRequired,
  markContentAsComplete: PropTypes.func.isRequired,
  updateLatestContentIdForUser: PropTypes.func.isRequired
};

export default LearnerContent;
