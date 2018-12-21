import _ from 'lodash';
import { routeConstant } from '../globals/AppConstant';

const redirect = (props, page, content) => {
  if (page === routeConstant.HOME || page === routeConstant.DASHBOARD) {
    props.history.replace(page);
  } else if (page === routeConstant.LEARNINGPATH) {
    props.history.replace(_.split(props.match.url, routeConstant.SECTION)[0]);
  } else {
    props.history.replace(_.split(props.match.url, props.content ? props.content.type : content)[0]);
  }
};

export default redirect;
