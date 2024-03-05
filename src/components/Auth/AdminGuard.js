import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminGuard = ({
	component: Component,
	userRole,
	isAuthenticated,
	...rest
}) => {
	if (!isAuthenticated && userRole !== "admin") {
		return <Redirect to="/" />;
	}

	return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default AdminGuard;
