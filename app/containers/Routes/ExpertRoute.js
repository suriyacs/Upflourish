import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import RedirectRoute from './RedirectRoute';
import { routeConstant } from '../../globals/AppConstant';
import PageNotFound from '../../containers/NotFound/NotFound';

const Dashboard = Loadable({
  loader: () => new Promise(resolve => {
    import('../Dashboard/Dashboard').then(dashboard => resolve(dashboard.default));
  }),
  loading: () => (<div />)
});

const LearningPathDetails = Loadable({
  loader: () => new Promise(resolve => {
    import('../LearningPath/LearningPathDetails').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const SectionDetails = Loadable({
  loader: () => new Promise(resolve => {
    import('../ExpertSection/SectionDetails').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const Video = Loadable({
  loader: () => new Promise(resolve => {
    import('../ExpertContents/Video').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const Book = Loadable({
  loader: () => new Promise(resolve => {
    import('../ExpertContents/Book').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const Document = Loadable({
  loader: () => new Promise(resolve => {
    import('../ExpertContents/Document').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const Article = Loadable({
  loader: () => new Promise(resolve => {
    import('../ExpertContents/Article').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const YouTube = Loadable({
  loader: () => new Promise(resolve => {
    import('../ExpertContents/YouTube').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const CareerTrackDetail = Loadable({
  loader: () => new Promise(resolve => {
    import('../CareerPath/ExpertCareerPathDetail').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const ExpertContent = Loadable({
  loader: () => new Promise(resolve => {
    import('../ExpertContents/ExpertContent').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const SkillTrackDetail = Loadable({
  loader: () => new Promise(resolve => {
    import('../LearningPath/ExpertSkillTrackDetails').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const ExpertRecentHappenings = Loadable({
  loader: () => new Promise(resolve => {
    import('../RecentHappenings/ExpertRecentHappenings').then(repos => resolve(repos.default));
  }),
  loading: () => (<div />)
});

const ExperRoute = props => (
  <Switch>
    <RedirectRoute exact path="/dashboard" component={Dashboard} {...props} />
    <RedirectRoute exact path={`${routeConstant.MICRO_LEARNING}/:sectionId`} component={ExpertContent} {...props} />
    <RedirectRoute
      exact
      path={`${routeConstant.CAREER_TRACK_ID}${routeConstant.SKILL_TRACK_ID}/:sectionId`}
      component={ExpertContent}
      {...props}
    />
    <RedirectRoute exact path={`${routeConstant.SKILL_TRACK_ID}/:sectionId`} component={ExpertContent} {...props} />
    <RedirectRoute exact path="/learningPath/:pathId" component={LearningPathDetails} {...props} />
    <RedirectRoute exact path={`${routeConstant.SKILL_TRACK_ID}`} component={SkillTrackDetail} {...props} />
    <RedirectRoute
      exact
      path={`${routeConstant.CAREER_TRACK_ID}${routeConstant.SKILL_TRACK_ID}`}
      component={SkillTrackDetail}
      {...props}
    />
    <RedirectRoute
      exact
      path="/learningPath/:pathId/section/:sectionId"
      component={SectionDetails}
      {...props}
    />
    <RedirectRoute
      exact
      path="/learningPath/:pathId/section/:sectionId/video/:contentId"
      component={Video}
      {...props}
    />
    <RedirectRoute
      exact
      path={`${routeConstant.CAREER_TRACK_ID}`}
      component={CareerTrackDetail}
      {...props}
    />
    <RedirectRoute
      exact
      path="/learningPath/:pathId/section/:sectionId/book/:contentId"
      component={Book}
      {...props}
    />
    <RedirectRoute
      exact
      path="/learningPath/:pathId/section/:sectionId/document/:contentId"
      component={Document}
      {...props}
    />
    <RedirectRoute
      exact
      path="/learningPath/:pathId/section/:sectionId/article/:contentId"
      component={Article}
      {...props}
    />
    <RedirectRoute
      exact
      path="/learningPath/:pathId/section/:sectionId/ytvideo/:contentId"
      component={YouTube}
      {...props}
    />
    <RedirectRoute
      exact
      path={routeConstant.RECENT_HAPPENINGS}
      component={ExpertRecentHappenings}
      {...props}
    />
    <Route path="*" component={PageNotFound} />
  </Switch>
);

export default ExperRoute;
