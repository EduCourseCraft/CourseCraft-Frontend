const CustomPlaceholder = () => (
	<div className="d-flex justify-content-center align-items-center vh-100">
		<div
			className="text-center"
			style={{ minWidth: "100%", minHeight: "300px", marginTop: "120px" }}
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

export default CustomPlaceholder;