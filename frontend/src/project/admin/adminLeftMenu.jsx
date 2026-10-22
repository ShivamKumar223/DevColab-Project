import { IoMdHome } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { FaElementor } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export const AdminMenu = () => {
    return (
        <div className="w-full md:w-[20%] md:h-screen bg-gray-800 flex flex-col md:absolute left-0 top-0 z-10 p-4 md:p-0 shadow-md text-white">
            <div className="w-full flex flex-col gap-2 md:mt-20">
               <NavLink to="/admin/dashboard" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><IoMdHome className="text-lg"/>Home</NavLink>
               <NavLink to="/admin/dashboard/admins" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><RiAdminFill className="text-lg"/>Admins</NavLink>
               <NavLink to="/admin/dashboard/mentors" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><FaElementor className="text-lg"/>Mentors</NavLink>
               <NavLink to="/admin/dashboard/employees" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><FaPeopleGroup className="text-lg"/>Employee</NavLink>
               <NavLink to="/" className="hover:bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm md:text-base"><HiOutlineLogout className="text-lg"/>Log out</NavLink>

               <NavLink to="/myTodo" className="mt-4 md:mt-8 flex justify-center items-center">
                  <span className="bg-blue-500 hover:bg-blue-600 transition-all flex justify-center items-center rounded-full h-10 w-full md:w-[80%] text-center font-medium shadow">My To-do</span>
               </NavLink>
            </div>
        </div>
    )
}