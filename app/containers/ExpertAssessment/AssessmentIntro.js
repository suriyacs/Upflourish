import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { reduxForm } from 'redux-form';

import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import { required, greaterThanZero } from '../../utils/Validations';

class AssessmentIntro extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if ((!prevState) || (nextProps.contentDetails && prevState && !prevState.flag)) {
      nextProps.initialize({
        title: nextProps.contentDetails.title,
        description: nextProps.contentDetails.description,
        minutes: nextProps.contentDetails.minutes
      });
      return {
        flag: true
      };
    }
    return null;
  }

  handleFormSubmit = content => {
    this.props.saveAssessment(content, this.props.contentDetails);
  }

  render() {
    const locale = this.props.locale.contentForm;
    const { contentDetails, handleSubmit } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="content-header title-header">{locale.title} Assessment</div>
            <div className="form-content">
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <TextField
                  name="title"
                  isLableRequired
                  htmlFor="Title"
                  labelName={locale.title_text}
                  type="text"
                  className="form-control"
                  validate={[required]}
                />
                <TextField
                  name="description"
                  isLableRequired
                  htmlFor="Description"
                  labelName={locale.description_text}
                  type="textArea"
                  className="form-control input-textArea"
                  validate={[required]}
                />
                <TextField
                  name="minutes"
                  isLableRequired
                  htmlFor={locale.time_text}
                  labelName={locale.time_text}
                  type="number"
                  className="form-control"
                  validate={[required, greaterThanZero]}
                />
                <Button
                  type="submit"
                  value={
                    (contentDetails && contentDetails.id) ?
                      locale.createButton.replace('{labelName}', 'Assessment') :
                      locale.createButton.replace('{labelName}', 'Assessment')}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AssessmentIntro.propTypes = {
  contentDetails: PropTypes.object,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  saveAssessment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

AssessmentIntro.defaultProps = {
  contentDetails: {}
};

export default translatable(locale => locale)(reduxForm({
  form: 'AssessmentIntroForm'
})(AssessmentIntro));
