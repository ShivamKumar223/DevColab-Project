import { useEffect, useState } from "react";
import { Navbar } from "../navbar.jsx";
import { User } from "../user.jsx";
import { LeftMenu } from "../leftMenu.jsx";
import { TbMessage2Up } from "react-icons/tb";
import { MdVideoCall } from "react-icons/md";

export const Teams = () => {
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
                    credentials: "include"
                });
                const fetchedTasks = await res.json();
                
                if (res.ok) {
                    setTasks([...fetchedTasks]);
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error fetching all teams/tasks in teams.jsx", error);
            }
        };
        temp();
    }, []);

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
                    {tasks.length === 0 ? "No teams found" : "All Teams"}
                </h1>

                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-gray-700 p-2 md:p-4 rounded-lg shadow scrollbar-none">
                    {
                        tasks.map((currTask, ind) => (
                            <div key={ind} className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between border border-gray-700 gap-3">
                                <div>
                                    <h3 className="flex justify-between items-center text-base md:text-lg font-bold text-white border-b border-gray-700 pb-2">
                                        <span className="truncate">{currTask.project}</span>
                                        <span className="text-xs text-blue-400 font-normal">#{currTask.taskTitle}</span>
                                    </h3> 
                                    <p className="text-sm text-gray-300 mt-2">Total members: {currTask.assignTo?.length || 0}</p>
                                </div>

                                <div className="bg-gray-900 p-3 rounded-md max-h-24 overflow-y-auto scrollbar-none">
                                    <p className="text-xs font-semibold text-gray-400 mb-1">Members:</p>
                                    <div className="flex flex-wrap gap-1 text-xs text-gray-300">
                                        {
                                            currTask.assignTo?.map((person, i) => (
                                                <span key={i} className="bg-gray-800 px-2 py-0.5 rounded">{person}</span>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-gray-700 text-xl">
                                    <button className="hover:text-blue-400 transition-all p-1" title="Send Message"><TbMessage2Up /></button> 
                                    <button className="hover:text-green-400 transition-all p-1" title="Start Video Call"><MdVideoCall /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}