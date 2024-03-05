import React from 'react';
import ScrollToTop from '../../components/Common/ScrollTop';
import AdminAllCourses from './AdminCourseSection';


const AdminCoursesMain = () => {

 return (
  <React.Fragment>

   {/* CoursePart Start */}
   <AdminAllCourses className="rs-categories main-home"/>
   {/* CoursePart End */}

   {/* scrolltop-start */}
   <ScrollToTop
    scrollClassName="scrollup orange-color"
   />
   {/* scrolltop-end */}

  </React.Fragment>
 )
}

export default AdminCoursesMain;