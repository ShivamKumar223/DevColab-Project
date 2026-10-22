import { IoMdHome } from "react-icons/io";
import { FaDiagramProject } from "react-icons/fa6";
import { PiMicrosoftTeamsLogoBold } from "react-icons/pi";
import { FaTasks } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { SlCalender } from "react-icons/sl";
import { MdOutlineSettings } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export const LeftMenu = () => {
    return (
        <div className="w-full md:w-[20%] md:h-screen bg-gray-800 flex flex-col md:absolute left-0 top-0 z-10 p-4 md:p-0 shadow-md text-white">
            <div className="w-full flex flex-col gap-2 md:mt-20">
               <NavLink to="/dashboard" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><IoMdHome className="text-lg"/>Home</NavLink>
               <NavLink to="/projects" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><FaDiagramProject className="text-lg"/>Projects</NavLink>
               <NavLink to="/teams" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><PiMicrosoftTeamsLogoBold className="text-lg"/>Teams</NavLink>
               <NavLink to="/tasks" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><FaTasks className="text-lg"/>Tasks</NavLink>
               <NavLink to="/messages" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><TiMessages className="text-lg"/>Messages</NavLink>
               {/* <NavLink to="/calendar" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><SlCalender className="text-lg"/>Calendar</NavLink>
               <NavLink to="/settings" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><MdOutlineSettings className="text-lg"/>Settings</NavLink> */}
               <NavLink to="/" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><HiOutlineLogout className="text-lg"/>Log out</NavLink>

               <NavLink to="/myTodo" className="mt-4 md:mt-8 flex justify-center items-center">
                  <span className="bg-blue-500 hover:bg-blue-600 transition-all flex justify-center items-center rounded-full h-10 w-full md:w-[80%] text-center font-medium shadow">My To-do</span>
               </NavLink>
            </div>
        </div>
    )
}