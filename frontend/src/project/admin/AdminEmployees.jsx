import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AdminEmployees = () => {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState(() => {
        try {
            const cookie = Cookies.get("DevColab");
            return cookie ? JSON.parse(cookie) : { companyCode: "" };
        } catch {
            return { companyCode: "" };
        }
    })
    const companyCode = userDetails.companyCode;
    const getAllUsers = async () => {
         const API_URL = import.meta.env.VITE_API_URL;
         const res = await fetch(`${API_URL}/admin/getAllUsers?companyCode=${companyCode.trim()}`,{
            method:"GET",
            credentials:"include",
         });
         const { users } = await res.json();
         setUsers([...users]);
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    if(users.length === 0)
       return <div className="min-h-screen w-full md:w-[80%] absolute right-0 bg-gray-700 flex justify-center items-center text-xl md:text-[2rem] text-white">
          <h1>Loading...</h1>
       </div>

    return <div className="min-h-screen w-full md:w-[80%] absolute right-0 bg-gray-700 pt-16 md:pt-6 pb-6 text-white">
         <div className="mx-4 md:mx-9 p-4 md:p-5 bg-gray-800 rounded-[1rem] shadow-lg">
            <h2 className="text-lg md:text-xl font-bold border-b border-gray-600 pb-2 mb-4 w-full">All Employees</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[75vh] overflow-y-auto scrollbar-none">
            {
                users.map((user, ind) => {
                    if(user.role === "Employee")
                    return <li className="bg-gray-900 p-4 rounded-[1rem] shadow-md hover:shadow-2xl transition-all flex flex-col gap-1" key={ind}>
                        <p className="font-semibold text-blue-400">ID: {user.empID}</p>
                        <p className="text-lg font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">Role: {user.role}</p>
                        <p className="text-sm text-gray-300">Phone: {user.pNumber}</p>
                        <p className="text-sm text-gray-300 truncate">Email: {user.email}</p>
                    </li>
                })
            }
           </ul>
         </div>
    </div>
}