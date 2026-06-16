import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import useJwt from "../../components/hooks/useJwt";

export const Private = ({ children }: { children: ReactElement }) => {
	const { isLoggedIn } = useJwt();
	console.log("isLoggedIn", isLoggedIn);
	if (isLoggedIn == null) {
		console.log("null");
		return null;
	}

	return isLoggedIn ? children : <Navigate to={"/signin"} />;
};
