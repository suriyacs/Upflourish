import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';

import { getBadgeListReady } from '../../actions/profile';

import MedalIcon from '../../../assets/images/medal.svg';
import PlayIcon from '../../../assets/images/play.svg';
import ClockIcon from '../../../assets/images/clock.svg';
import ProfilePng from '../../../assets/images/man.svg';

class Achievement extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getBadgeListReady();
  }

  render() {
    const { badgeList } = this.props;
    const locale = this.props.locale.profile;
    return (
      <div>
        <h3 className="heading m-10px-0px" id="achievements">{locale.achievmentSection.title}</h3>
        <div className="profile-common-container d-flex flex-column achievement-section">
          <div className="d-flex flex-column m-25">
            <div className="m-2 d-flex flex-row justify-content-between">
              <div className="mb-2 d-flex flex-column">
                <span className="common-content-text  font-size-15 font-weight-bold">
                  {locale.achievmentSection.badges}
                </span>
              </div>
              <div className="d-flex flex-column">
                <span className="common-content-text font-size-15 common-link c-pointer">
                  {locale.achievmentSection.view}
                </span>
              </div>
            </div>
            <div className="container-fluid p-0">
              <div className="col-12 col-lg-10 p-0">
                {badgeList.map(badge => (
                  <div key={badge.id} className="col-3 col-lg-2 badge">
                    <div>
                      <img className="profile-common-icon" src={badge.reward.details.imageUrl} alt={badge} />
                    </div>
                    <div className="p-2 badge-font">
                      {badge.reward.details.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3 d-flex flex-row mt-2">
              <div className="d-flex flex-column">
                <span className="m-2 common-content-text  font-size-14 font-weight-bold">
                  {locale.achievmentSection.medal}
                </span>
                <span className="ml-1 mt-2 mb-2 d-flex flex-row">
                  <img className="profile-common-icon" src={MedalIcon} alt="Medal" />
                  <span className="badge-font score">236</span>
                </span>
                <span className="badge-font">
                  {locale.achievmentSection.goldMedal}
                </span>
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="d-flex flex-column">
                <span className="m-2 common-content-text font-size-14 font-weight-bold">
                  {locale.achievmentSection.assessment}
                </span>
                <div className="ml-2 mt-2 d-flex flex-row result-section">
                  <div className="flex-column image">
                    <img
                      className="profile-common-icon m-3 assesment-icon"
                      src={ProfilePng}
                      alt="profile"
                    />
                  </div>
                  <div className="d-flex flex-column m-2">
                    <div className="m-2 d-flex flex-row justify-content-between align-items-center">
                      <div className="d-flex flex-column">
                        <span className="common-header-text font-weight-500 font-size-17 mb-1">
                          {locale.achievmentSection.mcq}
                        </span>
                        <span
                          className={
                            'd-flex flex-column flex-sm-row flex-lg-row flex-md-row ' +
                            'justify-content-between align-items-center ' +
                            'time-section'}
                        >
                          <span>
                            <img className="profile-common-icon assessment" src={PlayIcon} alt="question" />
                          </span>
                          <span className="info">
                            30 {locale.achievmentSection.questions}
                          </span>
                          <span>
                            <img className="profile-common-icon assessment" src={ClockIcon} alt="time" />
                          </span>
                          <span className="info">
                            4 {locale.achievmentSection.hours}
                          </span>
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="assessment-score">
                          100%
                        </span>
                        <span className="info">
                          {locale.achievmentSection.score}
                        </span>
                      </div>
                    </div>
                    <span className="m-2 info result">
                      {locale.achievmentSection.info}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Achievement.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  getBadgeListReady: PropTypes.func.isRequired,
  badgeList: PropTypes.any.isRequired
};

const mapDispatchToProps = dispatch => ({
  getBadgeListReady: () => dispatch(getBadgeListReady())
});

const mapStateToProps = state => ({
  badgeList: state.profile.get('badgeList')
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(Achievement));
