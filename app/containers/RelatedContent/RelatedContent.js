import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';

import { getRelatedContentReady } from '../../actions/content';

import '../../../assets/styles/components/RelatedContent.scss';
import NoImage from '../../../assets/images/no-image.svg';

class ReleatedContent extends Component {
  constructor() {
    super();
    this.state = {
      showMore: false
    };
  }

  componentDidMount() {
    this.props.getRelatedContentReady(this.props.contentId);
  }

  onClickMoreContent = showMore => {
    this.setState({
      showMore
    });
  }

  render() {
    const { contentList, locale } = this.props;
    const { showMore } = this.state;
    const { relatedContent } = locale;
    return (
      <div>
        {contentList.length ?
          <div className={`related-content mt-3 mb-4 ${showMore ? 'showMore' : ''}`}>
            <div>
              {relatedContent.title}
            </div>
            {
              contentList.map(content => (
                <div className="container-fluid content-list">
                  <div
                    className="content row"
                    key={content.id}
                    role="presentation"
                    onClick={() => window.open(content.link)}
                  >
                    <div className="col-4 col-md-12 col-lg-4 image-section p-0">
                      <img
                        className="w-100 h-100"
                        src={content.thumbnail}
                        alt="content-img"
                        onError={event => { event.target.src = NoImage; }}
                      />
                    </div>
                    <div className="col-8 col-md-12 col-lg-8 mb-2">
                      <div className="col-12 heading inline p-0 d-flex mt-2">
                        {content.title}
                      </div>
                      <div className="col-12 p-0">
                        <div className="d-flex flex-row align-items-center">
                          <div className="col-6 pl-0 content-type">
                            {content.content_type}
                          </div>
                          <div className="col-6 pr-0 content-type text-right">
                            ~{content.minutes} mins
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
            {
              !showMore && contentList.length >= 3 &&
              <div className="more d-flex align-items-end justify-content-center">
                <span
                  className="more-text"
                  onClick={() => this.onClickMoreContent(true)}
                  role="presentation"
                >
                  {relatedContent.moreArticle}
                </span>
              </div>
            }
          </div>
          :
          <div />
        }
      </div>
    );
  }
}

ReleatedContent.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  contentList: PropTypes.array,
  getRelatedContentReady: PropTypes.func.isRequired,
  contentId: PropTypes.string.isRequired
};

ReleatedContent.defaultProps = {
  contentList: []
};

const mapStateToProps = state => ({
  contentList: Array.from(state.content.get('relatedContent'))
});

const mapDispatchToProps = dispatch => ({
  getRelatedContentReady: contentId => dispatch(getRelatedContentReady(contentId))
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(ReleatedContent));
