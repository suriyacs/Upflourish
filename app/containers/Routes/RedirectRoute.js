import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { routeConstant, userRole as appRole } from '../../globals/AppConstant';
import AppNavSection from '../Navigation/Navigation';
import LearnerAppNavSection from '../Navigation/LearnerNavigation';
import AdminAppNavSection from '../Navigation/AdminNavigation';
import LearnerLandingPage from '../LandingPage/LearnerLandingPage';

/**
 * * Top level redirection to login page
 * Note : Do not use render with custom props in top level,
 * Specify the extra props if any in 'additionalProps' prop as an object
 * @param Component
 * @param userId
 * @param rest
 * @returns {*}
 * @constructor
 */
const RedirectRoute = ({
  component: Component, userId, path, userRole, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Fragment>
        {do { /* eslint-disable no-unused-expressions*/
          if (userId !== '' && userRole && userRole === appRole.expert) {
            <Fragment>
              <AppNavSection {...props} />
              <section className="body-section container">
                <Component {...props} />
              </section>
            </Fragment>;
          } else if (userId !== '' && userRole && userRole === appRole.learner) {
            <Fragment>
              <LearnerAppNavSection {...props} />
              <section className={`${path === routeConstant.COURSETYPEID ? 'p-0' : ''} body-section container`}>
                <Component {...props} />
              </section>
            </Fragment>;
          } else if (userId !== '' && userRole && userRole === appRole.admin) {
            <Fragment>
              <AdminAppNavSection {...props} />
              <section className="body-section container">
                <Component {...props} />
              </section>
            </Fragment>;
          } else {
            <LearnerLandingPage />;
          }
        }
      }
      </Fragment>
    )}
  />
);

RedirectRoute.propTypes = {
  component: PropTypes.func.isRequired,
  userId: PropTypes.string,
  userRole: PropTypes.string,
  path: PropTypes.string.isRequired
};

RedirectRoute.defaultProps = {
  userRole: null,
  userId: ''
};

const mapStateToProps = state => ({
  userId: state.user.get('userId')
});

export default connect(mapStateToProps)(RedirectRoute);
