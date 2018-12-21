import React, { Component } from 'react';
import { Modal } from 'reactstrap';

import Button from '../../components/Button/Button';

import '../../../assets/styles/components/reward.scss';

class RewardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRewardModalOpen: true
    };
    this.daysOfTheWeek = ['W', 'T', 'F', 'S', 'S', 'M', 'T'];
  }

  onCloseReward = () => {
    this.setState({
      isRewardModalOpen: false
    });
  };

  render() {
    const { isRewardModalOpen } = this.state;
    return (
      <Modal
        modalClassName="min-h-100 reactstrab-modal"
        backdropClassName="modal-bg d-flex overlay-opacity"
        isOpen={isRewardModalOpen}
        onClose={this.onCloseReward}
        centered={isRewardModalOpen}
        toggle={this.onCloseReward}
      >
        <div className="reward-container">
          <div className="reward-header">
            Congratulations!
          </div>
          <div className="reward-image-container">
            <div className="reward-image" />
            <div className="reward-text">
              <div className="reward-value">1000 points</div>
              <div className="tag">
                You’ve earned 1000 pts for your 7 day streak
              </div>
            </div>
          </div>
          <div className="reward-tag">
            Raj, You are killing it! Keep going to earn more rewards
          </div>
          <div className="reward-calender">
            {this.daysOfTheWeek.map(day => (
              <div className="day-div">
                <div className="reward-flag" />
                <div className="day-name">
                  {day}
                </div>
              </div>
            )) }
          </div>
          <div className="reward-button-container">
            <Button className="cancel-button" value="Cancel" onClick={this.onCloseReward} />
            <Button className="thank-button" value="Ok, Thanks" />
          </div>
        </div>
      </Modal>
    );
  }
}

export default RewardModal;
