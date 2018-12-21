import React, { Component } from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../components/Button/Button';
import { updateDailyGoal } from '../../actions/goal';

import '../../../assets/styles/components/goal.scss';

class EditGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGoal: props.goalStatus
    };
  }

  componentDidMount() {
    const { selectedGoal } = this.state;
    if (selectedGoal.size !== 0) {
      this.onClickCheckBox(selectedGoal);
    }
  }

  onClickCheckBox = goal => {
    this.setState({ selectedGoal: goal });
    document.getElementById(goal.minutes).checked = true;
  }

  onClickSubmit = () => {
    const { selectedGoal } = this.state;
    const { goalStatus } = this.props;
    this.props.updateDailyGoal({
      id: goalStatus.id,
      goalId: goalStatus.goal_id,
      minutes: selectedGoal.minutes
    });
    this.props.onClose();
  }

  render() {
    const { selectedGoal } = this.state;
    const locale = this.props.locale.editGoal;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-lg-12 col-lg-12 col-lg-12">
            <div className="goal-container">
              <div className="text-center goal-title">{locale.title}</div>
              <p className="text-center">{locale.description}</p>
              {locale.goalStaticDatas.map(data => (
                <div
                  className={selectedGoal.id === data.id ? 'row goal-detail active-goal' : 'row goal-detail'}
                  onClick={() => this.onClickCheckBox(data)}
                  role="presentation"
                  key={data.id}
                >
                  <div className="col-1 p-0 text-center">
                    <input id={data.minutes} type="radio" name="isChecked" className="checkbox" />
                  </div>
                  <div className="col-7 p-0">
                    <span>{data.duration}</span>
                    <p>{data.description}</p>
                  </div>
                </div>))}
              <Button value={locale.save} onClick={this.onClickSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditGoal.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDailyGoal: PropTypes.func.isRequired,
  goalStatus: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

EditGoal.defaultProps = {
  goalStatus: {}
};

const mapDispatchToProps = dispatch => ({
  updateDailyGoal: goal => dispatch(updateDailyGoal(goal))
});

export default connect(null, mapDispatchToProps)(translatable(locale => locale)(EditGoal));
