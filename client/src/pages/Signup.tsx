import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const usernameRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const navigate = useNavigate();
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
	const signUP = async () => {
		let username = usernameRef.current?.value;
		let password = passwordRef.current?.value;

		const response = await axios.post(
			`${BACKEND_URL}` + "/api/v1/user/signup",
			{
				username,
				password,
			}
		);

		if (response.status === 200) {
			navigate("/signin");
		}

		console.log("signed up");
	};
	return (
		<div className='h-screen w-screen flex justify-center items-center bg-gray-200'>
			<div className='h-screen w-screen landing relative bg-gradient-to-b from-indigo-500 from-10% via-blue-600 via-30% to-blue-900 to-90%'>
				<div className='bg-[url(/landing.jpg)] h-full w-full bg-fit absolute top-0 left-0 bg-no-repeat bg-fixed bg-cover bg-center opacity-70'></div>
			</div>
			<div className=' backdrop-filter backdrop-blur-md bg-opacity-15 bg-blue-400 absolute px-20 mx-auto rounded-2xl flex flex-col gap-3 py-16'>
				<h1 className='text-center text-3xl font-semibold text-white mb-3'>
					Sign up
				</h1>
				<Input compRef={usernameRef} placeholder={"username"} />
				<Input compRef={passwordRef} placeholder={"password"} />
				<Button
					variant={"temp"}
					text='Submit'
					width={"full"}
					loading={false}
					onClick={signUP}
				/>
				<p className='text-sm text-white'>
					Already a user?
					<Link
						to={"/signin"}
						className=' hover:text-blue-500 hover:underline'
					>
						{" "}
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
};
