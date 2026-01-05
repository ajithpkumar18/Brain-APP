import { Navigate, Outlet } from "react-router-dom";
import { isValidJWT } from "../../utils";
import useJwt from "../../components/hooks/useJwt";

export const Anonymous = () => {
	const { jwt } = useJwt();

	return isValidJWT(jwt as string) ? (
		<Outlet />
	) : (
		<Navigate to='/dashboard' replace />
	);
};
