import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between items-center px-4 py-2">
        <Link to={'/blogs'} className="flex flex-col text-2xl justify-center cursor-pointer font-bold">
                Campus Chronicles
        </Link>
        <div className="flex items-center justify-center">
            <Link to={`/publish`} className="flex items-center justify-center space-x-1">
                {/* <img src="/edit.png" height={30} width={30}></img> */}
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-gray-600 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center"><img src="/edit.png" height={30} width={30} className="mx-2"></img>New</button>
            </Link>

            {/* <Avatar size={"big"} name="Manish" /> */}
        </div>
    </div>
}