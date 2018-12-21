import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, isDirty } from 'redux-form';
import { translatable } from 'react-multilingual';

import { required } from '../../utils/Validations';
import TextField from '../../components/FormComponents/TextField';
import Button from '../../components/Button/Button';
import { createSection, fetchSectionDetails, updateSection, clearSectionDetails } from '../../actions/section';

import '../../../assets/styles/components/Section.scss';

class SectionForm extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let flag = false;
    if (nextProps.sectionId && !prevState.flag &&
        nextProps.sectionDetails && nextProps.sectionDetails.size !== 0 &&
        nextProps.sectionDetails.id === nextProps.sectionId
    ) {
      nextProps.initialize({
        name: nextProps.sectionDetails.new_name,
        description: nextProps.sectionDetails.new_description
      });
      flag = true;
      return { flag };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      sectionId: props.sectionId
    };
  }

  componentDidMount() {
    const { sectionId, learningPathId } = this.props;
    if (sectionId) {
      this.props.fetchSectionDetails({ sectionId, pathId: learningPathId });
    }
  }

  componentWillUnmount() {
    this.props.clearSectionDetails();
  }

  getSectionDetails = () => {
    const { sectionId, learningPathId } = this.state;
    if (sectionId) {
      this.props.fetchSectionDetails({ sectionId, pathId: learningPathId });
    }
  }

  handleCloseSection = () => {
    this.props.onClose();
  }

  handleFormSubmit = section => {
    const { sectionId, learningPathId } = this.props;
    if (section.name !== '' && section.description !== '' && sectionId === '') {
      section.learningPathId = learningPathId;
      this.props.createSection(section);
      this.handleCloseSection();
    } else if (section.name !== '' && section.description !== '' && sectionId !== '') {
      section.learningPathId = learningPathId;
      section.sectionId = sectionId;
      this.props.updateSection(section);
      this.handleCloseSection();
    }
  }

  render() {
    const { sectionId, handleSubmit, reduxState } = this.props;
    const locale = this.props.locale.sectionForm;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <form className="form-section" onSubmit={handleSubmit(this.handleFormSubmit)}>
              {!sectionId && <div className="title-header">{locale.createTitle}</div>}
              {sectionId && <div className="title-header">{locale.editTitle}</div>}
              <TextField
                name="name"
                isLableRequired
                htmlFor="Section name"
                labelName={locale.nameLabel}
                type="text"
                className="form-control"
                validate={[required]}
              />
              <TextField
                name="description"
                isLableRequired
                htmlFor="Section description"
                labelName={locale.descriptionLabel}
                type="textArea"
                className="form-control input-textArea"
                validate={[required]}
              />
              {!sectionId && <Button type="submit" value={locale.createButton} className="" />}
              {sectionId &&
                <div className="row" style={{ margin: '0px' }}>
                  <button
                    className="col-4 btn btn-success btn-edit"
                    type="submit"
                    disabled={!isDirty('SectionComponent')(reduxState)}
                  >{locale.saveButton}
                  </button>
                  <button
                    className="col-4 btn btn-danger btn-edit"
                    onClick={this.handleCloseSection}
                    type="button"
                  >{locale.closeButton}
                  </button>
                </div>
              }
            </form>
            {/* <button type="button" className="close" aria-label="Close" onClick={this.handleCloseSection}>
              <span aria-hidden="true">&times;</span>
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

SectionForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  createSection: PropTypes.func.isRequired,
  learningPathId: PropTypes.string.isRequired,
  fetchSectionDetails: PropTypes.func.isRequired,
  clearSectionDetails: PropTypes.func.isRequired,
  sectionId: PropTypes.string.isRequired,
  updateSection: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  loading: state.section.get('loading'),
  sectionDetails: state.section.get('section'),
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  createSection: section => dispatch(createSection(section)),
  fetchSectionDetails: data => dispatch(fetchSectionDetails(data)),
  clearSectionDetails: () => dispatch(clearSectionDetails()),
  updateSection: section => dispatch(updateSection(section))
});

export default translatable(locale => locale)(reduxForm({
  form: 'SectionComponent'
})(connect(mapStateToProps, mapDispatchToProps)(SectionForm)));
