const ButtonLoadingIndicator = () => (
	<div className="d-flex justify-content-center align-items-center">
		<div className="text-center" style={{ minWidth: "100%", height: "55px" }}>
			<div
				className="spinner-grow text-dark "
				role="status"
				style={{ width: "0.5rem", height: "0.5rem" }}
			>
				<span className="sr-only">Loading...</span>
			</div>
			<div
				className="spinner-grow text-dark "
				role="status"
				style={{ width: "0.5rem", height: "0.5rem", marginLeft: "10px" }}
			>
				<span className="sr-only">Loading...</span>
			</div>
			<div
				className="spinner-grow text-dark "
				role="status"
				style={{ width: "0.5rem", height: "0.5rem", marginLeft: "10px" }}
			>
				<span className="sr-only">Loading...</span>
			</div>

			<div
				className="spinner-grow text-dark "
				role="status"
				style={{ width: "0.5rem", height: "0.5rem", marginLeft: "10px" }}
			>
				<span className="sr-only">Loading...</span>
			</div>
			<div
				className="spinner-grow text-dark "
				role="status"
				style={{ width: "0.5rem", height: "0.5rem", marginLeft: "10px" }}
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	</div>
);

export default ButtonLoadingIndicator