import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import storage from '../../globals/localStorage';
import {
  fetchContentDetails,
  completeContent,
  enrollMyContent,
  fetchAssessmentTest,
  checkIfCorrectAnswer,
  clearAssessmentData,
  clearAssessmentAnswers,
  clearGamifyLearnerAssessment
} from '../../actions/content';
import { fetchSectionContents, getSectionEnrollmentStatus } from '../../actions/section';
import { routeConstant } from '../../globals/AppConstant';
import Loader from '../../components/Loader/Loader';

import AssessmentNavigationBar from '../../containers/Assesment/AssessmentNavigationBar';
import AssessmentIntroduction from '../../containers/Assesment/AssessmentIntroduction';
import AssessmentQA from '../../containers/Assesment/AssessmentQA';
import AssessmentGamification from '../../containers/Assesment/AssessmentGamification';
import FinalAssessmentResult from '../../containers/Assesment/FinalAssessmentResult';
import { hintAlert, closeAllAlert } from '../../utils/GamifyToaster';

class LearnerAssessment extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { assessmentTest, learnerAssessmentAnswers, match } = nextProps;
    const { showLastPage } = prevState;
    if (learnerAssessmentAnswers && learnerAssessmentAnswers.learnerAssessmentAnswers &&
      learnerAssessmentAnswers.learnerAssessmentAnswers.length) {
      let showOverlay = false;
      let showFinalResult = false;
      if (learnerAssessmentAnswers.lastQuestionScore &&
        learnerAssessmentAnswers.lastQuestionScore > 0) {
        showOverlay = true;
      }
      if (showLastPage === true) {
        showFinalResult = true;
      }
      return {
        showFinalResult,
        showOverlay
      };
    }
    if (learnerAssessmentAnswers && learnerAssessmentAnswers.score === 0) {
      return {
        showOverlay: false
      };
    }
    if (learnerAssessmentAnswers && learnerAssessmentAnswers.score > 0) {
      return {
        showOverlay: true
      };
    }
    if (assessmentTest && assessmentTest.id &&
      (assessmentTest.id === match.params.contentId)) {
      return {
        currentQuestion: (!prevState.currentQuestion || (prevState.currentQuestion && !prevState.currentQuestion.id)) ?
          assessmentTest.assessmentQuestions[0] : prevState.currentQuestion
      };
    }
    return { showFinalResult: false };
  }
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: {},
      selectedOption: null,
      isOptionSelected: true,
      questionResponses: {},
      showFinalResult: false,
      isAnswerChecked: false,
      showOverlay: false,
      tooltipOpen: false,
      showLastPage: false,
      showHint: false
    };
    this.isContentEnrolled = true;
    this.selectedQuestionIndex = 0;
  }

  componentDidMount() {
    const { history } = this.props;
    const { sectionId, contentId, contentType } = this.props.match.params;
    this.props.getSectionEnrollmentStatus(sectionId, contentId, contentType);
    history.listen(this.onRouteChange);
  }

  componentDidUpdate(prevProps) {
    const { sectionId, contentId, contentType } = this.props.match.params;
    if (contentId && prevProps.contentId && contentId !== prevProps.contentId) {
      this.props.getSectionEnrollmentStatus(sectionId, contentId, contentType);
    }
  }

  onRouteChange = () => {
    this.setState({
      currentQuestion: {},
      selectedOption: null,
      isOptionSelected: true,
      questionResponses: {},
      showFinalResult: false,
      isAnswerChecked: false,
      showOverlay: false
    });
    this.selectedQuestionIndex = 0;
    this.isContentEnrolled = true;
    this.props.clearAssessmentData();
  }

  setSelectedQuestion = () => {
    const { assessmentTest } = this.props;
    this.selectedQuestionIndex += 1;
    this.setState({
      isOptionSelected: true,
      currentQuestion: assessmentTest.assessmentQuestions[this.selectedQuestionIndex],
      isAnswerChecked: false
    });
  }

  getAssessmentTest = () => {
    const { contentId, sectionId } = this.props.match.params;
    const { contentDetails } = this.props;
    if (contentDetails.totalQuestions) {
      this.props.fetchAssessmentTest({
        contentId,
        sectionId
      });
    } else {
      toast.error('Assessment has no questions!!');
    }
  }

  showNextQuestionAndRemoveOverlay = () => {
    const { assessmentTest, learnerAssessmentAnswers } = this.props;
    this.selectedQuestionIndex += 1;
    let showLastPage = false;
    if (this.selectedQuestionIndex !== assessmentTest.assessmentQuestions.length) {
      showLastPage = false;
    } else {
      showLastPage = true;
    }
    closeAllAlert();
    this.setState({
      isOptionSelected: true,
      currentQuestion: !showLastPage ? assessmentTest.assessmentQuestions[this.selectedQuestionIndex] : null,
      isAnswerChecked: false,
      showOverlay: false,
      showLastPage,
      showFinalResult: showLastPage,
      showHint: false
    });
    if (showLastPage) {
      this.props.clearGamifyLearnerAssessment();
    }
    if (!learnerAssessmentAnswers.learnerAssessmentAnswers) {
      this.props.clearAssessmentAnswers();
    }
  }

  fetchContentDetails = () => {
    const { contentId, sectionId } = this.props.match.params;
    this.props.fetchContentDetails({
      contentType: routeConstant.ASSESSMENT,
      contentId,
      sectionId
    });
  }

  selectOption = option => {
    this.setState({
      isOptionSelected: false,
      selectedOption: option
    });
  }

  checkIfCorrectAndSaveOption = (isFinalScore, skip) => {
    const { currentQuestion, selectedOption, questionResponses } = this.state;
    const { match, assessmentTest } = this.props;
    const responses = { ...questionResponses };
    let showLastPage = false;
    closeAllAlert();
    if (skip === false) {
      responses[currentQuestion.question.id] = selectedOption.id;
    } else if (skip === true && currentQuestion.order === assessmentTest.assessmentQuestions.length) {
      showLastPage = true;
    }
    this.setState({
      questionResponses: responses,
      showOverlay: false,
      showLastPage
    });
    this.props.checkIfCorrectAnswer({
      questionId: currentQuestion.question.id,
      answerId: skip === true ? null : selectedOption.id,
      questionNumber: currentQuestion.order,
      contentId: match.params.contentId,
      sectionId: match.params.sectionId,
      learnerAssessmentId: assessmentTest.learnerAssessment.id,
      isFinalScore: isFinalScore === 'getFinalScore'
    });
    if (skip === true && currentQuestion.order !== assessmentTest.assessmentQuestions.length) {
      this.showNextQuestionAndRemoveOverlay();
    }
  }

  hideHint = () => {
    this.setState({ showHint: false });
  }

  toggleHint = hint => {
    this.setState({ showHint: true });
    hintAlert(hint, this.hideHint);
  }

  toggleToolTip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  openRelatedContent = relatedContent => {
    const { contentRoutes } = this.props;
    const selectedContent = contentRoutes.filter(route => (
      relatedContent[0].id === route.contentId
    ));
    return selectedContent[0] ? selectedContent[0].path : '';
  }

  enrollIntoContent = () => {
    const {
      enrollContent,
      userId,
      match,
      sectionEnrollment
    } = this.props;
    enrollContent({
      sectionId: match.params.sectionId,
      contentId: match.params.contentId,
      sectionEnrollmentId: sectionEnrollment.sectionEnrollmentId,
      userId
    });
  }

  redirectToCertificate = () => {
    const { careerId } = this.props.match.params;
    this.props.history.push(`${routeConstant.CERTIFICATE}${routeConstant.COURSE}/${careerId}`);
  };

  render() {
    const {
      currentQuestion,
      isOptionSelected,
      questionResponses,
      showFinalResult,
      isAnswerChecked,
      showOverlay,
      tooltipOpen,
      showLastPage,
      showHint
    } = this.state;
    const {
      contentDetails,
      assessmentTest,
      learnerAssessmentAnswers,
      assessmentData,
      contentRoutes,
      updateLatestContentIdForUser,
      contentId,
      checkingAnswer
    } = this.props;
    const { learningpathName } = JSON.parse(storage.getItem('breadCrumb'));
    return (
      <div className="assessment-container">
        <Loader loading={checkingAnswer} />
        {
          contentDetails && contentDetails.id &&
          !assessmentTest.id && !showFinalResult &&
          <AssessmentIntroduction
            learningpathName={learningpathName}
            contentDetails={contentDetails}
            getAssessmentTest={this.getAssessmentTest}
          />
        }
        {
          learnerAssessmentAnswers
          && learnerAssessmentAnswers.score > 0
          && showOverlay
          && assessmentData
          && assessmentData.length > 0
          &&
          <AssessmentGamification
            score={assessmentData}
            questionResult={learnerAssessmentAnswers}
            showNextQuestionAndRemoveOverlay={this.showNextQuestionAndRemoveOverlay}
          />
        }
        {
          currentQuestion && currentQuestion.id && assessmentTest.id && !showFinalResult &&
          contentDetails && contentDetails.id &&
          <AssessmentQA
            sectionName={contentDetails.title}
            contentRoutes={contentRoutes}
            openRelatedContent={this.openRelatedContent}
            currentQuestion={currentQuestion}
            selectOption={this.selectOption}
            questionResponses={questionResponses}
            isAnswerChecked={isAnswerChecked}
            toggleHint={this.toggleHint}
            showHint={showHint}
          />
        }
        {
          currentQuestion && assessmentTest && assessmentTest.id && !showFinalResult &&
          <AssessmentNavigationBar
            assessmentTest={assessmentTest}
            tooltipOpen={tooltipOpen}
            toggleToolTip={this.toggleToolTip}
            isOptionSelected={isOptionSelected}
            questions={assessmentTest.assessmentQuestions}
            selectedQuestion={currentQuestion}
            setSelectedQuestion={this.setSelectedQuestion}
            checkIfCorrectAndSaveOption={this.checkIfCorrectAndSaveOption}
            isAnswerChecked={isAnswerChecked}
            questionResponses={questionResponses}
            learnerAssessmentAnswers={learnerAssessmentAnswers}
            currentQuestionNumber={this.selectedQuestionIndex}
          />
        }
        {
          showFinalResult && learnerAssessmentAnswers && showLastPage &&
          <FinalAssessmentResult
            assessmentResults={learnerAssessmentAnswers}
            learningpathName={learningpathName}
            contentDetails={contentDetails}
            redirectToCertificate={this.redirectToCertificate}
            updateLatestContentIdForUser={updateLatestContentIdForUser}
            contentRoutes={contentRoutes}
            contentId={contentId}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contentDetails: state.content.get('contentDetails'),
  userId: state.user.get('userId'),
  enrolledContent: state.content.get('enrolledContent'),
  assessmentTest: state.content.get('assessmentTest'),
  learnerAssessmentAnswers: state.content.get('learnerAssessmentAnswers'),
  assessmentData: Array.from(state.content.get('gamifyLearnerAssessment')),
  sectionEnrollment: state.section.get('sectionEnrollment'),
  checkingAnswer: state.content.get('checkingAnswer')
});

const mapDispatchToProps = dispatch => ({
  enrollContent: enroll => dispatch(enrollMyContent(enroll)),
  fetchContentDetails: (contentType, contentId) => dispatch(fetchContentDetails(contentType, contentId)),
  completeMyContent: data => dispatch(completeContent(data)),
  fetchAssessmentTest: data => dispatch(fetchAssessmentTest(data)),
  fetchSectionContents: (sectionId, searchTerm, userId) =>
    dispatch(fetchSectionContents(sectionId, searchTerm, userId)),
  checkIfCorrectAnswer: answerData => dispatch(checkIfCorrectAnswer(answerData)),
  clearAssessmentData: () => dispatch(clearAssessmentData()),
  clearAssessmentAnswers: () => dispatch(clearAssessmentAnswers()),
  getSectionEnrollmentStatus: (sectionId, contentId, contentType) =>
    dispatch(getSectionEnrollmentStatus(sectionId, contentId, contentType)),
  clearGamifyLearnerAssessment: () => dispatch(clearGamifyLearnerAssessment())
});

LearnerAssessment.propTypes = {
  fetchContentDetails: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  match: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  assessmentTest: PropTypes.object,
  enrollContent: PropTypes.func.isRequired,
  contentRoutes: PropTypes.array.isRequired,
  contentId: PropTypes.string.isRequired,
  fetchAssessmentTest: PropTypes.func.isRequired,
  checkIfCorrectAnswer: PropTypes.func.isRequired,
  learnerAssessmentAnswers: PropTypes.object,
  history: PropTypes.object.isRequired,
  clearAssessmentData: PropTypes.func.isRequired,
  assessmentData: PropTypes.array,
  clearAssessmentAnswers: PropTypes.func.isRequired,
  sectionEnrollment: PropTypes.object,
  getSectionEnrollmentStatus: PropTypes.func.isRequired,
  clearGamifyLearnerAssessment: PropTypes.func.isRequired,
  updateLatestContentIdForUser: PropTypes.func.isRequired,
  checkingAnswer: PropTypes.bool.isRequired
};

LearnerAssessment.defaultProps = {
  contentDetails: {},
  assessmentTest: {},
  learnerAssessmentAnswers: {},
  assessmentData: [],
  sectionEnrollment: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LearnerAssessment));
