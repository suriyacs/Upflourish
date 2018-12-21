import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import RedirectRoute from './RedirectRoute';
import EditGoal from '../Goal/EditGoal';
import PageNotFound from '../../containers/NotFound/NotFound';
import { routeConstant } from '../../globals/AppConstant';

const LearnerDashboard = Loadable({
  loader: () => new Promise(resolve => {
    import('../Dashboard/LearnerHomepage').then(dashboard => resolve(dashboard.default));
  }),
  loading: () => (<div />)
});

const LearningPathDetails = Loadable({
  loader: () => new Promise(resolve => {
    import('../LearningPath/LearnerLearningPathDetails').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const reward = Loadable({
  loader: () => new Promise(resolve => {
    import('../Reward/Reward').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const LearnerProfile = Loadable({
  loader: () => new Promise(resolve => {
    import('../Profile/Profile').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const ContentList = Loadable({
  loader: () => new Promise(resolve => {
    import('../LearnerSection/ContentList').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const Recommendation = Loadable({
  loader: () => new Promise(resolve => {
    import('../Recommendation/Recommendation').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const CareerPathDetails = Loadable({
  loader: () => new Promise(resolve => {
    import('../CareerPath/CareerPathDetails').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const UploadResume = Loadable({
  loader: () => new Promise(resolve => {
    import('../Profile/Upload/Upload').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const CourseLandingPage = Loadable({
  loader: () => new Promise(resolve => {
    import('../CourseSection/CourseSection').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const CertificateVerification = Loadable({
  loader: () => new Promise(resolve => {
    import('../Certificate/VerifyCertificate').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const CourseSearch = Loadable({
  loader: () => new Promise(resolve => {
    import('../Search/CourseSearch').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const LearnerRoute = props => (
  <Switch>
    <RedirectRoute exact path={`${routeConstant.DASHBOARD}`} component={LearnerDashboard} {...props} />
    <RedirectRoute
      exact
      path={`${routeConstant.DASHBOARD}${routeConstant.LEARNINGPATHID}`}
      component={LearningPathDetails}
      {...props}
    />
    <RedirectRoute
      exact
      path={`${routeConstant.DASHBOARD}${routeConstant.CAREERID}${routeConstant.LEARNINGPATHID}`}
      component={LearningPathDetails}
      {...props}
    />
    <RedirectRoute
      exact
      path={`${routeConstant.CERTIFICATE}${routeConstant.COURSEID}`}
      component={CertificateVerification}
      {...props}
    />
    <RedirectRoute
      exact
      path={
        `${
          routeConstant.DASHBOARD
        }${
          routeConstant.LEARNINGPATHID
        }${
          routeConstant.SECTIONID
        }${
          routeConstant.CONTENTID
        }`
      }
      component={ContentList}
      {...props}
    />
    <RedirectRoute
      exact
      path={
        `${
          routeConstant.DASHBOARD
        }${
          routeConstant.CAREERID
        }${
          routeConstant.LEARNINGPATHID
        }${
          routeConstant.SECTIONID
        }${
          routeConstant.CONTENTID
        }`
      }
      component={ContentList}
      {...props}
    />
    <RedirectRoute
      exact
      path={
        `${
          routeConstant.DASHBOARD
        }${
          routeConstant.SECTIONID
        }${
          routeConstant.CONTENTID
        }`
      }
      component={ContentList}
      {...props}
    />
    <RedirectRoute
      exact
      path={`${routeConstant.REWARD}`}
      component={reward}
      {...props}
    />
    <RedirectRoute exact path={`${routeConstant.EDITGOAL}`} component={EditGoal} {...props} />
    <RedirectRoute
      exact
      path={`${routeConstant.DASHBOARD}${routeConstant.CAREERID}`}
      component={CareerPathDetails}
      {...props}
    />
    <RedirectRoute
      exact
      path={routeConstant.SEARCH}
      component={CourseSearch}
      {...props}
    />
    <RedirectRoute
      exact
      path={`${routeConstant.COURSETYPEID}`}
      component={CourseLandingPage}
      {...props}
    />
    <RedirectRoute exact path={`${routeConstant.CATALOG}`} component={Recommendation} {...props} />
    <RedirectRoute exact path={`${routeConstant.PROFILE}`} component={LearnerProfile} {...props} />
    <Route exact path={`${routeConstant.UPLOADRESUME}`} component={UploadResume} {...props} />
    <Route path="*" component={PageNotFound} />
  </Switch>
);

export default LearnerRoute;
