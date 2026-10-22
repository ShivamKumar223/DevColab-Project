import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const welcome = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/api/welcome`, {
          method: "GET",
          credentials: "include"
        });
        const { name, role } = await res.json();
        setUserName(name);
        setRole(role);
      } catch (error) {
        console.log("Data fetching error for welcome : ", error);
      }
    }
    welcome();
  }, [])

  return (
    <div className="min-h-screen w-full md:w-[80%] bg-gray-700 absolute top-20 md:top-0 right-0 p-4 md:p-6 text-white flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="p-5 w-full bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h1 className="text-xl md:text-[2rem] font-bold text-green-400">Welcome {userName} 😃 !</h1>
        <p className="text-sm md:text-base text-gray-300 mt-1">You have 4 active projects and 3 due today</p>
        <NavLink className={role === "Employee" ? "hidden" : "inline-block"} to="/projectform">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 mt-4 rounded-md font-medium text-sm transition-all" title="Click to create new project">
            + New Project
          </button>
        </NavLink>
      </div>

      {/* Grid Layout for Taskboard & Activity Feed */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Task Board */}
        <div className="p-5 w-full lg:w-[70%] bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <h1 className="text-lg md:text-[1.5rem] font-bold mb-4">Task Board</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NavLink to="/todo" className="p-4 bg-gray-900 rounded-lg text-center hover:bg-blue-600 font-medium transition-all shadow">To-Do</NavLink>
            <NavLink to="/inprogress" className="p-4 bg-gray-900 rounded-lg text-center hover:bg-blue-600 font-medium transition-all shadow">In Progress</NavLink>
            <NavLink to="/review" className="p-4 bg-gray-900 rounded-lg text-center hover:bg-blue-600 font-medium transition-all shadow">Review</NavLink>
            <NavLink to="/complete" className="p-4 bg-gray-900 rounded-lg text-center hover:bg-blue-600 font-medium transition-all shadow">Complete</NavLink>
            <button className="p-4 bg-gray-900 rounded-lg text-center hover:bg-blue-600 font-medium transition-all shadow sm:col-span-2">Team Status</button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="p-5 w-full lg:w-[30%] bg-gray-800 rounded-lg shadow-md border border-gray-700 max-h-80 overflow-y-auto">
          <h1 className="text-lg md:text-[1.5rem] font-bold mb-2">Activity Feed</h1>
          <p className="text-sm text-gray-400">No updates yet.</p>
        </div>
      </div>
    </div>
  )
}