import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translatable } from 'react-multilingual';
import { fetchRecentHappenings } from '../../actions/recentHappenings';

import '../../../assets/styles/components/RelatedContent.scss';
import NoImage from '../../../assets/images/no-image.svg';

class RecentHappenings extends Component {
  constructor() {
    super();
    this.state = {
      showMore: false
    };
  }

  componentDidMount() {
    this.props.fetchRecentHappenings();
  }

  onClickMoreContent = showMore => {
    this.setState({
      showMore
    });
  }

  render() {
    const { recentHappeningsList, locale } = this.props;
    const { showMore } = this.state;
    const { recentHappenings } = locale;
    return (
      <div className="pt-3 show-border">
        {recentHappeningsList.length ?
          <div className={`related-content ${showMore ? 'showMore' : ''}`}>
            <div className="mb-2">
              {recentHappenings.title}
            </div>
            <div className="sub-content-desc mb-4">
              {recentHappenings.subContent}
            </div>
            {
              recentHappeningsList.map(content => (
                <div className="container-fluid content-list c-pointer">
                  <div
                    className="content row"
                    key={`${content.id}-${content.title}`}
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
                            {content.type}
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
              !showMore && recentHappeningsList.length >= 3 &&
              <div className="more d-flex align-items-end justify-content-center">
                <span
                  className="more-text"
                  onClick={() => this.onClickMoreContent(true)}
                  role="presentation"
                >
                  {recentHappenings.moreArticle}
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

RecentHappenings.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired,
  recentHappeningsList: PropTypes.array,
  fetchRecentHappenings: PropTypes.func.isRequired
};

RecentHappenings.defaultProps = {
  recentHappeningsList: []
};

const mapStateToProps = state => ({
  recentHappeningsList: Array.from(state.recentHappenings.get('recentHappeningsList'))
});

const mapDispatchToProps = dispatch => ({
  fetchRecentHappenings: () => dispatch(fetchRecentHappenings())
});

export default connect(mapStateToProps, mapDispatchToProps)((translatable(locale => locale))(RecentHappenings));
