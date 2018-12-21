import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { translatable } from 'react-multilingual';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';

import '../../../assets/styles/components/LearningPath.scss';

import toBeCompletedIcon from '../../../assets/images/completed-bl.svg';
import completedIcon from '../../../assets/images/completed-w.svg';
import nextIcon from '../../../assets/images/left-copy.svg';
import NoImage from '../../../assets/images/no-image.svg';

class CompleteMyContent extends Component {
  getNextResource = (contentId, contentRoutes) => {
    const { careerId, pathId } = this.props.match.params;
    const { url } = this.props.match;
    let urlPrefix = '';
    if (careerId) {
      urlPrefix = url.split('/').slice(0, 8).join('/');
    } else if (pathId) {
      urlPrefix = url.split('/').slice(0, 6).join('/');
    } else {
      urlPrefix = url.split('/').slice(0, 4).join('/');
    }
    if (contentId && _.findIndex(contentRoutes, ['contentId', contentId]) !== (contentRoutes.length - 1)) {
      const nextContent = contentRoutes[_.findIndex(contentRoutes, ['contentId', contentId]) + 1];
      nextContent.path = `${urlPrefix}/${nextContent.contentType.toLowerCase()}/${nextContent.contentId}`;
      return nextContent;
    }
  };

  moveNextContent = (contentId, contentRoutes) => {
    const nextContent = this.getNextResource(contentId, contentRoutes);
    this.props.history.push(nextContent.path);
    this.props.updateLatestContentIdForUser(nextContent.contentId);
  };

  render() {
    const {
      contentId,
      markContentAsComplete,
      isCompleted,
      contentRoutes,
      locale,
      contentType,
      completingContent
    } = this.props;
    const isAssessment = (contentType === 'assessment');
    const { contentIntroduction } = locale;
    return (
      <Fragment>
        <Loader loading={completingContent} />
        {!isAssessment &&
          <div className="complete-btn-section">
            <button
              className={`complete-btn m-t-50 col-5 ${isCompleted ?
                ' completed' : ''}
            `}
              onClick={!isCompleted ? () => markContentAsComplete(contentId) :
                () => { }}
            >
              <img
                className="complete-icon"
                src={isCompleted ? completedIcon : toBeCompletedIcon}
                alt="complete-icon"
                onError={event => { event.target.src = NoImage; }}
              />
              <span>{isCompleted ? contentIntroduction.markedAsDone : contentIntroduction.markAsComplete}</span>
            </button>
          </div>
        }
        <div className={`next-btn-section ${isAssessment && 'border-bottom-none'}`}>
          {_.last(contentRoutes).contentId !== contentId && this.getNextResource(contentId, contentRoutes) ?
            <button
              className={`btn p-0 next-btn c-pointer col-5  ${isAssessment ? 'mt-4' : 'mb-4'}`}
              onClick={() => { this.moveNextContent(contentId, contentRoutes); }}
            >
              <span>{contentIntroduction.nextResource}</span>
              <img
                className="next-icon"
                src={nextIcon}
                alt="next-icon"
              />
            </button>
            :
            <button
              className={`btn p-0 next-btn c-pointer col-5  ${isAssessment ? 'mt-4' : 'mb-4'}`}
              disabled
            >
              <span>{contentIntroduction.nextResource}</span>
              <img
                className="next-icon"
                src={nextIcon}
                alt="next-icon"
                onError={event => { event.target.src = NoImage; }}
              />
            </button>
          }
        </div>
      </Fragment >
    );
  }
}

CompleteMyContent.propTypes = {
  contentRoutes: PropTypes.array.isRequired,
  contentId: PropTypes.string,
  isCompleted: PropTypes.bool,
  markContentAsComplete: PropTypes.func,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  updateLatestContentIdForUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  contentType: PropTypes.string,
  completingContent: PropTypes.bool
};

CompleteMyContent.defaultProps = {
  isCompleted: false,
  contentId: '',
  contentType: '',
  markContentAsComplete: null,
  completingContent: false
};

const mapStateToProps = state => ({
  completingContent: state.content.get('completingContent')
});

export default withRouter(connect(mapStateToProps, null)(translatable(locale => locale)(CompleteMyContent)));
