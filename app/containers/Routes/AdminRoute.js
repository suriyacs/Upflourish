import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import RedirectRoute from './RedirectRoute';
import PageNotFound from '../../containers/NotFound/NotFound';
import { routeConstant } from '../../globals/AppConstant';

const Home = Loadable({
  loader: () => new Promise(resolve => {
		import('../Admin/Home').then(dashboard => resolve(dashboard.default));
  }),
  loading: () => (<div />)
});

const AdminRoute = props => (
  <Switch>
    <RedirectRoute exact path={`${routeConstant.HOME}`} component={Home} {...props} />
    <Route path="*" component={PageNotFound} />
  </Switch>
);

export default AdminRoute;
