import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DataTable, { createTheme } from "react-data-table-component";

const AdminAllCourses = () => {
	////////////////////////////
	// GET COURSES DATA
	////////////////////////////
	const [coursesData, setCoursesData] = useState([]);

	const showCoursesData = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_COURSES_GET_ALL}`
		);
		const data = await response.json();
		console.log(data);
		setCoursesData(data);
	};

	useEffect(() => {
		showCoursesData();
	}, []);

	////////////////////////////
	// SET DATABLES COLUMNS
	////////////////////////////
	const columns = [
		{
			name: "Nombre",
			selector: (row) => row.courseData.name,
			minWidth: "300px",
		},
		{
			name: "Modulos",
			selector: (row) => row.courseData.modules.length,
		},
		{
			name: "Duracion",
			selector: (row) => `${row.courseData.duration} hs`,
		},
		{
			name: "Estado",
			selector: (row) => (row.active ? "Activo" : "Inactivo"),
			conditionalCellStyles: [
				{
					when: (row) => !row.active,
					style: {
						color: "red",
					},
				},
				{
					when: (row) => row.active,
					style: {
						color: "green",
					},
				},
			],
		},
		{
			name: "Acciones",
			cell: (row) => (
				<div className="">
					<button
						className={`btn-status ${
							row.active ? "btn-deactivate" : "btn-activate"
						} me-2`}
						onClick={() => handleActivateCourse(row.active, row.id)}
					>
						{row.active ? (
							<i className="toggle-off fa fa-power-off"></i>
						) : (
							<i className="toggle-on fa fa-power-off"></i>
						)}
					</button>
					<button
						className="btn2 btn-modify me-2"
						onClick={() => handleModify(row.id)}
					>
						<i className="fa fa-edit"></i>
					</button>

					<button
						className="btn2 btn-delete me-2"
						onClick={() => handleDelete(row.id)}
					>
						<i className="fa fa-trash"></i>
					</button>
				</div>
			),
			ignoreRowClick: true,
			button: true,
			minWidth: "210px",
		},
	];

	////////////////////////////
	// SET DATABLES THEME
	////////////////////////////
	createTheme(
		"tradeTheme",
		{
			text: {
				primary: "#333333",
				secondary: "#5517DC",
			},
			background: {
				default: "#f0f0f0",
			},
			context: {
				background: "#ffae42",
				text: "#000000",
			},
			divider: {
				default: "#cccccc",
			},
			action: {
				button: "#5517DC",
				hover: "#ff8c66",
				disabled: "#999999",
			},
		},
		"light"
	);

	////////////////////////////
	// MANAGE ACTIVATION
	////////////////////////////
	const handleActivateCourse = async (courseStatus, courseId) => {
		const action = courseStatus ? "Desactivar" : "Activar";

		Swal.fire({
			title: "Confirme Accion",
			text: `Esta seguro que desea ${action} este curso?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `${action}`,
			cancelButtonText: "Cancel",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				handleCourseStatus(courseStatus, courseId);
			}
		});
	};

	const handleCourseStatus = async (courseStatus, courseId) => {
		console.log("Course", courseStatus, courseId);

		if (courseStatus === true) {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_COURSES_DEACTIVATE}/${courseId}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "¡Curso desactivado con éxito!",
						text: `El curso ha sido desactivado exitosamente.`,
						showConfirmButton: false,
						timer: 1000,
					}).then(() => {
						window.location.href = "/administrar-todos";
					});
				} else {
					Swal.fire({
						title: "¡Ups! Algo salió mal",
						text: `Lo sentimos, no se pudo desactivar el curso en este momento. Por favor, inténtalo de nuevo más tarde`,
						icon: "error",
					});
				}
			} catch (error) {
				console.log(error);
				Swal.fire({
					title: "¡Error de procesamiento de activacion!",
					text:
						"Parece que ocurrió un error mientras procesábamos tu solicitud. Por favor, inténtalo nuevamente más tarde. Si el problema persiste, ponte en contacto con el equipo de soporte para obtener asistencia adicional.",
					icon: "error",
				});
			}
		} else {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_ROOT_URL}${process.env.REACT_APP_COURSES_ACTIVATE}/${courseId}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "¡Curso activado con éxito!",
						text: `El curso ha sido activado exitosamente.`,
						showConfirmButton: false,
						timer: 2500,
					}).then(() => {
						window.location.href = "/administrar-todos";
					});
				} else {
					Swal.fire({
						title: "¡Ups! Algo salió mal",
						text: `Lo sentimos, no se pudo activar el curso en este momento. Por favor, inténtalo de nuevo más tarde`,
						icon: "error",
					});
				}
			} catch (error) {
				Swal.fire({
					title: "¡Error de procesamiento de desactivacion!",
					text:
						"Parece que ocurrió un error mientras procesábamos tu solicitud. Por favor, inténtalo nuevamente más tarde. Si el problema persiste, ponte en contacto con el equipo de soporte para obtener asistencia adicional.",
					icon: "error",
				});
			}
		}
	};

	////////////////////////////
	// COURSE DELETE
	////////////////////////////
	const handleDeleteCourse = async (courseId) => {
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "¡Curso eliminado con éxito!",
			text: `El curso ha sido eliminado exitosamente.`,
			showConfirmButton: false,
			confirmButtonText: `Eliminar`,
			timer: 2500,
		}).then(() => {
			window.location.href = "/administrar-todos";
		});
	};

	const handleDelete = (courseId) => {
		Swal.fire({
			title: "Confirme Accion",
			text: `Esta seguro que desea eliminar este curso?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Eliminar",
			cancelButtonText: "Cancel",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				handleDeleteCourse(courseId);
			}
		});
	};

	////////////////////////////
	// REDIRECT TO MODIFY
	////////////////////////////
	const handleModify = (id) => {
		window.location.href = `/modify/${id}`;
	};

	const paginationComponentOptions = {
		rowsPerPageText: "Filas por página",
		rangeSeparatorText: "de",
		selectAllRowsItem: true,
		selectAllRowsItemText: "Todos",
	};

	return (
		<div className="container-fluid table-container px-5 mt-3">
			<DataTable
				columns={columns}
				data={coursesData}
				pagination
				theme={"tradeTheme"}
				responsive={true}
				style={{ fontSize: "18px" }}
				paginationComponentOptions={paginationComponentOptions}
			/>
		</div>
	);
};
export default AdminAllCourses;
