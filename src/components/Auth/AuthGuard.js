import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthGuard = ({ component: Component, isAuthenticated, ...rest }) => {
	if (!isAuthenticated) {
		return <Redirect to="/login" />;
	} else {
		return (
			<Route
				{...rest}
				render={(props) =>
					isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
				}
			/>
		);
	}
};

export default AuthGuard;
