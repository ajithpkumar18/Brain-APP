interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick: () => void;
}

const varianStyles = {
    "primary": "text-white bg-purple-600",
    "secondary": "text-purple-500 bg-purple-300"
}

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6",
}

const defaultStyles = "rounded-md flex"

export const Button = (props: ButtonProps) => {
    const { variant, size, text, startIcon, endIcon, onClick } = props;

    return <button className={`${varianStyles[variant]} ${sizeStyles[size]} ${defaultStyles}`} onClick={() => onClick()}>
        {startIcon ? <div className="pr-2">{startIcon}</div> : null}
        {text}
        {endIcon}
    </button >
}