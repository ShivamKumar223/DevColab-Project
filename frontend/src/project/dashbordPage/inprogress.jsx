import { NavLink } from "react-router-dom";
import { LeftMenu } from "../common/leftMenu";
import { User } from "../common/user";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const InProgress = () => {
   return <div className="bg-gray-700 min-h-screen w-full relative">
      <LeftMenu/>
      <User/>
      <MainContent/>
   </div>
}

const MainContent = () => {
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
     const getAllTask = async () => {
         try {
             const API_URL = import.meta.env.VITE_API_URL;
             const res = await fetch(`${API_URL}/api/allTask`, {
                method: "GET",
                credentials: "include"
             });
             const alltask = await res.json();
             setAllTask([...alltask]);
         } catch(error) {
             console.log("Error in projects : ", error);
         }
     }
     getAllTask();
  }, [])

  return (
     <div className="w-full md:w-[80%] min-h-screen bg-gray-700 absolute right-0 top-16 md:top-0 p-4 md:p-6 text-white">
        <h1 className="text-center text-xl md:text-[2rem] font-bold mb-4">In Progress</h1>
        <div className="w-full flex flex-col gap-4 bg-gray-700 rounded text-black overflow-auto scrollbar-none pb-12">
            {
               allTask.map((currTask, ind) => {
                   let startDate = new Date(currTask.startDate).toLocaleDateString();
                   let dueDate = new Date(currTask.dueDate).toLocaleDateString();

                   if(currTask.status === "inprogress")
                       return <InprogressTask key={ind} currTask={currTask} startDate={startDate} dueDate={dueDate} ind={ind}/>
               })
            }
        </div>
     </div>
  )
}

const InprogressTask = ({currTask, startDate, dueDate, ind}) => {
  const handleTask = async (task) => {
      Cookies.set('currentTask', JSON.stringify(task));
  }

  return (
    <div key={ind} className="bg-gray-800 w-full min-h-[10rem] rounded-[5px] p-4 shadow-md hover:shadow-2xl flex flex-col justify-between text-white border border-gray-700 gap-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h1 className="text-lg md:text-[1.5rem] font-bold w-full sm:w-[80%] break-words">{currTask.taskTitle}</h1>
            <span className="text-sm font-semibold text-blue-400 sm:text-right w-full sm:w-[20%]">{currTask.project}</span>
        </div> 

        <div className="text-gray-300 text-sm break-words py-2">
            <p>{currTask.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-gray-400 py-1">
            {
                currTask.assignTo.map((person, index) => (
                    <span key={index} className="bg-gray-900 px-2 py-1 rounded-md">{person}</span>
                ))
            }
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-2 border-t border-gray-700 gap-2 text-sm">
            <p className="text-green-400">Start: {startDate}</p>
            <NavLink onClick={() => handleTask(currTask)} to="/coding" className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white font-medium transition-all">Let's Start</NavLink>
            <p className="text-red-400">Due: {dueDate}</p>
        </div>
    </div>
  )
}