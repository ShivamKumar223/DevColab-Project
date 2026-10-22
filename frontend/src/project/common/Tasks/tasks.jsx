import { useEffect, useState } from "react";
import { Navbar } from "../navbar.jsx";
import { User } from "../user.jsx";
import { LeftMenu } from "../leftMenu.jsx";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

export const Tasks = () => {
    return (
        <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden">
            <Navbar />
            <div className="flex flex-col md:flex-row">
                <LeftMenu />
                <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col">
                    <User />
                    <MainPage />
                </div>
            </div>
        </div>
    )
}

const MainPage = () => {
   const [tasks, setTasks] = useState([]);
   const [loading, setLoading] = useState(true);
    
   useEffect(() => {
        const temp = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/allTask`, {
                    method: "GET",
                    credentials: "include",
                });
                const allTask = await res.json();
                
                if (res.ok) {
                    setTasks([...allTask]);
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error fetching all tasks in task.jsx", error);
            }
        };
        temp();
    }, []);

    const handleTask = async (task) => {
        Cookies.set('currentTask', JSON.stringify(task));
    }
        
    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gray-700 flex justify-center items-center"> 
                <h1 className="text-xl md:text-[2rem] font-bold">Loading...</h1>
            </div>
        )
    }

    return (
        <div className="w-full bg-gray-700 min-h-screen p-4 md:p-6 text-white overflow-auto scrollbar-none">
            <div className="p-4 md:p-6 w-full bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-xl md:text-[2rem] font-bold border-b border-gray-700 pb-3 mb-4">
                    {tasks.length === 0 ? "No tasks found" : "All Tasks"}
                </h1>

                <div className="w-full flex flex-col gap-4 bg-gray-700 p-2 md:p-4 rounded-lg shadow scrollbar-none">
                    {
                        tasks.map((currTask, ind) => {
                            let startDate = currTask.startDate ? new Date(currTask.startDate).toLocaleDateString() : "";
                            let dueDate = currTask.dueDate ? new Date(currTask.dueDate).toLocaleDateString() : "";

                            return (
                                <div key={ind} className="bg-gray-800 w-full min-h-[8rem] rounded-lg p-4 shadow-md hover:shadow-2xl transition-all border border-gray-700 flex flex-col justify-between gap-2">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                        <h2 className="text-lg md:text-xl font-bold w-full sm:w-[80%] break-words">{currTask.taskTitle}</h2>
                                        <span className="text-xs md:text-sm font-semibold text-blue-400 sm:text-right w-full sm:w-[20%]">{currTask.project}</span>
                                    </div> 

                                    <div className="text-gray-300 text-sm break-words py-2">
                                        <p>{currTask.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-xs text-gray-400 py-1">
                                        {
                                            currTask.assignTo?.map((person, i) => (
                                                <span key={i} className="bg-gray-900 px-2 py-0.5 rounded">{person}</span>
                                            ))
                                        }
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-center pt-2 border-t border-gray-700 text-xs sm:text-sm gap-2">
                                        <p className="text-green-400">Start: {startDate}</p>
                                        <NavLink onClick={() => handleTask(currTask)} to="/coding" className="text-blue-400 hover:underline font-medium">Let's Start</NavLink>
                                        <p className="text-red-400">Due: {dueDate}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}