import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

const Carousel = props => {
  const { children, customWidth } = props;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: false,
    useCSS: true,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };
  return (
    <Slider {...settings} className={customWidth ? 'custom-width' : ''}>
      {
        children
      }
    </Slider>
  );
};

Carousel.propTypes = {
  children: PropTypes.any.isRequired,
  customWidth: PropTypes.bool
};

Carousel.defaultProps = {
  customWidth: false
};

export default Carousel;
