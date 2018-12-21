import { fromJS } from 'immutable';

import sectionAction from '../constants/SectionAction';

const initialState = fromJS({
  loading: false,
  section: {},
  error: '',
  sectionContents: [],
  unpublishedCount: 0,
  enrolledSection: {},
  enrollingSection: false,
  sectionEnrollment: {}
});

const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case sectionAction.ADD_SECTION:
      return state.set('loading', true);
    case sectionAction.ADD_SECTION_SUCCESS:
      return state
        .set('loading', false);
    case sectionAction.ADD_SECTION_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case sectionAction.DELETE_SECTION:
      return state.set('loading', true);
    case sectionAction.DELETE_SECTION_SUCCESS:
      return state
        .set('loading', false);
    case sectionAction.DELETE_SECTION_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case sectionAction.FETCH_SECTION_DETAILS:
      return state.set('loading', true);
    case sectionAction.FETCH_SECTION_DETAILS_SUCCESS:
      return state
        .set('loading', false)
        .set('section', action.response)
        .set('unpublishedCount', action.unpublishedCount);
    case sectionAction.FETCH_SECTION_DETAILS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case sectionAction.UPDATE_SECTION:
      return state.set('loading', true);
    case sectionAction.UPDATE_SECTION_SUCCESS:
      return state
        .set('loading', false);
    case sectionAction.UPDATE_SECTION_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case sectionAction.FETCH_SECTION_CONTENTS:
      return state.set('loading', true);
    case sectionAction.FETCH_SECTION_CONTENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('sectionContents', action.response)
        .set('unpublishedCount', action.unpublishedCount)
        .set('enrolledSection', {});
    case sectionAction.FETCH_SECTION_CONTENTS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case sectionAction.UPDATE_SECTION_ORDER:
      return state.set('loading', true);
    case sectionAction.UPDATE_SECTION_ORDER_SUCCESS:
      return state
        .set('loading', false)
        .set('sectionContents', action.response)
        .set('unpublishedCount', action.unpublishedCount);
    case sectionAction.UPDATE_SECTION_ORDER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case sectionAction.CLEAR_SECTION_DETAILS:
      return state
        .set('section', null);
    case sectionAction.ENROLL_SECTION:
      return state
        .set('loading', false)
        .set('enrollingSection', true);
    case sectionAction.ENROLL_SECTION_SUCCESS:
      return state
        .set('loading', false)
        .set('enrollingSection', false)
        .set('enrolledSection', action.response);
    case sectionAction.ENROLL_SECTION_ERROR:
      return state
        .set('loading', false)
        .set('enrollingSection', false);
    case sectionAction.CLEAR_SECTION_CONTENTS:
      return state
        .set('sectionContents', []);
    case sectionAction.GET_SECTION_ENROLLMENT:
      return state
        .set('loading', true);
    case sectionAction.GET_SECTION_ENROLLMENT_SUCCESS:
      return state
        .set('loading', false)
        .set('sectionEnrollment', action.response);
    case sectionAction.GET_SECTION_ENROLLMENT_ERROR:
      return state
        .set('loading', false);
    default:
      return state;
  }
};

export default sectionReducer;
