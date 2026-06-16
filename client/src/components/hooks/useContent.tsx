import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useContent = () => {
	const navigate = useNavigate();
	const [contents, setContents] = useState([]);
	const [loading, isLoading] = useState(true);
	async function refresh() {
		try {
			const response = await axios.get(
				`${BACKEND_URL}/api/v1/user/content`,
				{
					withCredentials: true,
				},
			);

			setContents(response?.data.content);
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

		return () => clearInterval(interval);
	}, []);

	return { contents, refresh, loading, isLoading };
};
