import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import ScrollToTop from "../components/Common/ScrollTop";
import OffWrap from "../components/Layout/Header/OffWrap";
import SiteBreadcrumb from "../components/Common/Breadcumb";
import SearchModal from "../components/Layout/Header/SearchModal";

// Image
import favIcon from "../assets/img/fav-orange.png";
import Logo from "../assets/img/logo/dark-logo.png";
import footerLogo from "../assets/img/logo/lite-logo.png";

import bannerbg from '../assets/img/breadcrumbs/2.jpg';
import bcrypt from 'bcryptjs'

const initialRegisterData = {
    firstName: "",
    lastName: "",
    email: "",
    salt: "",
    username: "",
    password: "",
    repassword: "",
}

const Register = () => {
	const [loading, setLoading] = useState(false);
	const [registerData, setRegisterData] = useState(initialRegisterData2);
	const history = useHistory();

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setRegisterData((prevData) => ({ ...prevData, [id]: value }));
	};

	const registerAction = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_ROOT_URL}/user`,
				registerData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				Swal.fire({
					title: "Success!",
					text: "Usuario creado exitosamente.",
					icon: "success",
				}).then(() => {
					history.push("/login");
				});
			} else {
				Swal.fire({
					title: "Error!",
					text: "Failed to create course",
					icon: "error",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Error!",
				text: "Ocurrio un error al crear el usuario",
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
				pageTitle="Register"
				pageName="Register"
				breadcrumbsImg={bannerbg}
			/>
			{/* breadcrumb-area-End */}

			{/* Register Start */}
			<div className="register-section pt-100 pb-100 md-pt-80 md-pb-80">
				<div className="container">
					<div className="register-box">
						<div className="sec-title text-center mb-30">
							<h2 className="title mb-10">Crear nueva cuenta</h2>
						</div>
						<div className="styled-form">
							<div id="form-messages"></div>
							<form id="contact-form" method="post" action="#">
								<div className="row clearfix">
									<div className="form-group col-lg-12 mb-25">
										<input
											type="text"
											id="firstName"
											value={registerData.firstName || ""}
											onChange={(e) => handleInputChange(e)}
											placeholder="Nombre"
											required
										/>
									</div>
									<div className="form-group col-lg-12">
										<input
											type="lastName"
											id="lastName"
											value={registerData.lastName || ""}
											onChange={(e) => handleInputChange(e)}
											placeholder="Apellido"
											required
										/>
									</div>
									<div className="form-group col-lg-12">
										<input
											type="email"
											id="email"
											value={registerData.email || ""}
											onChange={(e) => handleInputChange(e)}
											placeholder="Direccion de email"
											required
										/>
									</div>
									<div className="form-group col-lg-12">
										<input
											type="text"
											id="username"
											value={registerData.username || ""}
											onChange={(e) => handleInputChange(e)}
											placeholder="Nombre de usuario"
											required
										/>
									</div>
									<div className="form-group col-lg-12">
										<input
											type="text"
											id="password"
											value={registerData.password || ""}
											onChange={(e) => handleInputChange(e)}
											placeholder="Contrasena"
											required
										/>
									</div>
									<div className="form-group col-lg-12">
										<input
											type="text"
											id="repassword"
											value={registerData.repassword || ""}
											onChange={(e) => handleInputChange(e)}
											placeholder="Confirmar Contrasena"
											required
										/>
									</div>
									<div className="form-group col-lg-12 col-md-12 col-sm-12">
										<div className="row clearfix">
											<div className="column col-lg-3 col-md-4 col-sm-12">
												<div className="radio-box">
													<input type="radio" name="remember-password" id="type-1" />
												</div>
											</div>
											<div className="column col-lg-3 col-md-4 col-sm-12">
												<div className="radio-box">
													<input type="radio" name="remember-password" id="type-2" />
												</div>
											</div>
											<div className="column col-lg-3 col-md-4 col-sm-12">
												<div className="radio-box">
													<input type="radio" name="remember-password" id="type-3" />
												</div>
											</div>
											<div className="column col-lg-12 col-md-12 col-sm-12">
												<div className="check-box">
													<input type="checkbox" name="Recordarme" id="type-4" />
												</div>
											</div>
										</div>
									</div>
									<div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
										{loading ? (
											<ButtonLoadingIndicator />
										) : (
											<button
												type="submit"
												className="readon register-btn"
												onClick={(e) => registerAction(e)}
											>
												<span className="txt">Registrarme</span>
											</button>
										)}
									</div>
									<div className="form-group col-lg-12 col-md-12 col-sm-12">
										<div className="users">
											Ya posee una cuenta? <Link to="/login">Inicie sesion</Link>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{/* Register End */}

			{/* <Newsletter
    sectionClass="rs-newsletter style1 orange-color mb--90 sm-mb-0 sm-pb-80"
    titleClass="title mb-0 white-color"
   /> */}

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

export default Register;
