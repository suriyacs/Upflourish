import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { localeReducer } from 'react-multilingual';
import locales from '../locales';

import articleReducer from './articleReducer';
import bookReducer from './bookReducer';
import userReducer from './userReducer';
import videoReducer from './videoReducer';
import learningPathReducer from './learningPathReducer';
import sectionReducer from './sectionReducer';
import onlineCourseReducer from './onlineCourseReducer';
import contentReducer from './contentReducer';
import assesmentReducer from './assesmentReducer';
import documentReducer from './documentReducer';
import recentHappeningsReducer from './recentHappeningsReducer';
import adminReducer from './adminReducer';
import profileReducer from './profileReducer';
import careerTrackReducer from './careerTrackReducer';
import courseReducer from './courseReducer';
import goalReducer from './goalReducer';
import certificateReducer from './certificateReducer';

export default combineReducers({
  user: userReducer,
  locale: localeReducer('en', locales),
  article: articleReducer,
  book: bookReducer,
  video: videoReducer,
  learningPath: learningPathReducer,
  section: sectionReducer,
  onlineCourse: onlineCourseReducer,
  content: contentReducer,
  assesment: assesmentReducer,
  document: documentReducer,
  recentHappenings: recentHappeningsReducer,
  form: formReducer,
  admin: adminReducer,
  profile: profileReducer,
  careerTrack: careerTrackReducer,
  course: courseReducer,
  goal: goalReducer,
  certificate: certificateReducer
});
