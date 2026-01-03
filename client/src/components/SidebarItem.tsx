import { ReactElement } from "react";

export const SidebarItem = ({
	icon,
	text,
	onClick,
}: {
	icon?: ReactElement;
	text?: string;
	onClick?: () => void;
}) => {
	return (
		<div
			className='flex max-w-full  mx-5 px-5 rounded-xl py-4 gap-4 transition hover:bg-white/10 hover:scale-[1.05]  cursor-pointer'
			onClick={onClick}
		>
			<span className=' text-blue-500 hover:text-blue-500'>{icon}</span>
			<span className='text-md font-semibold text-blue-600 hover:text-blue-500'>
				{text}
			</span>
		</div>
	);
};
