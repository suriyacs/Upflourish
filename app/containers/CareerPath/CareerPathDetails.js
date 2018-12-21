import React, { Component } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Progress } from 'reactstrap';
import _ from 'lodash';

import redirectTo from '../../utils/Redirect';
import { routeConstant } from '../../globals/AppConstant';
import {
  fetchCareerTrack,
  fetchSkillTracksByCTId
} from '../../actions/careerTrack';
import { enrollLearningPath } from '../../actions/learningPath';
import DetailSideMenu from '../SideMenu/DetailSideMenu';
import ClockIcon from '../../../assets/images/clock.svg';

import '../../../assets/styles/components/CareerPath.scss';

class CareerPath extends Component {
  constructor() {
    super();
    this.skillIdToView = '';
  }
  componentDidMount() {
    const { careerId } = this.props.match.params;
    this.props.fetchCareerTrack(careerId);
    this.props.fetchSkillTracksByCTId(careerId);
  }

  componentDidUpdate(prevProps) {
    const { careerId } = this.props.match.params;
    if (!_.isEqual(prevProps.enrolledLearningPath, this.props.enrolledLearningPath)) {
      this.props.history.push(`${routeConstant.DASHBOARD}${routeConstant.CAREER}/${careerId}${
        routeConstant.LEARNINGPATH}/${this.skillIdToView}`);
    }
  }

  goBack = () => {
    redirectTo(this.props, routeConstant.DASHBOARD);
  }

  enrollSkillTrack = selectedSkillTrack => {
    const { careerId } = this.props.match.params;
    this.skillIdToView = selectedSkillTrack.skill_track_id;
    if (selectedSkillTrack.skill.enrolments.length) {
      this.props.history.push(`${routeConstant.DASHBOARD}${routeConstant.CAREER}/${careerId}${
        routeConstant.LEARNINGPATH}/${this.skillIdToView}`);
    } else {
      this.props.enrollMyLearningPath({
        userId: this.props.userId,
        pathId: selectedSkillTrack.skill_track_id
      });
    }
  }

  render() {
    const { careerTrackDetails, skillTracks } = this.props;
    return (
      <div className="careerPath-details">
        <div className="row">
          {
            careerTrackDetails && careerTrackDetails.id &&
            <DetailSideMenu
              name={careerTrackDetails.name}
              user={skillTracks.user}
              description={careerTrackDetails.description}
              {...this.props}
              routeUrl={
                `${routeConstant.DASHBOARD}`
              }
              courseId={careerTrackDetails.id}
              courseType={`${routeConstant.CAREER_TRACK}`}
            />
          }
          <div className="col-12 col-lg-8 px-5 pb-5 learner-section-inner">
            <div className="col-12 p-3 flow-diagram p-0">
              {careerTrackDetails && careerTrackDetails.id &&
                <div className="title pt-3">
                  {careerTrackDetails.name}
                </div>
              }
              {
                skillTracks.careerSkillTracks &&

                skillTracks.careerSkillTracks.map((value, index) => (
                  <div
                    className="row px-3 pt-4 section-content c-pointer"
                    id={value.id}
                    role="presentation"
                    key={value.id}
                    onClick={() => { this.enrollSkillTrack(value); }}
                  >
                    <div
                      id="outer-box"
                      className="col-12 learner-section-detail"
                    >
                      <div className="row">
                        <div className="col-12 col-sm-2 col-md-1 pb-4 section-count">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>
                        <div className="col-12 col-sm-10 col-md-11 col-lg-11 container-fluid">
                          <div className="row">
                            <div className="col-11 col-md-12">
                              <div className="row align-items-center">
                                <div className="col-8">
                                  <div className="one-row-ellipsis px-2 section-detail-title">{value.skill.name}</div>
                                </div>
                                <div className="col-4 hours-section pr-sm-4">
                                  <span className="d-flex flex-row justify-content-end align-items-center">
                                    <img className="profile-common-icon assessment" src={ClockIcon} alt="time" />
                                    <span className="info pl-2">
                                      {parseInt(value.skill.minutes, 10)}
                                      <span> mins</span>
                                    </span>
                                    <span className="pl-4 justify-content-end">
                                      {value.skill.points}
                                      <span className="pl-1 points">points</span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                              {value.skill && value.skill.enrolments.length > 0 &&
                                <div className="row progress-bar-wrapper">
                                  <div className="col-8 col-md-6">
                                    <Progress
                                      value={parseFloat(value.skill.enrolments[0].completed_percentage)}
                                    />
                                  </div>
                                  <div className="progress-percentage">
                                    {value.skill.enrolments[0].completed_percentage ?
                                      `${Math.round(value.skill.enrolments[0].completed_percentage)}%` : `${0}%`}
                                  </div>
                                </div>
                              }
                              <div
                                className="col-12 mb-3 section-detail-content three-row-ellipsis"
                                data-toggle="tooltip"
                                data-placement="top"
                                title={value.skill.description}
                              >
                                {value.skill.description}
                              </div>
                              {/* {
                                value.id === enrollmentSectionId &&
                                <div className="pl-2 mt-2 resume-learning-btn col-12 col-md-10">
                                  <button
                                    className="btn resume-btn col-10 col-sm-8 col-xl-6"
                                    onClick={() => {
                                      this.updateLatestSectionIdForUser(value.id);
                                      onClickViewSectionContents(
                                        value.id, value.latestContent, value.enrolment_section_id
                                            );
                                    }}
                                  >
                                    {locale.learnerLearningPathDetails.resumeLearning}
                                  </button>
                                </div>
                              } */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CareerPath.propTypes = {
  fetchCareerTrack: PropTypes.func.isRequired,
  fetchSkillTracksByCTId: PropTypes.func.isRequired,
  careerTrackDetails: PropTypes.object.isRequired,
  skillTracks: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  enrollMyLearningPath: PropTypes.func.isRequired,
  enrolledLearningPath: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  careerTrackDetails: state.careerTrack.get('careerTrackDetails'),
  skillTracks: state.careerTrack.get('skillTracks'),
  loading: state.careerTrack.get('loading'),
  userId: state.user.get('userId'),
  enrolledLearningPath: state.learningPath.get('enrolledLearningPath')
});

const mapDispatchToProps = dispatch => ({
  fetchCareerTrack: careerTrackId => dispatch(fetchCareerTrack(careerTrackId)),
  fetchSkillTracksByCTId: careerTrackId => dispatch(fetchSkillTracksByCTId(careerTrackId)),
  enrollMyLearningPath: enroll => dispatch(enrollLearningPath(enroll))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(CareerPath)));
