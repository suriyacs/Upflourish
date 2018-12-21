import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '../../components/FormComponents/TextField';
import RenderQuestions from './RenderQuestions';

import { required } from '../../utils/Validations';
import { assessment } from '../../globals/AppConstant';

import '../../../assets/styles/components/MultiChoiceQuestions.scss';

class EditAssessment extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { sample } = assessment;
    this.props.initialize({
      title: 'Node basics',
      questions: sample.questions
    });
  }

  handleQuestionSubmit = values => {
    console.log('what!!!!================', values);
  }

  render() {
    const { handleSubmit, locale } = this.props;
    const { assessment: { editAssessment } } = locale;
    return (
      <div className="container-fluid">
        <div className="offset-lg-3 col-lg-6">
          <div className="title-header p-10">{editAssessment}</div>
          <form
            onSubmit={handleSubmit(this.handleQuestionSubmit)}
            className="questions-form-section"
          >
            <TextField
              name="title"
              isLableRequired
              htmlFor="title"
              labelName="Title"
              type="text"
              className="form-control"
              validate={[required]}
            />
            <TextField
              name="minutes"
              isLableRequired
              htmlFor="Total time to finish the assessment"
              labelName="Total time to finish the assessment"
              type="number"
              className="form-control"
              validate={[required]}
            />
            <FieldArray name="questions" component={RenderQuestions} locale={locale} />
          </form>
        </div>
      </div>
    );
  }
}

EditAssessment.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

const EditAssessmentComponent = connect(mapStateToProps, mapDispatchToProps)(EditAssessment);
export default reduxForm({
  form: 'questionnaire',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditAssessmentComponent);

// export default Questionnaire;
