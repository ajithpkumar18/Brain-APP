import { useEffect, useState } from "react";

const useJwt = () => {
	const [jwt, setJwt] = useState(localStorage.getItem("token"));

	useEffect(() => {
		setJwt(localStorage.getItem("token"));
	}, [jwt]);
	return { jwt };
};

export default useJwt;
