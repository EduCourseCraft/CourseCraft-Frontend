import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import "./globalStyles.css";

import Home from "../pages/home";
import AboutTwo from "../pages/about-2";
import CourseTwo from "../pages/cursos";
import CourseSingle from "../pages/course/course-single";
import ContactTwo from "../pages/contact-2";
import Login from "../pages/login";
import Register from "../pages/register";
import Error from "../pages/404";
import LoadTop from "../components/Common/ScrollTop/LoadTop";
import Create from "../pages/create";
import Modify from "../pages/modify";
import AdminAllCourses from "../pages/admin-all-courses";
import AuthGuard from "../components/Auth/AuthGuard";
import AdminGuard from "../components/Auth/AdminGuard";

const App = () => {
 const [userRole, setUserRole] = useState("user");
 const { isAuthenticated } = useUserStore();

 return (
  <div className="App">
   <BrowserRouter>
    <LoadTop />
    <Switch>
     <Route path="/login" component={Login} />
     <Route path="/register" component={Register} />
     <AuthGuard isAuthenticated={isAuthenticated}>
      <Switch>
       <Route path="/" exact component={Home} />
       <Route path="/home" component={Home} />
       <Route path="/about-2" component={AboutTwo} />
       <Route path="/cursos" component={CourseTwo} />
       <Route path="/contact-2" component={ContactTwo} />
       <Route path="/course/course-single/:id" component={CourseSingle} />
       <AdminGuard userRole={userRole}>
        <Switch>
         <Route path="/create" component={Create} />
         <Route path="/modify/:courseId" component={Modify} />
         <Route path="/administrar-todos" component={AdminAllCourses} />
        </Switch>
       </AdminGuard>
       <Route component={Error} />
      </Switch>
     </AuthGuard>
    </Switch>
   </BrowserRouter>
  </div>
 );
};

export default App;



// npx browserslist@latest --update-db

/*

import About from "../pages/about";
import CourseOne from "../pages/course";
import CourseThree from "../pages/course-3";
import CourseFour from "../pages/course-4";
import CourseFive from "../pages/course-5";
import CourseSix from "../pages/course-6";
import CourseCategoryPage from "../pages/course-categories";
import Team from "../pages/team";
import TeamTwo from "../pages/team-2";
import TeamSingle from "../pages/team/team-single";
import Event from "../pages/event";
import EventTwo from "../pages/event-2";
import EventThree from "../pages/event-3";
import Gallery from "../pages/gallery";
import GalleryTwo from "../pages/gallery-2";
import GalleryThree from "../pages/gallery-3";
import Shop from "../pages/shop";
import ShopSingle from "../pages/shop/shop-single";
import Cart from "../pages/shop/cart";
import Checkout from "../pages/shop/checkout";
import MyAccount from "../pages/shop/my-account";
import Faq from "../pages/faq";
import Blog from "../pages/blog";
import BlogLeft from "../pages/blog/BlogLeft";
import BlogRight from "../pages/blog/BlogRight";
import SinglePostLeftSidebar from "../pages/blog/single-post-left-sidebar";
import SinglePostRightSidebar from "../pages/blog/single-post-right-sidebar";
import SinglePostFullWidth from "../pages/blog/single-post-full-width";
import Contact from "../pages/contact";
import ContactThree from "../pages/contact-3";
import ContactFour from "../pages/contact-4";


<Route path="/about" component={About} />
<Route path="/course" exact component={CourseOne} />
<Route path="/course-3" component={CourseThree} />
<Route path="/course-4" component={CourseFour} />
<Route path="/course-5" component={CourseFive} />
<Route path="/course-6" component={CourseSix} />
<Route path="/course-categories" component={CourseCategoryPage} />
<Route path="/team" exact component={Team} />
<Route path="/team-2" component={TeamTwo} />
<Route path="/team/team-single" component={TeamSingle} />
<Route path="/event" component={Event} />
<Route path="/event-2" component={EventTwo} />
<Route path="/event-3" component={EventThree} />
<Route path="/gallery" component={Gallery} />
<Route path="/gallery-2" component={GalleryTwo} />
<Route path="/gallery-3" component={GalleryThree} />
<Route path="/shop" exact component={Shop} />
<Route path="/shop/shop-single" component={ShopSingle} />
<Route path="/shop/cart" component={Cart} />
<Route path="/shop/checkout" component={Checkout} />
<Route path="/shop/my-account" component={MyAccount} />
<Route path="/faq" component={Faq} /> 
<Route path="/blog" exact component={Blog} />
<Route path="/blog/blog-left-sidebar" component={BlogLeft} />
<Route path="/blog/blog-right-sidebar" component={BlogRight} />
<Route path="/blog/single-post-left-sidebar" component={SinglePostLeftSidebar} />
<Route path="/blog/single-post-right-sidebar" component={SinglePostRightSidebar} />
<Route path="/blog/single-post-full-width" component={SinglePostFullWidth} />
<Route path="/contact" component={Contact} />
<Route path="/contact-3" component={ContactThree} />
<Route path="/contact-4" component={ContactFour} />
*/


