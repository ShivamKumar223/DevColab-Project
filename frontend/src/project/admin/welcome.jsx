import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const Welcome = () => {
    const [userName, setUserName] = useState("Developer");

    useEffect(() => {
        const welcome = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/welcome`, {
                    method: "GET",
                    credentials: "include",
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
        <div className="w-full bg-gray-700 p-4 md:p-6 text-white">
            <div className="p-6 md:p-8 w-full bg-gray-800 rounded-lg shadow-lg flex flex-col gap-4 border border-gray-700">
                <h1 className="text-xl md:text-3xl font-bold text-green-400 flex items-center gap-2">
                    Welcome {userName} 😃!
                </h1>
                <p className="text-sm md:text-base text-gray-300">
                    You have 4 active projects and 3 due today.
                </p>
                <div>
                    <NavLink to="/admin/candidateform">
                        <button className="bg-blue-600 hover:bg-blue-700 transition-all w-full sm:w-44 h-11 rounded-lg text-sm font-medium shadow flex justify-center items-center" title="Click to create new candidate/project">
                            + New Candidate
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};