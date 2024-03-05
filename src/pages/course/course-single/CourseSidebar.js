import React, { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";

// Image
import videoImg from "../../../assets/img/about/about-video-bg2.png";
import useDataStore from "../../../store/store";

const CourseSidebar = () => {
 const [isOpen, setIsOpen] = useState(false);
 const openModal = () => setIsOpen(!isOpen);
 const [analizedData, setAnalizedData] = useState({
  numQuizzes: 0,
  numTextContent: 0,
  numVideoContent: 0,
  totalModules: 0,
 });

 const data = useDataStore((state) => state.data);
 useEffect(() => {
  if (data) {
   let numQuizzes = 0;
   let numTextContent = 0;
   let numVideoContent = 0;
   let totalModules = 0;

   if (data.courseData.modules) {
    totalModules = data.courseData.modules.length;

    data.courseData.modules.forEach((module) => {
     module.content.forEach((content) => {
      switch (content.type) {
       case "quiz":
        numQuizzes++;
        break;
       case "text":
        numTextContent++;
        break;
       case "video":
        numVideoContent++;
        break;
       default:
        break;
      }
     });
    });

    setAnalizedData({
     numQuizzes,
     numTextContent,
     numVideoContent,
     totalModules,
    });
   }
  }
 }, [data]);

 const { numQuizzes, numTextContent, numVideoContent, totalModules } =
  analizedData;

 return (
  <div className="inner-column">
   <ModalVideo
    channel="youtube"
    isOpen={isOpen}
    videoId="YLN1Argi7ik"
    onClose={() => {
     openModal();
    }}
   />
   <div className="intro-video media-icon orange-color2">
    <img className="video-img" src={videoImg} alt="Video Image" />
    <Link
     to="#"
     className="popup-videos"
     onClick={() => {
      openModal();
     }}
    >
     <i className="fa fa-play"></i>
    </Link>
    <h4>Vista previa del curso</h4>
   </div>
   <div className="course-features-info">
    <ul>
     <li className="lectures-feature">
      <i className="fa fa-files-o"></i>
      <span className="label">Lecciones</span>
      <span className="value">{totalModules}</span>
     </li>

     <li className="quizzes-feature">
      <i className="fa fa-puzzle-piece"></i>
      <span className="label">Cuestionarios</span>
      <span className="value">{numQuizzes}</span>
     </li>

     <li className="students-feature">
      <i className="fa fa-file-text-o"></i>
      <span className="label">Articulos</span>
      <span className="value">{numTextContent}</span>
     </li>

     <li className="students-feature">
      <i className="fa fa-play-circle"></i>
      <span className="label">Videos</span>
      <span className="value">{numVideoContent}</span>
     </li>

     <li className="assessments-feature">
      <i className="fa fa-check-square-o"></i>
      <span className="label">Total de ejercicios</span>
      <span className="value">
       {totalModules + numQuizzes + numTextContent + numVideoContent}
      </span>
     </li>

     <li className="duration-feature">
      <i className="fa fa-clock-o"></i>
      <span className="label">Duracion</span>
      <span className="value">{data?.courseData.duration} horas</span>
     </li>
    </ul>
   </div>
   <div className="btn-part">
    <a href="#" className="btn readon2 orange-transparent">
     Comenzar ahora
    </a>
   </div>
  </div>
 );
};

export default CourseSidebar;
