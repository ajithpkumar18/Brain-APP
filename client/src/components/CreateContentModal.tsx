import { Button } from "./Button";
import { CrossIcon } from "./Icons/CrossIcon"

interface ModalProps {
    open: boolean;
    onClick: () => void;
}

export const CreateContentModal = ({ open, onClick }: ModalProps) => {
    return <div>
        {open && <div className="w-screen h-screen bg-slate-800 fixed top-0 left-0 opacity-60 flex justify-center ">
            <div className=" flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end" >
                        <div className="cursor-pointer" onClick={onClick}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div>
                        <Input placeholder={"name"} onChange={() => "hello"} />
                        <Input placeholder={"name"} onChange={() => "hello"} />
                    </div>
                    <div className="flex justify-center">
                        <Button variant={"primary"} text={"Submit"} />
                    </div>
                </span>
            </div>
        </div>}
    </div>
}

const Input = ({ placeholder, onChange }: { placeholder: string, onChange: () => void }) => {
    return (
        <div>
            <input placeholder={placeholder} type={"text"} className="px-4 py-2 border hover:border-gray-500 rounded m-2" onChange={onChange} />
        </div>
    )
}