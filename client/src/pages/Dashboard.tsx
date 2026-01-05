import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { contents, CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../components/Icons/PlusIcon";
import { ShareIcon } from "../components/Icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../components/hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import DataToRender from "../components/DataToRender";

function Dashboard() {
	const [modal, setModal] = useState(false);
	const { contents, refresh, loading, isLoading } = useContent();
	const [filter, setFilter] = useState("all");
	useEffect(() => {
		refresh();
		isLoading(false);
	}, [modal]);

	const dataToRender = useMemo(() => {
		const filtered =
			filter === "all"
				? contents
				: contents?.filter(
						(content: { type: contents }) => content.type == filter
				  );

		return filtered?.length > 0 ? filtered : contents;
	}, [filter, contents]);

	async function handleShare(val: boolean) {
		let response = await axios.post(
			`${BACKEND_URL}/api/v1/brain/share`,
			{ share: val },
			{
				headers: {
					authorization: localStorage.getItem("token"),
				},
			}
		);
		if (!val) {
			alert("Shareing stoppped");
			return;
		}
		let hash = response.data.link;
		hash && alert(`http://localhost:5173/dashboard/${hash}`);
	}
	return (
		<div className='flex'>
			<Sidebar setFilter={setFilter} />
			<div className='p-4 w-full min-h-screen  bg-gradient-to-b from-indigo-500 from-10% via-blue-500 via-30% to-blue-900 to-90%'>
				<CreateContentModal
					open={modal}
					onClose={() => {
						setModal(false);
					}}
				/>
				<div className='flex justify-end gap-4'>
					<Button
						loading={false}
						width='normal'
						variant={"temp"}
						text={"Add content"}
						startIcon={<PlusIcon size={"size-4"} />}
						onClick={() => {
							setModal(true);
						}}
					/>
					<Button
						onClick={() => handleShare(true)}
						loading={false}
						width='normal'
						variant={"dark"}
						text={"Share Brain"}
						startIcon={<ShareIcon size={"size-4"} />}
					/>
					<Button
						onClick={() => handleShare(false)}
						loading={false}
						width='normal'
						variant={"dark"}
						text={"Stop Share"}
						startIcon={<ShareIcon size={"size-4"} />}
					/>
				</div>
				{dataToRender && (
					<DataToRender
						dataToRender={dataToRender}
						loading={loading}
					/>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
