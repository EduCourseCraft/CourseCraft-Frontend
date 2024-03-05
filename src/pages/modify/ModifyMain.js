import React from 'react';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import bannerbg from '../../assets/img/breadcrumbs/inner13.jpg';
import ModifyCourseForm from '../../components/ModifyCourse/ModifyCourseForm';

const CreateMain = () => {
  return (
    <React.Fragment>

      {/* SiteBreadcrumb */}
      <SiteBreadcrumb
        pageTitle="Innovando cursos"
        pageName="Create"
        breadcrumbsImg={bannerbg}
      />
      {/* SiteBreadcrumb */}

      {/* Modify Course Form Start */}
      <div className="rs-contact style1 create event-bg pt-0 md-pt-80 pb-50 md-pb-80">
        <div className="container contact-widget ">
          <ModifyCourseForm/>
        </div>
      </div>
      {/* Modify Course Form End */}
    </React.Fragment>
  );
}


export default CreateMain;