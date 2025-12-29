import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const Anonymous = () => {
	const [jwt, setJwt] = useState(localStorage.getItem("token"));

	useEffect(() => {
		setJwt(localStorage.getItem("token"));
	}, [jwt]);

	return jwt ? <Navigate to='/dashboard' replace /> : <Outlet />;
};
