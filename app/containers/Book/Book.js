import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createBook, updateBook } from '../../actions/book';
import {
  fetchContentDetails,
  clearContentDetails,
  createContent,
  updateContent,
  createRelatedContent
} from '../../actions/content';
import Content from '../Content/Content';
import Loader from '../../components/Loader/Loader';

class Book extends Component {
  constructor() {
    super();
    this.isCreate = false;
    this.state = {
      formData: ''
    };
  }

  onCloseContent = () => {
    this.props.onClickBook();
  }

  getFormData = file => {
    this.setState({ formData: file });
  }

  getData = book => {
    const { formData } = this.state;
    const {
      sectionId,
      contentDetails,
      isRelatedContent,
      contentId
    } = this.props;
    book.content_type = 'Book';
    this.props.closeBothModal();
    if (isRelatedContent) {
      this.props.createRelatedContent(book, contentId, formData);
      return;
    }
    if (contentDetails && contentDetails.id) {
      book.id = contentDetails.id;
      this.props.updateContent(book, sectionId, formData);
    } else {
      this.isCreate = true;
      this.props.createContent(book, sectionId, formData);
    }
  }

  render() {
    const {
      loading,
      bookId,
      reduxState,
      contentDetailsLoaded,
      contentDetails,
      category
    } = this.props;
    return (
      <Fragment>
        <Loader loading={loading} />
        <Content
          labelName="book"
          getFormData={this.getFormData}
          clearContentDetails={this.props.clearContentDetails}
          contentDetailsLoaded={contentDetailsLoaded}
          contentDetails={contentDetails}
          onCloseContent={this.onCloseContent}
          getData={this.getData}
          contentId={bookId}
          reduxState={reduxState}
          itemType="Books"
          category={category}
        />
      </Fragment>
    );
  }
}

Book.propTypes = {
  loading: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
  clearContentDetails: PropTypes.func.isRequired,
  onClickBook: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  contentDetailsLoaded: PropTypes.bool.isRequired,
  createContent: PropTypes.func.isRequired,
  closeBothModal: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  updateContent: PropTypes.func.isRequired,
  createRelatedContent: PropTypes.func.isRequired,
  isRelatedContent: PropTypes.bool.isRequired,
  contentId: PropTypes.string,
  category: PropTypes.string.isRequired
};

Book.defaultProps = {
  contentDetails: {},
  contentId: ''
};

const mapStateToProps = state => ({
  loading: state.book.get('loading'),
  bookDetails: state.content.get('contentDetails'),
  reduxState: state,
  createdBook: state.book.get('book'),
  contentDetailsLoaded: state.content.get('contentDetailsLoaded')
});

const mapDispatchToProps = dispatch => ({
  createBook: book => dispatch(createBook(book)),
  clearContentDetails: () => dispatch(clearContentDetails()),
  fetchContentDetails: (contentType, contentId) =>
    dispatch(fetchContentDetails(contentType, contentId)),
  updateBook: book => dispatch(updateBook(book)),
  createContent: (content, sectionId, file) => dispatch(createContent(content, sectionId, file)),
  updateContent: (content, sectionId, file) => dispatch(updateContent(content, sectionId, file)),
  createRelatedContent: (content, contentId, file) => dispatch(createRelatedContent(content, contentId, file))
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
