import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Input } from 'reactstrap';

import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import { required } from '../../utils/Validations';

class AnswerForm extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if ((!prevState) || (nextProps.answer && nextProps.answer.id && !prevState.flag) ||
    (nextProps.answer && prevState.answer && nextProps.answer.id !== prevState.answer.id)) {
      nextProps.initialize({
        description: nextProps.answer.description,
        comment: nextProps.answer.comment,
        is_correct_answer: nextProps.answer.is_correct_answer
      });
      return {
        flag: true,
        answer: nextProps.answer
      };
    }
    return null;
  }

  handleFormSubmit = ans => {
    const { answer } = this.props;
    if (answer.id) {
      this.props.updateAnswer(ans);
    } else {
      this.props.getAnswer(ans);
    }
  }

  renderCheckbox = props => {
    const { input } = props;
    return (
      <Input
        type="checkbox"
        onChange={e => input.onChange(e)}
        className="custom-check"
        checked={input.checked}
      />
    );
  };

  render() {
    const { locale, answer, handleSubmit } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="form-content">
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <TextField
                  name="description"
                  isLableRequired
                  htmlFor="description"
                  labelName={locale.answer}
                  type="text"
                  className="form-control"
                  validate={[required]}
                />
                <TextField
                  name="comment"
                  isLableRequired
                  htmlFor="comment"
                  labelName={locale.comment}
                  type="textArea"
                  className="form-control input-textArea"
                  validate={[required]}
                />
                <Fragment>
                  <div className="input-field">
                    <label htmlFor={locale.isCorrectAnswer}>{locale.isCorrectAnswer}</label>
                  </div>
                  <div>
                    <Field
                      component={this.renderCheckbox}
                      name="is_correct_answer"
                      type="checkbox"
                      id="is_correct_answer"
                    />
                  </div>
                </Fragment>

                <Button
                  type="submit"
                  value={
                    (answer && answer.id) ?
                      locale.update :
                      locale.save
                  }
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AnswerForm.propTypes = {
  answer: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  getAnswer: PropTypes.func.isRequired,
  input: PropTypes.object,
  updateAnswer: PropTypes.func.isRequired
};

AnswerForm.defaultProps = {
  answer: {},
  input: {}
};

export default (reduxForm({
  form: 'AnswerForm'
})(AnswerForm));
