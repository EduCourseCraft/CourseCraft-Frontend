import React from "react";
// import { Link } from 'react-router-dom';

const OverviewPart = ({ data }) => {
	let name = "";
	let description = "";
	let category = [];
	let detail = "";
	if (data) {
		const {
			name: dataName,
			description: dataDescription,
			category: dataCategory,
			detail: dataDetails,
		} = data;
		name = dataName;
		description = dataDescription;
		category = dataCategory;
		detail = dataDetails;
	}

	return (
		<div className="content white-bg pt-30">
			<div className="course-overview">
				<div className="inner-box">
					<h4>{name}</h4>
					<ul className="student-list">
						{category.map((cat) => (
							<li key={cat}>{cat}</li>
						))}
						{/* <li>23,564 Total Students</li>
      <li><span className="theme_color">4.5</span> <span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span> (1254 Rating)</li>
      <li>256 Reviews</li> */}
					</ul>
					<p className="mb-4">{description}</p>
					<h3>Explorando detalles Interesantes del Curso</h3>
					<p>{detail}</p>
				</div>
			</div>
		</div>
	);
};

export default OverviewPart;
