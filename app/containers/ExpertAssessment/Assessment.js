import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader/Loader';
import IntroCard from './IntroCard';
import QuestionContainer from './QuestionContainer';
import Questions from './Questions';
import { getDefaultQuestionType, saveQuestion, updateQuestion, fetchAssessmentQuestions } from '../../actions/content';

import '../../../assets/styles/components/ExpertContent.scss';

class Assessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewQuestion: false,
      selectedQuestion: {}
    };
    this.isNewQuestion = false;
  }

  componentDidMount() {
    const { contentDetails } = this.props;
    if (contentDetails && contentDetails.id) {
      this.props.fetchAssessmentQuestions(contentDetails.id);
    }
    this.props.getDefaultQuestionType();
  }

  componentDidUpdate(prevProps) {
    const { contentDetails } = this.props;
    if (prevProps.contentDetails.id !== contentDetails.id) {
      this.props.fetchAssessmentQuestions(contentDetails.id);
      this.clearState();
    }
  }

  showUnauthorizeErrorMessage = () => {
    const { locale } = this.props;
    toast.error(locale.learningPathDetails.notAuthorized);
  }

  checkOwnerPermission = () => {
    const { contentDetails, userId } = this.props;
    return contentDetails.owner_id === userId;
  }

  clearState() {
    this.setState({
      showNewQuestion: false,
      selectedQuestion: {}
    });
    this.isNewQuestion = false;
  }

  openQuestionForm = () => {
    if (this.checkOwnerPermission()) {
      this.isNewQuestion = true;
      this.setState({ showNewQuestion: true });
    } else {
      this.showUnauthorizeErrorMessage();
    }
  }

  closeQuestionForm = () => {
    this.clearState();
  }

  saveQuestion = question => {
    const { questionType, contentDetails } = this.props;
    question.question_type_id = questionType.id;
    this.closeQuestionForm();
    this.props.saveQuestion(question, contentDetails.id);
  }

  updateQuestion = question => {
    if (this.checkOwnerPermission()) {
      const { contentDetails } = this.props;
      this.closeQuestionForm();
      this.props.updateQuestion(question, contentDetails.id);
    } else {
      this.showUnauthorizeErrorMessage();
    }
  }

  handleEditQuestion = question => {
    this.setState({
      selectedQuestion: question,
      showNewQuestion: true
    });
  }

  cancelQuestion = () => {
    this.clearState();
  }

  render() {
    const { showNewQuestion, selectedQuestion } = this.state;
    const {
      contentDetails,
      handleEdit,
      loading,
      assessmentQuestions,
      contentList,
      userId
    } = this.props;
    const locale = this.props.locale.expertAssessment;
    return (
      <div className="assessment-container p-5 p-t-10">
        <Loader loading={loading} />
        <IntroCard
          title={contentDetails.title}
          description={contentDetails.description}
          handleEdit={handleEdit}
          locale={locale}
        />
        <div className="row ml-2">
          {
            assessmentQuestions.length ?
              <div className="col-12 col-md-4 mt-3">
                <div className="question-header">
                  {locale.questions}
                </div>
                <Questions
                  questions={assessmentQuestions}
                  handleEditQuestion={this.handleEditQuestion}
                />
              </div>
              :
              ''
          }
          <div className="col-12 col-md-8">
            {
              showNewQuestion &&
              <QuestionContainer
                locale={locale}
                saveQuestion={this.saveQuestion}
                question={selectedQuestion}
                updateQuestion={this.updateQuestion}
                cancelQuestion={this.cancelQuestion}
                contentList={contentList}
                isNewQuestion={this.isNewQuestion}
                contentDetails={contentDetails}
                userId={userId}
              />
            }
            {
              !showNewQuestion &&
              <div className="add-question" role="presentation" onClick={this.openQuestionForm}>
                <div className="col-12 ">
                  <span className="add-question-container">
                    <i className="fa fa-plus-circle" aria-hidden="true" />
                    {locale.addNewQuestion}
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Assessment.propTypes = {
  contentDetails: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  getDefaultQuestionType: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  questionType: PropTypes.object.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  fetchAssessmentQuestions: PropTypes.func.isRequired,
  assessmentQuestions: PropTypes.any,
  updateQuestion: PropTypes.func.isRequired,
  contentList: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired
};

Assessment.defaultProps = {
  assessmentQuestions: []
};

const mapStateToProps = state => ({
  loading: state.content.get('loading'),
  questionType: state.content.get('questionType'),
  assessmentQuestions: state.content.get('assessmentQuestions'),
  userId: state.user.get('userId')
});

const mapDispatchToProps = dispatch => ({
  getDefaultQuestionType: () => dispatch(getDefaultQuestionType()),
  saveQuestion: (question, contentId) => dispatch(saveQuestion(question, contentId)),
  updateQuestion: (question, contentId) => dispatch(updateQuestion(question, contentId)),
  fetchAssessmentQuestions: contentId => dispatch(fetchAssessmentQuestions(contentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(translatable(locale => locale)(Assessment));

