import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CourseSingleTwo from "../../components/Courses/CourseSingleTwo";
import ReactPaginate from "react-paginate";
import CustomPlaceholder from "../../components/Placeholder/CustomPlaceHolder";

import courseImg1 from "../../assets/img/courses/1.jpg";

const CoursePart = () => {
	const [fetchData, setFetchData] = useState([]);
	const [fetchedCategories, setFetchedCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState("Mostrar todo");
	const [currentPage, setCurrentPage] = useState(0);
	const coursesPerPage = 9;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDataAndCategories = async () => {
			try {
				// Fetch courses data
				const coursesResponse = await fetch(
					`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_COURSES_GET_ALL}`
				);
				const coursesData = await coursesResponse.json();
				setFetchData(coursesData);

				// Fetch categories data
				const categoriesResponse = await fetch(
					`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_CATEGORIES_GET_ALL}`
				);
				const categoriesData = await categoriesResponse.json();
				const filteredCategories = categoriesData.filter(
					(category) => category.active === true
				);
				filteredCategories.unshift({
					id: 12341,
					name: "Mostrar todo",
				});
				setFetchedCategories(filteredCategories);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDataAndCategories();
	}, []);

	const renderCoursePanel = () => {
		const filteredCourses =
			activeCategory === "Mostrar todo"
				? fetchData
				: fetchData.filter((course) =>
						course.courseData.category.includes(activeCategory)
				  );

		const offset = currentPage * coursesPerPage;
		const currentPageCourses = filteredCourses.slice(
			offset,
			offset + coursesPerPage
		);

		return (
			<div className="row">
				{currentPageCourses.map((course) => (
					<div key={course.id} className="col-lg-4 col-md-6">
						<CourseSingleTwo
							key={course.id}
							courseClass="courses-item md-mb-30"
							courseImg={courseImg1}
							courseTitle={course.courseData.name || "Curso en desarrollo"}
							courseDuration={course.courseData.duration || "10"}
							courseId={course.id || "112"}
							courseCategory={
								course.courseData.category && course.courseData.category.length > 0
									? course.courseData.category.join(", ")
									: "Web development"
							}
							courseDetail={course.courseData.detail}
						/>
					</div>
				))}
			</div>
		);
	};

	const handleTabClick = (category) => {
		setActiveCategory(category);
		setCurrentPage(0);
	};

	const handlePageChange = ({ selected }) => {
		window.scrollTo({
			top: 250,
			behavior: "smooth",
		});
		setCurrentPage(selected);
	};

	const totalCourses =
		activeCategory === "Mostrar todo"
			? fetchData.length
			: fetchData.filter((course) =>
					course.courseData.category.includes(activeCategory)
			  ).length;
	const pageCount = Math.ceil(totalCourses / coursesPerPage);

	return (
		<div
			id="rs-popular-course"
			className="rs-popular-courses style1 orange-style pt-50 pb-100 md-pt-70 md-pb-50"
		>
			<div className="container">
				<Tabs>
					<TabList className="gridFilter text-center mb-10 md-mb-10">
						{fetchedCategories.map((category) => (
							<Tab key={category.id} onClick={() => handleTabClick(category.name)}>
								<button>{category.name}</button>
							</Tab>
						))}
					</TabList>
					{loading ? (
						<CustomPlaceholder />
					) : (
						<>
							{fetchedCategories.map((category) => (
								<TabPanel key={category.id}>
									<div>
										<h2>{category.name}</h2>
										{renderCoursePanel()}
										<ReactPaginate
											className="pagination"
											previousLabel={"Previous"}
											nextLabel={"Next"}
											breakLabel={"..."}
											pageCount={pageCount}
											marginPagesDisplayed={2}
											pageRangeDisplayed={5}
											onPageChange={handlePageChange}
											containerClassName={"pagination"}
											activeClassName={"active"}
										/>
									</div>
								</TabPanel>
							))}
						</>
					)}
				</Tabs>
			</div>
		</div>
	);
};

export default CoursePart;
