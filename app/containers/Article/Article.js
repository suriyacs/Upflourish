import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createArticle, updateArticle } from '../../actions/article';
import {
  fetchContentDetails,
  clearContentDetails,
  createContent,
  updateContent,
  createRelatedContent
} from '../../actions/content';
import Content from '../Content/Content';
import Loader from '../../components/Loader/Loader';
import { routeConstant } from '../../globals/AppConstant';

class Article extends Component {
  constructor() {
    super();
    this.isCreate = false;
    this.state = {
      formData: ''
    };
  }

  componentDidMount() {
    const { articleId } = this.props;
    if (articleId) {
      this.props.fetchContentDetails(routeConstant.ARTICLE, articleId);
    }
  }

  onCloseContent = () => {
    this.props.onClickArticle();
  }

  getFormData = file => {
    this.setState({ formData: file });
  }

  getData = article => {
    const { formData } = this.state;
    const {
      sectionId,
      contentDetails,
      isRelatedContent,
      contentId
    } = this.props;
    this.props.closeBothModal();
    article.content_type = 'Article';
    if (isRelatedContent) {
      this.props.createRelatedContent(article, contentId, formData);
      return;
    }
    if (contentDetails && contentDetails.id) {
      article.id = contentDetails.id;
      fetch(article.link).then(() => {
        article.isIframeEnabled = true;
        this.props.updateContent(article, sectionId, formData);
      }).catch(() => {
        article.isIframeEnabled = false;
        this.props.updateContent(article, sectionId, formData);
      });
    } else {
      this.isCreate = true;
      fetch(article.link).then(() => {
        article.isIframeEnabled = true;
        this.props.createContent(article, sectionId, formData);
      }).catch(() => {
        article.isIframeEnabled = false;
        this.props.createContent(article, sectionId, formData);
      });
    }
  }

  render() {
    const {
      loading,
      articleId,
      reduxState,
      contentDetailsLoaded,
      contentDetails,
      category
    } = this.props;
    return (
      <div>
        <Loader loading={loading} />
        <Content
          labelName="blog/article"
          getFormData={this.getFormData}
          contentDetails={contentDetails}
          clearContentDetails={this.props.clearContentDetails}
          contentDetailsLoaded={contentDetailsLoaded}
          onCloseContent={this.onCloseContent}
          getData={this.getData}
          contentId={articleId}
          reduxState={reduxState}
          itemType="Articles"
          category={category}
        />
      </div>
    );
  }
}

Article.propTypes = {
  loading: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
  onClickArticle: PropTypes.func.isRequired,
  clearContentDetails: PropTypes.func.isRequired,
  fetchContentDetails: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  reduxState: PropTypes.objectOf(PropTypes.any).isRequired,
  closeBothModal: PropTypes.func.isRequired,
  contentDetailsLoaded: PropTypes.bool.isRequired,
  createContent: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  contentDetails: PropTypes.object,
  createRelatedContent: PropTypes.func.isRequired,
  isRelatedContent: PropTypes.bool.isRequired,
  contentId: PropTypes.string,
  category: PropTypes.string.isRequired
};

Article.defaultProps = {
  contentDetails: {},
  contentId: ''
};

const mapStateToProps = state => ({
  loading: state.article.get('loading'),
  articleDetails: state.content.get('contentDetails'),
  reduxState: state,
  article: state.article.get('article'),
  contentDetailsLoaded: state.content.get('contentDetailsLoaded')
});

const mapDispatchToProps = dispatch => ({
  createArticle: article => dispatch(createArticle(article)),
  updateArticle: article => dispatch(updateArticle(article)),
  clearContentDetails: () => dispatch(clearContentDetails()),
  fetchContentDetails: (contentType, contentId) =>
    dispatch(fetchContentDetails(contentType, contentId)),
  createContent: (content, sectionId, file) => dispatch(createContent(content, sectionId, file)),
  updateContent: (content, sectionId, file) => dispatch(updateContent(content, sectionId, file)),
  createRelatedContent: (content, contentId, file) => dispatch(createRelatedContent(content, contentId, file))
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
