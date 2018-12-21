import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';

import { required } from '../../utils/Validations';
import { createAssesment } from '../../actions/assesment';
import validate from './Validate';
import TextField from '../../components/FormComponents/TextField';
import RenderQuestions from './RenderQuestions';

import '../../../assets/styles/components/MultiChoiceQuestions.scss';

class Assessment extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    closeOnEscape: PropTypes.func.isRequired,
    onClickAssesment: PropTypes.func.isRequired,
    createAssesment: PropTypes.func.isRequired,
    assesment: PropTypes.object.isRequired,
    sectionId: PropTypes.string.isRequired,
    learningPathId: PropTypes.string.isRequired
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.assesment, this.props.assesment)) {
      this.props.onClickAssesment();
      this.props.closeOnEscape();
    }
  }

  handleQuestionsSubmit = values => {
    const { sectionId, learningPathId } = this.props;
    values.learning_path_id = learningPathId;
    values.section_id = sectionId;
    this.props.createAssesment(values);
  }

  render() {
    const { handleSubmit, locale } = this.props;
    const { assessment: { createAssessment } } = locale;
    return (
      <div className="container">
        <div className="offset-lg-3 col-lg-6">
          <div className="title-header p-10">{createAssessment}</div>
          <form
            onSubmit={handleSubmit(this.handleQuestionsSubmit)}
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

Assessment.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  assesment: state.assesment.get('assesment')
});

const mapDispatchToProps = dispatch => ({
  createAssesment: assesment => dispatch(createAssesment(assesment))
});

const AssessmentComponent = connect(mapStateToProps, mapDispatchToProps)(Assessment);
export default translatable(locale => locale)(reduxForm({
  form: 'mcq',
  validate
})(AssessmentComponent));
