const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (!values.questions || !values.questions.length) {
    errors.questions = { error: 'At least one question must be added' };
  } else {
    const questionArrayErrors = [];
    values.questions.forEach((question, questionIndex) => {
      const questionErrors = {};
      if (!question || !question.question) {
        questionErrors.question = 'Required';
        questionArrayErrors[questionIndex] = questionErrors;
      }
      if (question && question.answers && question.answers.length) {
        const answerArrayErrors = [];
        question.answers.forEach((answer, answerIndex) => {
          if (!answer || !answer.length) {
            answerArrayErrors[answerIndex] = 'Required';
          }
        });
        if (answerArrayErrors.length) {
          questionErrors.answers = answerArrayErrors;
          questionArrayErrors[questionIndex] = questionErrors;
        }
        if (question.answers.length > 4) {
          if (!questionErrors.answers) {
            questionErrors.answers = [];
          }
          questionErrors.answers.error = 'No more than four options allowed';
          questionArrayErrors[questionIndex] = questionErrors;
        }
      }
    });
    if (questionArrayErrors.length) {
      errors.questions = questionArrayErrors;
    }
  }
  return errors;
};

export default validate;
