import AdminConstants from '../constants/AdminAction';

const fetchExperts = data => ({
  type: AdminConstants.FETCH_EXPERTS,
  data
});

const fetchExpertsSuccess = response => ({
  type: AdminConstants.FETCH_EXPERTS_SUCCESS,
  response
});

const fetchExpertsError = error => ({
  type: AdminConstants.FETCH_EXPERTS_ERROR,
  error
});

const fetchUserCategory = expertId => ({
  type: AdminConstants.FETCH_USER_CATEGORY,
  expertId
});

const fetchUserCategorySuccess = response => ({
  type: AdminConstants.FETCH_USER_CATEGORY_SUCCESS,
  response
});

const fetchUserCategoryError = error => ({
  type: AdminConstants.FETCH_USER_CATEGORY_ERROR,
  error
});

const inviteExpert = data => ({
  type: AdminConstants.INVITE_EXPERT,
  data
});

const inviteExpertSuccess = response => ({
  type: AdminConstants.INVITE_EXPERT_SUCCESS,
  response
});

const inviteExpertError = error => ({
  type: AdminConstants.INVITE_EXPERT_ERROR,
  error
});

const updateUserCategory = data => ({
  type: AdminConstants.UPDATE_USER_CATEGORY,
  data
});

const updateUserCategorySuccess = response => ({
  type: AdminConstants.UPDATE_USER_CATEGORY_SUCCESS,
  response
});

const updateUserCategoryError = error => ({
  type: AdminConstants.UPDATE_USER_CATEGORY_ERROR,
  error
});

const deleteExpert = expert => ({
  type: AdminConstants.DELETE_EXPERT,
  expert
});

const deleteExpertSuccess = response => ({
  type: AdminConstants.DELETE_EXPERT_SUCCESS,
  response
});

const deleteExpertError = error => ({
  type: AdminConstants.DELETE_EXPERT_ERROR,
  error
});

const verifyToken = data => ({
  type: AdminConstants.VERIFY_TOKEN,
  data
});

const verifyTokenSuccess = response => ({
  type: AdminConstants.VERIFY_TOKEN_SUCCESS,
  response
});

const verifyTokenError = error => ({
  type: AdminConstants.VERIFY_TOKEN_ERROR,
  error
});

const expertSignUp = data => ({
  type: AdminConstants.EXPERT_SIGN_IN,
  data
});

const expertSignUpSuccess = response => ({
  type: AdminConstants.EXPERT_SIGN_IN_SUCCESS,
  response
});

const expertSignUpError = error => ({
  type: AdminConstants.EXPERT_SIGN_IN_ERROR,
  error
});

const expertResendInvite = expert => ({
  type: AdminConstants.EXPERT_RESEND_INVITE,
  expert
});

const expertResendInviteSuccess = response => ({
  type: AdminConstants.EXPERT_RESEND_INVITE_SUCCESS,
  response
});

const expertResendInviteError = error => ({
  type: AdminConstants.EXPERT_RESEND_INVITE_ERROR,
  error
});

const createCategory = category => ({
  type: AdminConstants.CREATE_CATEGORY,
  category
});

const createCategorySuccess = response => ({
  type: AdminConstants.CREATE_CATEGORY_SUCCESS,
  response
});

const createCategoryError = error => ({
  type: AdminConstants.CREATE_CATEGORY_ERROR,
  error
});

const updateCategory = category => ({
  type: AdminConstants.UPDATE_CATEGORY,
  category
});

const updateCategorySuccess = response => ({
  type: AdminConstants.UPDATE_CATEGORY_SUCCESSS,
  response
});

const updateCategoryError = error => ({
  type: AdminConstants.UPDATE_CATEGORY_ERROR,
  error
});

const clearCreateAndUpdatedCategory = () => ({
  type: AdminConstants.CLEAR_CREATE_UPDATED_CATEGORY
});

module.exports = {
  fetchExperts,
  fetchExpertsSuccess,
  fetchExpertsError,
  inviteExpert,
  inviteExpertSuccess,
  inviteExpertError,
  updateUserCategory,
  updateUserCategorySuccess,
  updateUserCategoryError,
  deleteExpert,
  deleteExpertSuccess,
  deleteExpertError,
  verifyToken,
  verifyTokenSuccess,
  verifyTokenError,
  expertSignUp,
  expertSignUpSuccess,
  expertSignUpError,
  expertResendInvite,
  expertResendInviteSuccess,
  expertResendInviteError,
  fetchUserCategory,
  fetchUserCategorySuccess,
  fetchUserCategoryError,
  createCategory,
  createCategorySuccess,
  createCategoryError,
  updateCategory,
  updateCategorySuccess,
  updateCategoryError,
  clearCreateAndUpdatedCategory
};
