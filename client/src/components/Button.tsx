import { ReactElement } from "react";

interface ButtonProps {
	variant: "primary" | "secondary" | "white" | "temp";
	text?: string;
	startIcon?: ReactElement;
	onClick?: () => void;
	width: "full" | "normal";
	loading: boolean;
}

const variantClasses = {
	primary: "bg-purple-600 text-white",
	secondary: "bg-purple-200 text-purple-600 font-light justify-center",
	white: "bg-white font-medium text-sky-600 font-light justify-center h-14",
	temp: "bg-blue-600 text-white",
};

const defaultStyles = `px-4 py-2 rounded-md flex items-center`;

export const Button = (props: ButtonProps) => {
	const { variant, text, startIcon, onClick, width, loading } = props;
	return (
		<button
			className={`${variantClasses[variant]} ${defaultStyles} ${
				width == "full" ? "w-full flex" : ""
			} ${startIcon ? "justify-between" : "justify-center"} ${
				loading ? "opacity-60 cursor-default" : ""
			}`}
			onClick={onClick}
		>
			<div className='pr-2 '>{startIcon}</div>
			{text}
		</button>
	);
};
