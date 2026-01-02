import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export const useContent = () => {
	const navigate = useNavigate();
	const [contents, setContents] = useState([]);
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

		let interval = setInterval(() => {
			refresh();
		}, 10 * 1000);

		return clearInterval(interval);
	}, []);

	return { contents, refresh };
};
