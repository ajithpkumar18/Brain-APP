import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isValidJWT } from "../../utils";
import useJwt from "../../components/hooks/useJwt";

export const Private = ({ children }: { children: ReactElement }) => {
	const { jwt } = useJwt();

	return isValidJWT(jwt as string) ? <Navigate to={"/signin"} /> : children;
};
