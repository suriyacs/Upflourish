import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

import ContentIntroduction from './ContentIntroduction';
import RelatedContent from './RelatedContent';

import { constantValues } from '../../globals/AppConstant';
import '../../../assets/styles/components/Video.scss';
import '../../../assets/styles/components/LearningPath.scss';

class Book extends Component {
  generateIframeUrl = link => {
    if (link) {
      return `https://docs.google.com/viewer?embedded=true&url=${encodeURI(link)}`;
    }
  }

  render() {
    const {
      contentDetails,
      handleEdit
    } = this.props;
    return (
      <div className="p-4 p-t-10">
        <div className="content-header-section">
          <div>
            {/* <SectionBreadCrumb
              learningPathName={learningpathName}
              content={{ title: contentDetails ? contentDetails.title : '', type: routeConstant.BOOK }}
            /> */}
            {
              contentDetails && contentDetails.id &&
              <ContentIntroduction
                contentTitle={contentDetails.title}
                contentDescription={contentDetails.description}
                handleEdit={handleEdit}
              />
            }
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="main-div">
              <div className="video-player">
                <iframe
                  title="viewer"
                  src={this.generateIframeUrl(contentDetails && contentDetails.link)}
                  frameBorder="0"
                  allowFullScreen
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
      </div>
    );
  }
}

Book.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  contentDetails: PropTypes.object.isRequired
};

export default (translatable(locale => locale)(Book));
