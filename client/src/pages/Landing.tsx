import { Link } from "react-router-dom"

function Landing() {
    return (
        <div className="h-screen w-screen landing relative bg-gradient-to-b from-indigo-500 from-10% via-blue-500 via-30% to-blue-900 to-90%">
            <div className="bg-[url(/landing.jpg)] h-full w-full bg-fit absolute top-0 left-0 bg-no-repeat bg-fixed bg-cover bg-center opacity-70">
            </div>
            <div className="absolute  w-screen h-screen flex flex-col items-center justify-center">
                <div className="h-3/5 w-screen flex justify-center items-center text-white sm:5xl lg:text-7xl font-semibold">
                    <div className="w-3/5 text-center pt-20 font-lato leading-[1.3em]">
                        Organize and Access Your Favourite Contents
                    </div>
                </div>
                <div className=" w-2/6 h-2/5 flex items-center justify-center gap-10 pb-36">
                    <Link className="bg-white w-44 rounded-md flex items-center  text-sky-600 font-medium justify-center h-14" to={"/signin"} >Signin</Link>
                    <Link className="bg-white w-44 rounded-md flex items-center  text-sky-600 font-medium justify-center h-14" to={"/signup"}>Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Landing