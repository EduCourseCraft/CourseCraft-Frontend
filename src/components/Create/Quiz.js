const Quiz = (props) => {
	const {
		handleAddQuestion,
		handleAnswerChange,
		handleCorrectAnswerChange,
		handleDeleteQuestion,
		handleQuestion,
		quizContent,
	} = props;

	return (
		<div className="container mt-4 quiz style1">
			<h5 className="mt-50">Crear Quiz:</h5>

			{quizContent.question.map((question, questionIndex) => (
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
										onChange={(e) => handleQuestion(e, questionIndex)}
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
												onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
											/>
										</div>
									))}

									<div className="form-group">
										<label>Seleccione la respuesta correcta:</label>
										<select
											className="form-control"
											value={question.answers.indexOf(question.correct)}
											onChange={(e) => handleCorrectAnswerChange(e, questionIndex)}
										>
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
											handleDeleteQuestion(questionIndex);
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
						handleAddQuestion();
					}}
					className="btn  btn-add btn-add-cont me-2 m-10"
				>
					Agregar Pregunta
				</button>
			</div>
		</div>
	);
};

export default Quiz;
