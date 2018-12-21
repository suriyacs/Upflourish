import React from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-multilingual';

import EarthIcon from '../../../assets/images/earth.svg';
import ProfileIcon from '../../../assets/images/man.svg';

class Recommend extends React.Component {
  constructor() {
    super();
    this.state = {
      jobOpenings: [
        {
          company: 'Wal-Mart Stores',
          url: 'www.walmart.com',
          position: 'Senior Software Engineer',
          location: 'San Francisco'
        },
        {
          company: 'Exxon Mobil',
          url: 'www.exxonmobile.com',
          position: 'Product Manager',
          location: 'Keller, Texas, United States'
        },
        {
          company: 'Chevron',
          url: 'www.chevron.com',
          position: 'Product Manager',
          location: 'New York'
        },
        {
          company: 'Google',
          url: 'www.google.com',
          position: 'Product Manager',
          location: 'Redmond, WA, USA'
        }
      ]
    };
  }
  render() {
    const { jobOpenings } = this.state;
    const locale = this.props.locale.profile;
    return (
      <div className="recommand-section opacity-04">
        <div>
          <h3 className="heading m-10px-0px" id="recommend">{locale.recommendSection.title}</h3>
          <div className="profile-common-container">
            <div className="d-flex flex-column m-30">
              <span className="header mb-2">
                {locale.recommendSection.languages}
              </span>
              <div className="d-flex flex-column flex-md-row flex-sm-row flex-lg-row justify-content-between">
                <span className="content col-lg-7 p-0 mb-2">
                  {locale.recommendSection.langDesc}
                </span>
                <span>
                  <button className="btn btn-primary action">
                    {locale.recommendSection.addLanguage}
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="profile-common-container d-flex flex-column">
            <div className="d-flex flex-column m-30">
              <span className="header mb-2">
                {locale.recommendSection.internships}
              </span>
              <div className="d-flex flex-column flex-md-row flex-sm-row flex-lg-row justify-content-between">
                <span className="content col-lg-7 p-0 mb-2">
                  {locale.recommendSection.internDesc}
                </span>
                <span>
                  <button className="btn btn-primary action">
                    {locale.recommendSection.addInternship}
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="profile-common-container d-flex flex-column">
            <div className="d-flex flex-column m-30">
              <span className="header mb-2">
                {locale.recommendSection.references}
              </span>
              <div className="d-flex flex-column flex-md-row flex-sm-row flex-lg-row justify-content-between">
                <span className="content col-lg-7 p-0 mb-2">
                  {locale.recommendSection.refDesc}
                </span>
                <span>
                  <button className="btn btn-primary action">
                    {locale.recommendSection.addReference}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="heading m-10px-0px">{locale.recommendSection.jobOpenings}</h3>
          <div className="profile-common-container d-flex flex-column">
            {jobOpenings.map(job => (
              <div key={job.company} className="job-section">
                <div className="d-flex flex-row m-20 align-items-center">
                  <div className="d-flex flex-row col-lg-6 p-0">
                    <span className="mr-2">
                      <img
                        className="profile-common-icon"
                        src={`https://logo.clearbit.com/${job.url}`}
                        alt="clogo"
                        onError={e => { e.target.src = ProfileIcon; }}
                      />
                    </span>
                    <span className="d-flex flex-column">
                      <span className="common-header-text font-size-15">
                        {job.company}
                      </span>
                      <span className="common-content-text font-size-15">
                        {job.position}
                      </span>
                    </span>
                  </div>
                  <div className="d-flex flex-row col-lg-6 p-0 align-items-center">
                    <span className="mr-2">
                      <img
                        className="profile-common-icon assessment"
                        src={EarthIcon}
                        alt="location"
                      />
                    </span>
                    <span className="common-content-text font-size-15">
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Recommend.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default (translatable(locale => locale))(Recommend);
