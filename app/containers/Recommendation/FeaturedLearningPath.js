import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getTopSkillTracks,
  getLatestSkillTracks,
  getTrendingSkillTracks
} from '../../actions/learningPath';
import Card from '../../components/CardView/Card';
import { learningPathTabs, thumnailCourseType } from '../../globals/AppConstant';
import Carousel from '../../components/Carousel/Carousel';
import ImageURL from '../../components/Image/ImageURL';

import '../../../assets/styles/components/Recommendation.scss';

class FeaturedLearningPath extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: learningPathTabs[0]
    };
  }

  componentDidMount() {
    const { topSkillLimit } = this.props;
    this.props.getTopSkillTracks(topSkillLimit);
  }

  setActiveTabForLP = activeTab => {
    const {
      latestSkillLimit,
      trendingSkillLimit,
      trendingSkillDays,
      topSkillLimit
    } = this.props;
    this.setState({
      activeTab
    });
    if (activeTab === 'New') {
      this.props.getLatestSkillTracks(latestSkillLimit);
    } else if (activeTab === 'Trending') {
      this.props.getTrendingSkillTracks(trendingSkillLimit, trendingSkillDays);
    } else if (activeTab === 'Top') {
      this.props.getTopSkillTracks(topSkillLimit);
    }
  }

  checkCourseType = course => {
    const { goToMicroLearningPage, checkIfEnrolled } = this.props;
    if (course.courseType === 'Microlearning') {
      goToMicroLearningPage(course);
    } else {
      checkIfEnrolled(course.id, course.courseType);
    }
  }

  render() {
    const { activeTab } = this.state;
    const locale = this.props.locale.recommendations.featuredLearningPath;
    const {
      topSkillTracks,
      latestSkillTracks,
      trendingSkillTracks
    } = this.props;
    return (
      <div className="row m-0 py-4 featured-learning-options">
        <div className="title w-100">{locale.title}</div>
        <div className="nav nav-tabs w-100 mb-3 h-100">
          {learningPathTabs.map(tab => (
            <li
              className={`nav-item ${activeTab === tab ? 'active-tab' : ''}`}
              onClick={() => this.setActiveTabForLP(tab)}
              role="presentation"
              key={tab}
            >
              <div className="nav-link c-pointer">{tab}</div>
            </li>
          ))}
        </div>
        <div className="col-12 featured-skills p-0">
          {activeTab === 'Top' && topSkillTracks.size !== 0 &&
          <Carousel
            customWidth={topSkillTracks.length < 3}
          >
            {topSkillTracks && topSkillTracks.map(skill => (
              <div
                key={skill.id}
                className="col-12 p-0"
                onClick={() => this.checkCourseType(skill)}
                role="presentation"
              >
                <Card
                  title={skill.name}
                  updatedTime={skill.modified_at}
                  imageURL={ImageURL(thumnailCourseType[skill.display_name] ?
                    thumnailCourseType[skill.display_name].url : '', skill.id)}
                  labelName={skill.courseType}
                  learnerCount={skill.learnerCount}
                  isLabelEnabled
                />
              </div>
            ))}
          </Carousel>
          }
          {activeTab === 'New' && latestSkillTracks.size !== 0 &&
            <Carousel
              customWidth={latestSkillTracks.length < 3}
            >
              {latestSkillTracks && latestSkillTracks.map(skill => (
                <div
                  key={skill.id}
                  className="col-12 p-0"
                  onClick={() => this.checkCourseType(skill)}
                  role="presentation"
                >
                  <Card
                    title={skill.name}
                    updatedTime={skill.modified_at}
                    imageURL={ImageURL(thumnailCourseType[skill.display_name] ?
                      thumnailCourseType[skill.display_name].url : '', skill.id)}
                    labelName={skill.courseType}
                    learnerCount={skill.learnerCount}
                    isLabelEnabled
                  />
                </div>
              ))}
            </Carousel>
          }
          {activeTab === 'Trending' && trendingSkillTracks.size !== 0 &&
            <Carousel
              customWidth={trendingSkillTracks.length < 3}
            >
              {trendingSkillTracks && trendingSkillTracks.map(skill => (
                <div
                  key={skill.id}
                  className="col-12 p-0"
                  onClick={() => this.checkCourseType(skill)}
                  role="presentation"
                >
                  <Card
                    title={skill.name}
                    updatedTime={skill.modified_at}
                    imageURL={ImageURL(thumnailCourseType[skill.display_name] ?
                      thumnailCourseType[skill.display_name].url : '', skill.id)}
                    labelName={skill.courseType}
                    learnerCount={skill.learnerCount}
                    isLabelEnabled
                  />
                </div>
              ))}
            </Carousel>
          }
        </div>
      </div>
    );
  }
}

FeaturedLearningPath.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  getTopSkillTracks: PropTypes.func.isRequired,
  getLatestSkillTracks: PropTypes.func.isRequired,
  getTrendingSkillTracks: PropTypes.func.isRequired,
  topSkillLimit: PropTypes.number,
  latestSkillLimit: PropTypes.number,
  trendingSkillLimit: PropTypes.number,
  trendingSkillDays: PropTypes.number,
  topSkillTracks: PropTypes.any.isRequired,
  latestSkillTracks: PropTypes.any.isRequired,
  trendingSkillTracks: PropTypes.any.isRequired,
  checkIfEnrolled: PropTypes.func.isRequired,
  goToMicroLearningPage: PropTypes.func.isRequired
};

FeaturedLearningPath.defaultProps = {
  topSkillLimit: 10,
  latestSkillLimit: 10,
  trendingSkillLimit: 10,
  trendingSkillDays: 5
};

const mapStateToProps = state => ({
  loading: state.learningPath.get('loading'),
  topSkillTracks: state.learningPath.get('topSkillTracks'),
  latestSkillTracks: state.learningPath.get('latestSkillTracks'),
  trendingSkillTracks: state.learningPath.get('trendingSkillTracks')
});

const mapDispatchToProps = dispatch => ({
  getTopSkillTracks: limit => dispatch(getTopSkillTracks(limit)),
  getLatestSkillTracks: limit => dispatch(getLatestSkillTracks(limit)),
  getTrendingSkillTracks: (limit, days) => dispatch(getTrendingSkillTracks(limit, days))
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedLearningPath);
