import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between items-center px-4 py-2">
        <Link to={'/blogs'} className="flex flex-col text-2xl justify-center cursor-pointer font-bold">
                Campus Chronicles
        </Link>
        <div className="">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>

            <Avatar size={"big"} name="Manish" />
        </div>
    </div>
}