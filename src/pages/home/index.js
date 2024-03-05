import React from 'react';
import OffWrap from '../../components/Layout/Header/OffWrap';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import SearchModal from '../../components/Layout/Header/SearchModal';
import HomeMain from './HomeMain';
import footerLogo from '../../assets/img/logo/lite-logo.png';

const HomePage = () => {
  return (
    <React.Fragment>
      <OffWrap />
      <Header
        parentMenu='home'
      />
      <HomeMain />
      <Footer
        footerClass="rs-footer home9-style main-home"
        footerLogo={footerLogo}
      />
      <SearchModal />
    </React.Fragment>
  );
}

export default HomePage;
