import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { translatable } from 'react-multilingual';

import OnlineCourse from '../OnlineCourse/OnlineCourse';
import Article from '../Article/Article';
import Book from '../Book/Book';
import Document from '../Document/Document';
import Video from '../Video/Video';
import YouTube from '../YouTube/YouTube';
import AssesmentIntro from '../ExpertAssessment/AssessmentIntro';

import '../../../assets/styles/components/HomePage.scss';

import ArticleIcon from '../../../assets/images/article.svg';
import BookIcon from '../../../assets/images/book.svg';
import AssesmentIcon from '../../../assets/images/assesment.svg';
import DocumentIcon from '../../../assets/images/document.svg';
import YoutubeIcon from '../../../assets/images/youtube.svg';
import VideoIcon from '../../../assets/images/play-button.svg';
import CloseIcon from '../../../assets/images/close.svg';

class NewContent extends Component {
  constructor() {
    super();
    this.state = {
      isOnlineCourseOpen: false,
      isArticleContentOpen: false,
      isBookContentOpen: false,
      isAssesmentContentOpen: false,
      isDocumentContentOpen: false,
      isVideoContentOpen: false,
      isYouTubeContentOpen: false
    };
    this.closeOnEsc = true;
  }

  onOpenContentPopup = popupFlag => {
    this.setState({ [popupFlag]: true });
  }

  onCloseContentPopup = popupFlag => {
    const { isEdit, closeContentModal } = this.props;
    if (isEdit) {
      closeContentModal();
    }
    this.setState({ [popupFlag]: false });
  }

  closeOnEscape = () => {
    this.closeOnEsc = !this.closeOnEsc;
  }

  closeBothModal = () => {
    this.props.closeContentModal();
  }

  externalCloseButton = modalName => (
    <div className="common-close-icon">
      <img
        role="presentation"
        src={CloseIcon}
        alt="close"
        className="icon close-icon c-pointer"
        onClick={() => { this.onCloseContentPopup(`${modalName}`); }}
      />
    </div>
  );

  render() {
    const {
      isOnlineCourseOpen,
      isArticleContentOpen,
      isBookContentOpen,
      isAssesmentContentOpen,
      isDocumentContentOpen,
      isVideoContentOpen,
      isYouTubeContentOpen
    } = this.state;
    const {
      isEdit,
      contentType,
      isRelatedContent,
      category
    } = this.props;
    const locale = this.props.locale.newContent;
    return (
      <Fragment>
        <div className="container-fluid">
          {
            !isEdit &&
            <div className="row">
              <div className="col-8 col-sm-10 col-md-10 col-lg-10 home">
                <div className="home-title">
                  {locale.title}
                </div>
                <div className="col-12">
                  {/* <div
                    role="presentation"
                    onClick={() => { this.onOpenContentPopup('isOnlineCourseOpen'); }}
                    className="col-3 home-container"
                  >
                    <div className="content-border">
                      <img src={OnlineCourseIcon} alt="OnlineCourseIcon" />
                    </div>
                    <span>{locale.courseTitle}</span>
                    <div className="content-desc">
                      {locale.courseDescription}
                    </div>
                  </div> */}
                  <div
                    role="presentation"
                    onClick={() => { this.onOpenContentPopup('isArticleContentOpen'); }}
                    className="col-3 home-container"
                  >
                    <div className="content-border">
                      <img src={ArticleIcon} alt="Article" />
                    </div>
                    <span>{locale.articleTitle}</span>
                    <div className="content-desc">
                      {locale.articleDescription}
                    </div>
                  </div>
                  <div
                    role="presentation"
                    onClick={() => { this.onOpenContentPopup('isBookContentOpen'); }}
                    className="col-3 home-container"
                  >
                    <div className="content-border">
                      <img src={BookIcon} alt="Book" />
                    </div>
                    <span>{locale.bookTitle}</span>
                    <div className="content-desc">
                      {locale.bookDescription}
                    </div>
                  </div>
                  {
                    !isRelatedContent &&
                    <div
                      role="presentation"
                      onClick={() => { this.onOpenContentPopup('isAssesmentContentOpen'); }}
                      className="col-3 home-container"
                    >
                      <div className="content-border">
                        <img src={AssesmentIcon} alt="Assesment" />
                      </div>
                      <span>{locale.assesmentTitle}</span>
                      <div className="content-desc">
                        {locale.assesmentDescription}
                      </div>
                    </div>
                  }
                  <div
                    role="presentation"
                    onClick={() => { this.onOpenContentPopup('isDocumentContentOpen'); }}
                    className="col-3 home-container"
                  >
                    <div className="content-border">
                      <img src={DocumentIcon} alt="Document" />
                    </div>
                    <span>{locale.documentTitle}</span>
                    <div className="content-desc">
                      {locale.documentDescription}
                    </div>
                  </div>
                  <div
                    role="presentation"
                    onClick={() => { this.onOpenContentPopup('isVideoContentOpen'); }}
                    className="col-3 home-container"
                  >
                    <div className="content-border">
                      <img src={VideoIcon} alt="Document" />
                    </div>
                    <span>{locale.videoTitle}</span>
                    <div className="content-desc">
                      {locale.videoDescription}
                    </div>
                  </div>
                  <div
                    role="presentation"
                    onClick={() => { this.onOpenContentPopup('isYouTubeContentOpen'); }}
                    className="col-3 home-container"
                  >
                    <div className="content-border">
                      <img src={YoutubeIcon} alt="Video" />
                    </div>
                    <span>{locale.youtubeTitle}</span>
                    <div className="content-desc">
                      {locale.youtubeDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <Modal
          modalClassName="min-h-100 reactstrab-modal content-add-popup"
          backdropClassName="modal-bg opacity-1"
          isOpen={isOnlineCourseOpen}
          onClose={() => { this.onCloseContentPopup('isOnlineCourseOpen'); }}
          centered={isOnlineCourseOpen}
          external={this.externalCloseButton('isOnlineCourseOpen')}
        >
          <OnlineCourse
            {...this.props}
            onClickOnlineCourse={() => { this.onCloseContentPopup('isOnlineCourseOpen'); }}
            courseId=""
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal content-add-popup full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={(isEdit && contentType === 'Article') || isArticleContentOpen}
          onClose={(isEdit && contentType === 'Article') ?
            () => this.props.closeContentModal() :
            () => { this.onCloseContentPopup('isArticleContentOpen'); }}
          centered={(isEdit && contentType === 'Article') || isArticleContentOpen}
          external={this.externalCloseButton('isArticleContentOpen')}
        >
          <Article
            {...this.props}
            onClickArticle={() => { this.onCloseContentPopup('isArticleContentOpen'); }}
            articleId=""
            closeOnEscape={this.closeOnEscape}
            closeBothModal={this.closeBothModal}
            category={category}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal content-add-popup full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={(isEdit && contentType === 'Book') || isBookContentOpen}
          onClose={(isEdit && contentType === 'Book') ?
            () => this.props.closeContentModal() :
            () => { this.onCloseContentPopup('isBookContentOpen'); }}
          centered={(isEdit && contentType === 'Book') || isBookContentOpen}
          external={this.externalCloseButton('isBookContentOpen')}
        >
          <Book
            {...this.props}
            onClickBook={() => { this.onCloseContentPopup('isBookContentOpen'); }}
            closeOnEscape={this.closeOnEscape}
            closeBothModal={this.closeBothModal}
            category={category}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal"
          backdropClassName="modal-bg opacity-1"
          isOpen={(isEdit && contentType === 'Assessment') || isAssesmentContentOpen}
          onClose={(isEdit && contentType === 'Assessment') ?
            () => this.props.closeContentModal() :
            () => { this.onCloseContentPopup('isAssesmentContentOpen'); }}
          centered={(isEdit && contentType === 'Assessment') || isAssesmentContentOpen}
          external={this.externalCloseButton('isAssesmentContentOpen')}
        >
          <AssesmentIntro
            {...this.props}
            onClickAssesment={() => { this.onCloseContentPopup('isAssesmentContentOpen'); }}
            assesmentId=""
            closeOnEscape={this.closeOnEscape}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal content-add-popup full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={(isEdit && contentType === 'Document') || isDocumentContentOpen}
          onClose={(isEdit && contentType === 'Document') ?
            () => this.props.closeContentModal() :
            () => { this.onCloseContentPopup('isDocumentContentOpen'); }}
          centered={(isEdit && contentType === 'Document') || isDocumentContentOpen}
          external={this.externalCloseButton('isDocumentContentOpen')}
        >
          <Document
            {...this.props}
            onClickDocument={() => { this.onCloseContentPopup('isDocumentContentOpen'); }}
            documentId=""
            closeOnEscape={this.closeOnEscape}
            closeBothModal={this.closeBothModal}
            category={category}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal content-add-popup full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={(isEdit && contentType === 'Video') || isVideoContentOpen}
          onClose={(isEdit && contentType === 'Video') ?
            () => this.props.closeContentModal() :
            () => { this.onCloseContentPopup('isVideoContentOpen'); }}
          centered={(isEdit && contentType === 'Video') || isVideoContentOpen}
          external={this.externalCloseButton('isVideoContentOpen')}
        >
          <Video
            {...this.props}
            onClickVideo={() => { this.onCloseContentPopup('isVideoContentOpen'); }}
            videoId=""
            closeOnEscape={this.closeOnEscape}
            closeBothModal={this.closeBothModal}
            category={category}
          />
        </Modal>
        <Modal
          modalClassName="min-h-100 reactstrab-modal content-add-popup full-width"
          backdropClassName="modal-bg opacity-1"
          isOpen={(isEdit && contentType === 'YTVideo') || isYouTubeContentOpen}
          onClose={(isEdit && contentType === 'YTVideo') ?
            () => this.props.closeContentModal() :
            () => { this.onCloseContentPopup('isYouTubeContentOpen'); }}
          centered={(isEdit && contentType === 'YTVideo') || isYouTubeContentOpen}
          external={this.externalCloseButton('isYouTubeContentOpen')}
        >
          <YouTube
            {...this.props}
            onClickYouTube={() => { this.onCloseContentPopup('isYouTubeContentOpen'); }}
            videoId=""
            closeOnEscape={this.closeOnEscape}
            closeBothModal={this.closeBothModal}
            category={category}
          />
        </Modal>
      </Fragment>
    );
  }
}

NewContent.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  closeContentModal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  contentType: PropTypes.string,
  isRelatedContent: PropTypes.bool,
  category: PropTypes.string.isRequired
};

NewContent.defaultProps = {
  isEdit: false,
  contentType: '',
  isRelatedContent: false
};

export default translatable(locale => locale)(NewContent);
