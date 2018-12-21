import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { routeConstant } from '../../globals/AppConstant';
import redirectTo from '../../utils/Redirect';

import HomeIcon from '../../../assets/images/home.svg';
import activeArrow from '../../../assets/images/keyboard-right-arrow-button.svg';

class SectionBreadCrumb extends Component {
  breadCrumbClick = page => {
    if (this.props.contentTrackMethod) {
      if (this.props.content.type === routeConstant.CONTENT
        || this.props.content.type === routeConstant.YTVIDEO) {
        this.props.contentTrackMethod(true, page);
      } else {
        this.props.contentTrackMethod(page);
      }
    } else {
      redirectTo(this.props, page);
    }
  };

  render() {
    const {
      learningPathName,
      match,
      sectionName,
      content
    } = this.props;
    return (
      <div className="section-bread-crumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb p-0">
            {
              !match.path.includes(routeConstant.HOME) &&
              <li
                className="breadcrumb-item"
                onClick={() => { this.breadCrumbClick(routeConstant.DASHBOARD); }}
                role="presentation"
                title="Home"
              >
                <img className="home-icon" src={HomeIcon} alt="Home" />
              </li>
            }
            {
              match.path.includes(routeConstant.HOME) &&
              <li
                className="breadcrumb-item not-first-breadcrumb"
                onClick={() => { this.breadCrumbClick(routeConstant.HOME); }}
                role="presentation"
                title="Home"
              >
                <img className="icon pencil-icon arrow-icon" src={HomeIcon} alt="Home" />
              </li>
            }
            {
              learningPathName &&
              <li
                className="breadcrumb-item not-first-breadcrumb "
                onClick={() => { this.breadCrumbClick(routeConstant.LEARNINGPATH); }}
                role="presentation"
                title={_.startCase(learningPathName)}
              >
                <i aria-hidden="true">
                  <img className="icon pencil-icon arrow-icon" src={activeArrow} alt="Home" />
                </i>
                {_.startCase(learningPathName)}
              </li>
            }
            {
              sectionName &&
              <li
                className="breadcrumb-item not-first-breadcrumb"
                onClick={() => { this.breadCrumbClick(routeConstant.SECTION); }}
                role="presentation"
                title={_.startCase(sectionName)}
              >
                <i aria-hidden="true">
                  <img className="icon pencil-icon arrow-icon" src={activeArrow} alt="Home" />
                </i>
                {_.startCase(sectionName)}
              </li>
            }
            {
              content &&
              <li
                className="breadcrumb-item not-first-breadcrumb active"
                title={_.startCase(content.title)}
              >
                <i aria-hidden="true">
                  <img className="icon pencil-icon arrow-icon" src={activeArrow} alt="Home" />
                </i>
                {_.startCase(content.title)}
              </li>
            }
          </ol>
        </nav>
      </div>
    );
  }
}

SectionBreadCrumb.defaultProps = {
  learningPathName: '',
  sectionName: '',
  content: {},
  contentTrackMethod: null
};

SectionBreadCrumb.propTypes = {
  learningPathName: PropTypes.string,
  sectionName: PropTypes.string,
  match: PropTypes.object.isRequired,
  content: PropTypes.object,
  contentTrackMethod: PropTypes.func
};

export default withRouter(SectionBreadCrumb);
