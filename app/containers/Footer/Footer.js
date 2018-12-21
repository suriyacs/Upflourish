import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { translatable } from 'react-multilingual';

import { footer } from '../../globals/AppConstant';

import '../../../assets/styles/components/LearnerLogin.scss';

import FooterDots from '../../../assets/images/footer-dots.svg';

const Footer = ({ locale }) => {
  const { footerValues, app } = locale;
  const {
    tableContent,
    supportContent,
    discover,
    helpSection
  } = footer;
  return (
    <div className="container">
      <div className="row bottom-about course-page">
        <div className="bottom">
          <div className="row m-0">
            <div className="col-md-6 col-lg-5 app-about">
              <label htmlFor="app" className="course-page-heading">{app.capsAppName}</label>
              <p>
                {footerValues.description}
              </p>
            </div>
            <div className="col-sm-12 col-lg-7 app-about-table">
              <div className="row m-0">
                <div className="col-md-6 col-lg-6 p-0">
                  <div className="row">
                    {
                      discover.map(value => (
                        <div key={footerValues[value]} className="col-sm-6 w-50">{footerValues[value]}</div>
                      ))
                    }
                  </div>
                  <div className="row">
                    {
                      tableContent.map(content => (
                        <div
                          key={content}
                          className="col-sm-6 bottom-table-content w-50 c-pointer"
                        >
                          {footerValues[content]}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 p-0 split-content">
                  <div className="row">
                    {
                      discover.map(value => (
                        <div key={footerValues[value]} className="col-sm-6 w-50">{footerValues[value]}</div>
                      ))
                    }
                  </div>
                  <div className="row">
                    {
                      supportContent.map(content => (
                        <div
                          key={footerValues[content]}
                          className="col-sm-6 bottom-table-content w-50 c-pointer"
                        >
                          {footerValues[content]}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 bottom-footer d-flex flex-wrap">
              <nav className="navbar pl-0 navbar-expand navbar-light">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarBottomContent"
                  aria-controls="navbarBottomContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarBottomContent">
                  <div className="bottom-btns flex-wrap">
                    {
                      helpSection.map(section => (
                        <li key={footerValues[section]} className="c-pointer">{footerValues[section]}</li>
                      ))
                    }
                  </div>
                </div>
              </nav>
              <label htmlFor="Ideas2IT" className="designedBy">{footerValues.poweredBy}</label>
            </div>
          </div>
        </div>
        <div className="bottom-image pt-5 w-100">
          <img
            src={FooterDots}
            alt="footerImage"
            className="w-100"
          />
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(translatable(locale => locale)(Footer));
