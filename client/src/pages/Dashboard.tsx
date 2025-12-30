import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../components/Icons/PlusIcon";
import { ShareIcon } from "../components/Icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../components/hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
	const [modal, setModal] = useState(false);
	const { contents, refresh } = useContent();

	useEffect(() => {
		refresh();
	}, [modal]);

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
			<Sidebar />
			<div className='p-4 w-full min-h-screen  bg-gradient-to-b from-indigo-500 from-10% via-blue-500 via-30% to-blue-900 to-90%'>
				<CreateContentModal
					open={modal}
					onClose={() => {
						setModal(false);
					}}
				/>
				{/* <Button variant={"primary"} size={"sm"} text={"Heelo"} onClick={() => { }} startIcon={<PlusIcon />} />
                    <Button variant={"primary"} size={"md"} text={"Heelo"} onClick={() => { }} startIcon={"+"} />
                    <Button variant={"secondary"} size={"lg"} text={"Heelo"} onClick={() => { }} startIcon={"+"} /> */}
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
						variant={"tempLight"}
						text={"Share Brain"}
						startIcon={<ShareIcon size={"size-4"} />}
					/>
					<Button
						onClick={() => handleShare(false)}
						loading={false}
						width='normal'
						variant={"tempLight"}
						text={"Stop Share"}
						startIcon={<ShareIcon size={"size-4"} />}
					/>
				</div>
				<div className='flex gap-3 flex-wrap'>
					{/* <Card type={"twitter"} link={"https://x.com/AJITHPKUMAR3/status/1872304992482435459"} title={"My tweet"} />

                    <Card type={"youtube"} link={"https://www.youtube.com/watch?v=zL4cULLyBJY"} title={"Old video "} /> */}

					{contents.map(({ type, link, title }) => (
						<Card type={type} link={link} title={title} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
