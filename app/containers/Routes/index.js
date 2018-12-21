import React, { Fragment } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import storage from '../../globals/localStorage';
import UserActions from '../../actions/user';
import ExpertRoute from './ExpertRoute';
import LearnerRoute from './LearnerRoute';
import AdminRoute from './AdminRoute';
import Login from '../Login/Login';
import { routeConstant, userRole } from '../../globals/AppConstant';

const CourseLandingPage = Loadable({
  loader: () => new Promise(resolve => {
    import('../CourseSection/CourseSection').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const LearnerLandingPage = Loadable({
  loader: () => new Promise(resolve => {
		import('../LandingPage/LearnerLandingPage').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const Courses = Loadable({
  loader: () => new Promise(resolve => {
    import('../Catalog/GeneralCatalog').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const Search = Loadable({
  loader: () => new Promise(resolve => {
    import('../Search/CourseSearch').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const ShareCertificate = Loadable({
  loader: () => new Promise(resolve => {
    import('../Certificate/ShareCertificate').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

class Main extends React.Component {
  componentDidMount() {
    const userData = storage.getItem('user');
    if (userData) {
      this.props.getUserDetails(userData);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { userDetails, redirectTo } = this.props;
    const role = (userDetails && userDetails.roles[0].name);
    const userData = storage.getItem('user');
    return (
      <Fragment>
        <Switch>
          {!userData &&
            <Switch>
              <Route exact path="/" component={LearnerLandingPage} />
              <Route
                exact
                path={`${routeConstant.ADMIN}`}
                component={Login}
              />
              <Route exact path="/certificate" component={ShareCertificate} />
              <Route exact path={`${routeConstant.COURSES}`} component={Courses} />
              <Route exact path={routeConstant.SEARCH} component={Search} />
              <Route
                path="/invite/signup*"
                component={Login}
              />
              <Route
                exact
                path={`${routeConstant.EXPERTPASSWORDRESET}`}
                component={Login}
              />
              <Route exact path={`${routeConstant.COURSETYPEID}`} component={CourseLandingPage} />
              <Route path="*" render={() => (<Redirect to="/" />)} />
            </Switch>
          }
          {userData && (role && role !== userRole.admin) &&
            redirectTo &&
            <Route
              exact
              path="/"
              render={() => (
                <Redirect to={redirectTo} />
              )}
            />
          }
          {userData && (role && role === userRole.admin) &&
            <Route
              exact
              path={`${routeConstant.ADMIN}`}
              render={() => (
                <Redirect to={`${routeConstant.HOME}`} />
              )}
            />
          }
          {userData && <Route
            exact
            path={`${routeConstant.EXPERTPASSWORDRESET}`}
            render={() => (
              <Redirect to={`${routeConstant.DASHBOARD}`} />
            )}
          />}
          {
            userData &&
            <Route
              exact
              path="/certificate"
              render={() => (
                <Redirect to={`${routeConstant.DASHBOARD}`} />
              )}
            />
          }
          {userData && <Route
            exact
            path={`${routeConstant.LEARNERPASSWORDRESET}`}
            render={() => (
              <Redirect to={`${routeConstant.DASHBOARD}`} />
            )}
          />}
          {(role && role === userRole.admin) &&
            <AdminRoute userRole={userRole.admin} />
          }
          {(role && role === userRole.expert) &&
            <ExpertRoute userRole={userRole.expert} />
          }
          {(role && role === userRole.learner) &&
            <LearnerRoute userRole={userRole.learner} />
          }
        </Switch>
        {userData && (role && role !== userRole.admin) &&
          <Switch>
            <Route
              exact
              path={`${routeConstant.ADMIN}`}
              render={() => (
                <Redirect to={`${routeConstant.DASHBOARD}`} />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Redirect to={`${routeConstant.DASHBOARD}`} />
              )}
            />
            <Route
              exact
              path={`${routeConstant.COURSES}`}
              render={() => (
                <Redirect to={`${routeConstant.DASHBOARD}`} />
              )}
            />
          </Switch>
        }
      </Fragment>
    );
  }
}

Main.propTypes = {
  userDetails: PropTypes.object,
  getUserDetails: PropTypes.func.isRequired,
  location: PropTypes.any.isRequired,
  redirectTo: PropTypes.string
};

Main.defaultProps = {
  userDetails: null,
  redirectTo: ''
};

const mapDispatchToProps = dispatch => ({
  getUserDetails: userId => dispatch(UserActions.getUserDetails(userId))
});

const mapStateToProps = state => ({
  userDetails: state.user.get('userDetails'),
  redirectTo: state.user.get('redirectTo')
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

