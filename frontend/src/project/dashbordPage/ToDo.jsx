import { NavLink } from "react-router-dom";
import { LeftMenu } from "../common/leftMenu";
import { User } from "../common/user";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const ToDo = () => {
    return (
        <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden">
            <div className="flex flex-col md:flex-row">
                <LeftMenu />
                <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col min-h-screen">
                    <MainContent />
                    <User />
                </div>
            </div>
        </div>
    )
}

const MainContent = () => {
    const [allTask, setAllTask] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllTask = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/allTask`, {
                    method: "GET",
                    credentials: "include"
                });
                const alltask = await res.json();
                if (res.ok) {
                    setAllTask([...alltask]);
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error fetching pending tasks: ", error);
                setLoading(false);
            }
        };
        getAllTask();
    }, []);

    const pendingTasks = allTask.filter(currTask => currTask.status === "pending");

    return (
        <div className="w-full bg-gray-700 min-h-screen p-4 md:p-6 text-white overflow-auto pb-24 md:pb-6">
            <h1 className="text-center text-2xl md:text-3xl font-bold border-b border-gray-600 pb-3 mb-6">
                Pending Tasks
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <p className="text-lg text-gray-300">Loading pending tasks...</p>
                </div>
            ) : pendingTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 bg-gray-800 rounded-xl p-6 shadow border border-gray-700">
                    <p className="text-gray-400 text-base">No pending tasks found. Great job! 🎉</p>
                </div>
            ) : (
                <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
                    {pendingTasks.map((currTask, ind) => {
                        let startDate = currTask.startDate ? new Date(currTask.startDate).toLocaleDateString() : "N/A";
                        let dueDate = currTask.dueDate ? new Date(currTask.dueDate).toLocaleDateString() : "N/A";
                        
                        return <TaskCard key={ind} currTask={currTask} startDate={startDate} dueDate={dueDate} />;
                    })}
                </div>
            )}
        </div>
    );
};

const TaskCard = ({ currTask, startDate, dueDate }) => {
    const handleTask = (task) => {
        Cookies.set('currentTask', JSON.stringify(task));
    };

    return (
        <div className="bg-gray-800 rounded-xl p-4 md:p-5 shadow-lg hover:shadow-2xl transition-all border border-gray-700 flex flex-col justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-700 pb-3">
                <h3 className="text-lg md:text-xl font-bold text-white break-words">
                    {currTask.taskTitle}
                </h3>
                <span className="text-xs md:text-sm px-3 py-1 bg-blue-950 text-blue-300 rounded-full border border-blue-800 self-start sm:self-auto font-medium">
                    {currTask.project}
                </span>
            </div> 

            <div className="text-sm text-gray-300 bg-gray-900 p-3 rounded-lg border border-gray-800">
                <p className="break-words">{currTask.description || "No description provided."}</p>
            </div>

            {currTask.assignTo && currTask.assignTo.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center text-xs text-gray-400">
                    <span className="font-semibold text-gray-300 mr-1">Assigned to:</span>
                    {currTask.assignTo.map((person, index) => (
                        <span key={index} className="bg-gray-700 px-2 py-0.5 rounded text-gray-200">
                            {person}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-gray-700 text-xs md:text-sm gap-3">
                <div className="text-green-400 font-medium">
                    Start: <span className="text-gray-300">{startDate}</span>
                </div>
                
                <NavLink 
                    onClick={() => handleTask(currTask)} 
                    to="/coding" 
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-all shadow text-center w-full sm:w-auto"
                >
                    Let's Start
                </NavLink>

                <div className="text-red-400 font-medium">
                    Due: <span className="text-gray-300">{dueDate}</span>
                </div>
            </div>
        </div>
    );
};