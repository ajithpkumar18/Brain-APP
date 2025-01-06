import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()
    const signUP = async () => {
        let username = usernameRef.current?.value;
        let password = passwordRef.current?.value;

        const response = await axios.post(`${BACKEND_URL}` + "/api/v1/user/signup",
            {
                username,
                password
            }
        )

        if (response.status === 200) {
            navigate("/signin")
        }

        console.log("signed up")
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-10 rounded-md flex flex-col gap-3">
                <Input compRef={usernameRef} placeholder={"username"} />
                <Input compRef={passwordRef} placeholder={"password"} />
                <Button variant={"primary"} text="Submit" width={"full"} loading={false} onClick={signUP} />
            </div>
        </div>
    )
}