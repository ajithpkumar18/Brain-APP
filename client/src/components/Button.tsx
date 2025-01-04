import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text?: string;
    startIcon?: ReactElement;
    onClick?: () => void;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600 font-light just"
}

const defaultStyles = "px-4 py-2 rounded-md flex items-center justify-between"

export const Button = (props: ButtonProps) => {
    const { variant, text, startIcon, onClick } = props
    return (
        <button className={`${variantClasses[variant]} ${defaultStyles}`} onClick={onClick}>
            <div className="pr-2">
                {startIcon}
            </div>

            {text}</button>
    )
} 