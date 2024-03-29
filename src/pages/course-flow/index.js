import React from 'react';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import OffWrap from '../../components/Layout/Header/OffWrap';
import SearchModal from '../../components/Layout/Header/SearchModal';
import SiteBreadcrumb from '../../components/Common/Breadcumb';

// Image
import Logo from '../../assets/img/logo/dark-logo.png';
import footerLogo from '../../assets/img/logo/lite-logo.png';

import bannerbg from '../../assets/img/breadcrumbs/inner7.jpg';
import CourseMain from './CourseMain';

const Course = () => {


 return (
  <React.Fragment>
   <OffWrap />
   <Header
    parentMenu='course'
    headerNormalLogo={Logo}
    headerStickyLogo={Logo}
    CanvasLogo={Logo}
    mobileNormalLogo={Logo}
    CanvasClass="right_menu_togle hidden-md"
    headerClass="full-width-header header-style1 home8-style4"
    TopBar='enable'
    TopBarClass="topbar-area home8-topbar"
    emailAddress='support@website.com'
    Location='374 William S Canning Blvd, MA 2721, USA '
   />

   {/* breadcrumb-area-start */}
   <SiteBreadcrumb
    pageTitle="Explora nuestros cursos"
    pageName="Cursos"
    breadcrumbsImg={bannerbg}
   />
   {/* breadcrumb-area-start */}

   {/* Course Main */}
   <CourseMain/>
   {/* Course Main */}

   <Footer
    footerClass="rs-footer home9-style main-home"
    footerLogo={footerLogo}
   />
   <SearchModal />
  </React.Fragment>
 );
}


export default Course;