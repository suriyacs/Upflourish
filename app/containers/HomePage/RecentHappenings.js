import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchRecentHappenings } from '../../actions/recentHappenings';

import '../../../assets/styles/components/Dashboard.scss';
import '../../../assets/styles/components/HomePage.scss';

const mapStateToProps = state => ({
  recentHappeningsList: Array.from(state.recentHappenings.get('recentHappeningsList'))
});

const mapDispatchToProps = dispatch => ({
  fetchRecentHappenings: () => dispatch(fetchRecentHappenings())
});

class RecentHappenings extends Component {
  componentDidMount() {
    this.props.fetchRecentHappenings();
  }

  render() {
    const { recentHappeningsList } = this.props;
    return (
      <div className="container-fluid">
        <div
          className="row learner-home-title justify-content-center"
        >
          Recent Happenings
        </div>
        <div className="row content pr-4 pl-4 pb-4" id="recentHappenings">
          {recentHappeningsList.map(recentHappening => (
            <a
              key={recentHappening.id}
              href={recentHappening.link}
              target="_blank"
            >
              <div
                className="col-12
                  mt-4 p-0 happenings-paths latest-happenings c-pointer"
              >
                <div>
                  <img
                    src={recentHappening.thumbnail}
                    alt="recentHappening"
                  />
                </div>
                <div className="p-3">
                  <div className="col-12 head two-row-ellipsis p-0">
                    {recentHappening.title}
                  </div>
                  <div
                    className="col-12 description mt-2 two-row-ellipsis p-0"
                  >
                    {recentHappening.description}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

RecentHappenings.propTypes = {
  recentHappeningsList: PropTypes.array.isRequired,
  fetchRecentHappenings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentHappenings);
