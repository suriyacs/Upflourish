import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

import CircularProgressBar from '../../components/CircularProgressBar/CircularProgressBar';
import { learningPathSectionList, weekDayList } from '../../globals/AppConstant';
import EditGoal from '../Goal/EditGoal';

import coins from '../../../assets/images/coins.svg';
import editIcon from '../../../assets/images/pencil-edit.png';
import flameIcon from '../../../assets/images/flame.png';
import CloseIcon from '../../../assets/images/close.svg';

class LearnerDashboardSideBar extends Component {
  constructor() {
    super();
    this.state = {
      isEditGoalOpen: false
    };
  }

  onClickOpenEditGoal = () => {
    this.setState({
      isEditGoalOpen: true
    });
  }

  onClickCloseEditGoal = () => {
    this.setState({
      isEditGoalOpen: false
    });
  }

  getProgressPercentage = (goalStatus, forWhat) => {
    let percentageValue = 0;
    if (forWhat === 'minutes' && goalStatus && goalStatus.size !== 0) {
      percentageValue = (goalStatus.minutes_left / goalStatus.minutes) * 100;
    } else if (forWhat === 'days' && goalStatus && goalStatus.size !== 0) {
      percentageValue = (goalStatus.streak !== 0 ? ((goalStatus.streak / 7) * 100) : 0);
    }
    return percentageValue.toFixed();
  }

  externalCloseButton = functionName => (
    <div className="common-close-icon">
      <img
        role="presentation"
        src={CloseIcon}
        alt="close"
        className="icon close-icon c-pointer"
        onClick={functionName}
      />
    </div>
  );

  render() {
    const { isEditGoalOpen } = this.state;
    const { learningPathLocale, goToProfilePage, goalStatus } = this.props;
    const minutesLeft = (goalStatus && goalStatus.size !== 0 && goalStatus.minutes_left) ? goalStatus.minutes_left : 0;
    return (
      <Fragment>
        <div id="outer-box">
          <div className="goal-wrapper py-2">
            <div className="my-2 goal-label">
              {learningPathLocale.todaysGoal}
            </div>
            <div className="py-3 align-progress">
              <div
                className="circular-progress-bar-wrapper"
              >
                <CircularProgressBar percentage={this.getProgressPercentage(goalStatus, 'minutes')}>
                  <strong className="goal-progress">
                    {`${minutesLeft} ${learningPathLocale.minutes}`}
                  </strong>
                  <div className="progress-bar-remaining">{learningPathLocale.remaining}</div>
                </CircularProgressBar>
              </div>
              <div className="coinsWrapper">
                <img
                  className="coinsIcon"
                  src={coins}
                  alt="coins"
                />
                <div className="goal-text">
                  {(goalStatus.size === 0 || (goalStatus.size !== 0 && goalStatus.is_daily_goal_completed === false)) &&
                    `${learningPathLocale.unlock} ${learningPathSectionList.unlockPoints}
                      ${learningPathLocale.pts}`
                  }
                  {goalStatus.size !== 0 && goalStatus.is_daily_goal_completed === true &&
                    `${learningPathLocale.dailyGoalFinished}`
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="goal-duration-background pt-2">
            <div className="goal-duration-wrapper">
              <div className="goal-duration">
                {goalStatus && `${learningPathLocale.goalSetTo} ${goalStatus.minutes ? goalStatus.minutes : 0}
                    ${learningPathLocale.minutes}`}
              </div>
              <span>
                <img
                  src={editIcon}
                  alt="Edit"
                  className={`${
                    (goalStatus.size !== 0 && goalStatus.is_daily_goal_completed) ?
                      'c-blocked' : ''} editIcon ml-2`
                  }
                  onClick={goalStatus.size !== 0 && !goalStatus.is_daily_goal_completed && this.onClickOpenEditGoal}
                  role="presentation"
                  title={
                    (goalStatus.size !== 0 && goalStatus.is_daily_goal_completed) ?
                      learningPathLocale.editBlockedMessage : ''
                  }
                />
              </span>
            </div>
          </div>
          <div className="py-3 points-wrapper">
            <div className="profile-btn-wrapper px-2">
              <button
                className="btn btn btn-outline-primary profile-btn"
                onClick={() => goToProfilePage()}
              >
                {learningPathLocale.viewProfile}
              </button>
            </div>
          </div>
        </div>
        <div className="seperator" id="outer-box">
          <div className="goal-wrapper py-2">
            <div className="goal-label py-2">
              {learningPathLocale.learningStreak}
            </div>
            <div className="py-3 align-progress">
              <div
                className="circular-progress-bar-wrapper"
              >
                <CircularProgressBar percentage={this.getProgressPercentage(goalStatus, 'days')}>
                  <div>
                    <strong className="goal-progress">
                      {`${7 - (goalStatus.size !== 0 && goalStatus.streak !== 0 ?
                        goalStatus.streak : 0)} ${learningPathLocale.days}`
                      }
                    </strong>
                  </div>
                  <div className="progress-bar-remaining">{learningPathLocale.remaining}</div>
                </CircularProgressBar>
              </div>
              <div className="coinsWrapper">
                <img
                  className="coinsIcon"
                  src={coins}
                  alt="coins"
                />
                <div className="goal-text">
                  {(goalStatus.size === 0 || (goalStatus.size !== 0 && !goalStatus.is_weekly_goal_completed)) &&
                    `${learningPathLocale.unlock} ${learningPathSectionList.pointsToUnlock}
                    ${learningPathLocale.pts}`
                  }
                  {goalStatus.size !== 0 && goalStatus.is_weekly_goal_completed &&
                    `${learningPathLocale.weeklyStreakAchieved}`
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="border py-2 goal-duration-wrapper">
            {
              weekDayList.map(day => (
                <div
                  key={day.id}
                  className={`daily-progress ${day.id <= (goalStatus.size !== 0 ? goalStatus.streak : 0) ?
                    day.className : 'default'}`
                  }
                >
                  <div className="weekdays">
                    {learningPathLocale[day.name]}
                  </div>
                </div>
              ))
            }
          </div>
          <div className="py-3 points-wrapper">
            <div className="day-streak-wrapper">
              <img
                src={flameIcon}
                alt="days"
              />
              <div className="day-streak">
                {`${goalStatus.streak ? goalStatus.streak : 0} ${learningPathLocale.dayStreak}`}
              </div>
            </div>
            <div className="target-wrapper pt-3 px-3">
              {`${learningPathLocale.meetGoal} ${learningPathSectionList.goalDays}
                ${learningPathLocale.toEarn} ${learningPathSectionList.goalPoints} ${learningPathLocale.pts}`}
            </div>
          </div>
        </div>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg d-flex overlay-opacity"
          isOpen={isEditGoalOpen}
          onClose={this.onClickCloseEditGoal}
          centered={isEditGoalOpen}
          toggle={this.onClickCloseEditGoal}
          external={this.externalCloseButton(this.onClickCloseEditGoal)}
        >
          <EditGoal
            goalStatus={goalStatus}
            onClose={this.onClickCloseEditGoal}
          />
        </Modal>
      </Fragment>
    );
  }
}

LearnerDashboardSideBar.propTypes = {
  learningPathLocale: PropTypes.object.isRequired,
  goToProfilePage: PropTypes.func.isRequired,
  goalStatus: PropTypes.object
};

LearnerDashboardSideBar.defaultProps = {
  goalStatus: {}
};

export default LearnerDashboardSideBar;
