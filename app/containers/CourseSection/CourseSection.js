import React from 'react';
import { translatable } from 'react-multilingual';
import PropTypes from 'prop-types';

import Overview from './Overview';
import CareerImpact from './CareerImpact';
import StudentReview from './StudentReview';
import Testimonial from './Testimonial';
import FrequentQuestion from './FrequentQuestion';
import ProgramSyllabus from './ProgramSyllabus';
import ProgramBenefit from './ProgramBenefit';
import Limitless from './Limitless';
import SideNavBar from './SideNavBar';
// import ShareLinkSection from './ShareLinkSection';
import Footer from '../Footer/Footer';

import '../../../assets/styles/common.scss';

const CourseLandingSection = ({ locale }) => {
  const courseLandingLocale = locale.CourseLandingSection;
  return (
    <div className="col course-landing-page p-0">
      <Overview locale={courseLandingLocale} />
      <SideNavBar />
      {/* <ShareLinkSection locale={courseLandingLocale} /> */}
      <ProgramBenefit locale={courseLandingLocale} />
      <CareerImpact locale={courseLandingLocale} />
      <StudentReview locale={courseLandingLocale} />
      <Testimonial locale={courseLandingLocale} />
      <ProgramSyllabus locale={courseLandingLocale} />
      <FrequentQuestion locale={courseLandingLocale} />
      <Limitless locale={courseLandingLocale} />
      <Footer />
    </div>
  );
};

CourseLandingSection.propTypes = {
  locale: PropTypes.objectOf(PropTypes.any).isRequired
};

export default translatable(locale => locale)(CourseLandingSection);
