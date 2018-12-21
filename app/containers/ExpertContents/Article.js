import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import ContentIntroduction from './ContentIntroduction';
import RelatedContent from './RelatedContent';

import { constantValues } from '../../globals/AppConstant';
import '../../../assets/styles/components/LearningPath.scss';

class Article extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      showLoader: false,
      isModalOpen: false
    };
    this.redirectToPage = '';
    this.isContentEnrolled = true;
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
    const locale = this.props.locale.article;
    return (
      <div className="content-container p-4 p-t-10">
        <div className="content-header-section">
          {/* <SectionBreadCrumb
            learningPathName={learningpathName}
            content={{ title: contentDetails ? contentDetails.title : '', type: routeConstant.ARTICLE }}
          /> */}
          {
            contentDetails && contentDetails.id &&
            <ContentIntroduction
              contentTitle={contentDetails.title}
              handleEdit={handleEdit}
              contentDescription={contentDetails.description}
            />
          }
        </div>
        <div className="row">
          <div className="col-8">
            <div className="iframe-wrapper">
              <div className="iframe-layer">
                <iframe
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  id="iframe_blog"
                  width="100%"
                  name="iframe_blog"
                  title="article"
                  src={contentDetails && contentDetails.link}
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
        <Loader loading={this.state.showLoader} />
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.togglePopup}
          modalClassName="min-h-100 content-view-modal"
        >
          <ModalHeader toggle={this.togglePopup}>{contentDetails ? contentDetails.title : ''}</ModalHeader>
          <ModalBody>
            <div className="row h-100">
              <div className="col-10 offset-1">
                <iframe
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  id="iframe_blog"
                  width="100%"
                  name="iframe_blog"
                  title="article"
                  src={contentDetails && contentDetails.link}
                />
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

Article.propTypes = {
  contentDetails: PropTypes.object,
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  handleEdit: PropTypes.func.isRequired
};

Article.defaultProps = {
  contentDetails: {}
};

export default (translatable(locale => locale)(Article));
