import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

import Star from '../../../assets/images/star.svg';
import NoImage from '../../../assets/images/no-image.svg';

class Card extends Component {
  getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  dateFormater = date => {
    let formatedDate = new Date(date).toUTCString();
    formatedDate = formatedDate.split(' ').slice(1, 4).join(' ');
    return formatedDate;
  }

  render() {
    const {
      labelName,
      isLabelEnabled,
      title,
      updatedTime,
      starRating,
      ratingCount,
      learnerCount,
      imageURL
    } = this.props;
    const locale = this.props.locale.cardView;

    // TODO: To be replaced with analytic value
    const randomRatingCount = (ratingCount === 0) ? this.getRandomInt(1000) : ratingCount;
    let randomStarRating = (starRating === 0.0) ? this.getRandomInt(5) : starRating;
    randomStarRating += 0.5;

    return (
      <div className="card-view text-left zoomIn c-pointer" key={title}>
        <div className="path-card text-truncate">
          <img
            className="zoomingImg"
            src={imageURL}
            alt="path"
            onError={event => { event.target.src = NoImage; }}
          />
        </div>
        <div className="card-detail">
          <div className="h-75">
            <div className="title">{title}</div>
            <div className="description pt-1">
              {locale.updatedTime.replace('{time}', this.dateFormater(updatedTime))}
            </div>
          </div>
          <div className="h-25">
            <div className="row description">
              <div className="col-1 star-count">{randomStarRating}</div>
              <img className="star-img p-0" src={Star} alt="rating" />
              <div className="col-4 p-0">({randomRatingCount} {locale.ratings})</div>
              <div className="col-5 p-l-0 text-right">{learnerCount} {locale.learners}</div>
            </div>
          </div>
        </div>
        {isLabelEnabled &&
          <label className="card-label text-center" htmlFor={labelName}>{labelName}</label>
        }
      </div>
    );
  }
}

Card.propTypes = {
  isLabelEnabled: PropTypes.bool,
  labelName: PropTypes.string,
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updatedTime: PropTypes.any,
  starRating: PropTypes.number,
  ratingCount: PropTypes.number,
  learnerCount: PropTypes.string,
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

Card.defaultProps = {
  isLabelEnabled: false,
  labelName: '',
  starRating: 4,
  ratingCount: 0,
  learnerCount: '0',
  updatedTime: ''
};

export default (translatable(locale => locale)(Card));
