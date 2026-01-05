import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useContent = () => {
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();
	const [contents, setContents] = useState([]);
	const [loading, isLoading] = useState(true);
	function refresh() {
		try {
			axios
				.get(`${BACKEND_URL}/api/v1/user/content`, {
					headers: {
						authorization: localStorage.getItem("token"),
					},
				})
				.then((response) => {
					setContents(response.data.content);
				});
		} catch (e) {
			navigate("/notfound");
		}
	}

	useEffect(() => {
		refresh();
		isLoading(false);

		let interval = setInterval(() => {
			refresh();
		}, 10 * 1000);

		return clearInterval(interval);
	}, []);

	return { contents, refresh, loading, isLoading };
};
