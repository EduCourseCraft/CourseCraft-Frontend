import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import ScrollToTop from "../components/Common/ScrollTop";
import OffWrap from "../components/Layout/Header/OffWrap";
import SiteBreadcrumb from "../components/Common/Breadcumb";
import SearchModal from "../components/Layout/Header/SearchModal";
import axios from "axios";
import Swal from "sweetalert2";
import useUserStore from "../store/useUserStore";
import ButtonLoadingIndicator from "../components/Placeholder/ButtonLoadingIndicator";
import bcrypt from 'bcryptjs'

// Image
import favIcon from "../assets/img/fav-orange.png";
import Logo from "../assets/img/logo/dark-logo.png";
import footerLogo from "../assets/img/logo/lite-logo.png";
import bannerbg from "../assets/img/breadcrumbs/inner7.jpg";

const Login = () => {
 const [loading, setLoading] = useState(false);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const history = useHistory();

 const handleEmailChange = (e) => {
  setEmail(e.target.value);
 };

 const handlePasswordChange = (e) => {
  setPassword(e.target.value);
 };

 const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();

  const requestBody = {
   email,
   password,
  };

  try {
   const response = await axios.post(
    `${process.env.REACT_APP_ROOT_URL}/auth/login`,
    requestBody
   );

   localStorage.setItem(
    "userProfile",
    JSON.stringify(response.data.userProfileData)
   );

   if (response.status === 200) {
    Swal.fire({
     position: "top-end",
     icon: "success",
     title: `¡Bienvenido!`,
     text: `¡Comenza a explorar tus cursos ahora mismo!`,
     showConfirmButton: false,
     timer: 2500,
    }).then(() => {
     useUserStore.setState({ isAuthenticated: true });
     history.push("/");
    });
   } else {
    Swal.fire({
     title: "¡Ups! Algo salió mal",
     text: `Lo sentimos, no se pudo loguear el usuario. Por favor, inténtalo de nuevo más tarde`,
     icon: "error",
    });
   }
  } catch (error) {
   Swal.fire({
    title: "¡Oops!",
    text:
     "Por favor, verifica los datos ingresados. Hubo un problema al procesar tu solicitud. Te pedimos disculpas por las molestias. ",
    icon: "error",
   });
  } finally {
   setLoading(false);
  }
 };

 return (
  <React.Fragment>
   <Helmet>
    <link rel="icon" href={favIcon} />
   </Helmet>
   <OffWrap />
   <Header
    parentMenu="pages"
    secondParentMenu="others"
    headerNormalLogo={Logo}
    headerStickyLogo={Logo}
    CanvasLogo={Logo}
    mobileNormalLogo={Logo}
    CanvasClass="right_menu_togle hidden-md"
    headerClass="full-width-header header-style1 home8-style4"
    TopBar="enable"
    TopBarClass="topbar-area home8-topbar"
    emailAddress="support@website.com"
    Location="374 William S Canning Blvd, MA 2721, USA "
   />

   {/* breadcrumb-area-start */}
   <SiteBreadcrumb
    pageTitle="Login"
    pageName="Login"
    breadcrumbsImg={bannerbg}
   />
   {/* breadcrumb-area-End */}

   {/* Login Part Start */}
   <div className="rs-login pt-100 pb-100 md-pt-80 md-pb-80">
    <div className="container">
     <div className="noticed">
      <div className="main-part">
       <div className="method-account">
        <h2 className="login">Login</h2>
        <form>
         <input
          type="email"
          name="E-mail"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          required
         />
         <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
         />

         {loading ? (
          <ButtonLoadingIndicator />
         ) : (
          <button
           type="submit"
           className="readon submit-btn"
           onClick={handleSubmit}
          >
           Login
          </button>
         )}

         <div className="last-password">
          <p>
           No estas registrado? <Link to="/register">Crear una cuenta</Link>
          </p>
         </div>
        </form>
       </div>
      </div>
     </div>
    </div>
   </div>
   {/* Login Part End */}

   <Footer
    footerClass="rs-footer home9-style main-home"
    footerLogo={footerLogo}
   />

   {/* scrolltop-start */}
   <ScrollToTop scrollClassName="scrollup orange-color" />
   {/* scrolltop-end */}

   <SearchModal />
  </React.Fragment>
 );
};

export default Login;
