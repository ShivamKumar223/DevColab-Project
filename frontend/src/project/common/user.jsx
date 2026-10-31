import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const User = () => {
    const [userName, setUserName] = useState("Developer");

    useEffect(() => {
        const welcome = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/welcome`, {
                    method: "GET",
                    credentials: "include"
                });
                const data = await res.json();
                if (data && data.name) {
                    setUserName(data.name);
                }
            } catch (error) {
                console.log("Data fetching error for welcome : ", error);
            }
        };
        welcome();
    }, []);

    return (
        <div className="w-full md:w-[20%] md:fixed md:bottom-0 flex items-center justify-between p-3 bg-gray-900 border-t border-gray-800 text-white z-20 lg:left-0 shadow-md">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-9 w-9 flex-shrink-0 rounded-full overflow-hidden border border-blue-500 shadow">
                    <img className="w-full h-full object-cover" src="/shivam.png" alt="User" />
                </div>
                <div className="truncate text-sm font-medium">
                    {/* <p className="text-xs text-gray-400">Welcome,</p> */}
                    <p className="truncate">{userName}</p>
                </div>
            </div>
            <NavLink to="/" className="text-xs text-blue-400 hover:text-blue-300 hover:underline font-medium px-2 py-1 rounded transition-all whitespace-nowrap">
                Log out
            </NavLink>
        </div>
    )
}