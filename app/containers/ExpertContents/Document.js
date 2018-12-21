import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import Button from '../../components/Button/Button';
import ContentIntroduction from './ContentIntroduction';
import RelatedContent from './RelatedContent';

import { constantValues } from '../../globals/AppConstant';
import '../../../assets/styles/components/Video.scss';
import '../../../assets/styles/components/LearningPath.scss';

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.redirectToPage = '';
    this.secondsViewed = 0;
    this.isContentEnrolled = true;
  }

  generateIframeUrl = link => {
    if (link) {
      return `https://docs.google.com/viewer?embedded=true&url=${encodeURI(link)}`;
    }
  }

  togglePopup = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    const {
      contentDetails,
      handleEdit
    } = this.props;
    const locale = this.props.locale.document;
    return (
      <div className="content-container p-4 p-t-10">
        <div className="content-header-section">
          {
            contentDetails && contentDetails.id &&
            <ContentIntroduction
              contentTitle={contentDetails.title}
              contentDescription={contentDetails.description}
              contentDetails={contentDetails}
              handleEdit={handleEdit}
            />
          }
        </div>
        <div className="row">
          <div className="col-8">
            <div className="iframe-wrapper">
              <div className="iframe-layer text-center">
                <iframe
                  title="viewer"
                  width="640"
                  height="900"
                  src={this.generateIframeUrl(contentDetails && contentDetails.link)}
                  frameBorder="0"
                  allowFullScreen
                  onLoad={this.startTimer}
                />
                <div id="expandableContent" className="content-description-expandable content-title mt-3">
                  <p id="detail" className="collapse col-lg-12 padding-0 path-detail" aria-expanded="false">
                    {contentDetails.description}
                  </p>
                  {contentDetails.description && contentDetails.description.length > constantValues.expandableLimit &&
                    <span
                      className="expand content-expand collapsed"
                      data-toggle="collapse"
                      href="#detail"
                      aria-expanded="false"
                    />
                  }
                </div>
              </div>
              <div className="block-preview d-flex justify-content-center align-items-center">
                <Button
                  value={locale.readTheArticle}
                  className="m-0 read-btn"
                  type="button"
                  onClick={this.togglePopup}
                />
              </div>
            </div>
          </div>
          <div className="col-4">
            {
              contentDetails && contentDetails.id &&
              <RelatedContent
                selectedContent={contentDetails}
              />
            }
          </div>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.togglePopup}
          modalClassName="min-h-100 content-view-modal"
        >
          <ModalHeader toggle={this.togglePopup}>
            { contentDetails ? contentDetails.title : locale.testArticle }
          </ModalHeader>
          <ModalBody>
            <iframe
              title="viewer"
              width="100%"
              src={this.generateIframeUrl(contentDetails && contentDetails.link)}
              frameBorder="0"
              allowFullScreen
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

Document.propTypes = {
  contentDetails: PropTypes.object,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleEdit: PropTypes.func.isRequired
};

Document.defaultProps = {
  contentDetails: {}
};

export default (translatable(locale => locale)(Document));
