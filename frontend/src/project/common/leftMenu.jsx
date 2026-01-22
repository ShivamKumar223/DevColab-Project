import { IoMdHome } from "react-icons/io";
import { FaDiagramProject } from "react-icons/fa6";
import { PiMicrosoftTeamsLogoBold } from "react-icons/pi";
import { FaTasks } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { SlCalender } from "react-icons/sl";
import { MdOutlineSettings } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export const LeftMenu =()=>{

    return (

        <div className="h-screen w-[20%] bg-gray-800 absolute  rounded-[1px] flex ">
           <div className="h-[32rem] w-[20rem] flex flex-col gap-1 mt-10">
             <NavLink to="/dashboard" className=" h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline"><IoMdHome/>Home</NavLink>
             <NavLink to="/projects" className="h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline"><FaDiagramProject/>Projects</NavLink>
             <NavLink to="/teams" className="h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline"><PiMicrosoftTeamsLogoBold/>Teams</NavLink>
             <NavLink to="/tasks" className="h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline"><FaTasks/>Tasks</NavLink>
             <NavLink to="/messages" className="h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline"><TiMessages/>Messages</NavLink>
             {/* <NavLink to="/calendar" className="h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline"><SlCalender/>Calendar</NavLink>
             <NavLink to="/settings" className="h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline"><MdOutlineSettings/>Settings</NavLink> */}
             <NavLink to="/" className="h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline"><HiOutlineLogout/>Log out</NavLink>

             <NavLink to="/myTodo" className="h-7 hover:bg-gray-700 flex items-center gap-2 pl-[3rem] pt-[1.5rem] pb-[1.5rem] hover:text-[0.9rem] hover:underline relative top-9" >
             <span className="bg-blue-500 flex justify-center items-center rounded-[2rem]  h-10 w-[60%] text-center">My To-do</span>
             </NavLink>
           </div>
        </div>
    )
}