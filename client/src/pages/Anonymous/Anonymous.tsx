import { Navigate, Outlet } from "react-router-dom";
import { isValidJWT } from "../../utils";
import useJwt from "../../components/hooks/useJwt";

export const Anonymous = () => {
	const { isLoggedIn } = useJwt();

	if (isLoggedIn == null) return null;
	return isLoggedIn ? <Navigate to='/dashboard' replace /> : <Outlet />;
};
