import React from "react";
import { Link } from "react-router-dom";

const CourseSingleTwo = (props) => {
	const {
		courseClass,
		courseImg,
		courseTitle,
		courseCategory,
		courseDuration,
		courseDetail,
		courseId
	} = props;

	return (
		<div className={courseClass ? courseClass : "courses-item"}>
			<div className="img-part">
				<img src={courseImg} alt={courseTitle || "Course Image"} />
			</div>
			<div className="content-part">
				<h3 className="title">
					<Link to={`/course/course-single/${courseId}`}>
						{courseTitle || "Course Title"}
					</Link>
				</h3>
				<ul className="meta-part no-overflow">
					<li>
						<span className="category">
							{courseCategory ? courseCategory : "Unknown Category"}
						</span>
					</li>
				</ul>
				<div className="bottom-part">
					<div className="info-meta">
						<p className="detail">{courseDetail || "Course Detail"}</p>
					</div>
					<div className="info-meta">
						<ul className="meta-part">
							<li>
								<span className="price">
									{courseDuration ? `${courseDuration} hs` : "10.00 hs"}
								</span>
							</li>
							<li className="btn-part">
								<Link to={`/course/course-single/${courseId}`}>
									{props.btnText}
									<i className="flaticon-right-arrow"></i>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseSingleTwo;
