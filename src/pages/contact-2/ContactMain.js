import React from 'react';
import Tilty from 'react-tilty';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import SectionTitle from '../../components/Common/SectionTitle';
import ContactForm from '../../components/Contact/ContactForm';
import bannerbg from '../../assets/img/breadcrumbs/inner12.jpg';
import contactImg1 from '../../assets/img/contact/contact-img.png';


const ContactMain = () => {

  return (
    <React.Fragment>

      {/* SiteBreadcrumb */}
      <SiteBreadcrumb
        pageTitle="Contáctenos!"
        pageName="Estemos en contacto"
        breadcrumbsImg={bannerbg}
      />
      {/* SiteBreadcrumb */}

      {/* Contact Section Start */}
      <div className="rs-contact style2 pt-110 md-pt-80 pb-110 md-pb-80">
        <div className="container">
          <div className="row">
            {/* Image Section */}
            <div className="col-lg-4 col-md-12 mb-30">
              <div className="image-wrap">
                <Tilty
                  reverse="false"
                  perspective="10000"
                  speed="3000"
                >
                  <img src={contactImg1} alt="Contact Image" className="img-fluid" />
                </Tilty>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="col-lg-8 col-md-12">
              <div className="contact-widget event-bg">
                <SectionTitle
                  sectionClass="sec-title text-center mb-50"
                  titleClass="title black-color mb-14"
                  title="Quick Contact"
                  descClass="desc big"
                  description={<>Lorem ipsum dolor sit amet, consectetur adipisicing elit, eius to mod <br /> tempor incidi dunt ut dolore.</>}
                />

                {/* Contact Form */}
                <ContactForm
                  submitBtnClass="btn-send"
                  btnText="Submit"
                />
                {/* Contact Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section End */}
    </React.Fragment>

  );
}


export default ContactMain;
