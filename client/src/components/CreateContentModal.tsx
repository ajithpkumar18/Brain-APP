import { useRef, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./Icons/CrossIcon"
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface ModalProps {
    open: boolean;
    onClick: () => void;
}

enum contents {
    Youtube = "youtube",
    Twitter = "twitter"
}

export const CreateContentModal = ({ open, onClick }: ModalProps) => {
    const titleRef = useRef<HTMLInputElement>()
    const linkRef = useRef<HTMLInputElement>()
    const [type, setType] = useState(contents.Youtube)

    const addContent = async () => {
        const title = titleRef.current?.value;
        const link = titleRef.current?.value;

        await axios.post(`${BACKEND_URL}` + "/api/v1/user/content", {
            title,
            link,
            type
        }, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
    }

    return <div>
        {open &&
            <div>

                <div className="w-screen h-screen bg-slate-800 fixed top-0 left-0 opacity-60 flex justify-center">
                </div>
                <div className="w-screen h-screen fixed top-0 left-0 flex justify-center ">
                    <div className=" flex flex-col justify-center">
                        <span className="bg-white opacity-100 p-4 rounded">
                            <div className="flex justify-end" >
                                <div className="cursor-pointer" onClick={onClick}>
                                    <CrossIcon />
                                </div>
                            </div>
                            <div>
                                <Input placeholder={"Title"} compRef={titleRef} />
                                <Input placeholder={"Link"} compRef={linkRef} />
                            </div>
                            <h1 className="font-medium">Type :</h1>
                            <div className="flex justify-between p-3">
                                <Button text="Youtube" width="normal" variant={type === contents.Youtube ? "primary" : "secondary"} onClick={() => { setType(contents.Youtube) }} loading={false} />
                                <Button text="Twitter" width="normal" variant={type === contents.Twitter ? "primary" : "secondary"} onClick={() => setType(contents.Twitter)} loading={false} />
                            </div>
                            <div className="flex justify-center">
                                <Button variant={"primary"} text={"Submit"} width={"normal"} loading={false} />
                            </div>
                        </span>
                    </div>
                </div>
            </div>}
    </div>
}

