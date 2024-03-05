import React, { useEffect, useState } from "react";
import Header from "../../../components/Layout/Header/Header";
import Footer from "../../../components/Layout/Footer/Footer";
import OffWrap from "../../../components/Layout/Header/OffWrap";
import SearchModal from "../../../components/Layout/Header/SearchModal";
import SiteBreadcrumb from "../../../components/Common/Breadcumb";
import CourseDetailsMain from "./CourseDetailsMain";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useDataStore from "../../../store/store";

// Image
import Logo from "../../../assets/img/logo/dark-logo.png";
import footerLogo from "../../../assets/img/logo/lite-logo.png";
import bannerbg from "../../../assets/img/breadcrumbs/2.jpg";

const CustomPlaceholder = () => (
	<div className="d-flex justify-content-center align-items-center vh-100">
		<div
			className="text-center"
			style={{ minWidth: "100%", minHeight: "700px", marginTop: "120px" }}
		>
			<div
				className="spinner-grow text-dark"
				role="status"
				style={{ width: "2rem", height: "2rem" }}
			>
				<span className="sr-only">Loading...</span>
			</div>
			<div
				className="spinner-grow text-dark mx-3"
				role="status"
				style={{ width: "3rem", height: "3rem" }}
			>
				<span className="sr-only">Loading...</span>
			</div>
			<div
				className="spinner-grow text-dark"
				role="status"
				style={{ width: "2rem", height: "2rem" }}
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	</div>
);

const CourseSingle = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState("");
	const setData = useDataStore((state) => state.setData);

	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_COURSES_GET_ALL}/${id}`
				);
				const data = await response.json();
				setTitle(data.courseData.name);
				setData(data);
			} catch (error) {
				console.error("Error fetching course data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourseData();
	}, [id, setData]);

	return (
		<React.Fragment>
			<OffWrap />
			<Header
				parentMenu="course"
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
				pageTitle={loading ? "" : title}
				pageName="Course Details"
				breadcrumbsImg={bannerbg}
			/>
			{/* breadcrumb-area-start */}

			{/* Course Details Main */}
			{loading ? <CustomPlaceholder /> : <CourseDetailsMain />}
			{/* Course Details Main */}

			<Footer
				footerClass="rs-footer home9-style main-home"
				footerLogo={footerLogo}
			/>
			<SearchModal />
		</React.Fragment>
	);
};

export default CourseSingle;
