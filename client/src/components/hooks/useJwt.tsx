import { useEffect, useState } from "react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useJwt = () => {
	const [isLoggedIn, setIsLoggenIn] = useState<boolean | null>(null);

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/user/me`, {
				withCredentials: true,
			})
			.then(() => setIsLoggenIn(true))
			.catch(() => setIsLoggenIn(false));
	}, []);
	return { isLoggedIn };
};

export default useJwt;
