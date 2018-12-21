import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { translatable } from 'react-multilingual';
import { withRouter } from 'react-router-dom';

import { routeConstant } from '../../globals/AppConstant';
import redirectTo from '../../utils/Redirect';

class BreadCrumb extends Component {
  breadCrumbClick = page => {
    if (this.props.contentTrackMethod) {
      if (this.props.content.type === routeConstant.CONTENT) {
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
    const locale = this.props.locale.breadCrumb;
    return (
      <div className="default-bread-crumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb p-0">
            {
              !match.path.includes(routeConstant.HOME) &&
              <li
                className="breadcrumb-item"
                onClick={() => { this.breadCrumbClick(routeConstant.DASHBOARD); }}
                role="presentation"
              >
                {locale.catalog}
              </li>
            }
            {
              match.path.includes(routeConstant.HOME) &&
              <li
                className="breadcrumb-item"
                onClick={() => { this.breadCrumbClick(routeConstant.HOME); }}
                role="presentation"
              >
                {locale.home}
              </li>
            }
            {
              learningPathName &&
              <li
                className={`breadcrumb-item ${!match.path.includes('section') ? 'active' : ''}`}
                onClick={() => { this.breadCrumbClick(routeConstant.LEARNINGPATH); }}
                role="presentation"
              >
                {_.startCase(learningPathName)}
              </li>
            }
            {
              sectionName &&
              <li
                className={`breadcrumb-item ${!match.path.includes(content.type) ? 'active' : ''}`}
                onClick={() => { this.breadCrumbClick(routeConstant.SECTION); }}
                role="presentation"
              >
                {_.startCase(sectionName)}
              </li>
            }
            {
              content &&
              <li
                className="breadcrumb-item active"
              >
                {_.startCase(content.title)}
              </li>
            }
          </ol>
        </nav>
      </div>
    );
  }
}

BreadCrumb.defaultProps = {
  learningPathName: '',
  sectionName: '',
  content: {},
  contentTrackMethod: null
};

BreadCrumb.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  learningPathName: PropTypes.string,
  sectionName: PropTypes.string,
  match: PropTypes.object.isRequired,
  content: PropTypes.object,
  contentTrackMethod: PropTypes.func
};

export default withRouter(translatable(locale => locale)(BreadCrumb));
