import { useNavigate } from "react-router"
import assets, { userDummyData } from "../assets/assets"

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const navigate = useNavigate();
    return (
        <div className={`bg-[#818582]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <img src={assets.logo} alt="logo" className="max-w-40" />

                    {/* Menu */}
                    <div className="relative py-2 group">
                        <img src={assets.menu_icon} alt="Menu" className="max-h-5 cursor-pointer" />

                        {/* Dropdown menu */}
                        <div className="absolute right-0 mt-2 w-40 shadow-lg rounded-md opacity-0 bg-gray-800 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <p onClick={() => navigate("/profile")} className="cursor-pointer text-sm px-4 py-2 hover:bg-gray-900">Edit Profile</p>
                            <hr className="border-t border-gray-500" />
                            <p className="cursor-pointer text-sm px-4 py-2 hover:bg-gray-900">Logout</p>
                        </div>
                    </div>
                </div>

                {/* search  */}
                <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
                    <img src={assets.search_icon} alt="Search" className="w-3" />
                    <input type="text" className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1" placeholder="Search User..." />
                </div>

                {/* user */}
                <div className="flex flex-col mt-4">
                    {userDummyData.map((user, index) => {
                        return (
                            <div onClick={()=>{setSelectedUser(user)}} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]'}`} key={index}>
                                <img src={user?.profilePic || assets.avatar_icon} alt="" class="w-[35px] aspect-[1/1] rounded-full" />
                                <div>
                                    <p>{user.fullName}</p>
                                    {
                                        index < 3 ? <span className="text-green-400 text-xs">Online</span> : <span className="text-gray-400 text-xs">Offline</span>
                                    }
                                </div>
                                {
                                    index > 2 && <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">{index}</p>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default Sidebar