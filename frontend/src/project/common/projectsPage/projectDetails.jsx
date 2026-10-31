import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import Cookies from "js-cookie";

import { Navbar } from "../navbar.jsx";
import { User } from "../user.jsx";
import { LeftMenu } from "../leftMenu.jsx";
import { NavLink } from "react-router-dom";

export const ProjectDetails = () => {
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
    const [task, setTask] = useState({ taskTitle: "", description: "", assignTo: [], startDate: "", dueDate: "" });
    const [tasks, setTasks] = useState([]);
    const [formToggle, setFormToggle] = useState(false);
    const [user, setUser] = useState(() => {
        try {
            const cookie = Cookies.get("DevColab");
            return cookie ? JSON.parse(cookie) : { empID: "", role: "", name: "" };
        } catch {
            return { empID: "", role: "", name: "" };
        }
    });

    const handleFormHidden = () => setFormToggle(false);
    const handleFormShow = () => setFormToggle(true);

    const [currentProject, setCurrentProject] = useState({});
    let { startDate, dueDate } = currentProject;
    startDate = startDate ? new Date(startDate).toLocaleDateString() : "";
    dueDate = dueDate ? new Date(dueDate).toLocaleDateString() : "";

    useEffect(() => {
        const temp = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/currentProjectDetails?currentProject=${localStorage.getItem("currentProject")}`, {
                    method: "GET",
                    credentials: "include"
                });
                const { projectDetails, allTask } = await res.json();
                
                if (res.ok) {
                    setTasks([...allTask]);
                    setCurrentProject({ ...projectDetails });
                }
            } catch (error) {
                console.log("Error fetching project details in projectDetails.jsx", error);
            }
        };
        temp();
    }, []);

    const handleCheckbox = (e) => {
        const value = e.target.value;
        const assignTo = [...task.assignTo];

        if (e.target.checked)
            setTask({ ...task, assignTo: [...assignTo, value] });
        else {
            const ind = assignTo.indexOf(value);
            if (ind > -1) assignTo.splice(ind, 1);
            setTask({ ...task, assignTo });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const project = localStorage.getItem("currentProject");
            const API_URL = import.meta.env.VITE_API_URL;
            const res = await fetch(`${API_URL}/api/addTask?project=${project}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
                credentials: "include"
            });
            const { message, success } = await res.json();
           
            if (res.ok && success) {
                alert(message);
                setTasks([...tasks, task]);
                setFormToggle(false);
                setTask({ taskTitle: "", description: "", assignTo: [], startDate: "", dueDate: "" });
            } else {
                alert(message);
            }
        } catch {
            console.log("Error occurs in creation of task in projectDetails.jsx");
        }         
    }

    const handleTask = async (task) => {
        Cookies.set('currentTask', JSON.stringify(task));
    } 

    return (
        <div className="w-full bg-gray-700 p-4 md:p-6 text-white overflow-auto scrollbar-none">
            <div className="p-4 md:p-6 w-full bg-gray-800 rounded-lg shadow-lg">
                {/* Project Overview Card */}
                <div className="bg-blue-600 min-h-[10rem] rounded-lg p-4 md:p-6 shadow flex flex-col justify-between gap-4">
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                     <h1 className="text-xl md:text-[1.5rem] font-bold w-full sm:w-[80%] break-words">{currentProject.name}</h1>
                     <button onClick={handleFormShow} 
                         className={`${user.role === "Employee" ? "hidden" : "block"} h-10 px-4 bg-gray-900 rounded-md hover:bg-gray-800 transition-all text-sm font-medium whitespace-nowrap`}
                         title="Click to add new task in this project">+ New Task</button>
                   </div>
                   
                   <div className="text-gray-100 text-sm md:text-base break-words">
                       <p>{currentProject.description}</p>
                   </div>

                   <div>
                       <ul className="w-full flex flex-wrap gap-2 text-xs md:text-sm text-gray-200">
                           {
                               currentProject.assignTo?.map((dev) =>
                                   <li key={dev} className="bg-blue-700 px-3 py-1 rounded-full">{dev}</li>
                               )
                           }
                       </ul>
                   </div>

                   <div className="flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-gray-200 pt-2 border-t border-blue-500/40">
                       <p>{`Start Date : ${startDate}`}</p>
                       <p>{`Due Date : ${dueDate}`}</p>
                   </div>
                </div>

                {/* Content Section: Form & Tasks */}
                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    {/* Add Task Form */}
                    <form onSubmit={handleSubmit} 
                        className={`${formToggle ? "flex" : "hidden"} flex-col gap-4 w-full lg:w-1/2 bg-gray-700 p-5 rounded-lg shadow border border-gray-600 text-white`}
                    >
                       <div className="flex justify-end">
                        <div onClick={handleFormHidden} className="h-8 w-8 bg-gray-600 rounded-full flex justify-center items-center text-xl cursor-pointer hover:bg-gray-500 transition-all"><IoIosClose /></div>
                       </div>
                       
                       <div className="flex flex-col w-full">
                           <label htmlFor="title" className="text-sm font-medium mb-1">Title</label>
                           <input onChange={(e) => setTask({ ...task, taskTitle: e.target.value })} 
                           value={task.taskTitle} type="text" id="title" className="h-10 bg-gray-900 rounded px-3 text-sm text-white" 
                           required placeholder="Enter task title"/>
                       </div>

                       <div className="flex flex-col w-full">
                           <label htmlFor="description" className="text-sm font-medium mb-1">Description</label>
                           <textarea onChange={(e) => setTask({ ...task, description: e.target.value })} 
                           value={task.description} id="description" rows={3} className="rounded p-3 bg-gray-900 text-sm text-white" 
                           placeholder="Write something about your task"></textarea>
                       </div>

                       <div className="flex flex-col">
                           <label className="text-sm font-medium mb-1">Assign Members</label>
                           <ul className="max-h-40 w-full grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto scrollbar-none border border-gray-600 bg-gray-900 p-3 rounded">
                             { 
                                currentProject.assignTo?.map((empID, ind) => (
                                    <li key={ind} className="flex items-center gap-2">
                                       <input onChange={handleCheckbox} id={`emp-${ind}`} className="h-4 w-4" type="checkbox" value={empID} />
                                       <label className="text-sm truncate cursor-pointer" htmlFor={`emp-${ind}`}>{empID}</label>
                                    </li>
                                ))
                             }
                           </ul>
                       </div>

                       <div className="flex flex-col sm:flex-row gap-4">
                           <div className="flex flex-col w-full sm:w-1/2">
                               <label htmlFor="startDate" className="text-sm font-medium mb-1">Start Date</label>
                               <input onChange={(e) => setTask({ ...task, startDate: e.target.value })} 
                               value={task.startDate} type="date" id="startDate" 
                               className="h-10 rounded px-3 bg-gray-900 text-white text-sm" required/>
                           </div>
                           <div className="flex flex-col w-full sm:w-1/2">
                               <label htmlFor="dueDate" className="text-sm font-medium mb-1">Due Date</label>
                               <input onChange={(e) => setTask({ ...task, dueDate: e.target.value })} 
                               value={task.dueDate} type="date" id="dueDate" 
                               className="h-10 rounded px-3 bg-gray-900 text-white text-sm" required/>
                           </div>
                       </div>

                       <button className="bg-blue-600 hover:bg-blue-700 transition-all mt-4 h-11 w-full sm:w-1/2 mx-auto rounded-full font-medium text-sm shadow" type="submit">Add Task</button>
                    </form>

                    {/* Task List */}
                    <div className={`${formToggle ? "w-full lg:w-1/2" : "w-full"} flex flex-col gap-4 bg-gray-700 p-4 rounded-lg shadow transition-all duration-300`}>
                        <h2 className="text-xl font-bold border-b border-gray-600 pb-2">Tasks</h2>
                        <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto scrollbar-none">
                            {
                                tasks.map((currTask, ind) => {
                                    let sDate = currTask.startDate ? new Date(currTask.startDate).toLocaleDateString() : "";
                                    let dDate = currTask.dueDate ? new Date(currTask.dueDate).toLocaleDateString() : "";

                                    return <div key={`parent-${ind}`} className="bg-gray-800 w-full min-h-[8rem] rounded-lg p-4 shadow border border-gray-700 flex flex-col justify-between gap-2">
                                        <h3 className="text-lg font-bold break-words">{currTask.taskTitle}</h3>

                                        <div className="text-gray-300 text-sm break-words py-1">
                                            <p>{currTask.description}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-1 text-xs text-gray-400">
                                            {
                                                currTask.assignTo?.map((person, i) => (
                                                    <span key={`child-${i}`} className="bg-gray-900 px-2 py-0.5 rounded">{person}</span>
                                                ))
                                            }
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between items-center pt-2 border-t border-gray-700 text-xs sm:text-sm gap-2">
                                            <p className="text-green-400">Start: {sDate}</p>
                                            <NavLink onClick={() => handleTask(currTask)} to="/coding" className="text-blue-400 hover:underline font-medium">Let's Start</NavLink>
                                            <p className="text-red-400">Due: {dDate}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}