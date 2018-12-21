import sectionAction from '../constants/SectionAction';

const createSection = (section, skillTrackId, cb) => ({
  type: sectionAction.ADD_SECTION,
  section,
  skillTrackId,
  cb
});

const createSectionSuccess = response => ({
  type: sectionAction.ADD_SECTION_SUCCESS,
  response
});

const createSectionError = error => ({
  type: sectionAction.ADD_SECTION_ERROR,
  error
});

const deleteSection = (sectionId, skillTrackId, cb) => ({
  type: sectionAction.DELETE_SECTION,
  sectionId,
  skillTrackId,
  cb
});

const deleteSectionSuccess = response => ({
  type: sectionAction.DELETE_SECTION_SUCCESS,
  response
});

const deleteSectionError = error => ({
  type: sectionAction.DELETE_SECTION_ERROR,
  error
});

const fetchSectionDetails = data => ({
  type: sectionAction.FETCH_SECTION_DETAILS,
  data
});

const fetchSectionDetailsSuccess = (response, unpublishedCount) => ({
  type: sectionAction.FETCH_SECTION_DETAILS_SUCCESS,
  response,
  unpublishedCount
});

const fetchSectionDetailsError = error => ({
  type: sectionAction.FETCH_SECTION_DETAILS_ERROR,
  error
});

const updateSection = (section, skillTrackId, cb) => ({
  type: sectionAction.UPDATE_SECTION,
  section,
  skillTrackId,
  cb
});

const updateSectionSuccess = response => ({
  type: sectionAction.UPDATE_SECTION_SUCCESS,
  response
});

const updateSectionError = error => ({
  type: sectionAction.UPDATE_SECTION_ERROR,
  error
});

const fetchSectionContents = (sectionId, searchTerm, userId = '') => ({
  type: sectionAction.FETCH_SECTION_CONTENTS,
  sectionId,
  searchTerm,
  userId
});

const fetchSectionContentsSuccess = (response, unpublishedCount) => ({
  type: sectionAction.FETCH_SECTION_CONTENTS_SUCCESS,
  response,
  unpublishedCount
});

const fetchSectionContentsError = error => ({
  type: sectionAction.FETCH_SECTION_CONTENTS_ERROR,
  error
});

const updateSectionOrder = (skillTrackId, sectionList) => ({
  type: sectionAction.UPDATE_SECTION_ORDER,
  skillTrackId,
  sectionList
});

const updateSectionOrderSuccess = response => ({
  type: sectionAction.UPDATE_SECTION_ORDER_SUCCESS,
  response
});

const updateSectionOrderError = error => ({
  type: sectionAction.UPDATE_SECTION_ORDER_ERROR,
  error
});

const clearSectionDetails = () => ({
  type: sectionAction.CLEAR_SECTION_DETAILS
});

const enrollSection = (enroll, additionalData, onClickViewSectionContents) => ({
  type: sectionAction.ENROLL_SECTION,
  enroll,
  additionalData,
  onClickViewSectionContents
});

const enrollSectionSuccess = response => ({
  type: sectionAction.ENROLL_SECTION_SUCCESS,
  response
});

const enrollSectionError = error => ({
  type: sectionAction.ENROLL_SECTION_ERROR,
  error
});

const updateLatestSectionForUser = (learningPathId, sectionId) => ({
  type: sectionAction.UPDATE_LATEST_SECTION_FOR_USER,
  learningPathId,
  sectionId
});

const updateLatestSectionForUserSuccess = response => ({
  type: sectionAction.UPDATE_LATEST_SECTION_FOR_USER_SUCCESS,
  response
});

const updateLatestSectionForUserError = error => ({
  type: sectionAction.UPDATE_LATEST_SECTION_FOR_USER_ERROR,
  error
});

const clearSectionContents = () => ({
  type: sectionAction.CLEAR_SECTION_CONTENTS
});

const getSectionEnrollmentStatus = (sectionId, contentId, contentType) => ({
  type: sectionAction.GET_SECTION_ENROLLMENT,
  sectionId,
  contentId,
  contentType
});

const getSectionEnrollmentStatusSuccess = response => ({
  type: sectionAction.GET_SECTION_ENROLLMENT_SUCCESS,
  response
});

const getSectionEnrollmentStatusError = error => ({
  type: sectionAction.GET_SECTION_ENROLLMENT_ERROR,
  error
});

module.exports = {
  createSection,
  createSectionSuccess,
  createSectionError,
  deleteSection,
  deleteSectionSuccess,
  deleteSectionError,
  clearSectionDetails,
  fetchSectionDetails,
  fetchSectionDetailsSuccess,
  fetchSectionDetailsError,
  updateSection,
  updateSectionSuccess,
  updateSectionError,
  fetchSectionContents,
  fetchSectionContentsSuccess,
  fetchSectionContentsError,
  updateSectionOrder,
  updateSectionOrderSuccess,
  updateSectionOrderError,
  enrollSection,
  enrollSectionSuccess,
  enrollSectionError,
  updateLatestSectionForUser,
  updateLatestSectionForUserSuccess,
  updateLatestSectionForUserError,
  clearSectionContents,
  getSectionEnrollmentStatus,
  getSectionEnrollmentStatusSuccess,
  getSectionEnrollmentStatusError
};
