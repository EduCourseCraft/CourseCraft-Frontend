import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const initialFormData = {
	name: "",
	description: "",
	detail: "",
	duration: "",
	modules: [],
};

const initialContent = {
	id: "",
	type: "",
	title: "",
	url: "",
	text: "",
	questions: [],
};

const initialQuestion = {
	id: "",
	question: "",
	answers: ["", "", "", ""],
	correctAnswer: "",
};

const ModifyCourseForm = () => {
	const [formData, setFormData] = useState(initialFormData);
	const [categories, setCategories] = useState(null);

	////////////////////////////
	// LOAD COURSE DATA
	////////////////////////////
	const { courseId } = useParams();
	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_COURSES_GET_ALL}/${courseId}`
				);
				const data = await response.json();
				setFormData(data.courseData);
			} catch (error) {
			}
		};

		fetchCourseData();
		// eslint-disable-next-line
	}, []);

	////////////////////////////
	// LOAD CATEGORIES
	////////////////////////////
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_CATEGORIES_GET_ALL} `
				);
				const data = await response.json();
				const filtered = data.filter((category) => category.active === true);
				setCategories(filtered);
			} catch (error) {
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	////////////////////////////
	// SELECT CATEGORY
	const handleCategoryChange = (e) => {
		const { value } = e.target;

		setFormData((prevState) => {
			return { ...prevState, category: value };
		});
	};

	////////////////////////////
	// CHANGE SELECT & RANDOM
	////////////////////////////
	const handleChangeSelect = (e, moduleIndex) => {
		const { value: newOption } = e.target;

		setFormData((prevFormData) => {
			const updatedModules = [...prevFormData.modules];
			const currentContent = updatedModules[moduleIndex].content.slice(-1)[0];

			if (!currentContent) {
				return prevFormData;
			}

			switch (newOption) {
				case "video":
					currentContent.type = "video";
					currentContent.title = "";
					currentContent.url = "";
					currentContent.text = "";
					currentContent.questions = [];
					break;
				case "text":
					currentContent.type = "text";
					currentContent.title = "";
					currentContent.url = "";
					currentContent.questions = [];
					break;
				case "quiz":
					currentContent.type = "quiz";
					currentContent.title = "";
					currentContent.url = "";
					currentContent.text = "";
					currentContent.questions = [initialQuestion];
					break;
				default:
					break;
			}

			return {
				...prevFormData,
				modules: updatedModules,
			};
		});
	};

	const generateUniqueId = () => {
		return uuidv4();
	};

	////////////////////////////
	// COURSE NAME, DESCRIPTION
	////////////////////////////
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	//////////////////////////////////////////////
	// MODULE FUNCTIONS
	//////////////////////////////////////////////
	////////////////////////////
	// ADD MODULE
	const handleAddModule = () => {
		const newModule = {
			id: `module${formData.modules.length + 1} `,
			name: "",
			content: [],
		};
		setFormData((prevState) => ({
			...prevState,
			modules: [...prevState.modules, newModule],
		}));
	};
	////////////////////////////
	// SET MODULE NAME
	const handleModuleChange = (moduleIndex, e) => {
		const { name, value } = e.target;
		setFormData((prevState) => {
			const updatedModules = [...prevState.modules];
			updatedModules[moduleIndex] = {
				...updatedModules[moduleIndex],
				[name]: value,
			};
			return { ...prevState, modules: updatedModules };
		});
	};

	////////////////////////////
	// DELETE MODULE
	const handleDeleteModule = (moduleIndex) => {
		setFormData((prevState) => {
			const updatedModules = [...prevState.modules];
			updatedModules.splice(moduleIndex, 1);
			return { ...prevState, modules: updatedModules };
		});
	};

	//////////////////////////////////////////////
	// CONTENT FUNCTIONS
	//////////////////////////////////////////////
	////////////////////////////
	// ADD CONTENT
	const handleAddContent = (moduleIndex) => {
		setFormData((prevFormData) => {
			let newContent = {
				...initialContent,
				id: generateUniqueId(),
				type: "video",
				title: "",
				url: "",
				text: "",
				questions: [],
			};

			const updatedModules = [...prevFormData.modules];
			updatedModules[moduleIndex].content.push(newContent);

			return {
				...prevFormData,
				modules: updatedModules,
			};
		});
	};

	////////////////////////////
	// HANDLE CONTENT CHANGE
	const handleContentChange = (e, moduleIndex, contentIndex) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => {
			const updatedModules = [...prevFormData.modules];
			const updatedModule = { ...updatedModules[moduleIndex] };
			const updatedContent = { ...updatedModule.content[contentIndex] };

			if (updatedContent.type === "video" || updatedContent.type === "text") {
				updatedContent[name] = value;
			} else if (updatedContent.type === "quiz") {
				const updatedQuestion = {
					...updatedContent.questions[0],
					[name]: value,
				};
				updatedContent.questions = [updatedQuestion];
			}

			updatedModule.content[contentIndex] = updatedContent;
			updatedModules[moduleIndex] = updatedModule;

			return { ...prevFormData, modules: updatedModules };
		});
	};

	////////////////////////////
	// HANDLE DELETE CONTENT
	const handleDeleteContent = (moduleIndex, contentIndex) => {
		setFormData((prevFormData) => {
			const updatedModules = [...prevFormData.modules];
			const updatedModule = { ...updatedModules[moduleIndex] };
			const updatedContent = [...updatedModule.content];
			updatedContent.splice(contentIndex, 1);
			updatedModule.content = updatedContent;
			updatedModules[moduleIndex] = updatedModule;

			return { ...prevFormData, modules: updatedModules };
		});
	};

	////////////////////////////
	// QUIZ FUNCTIONS
	////////////////////////////
	////////////////////////////
	// QUESTION CHANGE
	const handleQuestion = (e, questionIndex, moduleIndex, contentIndex) => {
		const { value } = e.target;
		setFormData((prevFormData) => {
			const updatedModules = [...prevFormData.modules];
			const updatedModule = { ...updatedModules[moduleIndex] };
			const updatedContent = { ...updatedModule.content[contentIndex] };
			const updatedQuestion = {
				...updatedContent.questions[questionIndex],
				question: value,
			};
			updatedContent.questions[questionIndex] = updatedQuestion;
			updatedModule.content[contentIndex] = updatedContent;
			updatedModules[moduleIndex] = updatedModule;
			return { ...prevFormData, modules: updatedModules };
		});
	};

	////////////////////////////
	// ANSWER CHANGE
	const handleAnswerChange = (
		questionIndex,
		answerIndex,
		e,
		moduleIndex,
		contentIndex
	) => {
		const { value } = e.target;
		setFormData((prevFormData) => {
			const updatedModules = [...prevFormData.modules];
			const updatedModule = { ...updatedModules[moduleIndex] };
			const updatedContent = { ...updatedModule.content[contentIndex] };
			const updatedQuestion = { ...updatedContent.questions[questionIndex] };
			const updatedAnswers = [...updatedQuestion.answers];
			updatedAnswers[answerIndex] = value;
			const updatedQuestionWithAnswers = {
				...updatedQuestion,
				answers: updatedAnswers,
			};
			const updatedQuestions = [...updatedContent.questions];
			updatedQuestions[questionIndex] = updatedQuestionWithAnswers;

			updatedContent.questions = updatedQuestions;
			updatedModule.content[contentIndex] = updatedContent;
			updatedModules[moduleIndex] = updatedModule;

			return { ...prevFormData, modules: updatedModules };
		});
	};

	////////////////////////////
	// SET CORRECT ANSWER
	const handleCorrectAnswerChange = (
		e,
		questionIndex,
		moduleIndex,
		contentIndex
	) => {
		const { value } = e.target;
		setFormData((prevFormData) => {
			const updatedModules = [...prevFormData.modules];
			const updatedModule = { ...updatedModules[moduleIndex] };
			const updatedContent = { ...updatedModule.content[contentIndex] };
			const updatedQuestion = { ...updatedContent.questions[questionIndex] };
			updatedQuestion.correctAnswer = updatedQuestion.answers[value];
			updatedContent.questions[questionIndex] = updatedQuestion;
			updatedModule.content[contentIndex] = updatedContent;
			updatedModules[moduleIndex] = updatedModule;
			return { ...prevFormData, modules: updatedModules };
		});
	};

	////////////////////////////
	// DELETE QUESTION
	const handleDeleteQuestion = (questionIndex, moduleIndex, contentIndex) => {
		setFormData((prevFormData) => {
			const updatedModules = [...prevFormData.modules];
			const updatedModule = { ...updatedModules[moduleIndex] };
			const updatedContent = { ...updatedModule.content[contentIndex] };
			updatedContent.questions.splice(questionIndex, 1);
			updatedModule.content[contentIndex] = updatedContent;
			updatedModules[moduleIndex] = updatedModule;
			return { ...prevFormData, modules: updatedModules };
		});
	};

	////////////////////////////
	// ADD QUESTION
	const handleAddQuestion = (moduleIndex, contentIndex) => {
		setFormData((prevFormData) => {
			const updatedModules = [...prevFormData.modules];
			const updatedModule = { ...updatedModules[moduleIndex] };
			const updatedContent = { ...updatedModule.content[contentIndex] };
			const newQuestion = { ...initialQuestion, id: generateUniqueId() };

			updatedContent.questions.push(newQuestion);
			updatedModule.content[contentIndex] = updatedContent;
			updatedModules[moduleIndex] = updatedModule;

			return { ...prevFormData, modules: updatedModules };
		});
	};

	////////////////////////////
	// SUBMIT FORM
	////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();

		const courseData = {
			name: formData.name,
			description: formData.description,
			detail: formData.detail,
			duration: formData.duration,
			category: formData.category,
			modules: formData.modules.map((module) => {
				const formattedModule = {
					name: module.name,
					content: module.content.map((content) => {
						let formattedContent = {
							type: content.type,
							title: content.title,
						};
						if (content.type === "video") {
							formattedContent.url = content.url;
						} else if (content.type === "text") {
							formattedContent.text = content.text;
						} else if (content.type === "quiz") {
							delete formattedContent.title;
							formattedContent.questions = content.questions.map((question) => {
								const formattedQuestion = {
									question: question.question,
									answers: question.answers,
									correctAnswer: question.correctAnswer,
								};
								delete formattedQuestion.id;
								return formattedQuestion;
							});
						}
						return formattedContent;
					}),
				};
				delete module.id;
				return formattedModule;
			}),
		};

		try {
			const response = await fetch(
				`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_COURSES_POST}/${courseId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ courseData }),
				}
			);

			if (response.ok) {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "¡Curso modificado con éxito!",
					text: `Felicidades, el curso ha sido modificado exitosamente. ¡Comienza a explorar y gestionar tu curso modificado ahora mismo!`,
					showConfirmButton: false,
					timer: 3000,
				}).then(() => {
					window.location.href = "/";
				});
				setFormData(initialFormData);
			} else {
				Swal.fire({
					title: "¡Ups! Algo salió mal",
					text: `Lo sentimos, no se pudo modificar el curso en este momento. Por favor, inténtalo de nuevo más tarde`,
					icon: "error",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "¡Error de procesamiento!",
				text:
					"Parece que ocurrió un error mientras procesábamos tu solicitud. Por favor, inténtalo nuevamente más tarde. Si el problema persiste, ponte en contacto con el equipo de soporte para obtener asistencia adicional.",
				icon: "error",
			});
		}
	};

	function formatCourseStructureData() {
		const formattedData = {
			name: formData.name,
			description: formData.description,
			detail: formData.detail,
			duration: formData.duration,
			category: formData.category,
			modules: formData.modules.map((module) => {
				const formattedModule = {
					name: module.name,
					content: module.content.map((content) => {
						let formattedContent = {
							type: content.type,
							title: content.title,
						};
						if (content.type === "video") {
							formattedContent.url = content.url;
						} else if (content.type === "text") {
							formattedContent.text = content.text;
						} else if (content.type === "quiz") {
							delete formattedContent.title;
							formattedContent.questions = content.questions.map((question) => {
								const formattedQuestion = {
									question: question.question,
									answers: question.answers,
									correctAnswer: question.correctAnswer,
								};
								delete formattedQuestion.id;
								return formattedQuestion;
							});
						}
						return formattedContent;
					}),
				};
				delete module.id;
				return formattedModule;
			}),
		};

		return JSON.stringify(formattedData, null, 2);
	}

	////////////////////////////
	// SHOW DATA
	////////////////////////////
	const [showData, setShowData] = useState(true);
	const [showFinalData, setShowFinalData] = useState(false);

	const formatCourseStructure = () => {
		const formattedData = {
			name: formData.name,
			description: formData.description,
			detail: formData.detail,
			duration: formData.duration,
			category: formData.category,
			modules: formData.modules.map((module) => ({
				id: module.id,
				name: module.name,
				content: module.content.map((content) => ({
					id: content.id,
					type: content.type,
					title: content.title,
					url: content.url,
					text: content.text,
					questions: (content.questions || []).map((question) => ({
						id: question.id,
						question: question.question,
						answers: question.answers,
						correctAnswer: question.correctAnswer,
					})),
				})),
			})),
		};

		return JSON.stringify(formattedData, null, 2);
	};

	return (
		<form onSubmit={handleSubmit} className="container mt-0 module-box box pb-40">
			<h2>Modificar Curso:</h2>
			<h3>{formData.name}</h3>

			<div className="mb-3">
				<label className="form-label text-large">Nombre:</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					className="form-control mb-20"
					placeholder="Nombre del curso"
				/>
			</div>

			<div className="mb-3">
				<label className="form-label mt-2">Descripcion:</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleInputChange}
					className="form-control mb-20"
					placeholder="Describa su curso aqui"
				/>
			</div>

			<div className="mb-3">
				<label className="form-label mt-2">Detalle del curso:</label>
				<textarea
					name="detail"
					value={formData.detail}
					onChange={handleInputChange}
					className="form-control mb-20"
					placeholder="Ingrese una descripcion detallada del curso"
				/>
			</div>

			<div className="mb-3">
				<label className="form-label text-large">Duration</label>
				<input
					type="number"
					name="duration"
					value={formData.duration}
					onChange={handleInputChange}
					className="form-control mb-20"
					placeholder="Ingrese la duracion aproximada del curso en horas"
				/>
			</div>

			<div className="mb-3">
				{categories && (
					<>
						<label>Seleccione la categoría:</label>
						<select
							className="form-control"
							value={formData.category}
							onChange={(e) => handleCategoryChange(e)}
						>
							<option disabled value="">
								Select an option
							</option>
							{categories.map((category) => (
								<option key={category.id} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</>
				)}
			</div>

			{/* Create Module Section Start */}
			{formData.modules.length !== 0 && <h3 className="mt-50">Crear modulos:</h3>}

			{formData.modules.map((module, moduleIndex) => (
				<div key={moduleIndex} className="mb-20 boxs px-3 py-4 rounded module-box">
					<div className="container">
						<div className="row">
							<div className="col-md-10">
								<div>
									<label className="form-label mt-2 mb-1">Titulo:</label>
									<input
										type="text"
										name="name"
										value={module.name}
										onChange={(e) => handleModuleChange(moduleIndex, e)}
										className="form-control mb-20"
										placeholder="Titulo del modulo"
									/>
								</div>
							</div>

							<div className="col-md-2 d-flex align-items-center justify-content-center">
								<div className="d-flex justify-content-center sl-btn">
									<button
										type="button"
										onClick={() => {
											handleDeleteModule(moduleIndex);
										}}
										className="btn btn-del-modul"
									>
										<i className="fa fa-trash"></i>
									</button>
								</div>
							</div>
						</div>
					</div>

					{module.content.length !== 0 && (
						<h3 className="mt-50">Crear contenido:</h3>
					)}
					{module.content.map((content, contentIndex) => (
						<div key={contentIndex} className="mb-20 px-3 py-4 rounded module-shadow">
							<div className="container">
								<div className="row">
									{/* Selector Option Start */}
									<div className="col-md-10">
										<div className="form-group">
											<h5 className="">Seleccione una opcion de creacion de contenido:</h5>
											<select
												className="form-control"
												value={content.type}
												onChange={(e) => {
													handleChangeSelect(e, moduleIndex);
												}}
											>
												<option value="video">Cargar video</option>
												<option value="text">Crear articulo</option>
												<option value="quiz">Crear quiz de preguntas y respuestas</option>
											</select>
										</div>
										{/* Selector Option End */}

										{/* Video Option Start */}
										{content.type === "video" && (
											<>
												<h5 className="mt-50">Cargar video</h5>
												<label className="form-label mt-2 mb-1">Titulo del video:</label>
												<input
													type="text"
													name="title"
													value={content.title || ""}
													onChange={(e) => handleContentChange(e, moduleIndex, contentIndex)}
													className="form-control mb-20"
													placeholder="Titulo del contenido"
												/>

												<label className="form-label mt-2 mb-1">Url:</label>
												<input
													type="text"
													name="url"
													value={content.url || ""}
													onChange={(e) => handleContentChange(e, moduleIndex, contentIndex)}
													className="form-control mb-20"
													placeholder="url del video"
												/>
											</>
										)}

										{/* Video Option End */}

										{/* Text Option Start */}
										{content.type === "text" && (
											<div>
												<h5 className="mt-50">Crear articulo</h5>
												<label className="form-label mt-2 mb-1">Titulo:</label>
												<input
													type="text"
													name="title"
													value={content.title}
													onChange={(e) => handleContentChange(e, moduleIndex, contentIndex)}
													className="form-control mb-20"
													placeholder="Titulo del articulo"
												/>

												<label className="form-label mt-2 mb-1">Articulo:</label>
												<textarea
													type="text"
													name="text"
													value={content.text}
													onChange={(e) => handleContentChange(e, moduleIndex, contentIndex)}
													className="form-control mb-20"
													placeholder="Contenido del articulo"
												/>
											</div>
										)}
										{/* Text Option End */}

										{/* Quiz Option Start */}
										{content.type === "quiz" && (
											<div>
												<div className="container mt-4 quiz style1">
													<h5 className="mt-50">Crear Quiz:</h5>

													{content.questions.map((question, questionIndex) => (
														<div key={questionIndex} className="mb-20 rounded module-shadow">
															<div className="container">
																<div className="row contact-widget module-box">
																	<div className="col-md-10  rounded pt-3">
																		<div className="form-group">
																			<label>Ingrese la pregunta o trivia:</label>
																			<textarea
																				name="question"
																				className="form-control"
																				value={question.question}
																				onChange={(e) =>
																					handleQuestion(e, questionIndex, moduleIndex, contentIndex)
																				}
																				placeholder={`Pregunta...`}
																			></textarea>
																		</div>

																		<div className="form-group">
																			<label>Escriba las posibles respuestas:</label>
																			{question.answers.map((answer, answerIndex) => (
																				<div key={answerIndex} className="mb-10">
																					<input
																						name="answer"
																						type="text"
																						className="form-control"
																						value={answer}
																						onChange={(e) =>
																							handleAnswerChange(
																								questionIndex,
																								answerIndex,
																								e,
																								moduleIndex,
																								contentIndex
																							)
																						}
																					/>
																				</div>
																			))}

																			<div className="form-group">
																				<label>Seleccione la respuesta correcta:</label>
																				<select
																					className="form-control"
																					value={
																						question.correctAnswer
																							? question.answers.indexOf(question.correctAnswer)
																							: ""
																					}
																					onChange={(e) =>
																						handleCorrectAnswerChange(
																							e,
																							questionIndex,
																							moduleIndex,
																							contentIndex
																						)
																					}
																				>
																					{!question.correctAnswer && (
																						<option value="">Select an option</option>
																					)}
																					{question.answers.map((answer, index) => (
																						<option key={index} value={index}>
																							{answer}
																						</option>
																					))}
																				</select>
																			</div>
																		</div>
																	</div>

																	<div className="col-md-2 d-flex align-items-center justify-content-center">
																		<div className="d-flex justify-content-center">
																			<button
																				type="button"
																				onClick={() => {
																					handleDeleteQuestion(
																						questionIndex,
																						moduleIndex,
																						contentIndex
																					);
																				}}
																				className="btn btn-del-cont "
																			>
																				<i className="fa fa-trash"></i>
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													))}

													<div className="container d-flex justify-content-center contact-widget">
														<button
															type="button"
															onClick={() => {
																handleAddQuestion(moduleIndex, contentIndex);
															}}
															className="btn  btn-add btn-add-cont me-2 m-10"
														>
															Agregar Pregunta
														</button>
													</div>
												</div>
											</div>
										)}
										{/* Quiz Option End */}
									</div>

									<div className="col-md-2 d-flex align-items-center justify-content-center">
										<div className="d-flex justify-content-center">
											<button
												type="button"
												onClick={() => {
													handleDeleteContent(moduleIndex, contentIndex);
												}}
												className="btn btn-del-cont "
											>
												<i className="fa fa-trash"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}

					<div className="container d-flex justify-content-center">
						<button
							type="button"
							onClick={() => {
								handleAddContent(moduleIndex);
							}}
							className="btn btn-secondary btn-add btn-add-cont me-2 m-10"
						>
							Agregar Contenido
						</button>
					</div>
				</div>
			))}

			<div className="container d-flex justify-content-center">
				<button
					type="button"
					onClick={handleAddModule}
					className="btn btn-secondary btn-add break-words me-2"
				>
					Agregar Modulo
				</button>
			</div>
			{/* Create Module Section End */}

			<button type="submit" className="btn btn-send w-50 pt-50">
				Enviar formulario
			</button>

			{/* <div className="data-box position-fixed top-0 end-0">
				<button onClick={() => setShowData(!showData)}>Toggle Data</button>
				{showData && (
					<div className="data">
						<pre>{formatCourseStructure()}</pre>
					</div>
				)}
			</div>
			<div className="data-box position-fixed top-0 start-0">
				<button onClick={() => setShowFinalData(!showFinalData)}>
					Toggle Data
				</button>
				{showFinalData && (
					<div className="data">
						<pre>{formatCourseStructureData()}</pre>
					</div>
				)}
			</div> */}
		</form>
	);
};

export default ModifyCourseForm;
