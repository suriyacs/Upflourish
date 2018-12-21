import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createDocument, updateDocument } from '../../actions/document';
import {
  fetchContentDetails,
  clearContentDetails,
  createContent,
  updateContent,
  createRelatedContent
} from '../../actions/content';
import Content from '../Content/Content';
import Loader from '../../components/Loader/Loader';

class Document extends Component {
  constructor() {
    super();
    this.state = {
      formData: '',
      image: ''
    };
    this.isCreate = false;
  }

  onCloseContent = () => {
    this.props.onClickDocument();
  }

  getFormData = file => {
    this.setState({ formData: file });
  }

  getData = document => {
    /* eslint-disable no-unused-vars */
    const { formData, image } = this.state;
    const {
      sectionId,
      contentDetails,
      isRelatedContent,
      contentId
    } = this.props;
    this.props.closeBothModal();
    document.content_type = 'Document';
    if (isRelatedContent) {
      this.props.createRelatedContent(document, contentId, formData);
      return;
    }
    if (contentDetails && contentDetails.id) {
      document.id = contentDetails.id;
      this.props.updateContent(document, sectionId, formData);
    } else {
      this.props.createContent(document, sectionId, formData);
      this.isCreate = false;
    }
  }

  handleImage = image => {
    this.setState({ image });
  }

  render() {
    const {
      loading,
      documentId,
      reduxState,
      contentDetailsLoaded,
      contentDetails,
      category
    } = this.props;
    return (
      <Fragment>
        <Loader loading={loading} />
        <Content
          labelName="document"
          getFormData={this.getFormData}
          contentDetails={contentDetails}
          contentDetailsLoaded={contentDetailsLoaded}
          clearContentDetails={this.props.clearContentDetails}
          onCloseContent={this.onCloseContent}
          getData={this.getData}
          contentId={documentId}
          reduxState={reduxState}
          itemType="Documents"
          getImage={this.handleImage}
          category={category}
        />
      </Fragment>
    );
  }
}

Document.propTypes = {
  loading: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
  documentId: PropTypes.string.isRequired,
  clearContentDetails: PropTypes.func.isRequired,
  onClickDocument: PropTypes.func.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  contentDetailsLoaded: PropTypes.bool.isRequired,
  createContent: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  closeBothModal: PropTypes.func.isRequired,
  createRelatedContent: PropTypes.func.isRequired,
  isRelatedContent: PropTypes.bool.isRequired,
  contentId: PropTypes.string,
  category: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  loading: state.document.get('loading'),
  reduxState: state,
  document: state.document.get('document'),
  contentDetailsLoaded: state.content.get('contentDetailsLoaded')
});

Document.defaultProps = {
  contentDetails: {},
  contentId: ''
};

const mapDispatchToProps = dispatch => ({
  createDocument: document => dispatch(createDocument(document)),
  updateDocument: document => dispatch(updateDocument(document)),
  clearContentDetails: () => dispatch(clearContentDetails()),
  fetchContentDetails: (contentType, contentId) =>
    dispatch(fetchContentDetails(contentType, contentId)),
  createContent: (content, sectionId, file) => dispatch(createContent(content, sectionId, file)),
  updateContent: (content, sectionId, file) => dispatch(updateContent(content, sectionId, file)),
  createRelatedContent: (content, contentId, file) => dispatch(createRelatedContent(content, contentId, file))
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
