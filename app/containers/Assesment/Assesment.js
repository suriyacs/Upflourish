import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import { createAssesment, updateAssesment } from '../../actions/assesment';
import { fetchContentDetails, clearContentDetails } from '../../actions/content';
import { routeConstant } from '../../globals/AppConstant';
import Content from '../Content/Content';
import Loader from '../../components/Loader/Loader';

class Assesment extends React.Component {
  constructor() {
    super();
    this.isCreate = false;
    this.state = {
      formData: ''
    };
  }

  componentDidMount() {
    const { assesmentId } = this.props;
    if (assesmentId) {
      this.props.fetchContentDetails(routeConstant.ASSESSMENT, assesmentId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.isCreate && !_.isEqual(prevProps.assesment, this.props.assesment)) {
      this.isCreate = false;
      this.props.onClickAssesment();
      this.props.closeOnEscape();
    } else if (!_.isEqual(prevProps.assesment, this.props.assesment)) {
      this.props.onClickAssesment();
      this.props.closeOnEscape();
    }
  }

  onCloseContent = () => {
    this.props.onClickAssesment();
  }

  getFormData = file => {
    this.setState({ formData: file });
  }

  getData = assesment => {
    const { formData } = this.state;
    const { learningPathId, sectionId, assesmentId } = this.props;
    this.props.closeOnEscape();
    if (assesmentId) {
      assesment.file = formData;
      assesment.learningPathId = learningPathId;
      assesment.sectionId = sectionId;
      assesment.assesmentId = assesmentId;
      this.props.updateAssesment(assesment);
    } else {
      assesment.file = formData;
      assesment.learningPathId = learningPathId;
      assesment.sectionId = sectionId;
      this.isCreate = true;
      this.props.createAssesment(assesment);
    }
  }

  render() {
    const {
      loading,
      assesmentId,
      assesmentDetails,
      reduxState,
      contentDetailsLoaded
    } = this.props;
    return (
      <Fragment>
        <Loader loading={loading} />
        <Content
          labelName="assesment"
          getFormData={this.getFormData}
          contentDetails={assesmentId ? assesmentDetails : {}}
          contentDetailsLoaded={contentDetailsLoaded}
          clearContentDetails={this.props.clearContentDetails}
          onCloseContent={this.onCloseContent}
          getData={this.getData}
          contentId={assesmentId}
          reduxState={reduxState}
          itemType="Assessments"
        />
      </Fragment>
    );
  }
}

Assesment.propTypes = {
  loading: PropTypes.bool.isRequired,
  learningPathId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  assesmentId: PropTypes.string.isRequired,
  createAssesment: PropTypes.func.isRequired,
  clearContentDetails: PropTypes.func.isRequired,
  updateAssesment: PropTypes.func.isRequired,
  fetchContentDetails: PropTypes.func.isRequired,
  onClickAssesment: PropTypes.func.isRequired,
  assesmentDetails: PropTypes.object,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  assesment: PropTypes.object.isRequired,
  closeOnEscape: PropTypes.func.isRequired,
  contentDetailsLoaded: PropTypes.bool.isRequired
};

Assesment.defaultProps = {
  assesmentDetails: {}
};

const mapStateToProps = state => ({
  loading: state.assesment.get('loading'),
  assesmentDetails: state.content.get('contentDetails'),
  reduxState: state,
  assesment: state.assesment.get('assesment'),
  contentDetailsLoaded: state.content.get('contentDetailsLoaded')
});

const mapDispatchToProps = dispatch => ({
  createAssesment: assesment => dispatch(createAssesment(assesment)),
  updateAssesment: assesment => dispatch(updateAssesment(assesment)),
  clearContentDetails: () => dispatch(clearContentDetails()),
  fetchContentDetails: (contentType, contentId) =>
    dispatch(fetchContentDetails(contentType, contentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Assesment);
