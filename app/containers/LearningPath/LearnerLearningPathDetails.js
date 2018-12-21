import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';

import NonSortableSectionList from './NonSortableSectionList';
import {
  fetchLearningPathDetailsForLearner,
  enrollLearningPath
} from '../../actions/learningPath';
import { routeConstant } from '../../globals/AppConstant';
import storage from '../../globals/localStorage';
import DetailSideMenu from '../SideMenu/DetailSideMenu';

import '../../../assets/styles/components/LearningPath.scss';

class LearnerLearningPathDetails extends Component {
  constructor() {
    super();
    this.learningPathExpandableLimit = 150;
  }

  componentDidMount() {
    this.props.fetchLearningPathDetailsForLearner(this.props.match.params.pathId);
  }

  componentDidUpdate() {
    const learningPathDetails = this.props.learningPathDetailsForLearner;
    if (learningPathDetails && learningPathDetails.name) {
      storage.setItem(
        'breadCrumb',
        JSON.stringify({ learningpathName: this.props.learningPathDetailsForLearner.name })
      );
    }
  }

  onClickEnroll = () => {
    const { enrollMyLearningPath, match, userId } = this.props;
    enrollMyLearningPath({
      userId,
      pathId: match.params.pathId
    });
  }

  onClickViewSectionContents = (sectionId, latestContent) => {
    this.props.history.push({
      pathname: `${this.props.match.url}${routeConstant.SECTION}/` +
      `${sectionId}/${latestContent.content_type.toLowerCase()}/${latestContent.id}`
    });
  }

  getRouteURL = () => {
    const { careerId } = this.props.match.params;
    if (careerId) {
      return `${routeConstant.DASHBOARD}${routeConstant.CAREER}/${careerId}`;
    }
    return `${routeConstant.DASHBOARD}`;
  }

  render() {
    const { learningPathDetailsForLearner, learningPathSectionsForLearner } = this.props;
    const locale = this.props.locale.learnerLearningPathDetails;
    return (
      <div className="row learner-section">
        {
          learningPathDetailsForLearner && learningPathDetailsForLearner.id &&
          <DetailSideMenu
            name={learningPathDetailsForLearner.name}
            description={learningPathDetailsForLearner.description}
            user={learningPathDetailsForLearner.user}
            {...this.props}
            routeUrl={this.getRouteURL()}
            courseId={learningPathDetailsForLearner.id}
            courseType={`${routeConstant.SKILL_TRACK}`}
          />
        }
        <div className="col-12 col-lg-8 px-5 pb-5 learner-section-inner">
          <div className="col-12 p-3 flow-diagram p-0">
            <div className="title pt-3">
              {learningPathDetailsForLearner.name}
            </div>
            {/* <img
              src={FlowDiagram}
              alt="Flow Diagram"
              className="FlowDiagram w-100"
            /> */}
          </div>
          {/* <div className="col-12 d-flex justify-content-end p-0">
            <button
              className="btn enroll-btn"
              onClick={learningPathDetailsForLearner.enrolment ? null : this.onClickEnroll}
              disabled={learningPathDetailsForLearner.enrolment}
            >
              {learningPathDetailsForLearner.enrolment ? locale.enrolledButton : locale.enrollButton}
            </button>
          </div> */}
          <div className="section-list">
            <NonSortableSectionList
              axis="xy"
              distance={1}
              sections={learningPathSectionsForLearner}
              onClickViewSectionContents={this.onClickViewSectionContents}
              locale={locale}
              enrollmentId={learningPathDetailsForLearner.enrolment && learningPathDetailsForLearner.enrolment.id}
              enrollmentSectionId={learningPathDetailsForLearner.enrolment
                && learningPathDetailsForLearner.enrolment.latestSection &&
                learningPathDetailsForLearner.enrolment.latestSection.id}
              onClickEnroll={this.onClickEnroll}
              {...this.props}
            />
          </div>
        </div>
      </div>
    );
  }
}

LearnerLearningPathDetails.propTypes = {
  match: PropTypes.object.isRequired,
  fetchLearningPathDetailsForLearner: PropTypes.func.isRequired,
  fetchLearningPathSectionsForLearner: PropTypes.func,
  learningPathDetailsForLearner: PropTypes.object.isRequired,
  learningPathSectionsForLearner: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  enrollMyLearningPath: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

LearnerLearningPathDetails.defaultProps = {
  fetchLearningPathSectionsForLearner: null
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  learningPathDetailsForLearner: state.learningPath.get('learningPathDetailsForLearner'),
  learningPathSectionsForLearner: Array.from(state.learningPath.get('learningPathSections')),
  userId: state.user.get('userId')
});

const mapDispatchToProps = dispatch => ({
  fetchLearningPathDetailsForLearner: (learningPathId, userId) =>
    dispatch(fetchLearningPathDetailsForLearner(learningPathId, userId)),
  enrollMyLearningPath: enroll => dispatch(enrollLearningPath(enroll))
});

export default
withRouter(connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(LearnerLearningPathDetails)));
