import { takeLatest } from 'redux-saga/effects';
import userActions from '../constants/UserAction';
import certificateActions from '../constants/CertificateAction';
import articleActions from '../constants/ArticleAction';
import bookActions from '../constants/BookAction';
import videoActions from '../constants/VideoAction';
import learningPathActions from '../constants/LearningPathAction';
import sectionActions from '../constants/SectionAction';
import onlineCourseAction from '../constants/OnlineCourseAction';
import recentHappeningsAction from '../constants/RecentHappeningsAction';
import AdminAction from '../constants/AdminAction';
import {
  loginUser,
  logoutUser,
  fetchUserDetails,
  loginWithFaceBook,
  loginWithGoogle,
  loginWithLinkedIn,
  forgetPassword,
  resetPassword,
  verifyToken,
  updateUser,
  learnerSignup,
  uploadResume
} from './UserSaga';
import { createArticle, updateArticle } from './ArticleSaga';
import { createBook, updateBook } from './BookSaga';
import {
  createVideo,
  updateVideo
} from './VideoSaga';
import {
  createCourse,
  fetchAllCourseList,
  fetchCourseDetails,
  fetchLearningPathSections,
  fetchLearningPathDetailsForLearnerSaga,
  updateCourse,
  publishChanges,
  fetchAllCategories,
  enrollLearningPath,
  fetchCurrentLearningPaths,
  getAllLearningPathMaterials,
  getRecommendedLearnings,
  getAllLearningPathMaterialsByCategory,
  getTopSkillTracks,
  getLatestSkillTracks,
  getTrendingSkillTracks,
  getMicroLearningByIdForLearner,
  fetchMyCourseList
} from './LearningPathSaga';
import {
  createSection,
  deleteSection,
  fetchSection,
  updateSection,
  fetchSectionContents,
  updateSectionOrder,
  enrollSection,
  updateLatestSectionForUser,
  getSectionEnrollmentStatus
} from './SectionSaga';
import { createOnlineCourse, updateOnlineCourse } from './OnlineCourseSaga';
import {
  deleteContentBySectionId,
  fetchContentDetailsSaga,
  enrollContent,
  completeContent,
  enrollAll,
  updateLatestContentForUser,
  markContentAsCompleted,
  fetchAssessmentTest,
  checkIfAnswerCorrect,
  getBadgeData,
  fetchRelatedContent,
  createContentWithSection,
  getSectionContents,
  updateContentWithSection,
  reorderContentList,
  getDefaultQuestionType,
  saveQuestion,
  getAssessmentQuestions,
  updateQuestion,
  gamifyLearnerSaga,
  gamifyLearnerAssessmentSaga,
  createRelatedContent,
  deleteRelatedContentMapping
} from './ContentSaga';
import contentAction from '../constants/ContentAction';
import documentAction from '../constants/DocumentAction';
import { createDocument, updateDocument } from './DocumentSaga';
import assesmentAction from '../constants/AssesmentAction';
import {
  createAssesment,
  updateAssesment,
  getAssessment,
  submitAssessmentAnswers,
  getAssessmentResult
} from './AssesmentSaga';
import {
  fetchAllRecentHappenings,
  fetchMyRecentHappenings,
  fetchRecentHappeningTypes,
  createRecentHappening,
  updateRecentHappening
} from './RecentHappeningsSaga';
import {
  getExperts,
  getUserCategory,
  inviteExpert,
  updateUserCategory,
  checkTokenStatus,
  deleteExpert,
  expertSignIn,
  expertResendInvite,
  createCategory,
  updateCategory
} from './AdminSaga';
import { createYouTubeVideo } from './YouTubeSaga';
import youTubeAction from '../constants/YouTubeAction';
import careerTrackAction from '../constants/CareerTrackAction';
import {
  fetchCareerTrack,
  fetchSkillTracksByCTId,
  isCourseEnrolledSaga,
  enrollMyCareer,
  checkIfDashboardCourseEnrolled,
  createSkillTrackByCareerTrackId,
  updateSkillTrack,
  deleteSkillTrack,
  changeSkillTrackOrder
} from './CareerTrackSaga';
import {
  getPersonalDetail,
  updatePersonalDetail,
  getEmploymentHistoryDetail,
  addEmploymentDetail,
  updateEmploymentHistory,
  deleteEmploymentHistory,
  getEducationDetailList,
  addEducationDetail,
  updateEducationDetail,
  fetchCompletedCourses,
  deleteEducationDetail,
  getLearnerSkillList,
  addSkillList,
  getBadgeList,
  getUserPoints,
  getMasterSkillList,
  getLearnerCertficate,
  verifyLearnerCertificate,
  fetchIntrestedCategoriesSaga,
  createIntrestedCategoriesSaga
} from './ProfileSaga';
import {
  createPassPhrase,
  getCertificate,
  getDownloadURL,
  uploadCertificate
} from './CertificateSaga';
import ProfileAction from '../constants/ProfileAction';
import CourseAction from '../constants/CourseAction';
import {
  getCourseDetails,
  searchCourse,
  getSearchedCourses,
  updateMicrolearning,
  expertSearchedCourses
} from './CourseSaga';
import { getDailyGoals, updateDailyGoal } from './GoalSaga';
import GoalAction from '../constants/GoalAction';

export default function* saga() {
  yield takeLatest(userActions.USER_LOGIN, loginUser);
  yield takeLatest(userActions.FB_USER_LOGIN, loginWithFaceBook);
  yield takeLatest(userActions.GOOGLE_USER_LOGIN, loginWithGoogle);
  yield takeLatest(userActions.LINKEDIN_USER_LOGIN, loginWithLinkedIn);
  yield takeLatest(userActions.FORGETPASSWORD, forgetPassword);
  yield takeLatest(userActions.RESETPASSWORD, resetPassword);
  yield takeLatest(userActions.VERIFYTOKEN, verifyToken);
  yield takeLatest(userActions.LOGOUT_USER, logoutUser);
  yield takeLatest(userActions.FETCH_USER_DETAILS, fetchUserDetails);
  yield takeLatest(articleActions.ADD_ARTICLE, createArticle);
  yield takeLatest(articleActions.UPDATE_ARTICLE, updateArticle);
  yield takeLatest(bookActions.ADD_BOOK, createBook);
  yield takeLatest(bookActions.UPDATE_BOOK, updateBook);
  yield takeLatest(videoActions.ADD_VIDEO, createVideo);
  yield takeLatest(videoActions.UPDATE_VIDEO, updateVideo);
  yield takeLatest(learningPathActions.CREATE_COURSE, createCourse);
  yield takeLatest(learningPathActions.FETCH_ALL_COURSE_LIST, fetchAllCourseList);
  yield takeLatest(learningPathActions.FETCH_COURSE_DETAIL, fetchCourseDetails);
  yield takeLatest(learningPathActions.FETCH_LEARNING_PATH_SECTIONS, fetchLearningPathSections);
  yield takeLatest(learningPathActions.FETCH_LEARNING_PATH_DETAILS_FOR_LEARNER, fetchLearningPathDetailsForLearnerSaga);
  yield takeLatest(sectionActions.ADD_SECTION, createSection);
  yield takeLatest(sectionActions.DELETE_SECTION, deleteSection);
  yield takeLatest(sectionActions.FETCH_SECTION_DETAILS, fetchSection);
  yield takeLatest(sectionActions.UPDATE_SECTION, updateSection);
  yield takeLatest(learningPathActions.UPDATE_COURSE, updateCourse);
  yield takeLatest(onlineCourseAction.ADD_ONLINE_COURSE, createOnlineCourse);
  yield takeLatest(onlineCourseAction.UPDATE_ONLINE_COURSE, updateOnlineCourse);
  yield takeLatest(sectionActions.FETCH_SECTION_CONTENTS, fetchSectionContents);
  yield takeLatest(sectionActions.UPDATE_SECTION_ORDER, updateSectionOrder);
  yield takeLatest(contentAction.FETCH_CONTENT_DETAILS, fetchContentDetailsSaga);
  yield takeLatest(assesmentAction.ADD_ASSESMENT, createAssesment);
  yield takeLatest(assesmentAction.UPDATE_ASSESMENT, updateAssesment);
  yield takeLatest(assesmentAction.GET_ASSESSMENT, getAssessment);
  yield takeLatest(assesmentAction.SUBMIT_ASSESSMENT, submitAssessmentAnswers);
  yield takeLatest(assesmentAction.GET_ASSESSMENT_RESULT, getAssessmentResult);
  yield takeLatest(documentAction.ADD_DOCUMENT, createDocument);
  yield takeLatest(documentAction.UPDATE_DOCUMENT, updateDocument);
  yield takeLatest(learningPathActions.PUBLISH_CHANGES, publishChanges);
  yield takeLatest(learningPathActions.FETCH_ALL_CATEGORIES, fetchAllCategories);
  yield takeLatest(learningPathActions.FETCH_CURRENT_LEARNING_PATHS, fetchCurrentLearningPaths);
  yield takeLatest(recentHappeningsAction.FETCH_ALL_RECENT_HAPPENINGS, fetchAllRecentHappenings);
  yield takeLatest(AdminAction.FETCH_EXPERTS, getExperts);
  yield takeLatest(AdminAction.FETCH_USER_CATEGORY, getUserCategory);
  yield takeLatest(AdminAction.INVITE_EXPERT, inviteExpert);
  yield takeLatest(AdminAction.UPDATE_USER_CATEGORY, updateUserCategory);
  yield takeLatest(AdminAction.DELETE_EXPERT, deleteExpert);
  yield takeLatest(AdminAction.VERIFY_TOKEN, checkTokenStatus);
  yield takeLatest(AdminAction.EXPERT_SIGN_IN, expertSignIn);
  yield takeLatest(AdminAction.EXPERT_RESEND_INVITE, expertResendInvite);
  yield takeLatest(userActions.UPDATE_USER, updateUser);
  yield takeLatest(userActions.LEARNER_SIGNUP, learnerSignup);
  yield takeLatest(learningPathActions.ENROLL_LEARNING_PATH, enrollLearningPath);
  yield takeLatest(sectionActions.ENROLL_SECTION, enrollSection);
  yield takeLatest(contentAction.ENROLL_CONTENT, enrollContent);
  yield takeLatest(contentAction.COMPLETE_CONTENT, completeContent);
  yield takeLatest(contentAction.ENROLL_ALL, enrollAll);
  yield takeLatest(youTubeAction.ADD_YOUTUBE_VIDEO, createYouTubeVideo);
  yield takeLatest(userActions.UPLOAD_RESUME, uploadResume);
  yield takeLatest(learningPathActions.GET_ALL_LEARNING_PATH_MATERIALS, getAllLearningPathMaterials);
  yield takeLatest(sectionActions.UPDATE_LATEST_SECTION_FOR_USER, updateLatestSectionForUser);
  yield takeLatest(
    learningPathActions.GET_ALL_LEARNING_PATH_MATERIALS_BY_CATEGORY,
    getAllLearningPathMaterialsByCategory
  );
  yield takeLatest(contentAction.UPDATE_LATEST_CONTENT_FOR_USER, updateLatestContentForUser);
  yield takeLatest(learningPathActions.GET_TOP_SKILL_TRACK, getTopSkillTracks);
  yield takeLatest(learningPathActions.GET_LATEST_SKILL_TRACK, getLatestSkillTracks);
  yield takeLatest(learningPathActions.GET_TRENDING_SKILL_TRACK, getTrendingSkillTracks);
  yield takeLatest(contentAction.MARK_CONTENT_COMPLETED, markContentAsCompleted);
  yield takeLatest(contentAction.FETCH_ASSESSMENT_TEST, fetchAssessmentTest);
  yield takeLatest(contentAction.CHECK_CORRECT_ANSWER, checkIfAnswerCorrect);
  yield takeLatest(ProfileAction.GET_PERSONAL_DETAIL, getPersonalDetail);
  yield takeLatest(ProfileAction.UPDATE_PERSONAL_DETAIL, updatePersonalDetail);
  yield takeLatest(ProfileAction.GET_EMPLOYMENT_HISTORY, getEmploymentHistoryDetail);
  yield takeLatest(ProfileAction.ADD_EMPLOYMENT_HISTORY, addEmploymentDetail);
  yield takeLatest(ProfileAction.UPDATE_EMPLOYMENT_HISTORY, updateEmploymentHistory);
  yield takeLatest(ProfileAction.DELETE_EMPLOYMENT_HISTORY, deleteEmploymentHistory);
  yield takeLatest(ProfileAction.GET_EDUCATION_DETAIL, getEducationDetailList);
  yield takeLatest(ProfileAction.ADD_EDUCATION_DETAIL, addEducationDetail);
  yield takeLatest(ProfileAction.UPDATE_EDUCATION_DETAIL, updateEducationDetail);
  yield takeLatest(ProfileAction.DELETE_EDUCATION_DETAIL, deleteEducationDetail);
  yield takeLatest(ProfileAction.GET_LEARNER_SKILLS, getLearnerSkillList);
  yield takeLatest(ProfileAction.ADD_SKILL_LIST, addSkillList);
  yield takeLatest(ProfileAction.GET_MASTER_SKILL_LIST, getMasterSkillList);
  yield takeLatest(ProfileAction.GET_BADGE_LIST, getBadgeList);
  yield takeLatest(ProfileAction.GET_USER_POINTS, getUserPoints);
  yield takeLatest(contentAction.GET_BADGE, getBadgeData);
  yield takeLatest(careerTrackAction.FETCH_CAREER_TRACK, fetchCareerTrack);
  yield takeLatest(careerTrackAction.FETCH_SKILL_TRACKS_BY_CT_ID, fetchSkillTracksByCTId);
  yield takeLatest(careerTrackAction.CHECK_IS_COURSE_ENROLLED, isCourseEnrolledSaga);
  yield takeLatest(careerTrackAction.ENROLL_MY_CAREER, enrollMyCareer);
  yield takeLatest(learningPathActions.GET_RECOMMENDED_LEARNINGS, getRecommendedLearnings);
  yield takeLatest(learningPathActions.FETCH_MICRO_LEARNING, getMicroLearningByIdForLearner);
  yield takeLatest(careerTrackAction.CHECK_IS_DASHBOARD_COURSE_ENROLLED, checkIfDashboardCourseEnrolled);
  yield takeLatest(ProfileAction.GET_CERTIFICATE_FROM_TOKEN, getLearnerCertficate);
  yield takeLatest(ProfileAction.VERIFY_CERTIFICATE, verifyLearnerCertificate);
  yield takeLatest(contentAction.GET_RELATED_CONTENT, fetchRelatedContent);
  yield takeLatest(ProfileAction.FETCH_COMPLETED_COURSES, fetchCompletedCourses);
  yield takeLatest(CourseAction.FETCH_COURSE_DETAILS, getCourseDetails);
  yield takeLatest(CourseAction.SEARCH_COURSE, searchCourse);
  yield takeLatest(CourseAction.GET_SEARCHED_COURSE, getSearchedCourses);
  yield takeLatest(CourseAction.GET_EXPERT_SEARCHED_COURSE, expertSearchedCourses);
  yield takeLatest(sectionActions.GET_SECTION_ENROLLMENT, getSectionEnrollmentStatus);
  yield takeLatest(AdminAction.CREATE_CATEGORY, createCategory);
  yield takeLatest(AdminAction.UPDATE_CATEGORY, updateCategory);
  yield takeLatest(contentAction.CREATE_CONTENT, createContentWithSection);
  yield takeLatest(contentAction.FETCH_SECTION_CONTENT_LIST, getSectionContents);
  yield takeLatest(contentAction.UPDATE_CONTENT, updateContentWithSection);
  yield takeLatest(careerTrackAction.CREATE_SKILL_TRACK_BY_CAREER_TRACK, createSkillTrackByCareerTrackId);
  yield takeLatest(careerTrackAction.UPDATE_SKILL_TRACK, updateSkillTrack);
  yield takeLatest(careerTrackAction.DELETE_SKILL_TRACK, deleteSkillTrack);
  yield takeLatest(careerTrackAction.UPDATE_SKILL_TRACK_ORDER, changeSkillTrackOrder);
  yield takeLatest(contentAction.REORDER_CONTENT_LIST, reorderContentList);
  yield takeLatest(contentAction.DELETE_CONTENT_LIST, deleteContentBySectionId);
  yield takeLatest(contentAction.GET_QUESTION_TYPE, getDefaultQuestionType);
  yield takeLatest(contentAction.SAVE_QUESTION, saveQuestion);
  yield takeLatest(contentAction.FETCH_ASSESSMENT_QUESTIONS, getAssessmentQuestions);
  yield takeLatest(contentAction.UPDATE_QUESTION, updateQuestion);
  yield takeLatest(GoalAction.GET_DAILY_GOALS, getDailyGoals);
  yield takeLatest(GoalAction.UPDATE_DAILY_GOAL, updateDailyGoal);
  yield takeLatest(certificateActions.CREATE_PASS_PHRASE, createPassPhrase);
  yield takeLatest(certificateActions.GET_CERTIFICATE, getCertificate);
  yield takeLatest(certificateActions.GET_DOWNLOAD_URL, getDownloadURL);
  yield takeLatest(certificateActions.UPLOAD_CERTIFICATE, uploadCertificate);
  yield takeLatest(contentAction.GAMIFY_LEARNER, gamifyLearnerSaga);
  yield takeLatest(contentAction.GAMIFY_LEARNER_ASSESSMENT, gamifyLearnerAssessmentSaga);
  yield takeLatest(learningPathActions.FETCH_MY_COURSES, fetchMyCourseList);
  yield takeLatest(CourseAction.UPDATE_MICROLEARNING, updateMicrolearning);
  yield takeLatest(contentAction.CREATE_RELATED_CONTENT, createRelatedContent);
  yield takeLatest(contentAction.DELETE_RELATED_CONTENT, deleteRelatedContentMapping);
  yield takeLatest(recentHappeningsAction.FETCH_MY_RECENT_HAPPENINGS, fetchMyRecentHappenings);
  yield takeLatest(recentHappeningsAction.FETCH_RECENT_HAPPENING_TYPES, fetchRecentHappeningTypes);
  yield takeLatest(recentHappeningsAction.CREATE_RECENT_HAPPENING, createRecentHappening);
  yield takeLatest(recentHappeningsAction.UPDATE_RECENT_HAPPENING, updateRecentHappening);
  yield takeLatest(ProfileAction.FETCH_INTRESTED_CATEGORIES, fetchIntrestedCategoriesSaga);
  yield takeLatest(ProfileAction.CREATE_INTRESTED_CATEGORIES, createIntrestedCategoriesSaga);
}
