import { Navbar } from "../navbar.jsx";
import { User } from "../user.jsx";
import { LeftMenu } from "../leftMenu.jsx";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const ProjectsPage = () => {
    return (
        <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden">
            <Navbar />
            <div className="flex flex-col md:flex-row">
                <LeftMenu />
                <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col">
                    <User />
                    <Projects />
                </div>
            </div>
        </div>
    )
}

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [user, setUser] = useState(() => {
        return JSON.parse(Cookies.get("DevColab"));
    });

    useEffect(() => {
        const getProjects = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/getProjects`, {
                    method: "GET",
                    credentials: "include"
                });

                const res1 = await fetch(`${API_URL}/api/allTask`, {
                    method: "GET",
                    credentials: "include"
                });
                const projectsData = await res.json();
                setProjects([...projectsData]);
                const alltaskData = await res1.json();
                setAllTask([...alltaskData]);
            } catch (error) {
                console.log("Error in projects : ", error);
            }
        }
        
        getProjects();
    }, []);

    return (
        <div className="w-full bg-gray-700 min-h-screen p-4 md:p-6 text-white overflow-auto scrollbar-none">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-4 rounded-lg shadow mb-6 gap-4">
                <h1 className="text-xl md:text-[2rem] font-bold">
                    {projects.length === 0 ? "No projects found" : "All Projects"}
                </h1>
                <NavLink 
                    className={`${user.role === "Employee" ? "hidden" : "block"}`} 
                    to="/projectform"
                >
                    <button className="bg-blue-600 hover:bg-blue-700 transition-all h-10 px-4 rounded font-medium text-sm shadow">
                        + New Project
                    </button>
                </NavLink>
            </div> 

            {/* Projects Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-12">
               { 
                 projects.map((project, ind) => {
                    var count = 0;
                    const tempTask = allTask.filter((task) => {
                        if (task.project === project.name) {
                            if (task.status === "complete") count++;
                            return task;
                        }
                    });

                    let length = 0;
                    if (tempTask.length !== 0) { 
                        length = ((100 / tempTask.length) * count).toFixed(2);
                    }

                    let color = "red";
                    if (length > 33 && length < 66) color = "blue";
                    else if (length >= 66 && length <= 100) color = "green";

                    const colors = {
                       red: "bg-red-600",
                       blue: "bg-blue-600",
                       green: "bg-green-600",
                    };

                    if (project.assignTo.includes(user.empID))
                    return (
                        <NavLink 
                            key={ind} 
                            onClick={() => localStorage.setItem("currentProject", project.name)} 
                            to="/projectDetails" 
                            className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between border border-gray-700 gap-4"
                        >
                            <div>
                                <h2 className="pb-2 text-lg md:text-xl font-bold truncate">{project.name}</h2>
                                <p className="h-20 overflow-y-auto break-words text-sm text-gray-300 scrollbar-none">{project.description}</p>
                            </div>

                            <ul className="flex gap-2 flex-wrap w-full max-h-20 overflow-y-auto text-xs text-gray-400">
                                {
                                    project.assignTo.map((person, i) => (
                                        <li key={i} className="bg-gray-900 px-2 py-1 rounded">
                                           {person}   
                                        </li>
                                    ))
                                }
                            </ul>

                            <div className="mt-2">
                                <div className="flex justify-between text-xs mb-1 text-gray-400">
                                    <span>Progress</span>
                                    <span>{length}%</span>
                                </div>
                                <div className="h-3 w-full rounded-full bg-gray-900 overflow-hidden"> 
                                    <div className={`h-full ${colors[color]} rounded-full transition-all duration-500`} 
                                        style={{ width: `${length}%` }}>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    );
                 }) 
               }
            </div>
        </div>
    )
}