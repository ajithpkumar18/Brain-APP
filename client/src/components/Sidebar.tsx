import { useNavigate } from "react-router-dom";
import { HomeICon } from "./Icons/Home";
import { Links } from "./Icons/Links";
import { Logo } from "./Icons/Logo";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
	const Navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		if (localStorage.getItem("token") == null) Navigate("/signin");
	};

	return (
		<div className='top-0 left-0 w-96 h-screen'>
			<div className='flex p-6 items-center gap-3'>
				<div className='text-purple-600'>
					<Logo />
				</div>
				<p className='text-3xl font-bold'>Brainly</p>
			</div>
			<div className='h-fit border-b-0 border-t-2 border-r-slate-200 pt-10'>
				<SidebarItem text='Youtube' icon={<HomeICon />} />
				<SidebarItem text='Twitter' icon={<Links />} />
				{/* <SidebarItem text="Home" icon={<HomeICon />} />
            <SidebarItem text="Home" icon={<HomeICon />} /> */}
				<SidebarItem
					onClick={handleLogout}
					text='Logout'
					icon={<Links />}
				/>
			</div>
		</div>
	);
};
