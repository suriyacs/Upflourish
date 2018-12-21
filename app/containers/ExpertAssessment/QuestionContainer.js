import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Modal, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';

import TextField from '../../components/FormComponents/TextField';
import { required, greaterThanZero } from '../../utils/Validations';
import AnswerForm from './AnswerForm';
import RelatedContents from './RelatedContents';
import ImageURL from '../../components/Image/ImageURL';

import ActiveCircle from '../../../assets/images/completed.svg';

class QuestionContainer extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if ((nextProps.question && nextProps.question.id && !prevState.flag) ||
      (nextProps.question && prevState.question && nextProps.question.id !== prevState.question.id)) {
      nextProps.initialize({
        hint: nextProps.question.hint,
        title: nextProps.question.title,
        score: nextProps.question.score
      });
      return {
        answers: nextProps.question.answers,
        flag: true,
        question: nextProps.question,
        selectedContentId: null
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      showAnswerModal: false,
      answers: [],
      selectedAnswer: {},
      showRelatedContent: false,
      selectedContentId: null
    };
  }

  componentDidMount() {
    const { initialize, defaultScore, isNewQuestion } = this.props;
    if (isNewQuestion) {
      initialize({
        score: defaultScore
      });
    }
  }

  getAnswer = answer => {
    const { answers } = this.state;
    const { question } = this.props;
    if (answer.is_correct_answer) {
      const findCheckedAnswer = answers.find(ans => ans.is_correct_answer);
      if (findCheckedAnswer) {
        toast.error('Correct answer already selected');
        return;
      }
    }
    if (question && question.id) {
      answer.question_id = question.id;
    }
    answer.order = answers.length + 1;
    const clonedAnswers = [...answers, answer];
    this.setState({ answers: clonedAnswers });
    this.closeAnswerModal();
  }

  getRelatedContent = () => {
    const { contentList, locale, question } = this.props;
    let { selectedContentId } = this.state;
    if (!selectedContentId && question.contents && question.contents.length > 0) {
      selectedContentId = question.contents[0].id;
    }
    const selectedContent = contentList.find(content => content.id === selectedContentId);
    if (selectedContent) {
      return (
        <div
          className="col-4 related-content-container"
          onClick={this.openRelatedContent}
          role="presentation"
        >
          <div className="answer-choices">{locale.relatedContentLabel}</div>
          <img
            src={ImageURL('Contents', selectedContent.id)}
            alt="content"
            className="content-img"
          />
          <div className="content-title">{ selectedContent.title }</div>
        </div>
      );
    }
    return null;
  }

  showUnauthorizeErrorMessage = () => {
    const { locale } = this.props;
    toast.error(locale.notAuthorized);
  }

  checkOwnerPermission = () => {
    const { contentDetails, userId } = this.props;
    return contentDetails.owner_id === userId;
  }

  updateAnswer = answer => {
    const { selectedAnswer, answers } = this.state;
    const filteredAnswers = answers.filter(ans => ans.id !== selectedAnswer.id);
    if (answer.is_correct_answer) {
      const findCheckedAnswer = filteredAnswers.find(ans => ans.is_correct_answer);
      if (findCheckedAnswer) {
        toast.error('Correct answer already selected');
        return;
      }
    }
    const updatedAnswers = answers.map(ans => {
      if (ans.id !== selectedAnswer.id) {
        return ans;
      }
      return {
        ...ans,
        description: answer.description,
        comment: answer.comment,
        is_correct_answer: answer.is_correct_answer
      };
    });
    this.setState({ answers: updatedAnswers });
    this.closeAnswerModal();
  }

  handleFormSubmit = que => {
    const { question } = this.props;
    const { answers, selectedContentId } = this.state;
    if (answers.length < 2) {
      toast.error('Atleast two answer choices are required');
      return;
    }
    const findCheckedAnswer = answers.find(ans => ans.is_correct_answer);
    if (!findCheckedAnswer) {
      toast.error('No correct answer is selected');
      return;
    }
    if (selectedContentId) {
      que.content_id = selectedContentId;
    }
    que.answers = answers;
    if (question && question.id) {
      que.id = question.id;
      this.props.updateQuestion(que);
    } else {
      this.props.saveQuestion(que);
    }
  }

  handleContentSelect = id => {
    this.setState({ selectedContentId: id });
    this.closeRelatedContent();
  }

  closeAnswerModal = () => {
    this.setState({ showAnswerModal: false, selectedAnswer: {} });
  }

  openAnswerModal = () => {
    if (this.checkOwnerPermission()) {
      this.setState({ showAnswerModal: true });
    } else {
      this.showUnauthorizeErrorMessage();
    }
  }

  removeAnswer = index => {
    const { answers } = this.state;
    const clonedAns = [...answers];
    clonedAns.splice(index, 1);
    this.setState({ answers: clonedAns });
  }

  editAnswer = answer => {
    if (this.checkOwnerPermission()) {
      this.setState({ selectedAnswer: answer });
      this.openAnswerModal();
    } else {
      this.showUnauthorizeErrorMessage();
    }
  }

  openRelatedContent = e => {
    if (this.checkOwnerPermission()) {
      this.setState({ showRelatedContent: true });
    } else {
      this.showUnauthorizeErrorMessage();
    }
    e.preventDefault();
  }

  closeRelatedContent = () => {
    this.setState({ showRelatedContent: false });
  }

  renderAnswer = (answer, index) => (
    <div key={index} className={`col-12 d-flex ${answer.is_correct_answer ? 'correct-answer' : 'wrong-answer'}`}>
      <div className="col-10">
        {
          answer.is_correct_answer ? <img src={ActiveCircle} alt="right" className="right-icon" /> :
          <i className="fa fa-circle-thin" aria-hidden="true" />
        }
        <span>{answer.description}</span>
      </div>
      <div className="col-2">
        {
          !answer.id ? <i
            className="fa fa-minus-circle"
            aria-hidden="true"
            role="presentation"
            onClick={() => this.removeAnswer(index)}
          /> :
          <i
            className="fa fa-pencil-square-o"
            aria-hidden="true"
            role="presentation"
            onClick={() => this.editAnswer(answer)}
          />
        }
      </div>
    </div>
  )

  render() {
    const {
      showAnswerModal,
      answers,
      selectedAnswer,
      showRelatedContent,
      selectedContentId
    } = this.state;
    const {
      locale,
      handleSubmit,
      question,
      contentList
    } = this.props;
    return (
      <div className="question-card">
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="row">
                <div className="col-8">
                  <TextField
                    name="title"
                    isLableRequired
                    htmlFor="title"
                    labelName={locale.question}
                    type="textArea"
                    className="form-control input-textArea"
                    validate={[required]}
                    readOnly={!this.checkOwnerPermission()}
                  />
                </div>
                {
                  (selectedContentId || (question.contents && question.contents.length > 0)) ?
                    this.getRelatedContent() :
                    <div className="col-4">
                      <button
                        className="action-btn"
                        onClick={e => this.openRelatedContent(e)}
                      >
                        {locale.relatedContent}
                      </button>
                    </div>
                }

                <div className="col-8">
                  <div className="answer-choices">{locale.answerChoices}</div>
                  {
                    answers.map((answer, index) => (
                      <div className="row m-0">
                        {this.renderAnswer(answer, index)}
                      </div>
                    ))
                  }
                  {
                    answers.length < 5 &&
                    <div className="add-question" role="presentation" onClick={this.openAnswerModal}>
                      <div className="col-8">
                        <span className="add-question-container">
                          <i className="fa fa-plus-circle" aria-hidden="true" />
                          {locale.addNewAnswer}
                        </span>
                      </div>
                    </div>
                  }
                </div>
                <div className="col-8">
                  <TextField
                    name="hint"
                    isLableRequired
                    htmlFor="hint"
                    labelName={locale.hint}
                    type="text"
                    className="form-control"
                    validate={[required]}
                    readOnly={!this.checkOwnerPermission()}
                  />
                </div>
                <div className="col-8">
                  <TextField
                    name="score"
                    isLableRequired
                    htmlFor="score"
                    labelName={locale.score}
                    type="number"
                    className="form-control"
                    validate={[required, greaterThanZero]}
                    readOnly={!this.checkOwnerPermission()}
                  />
                </div>
                <div className="col-12 btn-container">
                  <div className="col align-self-end">
                    <button
                      className="save-btn"
                      type="submit"
                    >
                      {(question && question.id) ?
                        locale.editQuestion :
                        locale.saveQuestion
                      }
                    </button>
                    <button
                      className="edit-btn"
                      onClick={this.props.cancelQuestion}
                    >
                      {locale.cancel}
                    </button>

                  </div>
                </div>
              </div>
            </form>
            <Modal
              isOpen={showAnswerModal}
              toggle={this.closeAnswerModal}
              centered
            >
              <ModalHeader toggle={this.closeAnswerModal} className="custom-header header-section">
                <div className="container-fluid mr-2 ml-2">
                  <div className="row">
                    <span className="title">
                      {locale.answerTitle}
                    </span>
                  </div>
                </div>
              </ModalHeader>
              <AnswerForm
                locale={locale}
                getAnswer={this.getAnswer}
                answer={selectedAnswer}
                updateAnswer={this.updateAnswer}
              />
            </Modal>

            <Modal
              isOpen={showRelatedContent}
              toggle={this.closeRelatedContent}
              centered
            >
              <RelatedContents
                locale={locale}
                contentList={contentList}
                closeRelatedContent={this.closeRelatedContent}
                handleContentSelect={this.handleContentSelect}
                selectedContentId={
                  (question.contents &&
                    question.contents.length > 0
                    && !selectedContentId) ? question.contents[0].id : selectedContentId}
              />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

QuestionContainer.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  cancelQuestion: PropTypes.func.isRequired,
  contentList: PropTypes.array.isRequired,
  isNewQuestion: PropTypes.bool,
  initialize: PropTypes.func.isRequired,
  defaultScore: PropTypes.number,
  contentDetails: PropTypes.object,
  userId: PropTypes.string
};

QuestionContainer.defaultProps = {
  isNewQuestion: false,
  defaultScore: 5,
  contentDetails: {},
  userId: ''
};

export default (reduxForm({ form: 'QuestionForm' })(QuestionContainer));
