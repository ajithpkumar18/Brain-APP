import { ReactElement, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const Private = ({ children }: { children: ReactElement }) => {
	const [jwt, setJwt] = useState(localStorage.getItem("token"));

	useEffect(() => {
		setJwt(localStorage.getItem("token"));
		console.log("UseEffect");
	}, [jwt]);

	return jwt ? children : <Navigate to={"/signin"} />;
};
