import {useEffect, useState, } from "react";

import {Navbar} from "../navbar.jsx";
import {User} from "../user.jsx";
import {LeftMenu} from "../leftMenu.jsx";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

export const Tasks = ()=>{


    return (
        <>
           <Navbar/>
           <LeftMenu/>
           <User/>
           <MainPage/>
        </>
    )
}


const MainPage = ()=>{
    
   const [tasks, setTasks] = useState([]);
   const [loading, setLoading] = useState(true);
    
   useEffect(()=>{
            const temp = async () => {
                try {
                    const res = await fetch(
                        `http://localhost:5000/api/allTask`,
                        {
                            method:"GET",
                            credentials:"include",
                        }
                    );
                    const allTask = await res.json();
                    
                    // console.log(projectDetails);
                    // console.log(tasks)
                    // {name,description,assignTo,startDate,dueDate,}
                    
                    if (res.ok ) {
                        // console.log("hello")
                        setTasks([...allTask]);
                        setLoading(false);
                    }
                } 
                catch (error) {
                    console.log("Error to fetching all project or try block in task.jsx", error);
                }
            };
            temp();
        },[])


        const handleTask = async(task) =>{
            
            Cookies.set('currentTask', JSON.stringify(task));
        }
        
            if(loading){
             return <div className="h-screen w-[80%] bg-gray-700  rounded-[1px]
              absolute  right-0 overflow-auton flex justify-center"> 
                           <h1 className=" mt-[5rem] text-[2rem]">Loading...</h1>
                    </div>
            }
            else
   
    return (
        <div className="h-screen w-[80%] bg-gray-700  rounded-[1px] absolute  right-0 overflow-auto">
        <div className="p-2 h-[110%] w-[90%] bg-gray-900 rounded-[5px] mx-[3.64rem] my-2 "  >
           
          
           <h1 className="text-[2rem]" ><b> {tasks.length==0?"No any task":"All task"}</b></h1>
             

     <div className={`w-full flex flex-col gap-3 h-[91%] bg-gray-700 p-5 my-5 
                     rounded-[2px] text-black overflow-auto  scrollbar-none
                     transition-all duration-500 ease-linear`}>
                        
                        {

                            tasks.map((currTask) => {
                                let startDate = currTask.startDate;
                                startDate = new Date(startDate);
                                startDate = startDate.toLocaleDateString();

                                let dueDate = currTask.dueDate;
                                dueDate = new Date(dueDate);
                                dueDate = dueDate.toLocaleDateString();
                                return <div className="bg-gray-800 w-[100%] min-h-[10rem] rounded-[5px] p-3
                                shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl overflow-auto scrollbar-none">
                                  <div className="flex justify-between">
                                    <h1 className="text-[1.5rem] w-[80%] min-h-[5px] break-words text-white "><b>{currTask.taskTitle}</b></h1>
                                    <big className="w-[20%] min-h-[5px] break-words text-right text-white">{currTask.project}</big>
                                  </div> 
                                    <div className="min-h-[5px] text-gray-900 break-words p-2 overflow-y-scroll scrollbar-none text-gray-500">
                                        <p>{currTask.description} </p>
                                    </div>
                                    <ul className="w-[100%] min-h-5   break-words text-gray-400 ">
                                        {
                                            currTask.assignTo.map((person) => {
                                                return <span className="mx-2 ">{person}</span>
                                            })
                                        }
                                    </ul>

                                    <div className="flex justify-between px-5">
                                        <p className="text-green-500">{startDate}</p>
                                        <NavLink onClick={()=>handleTask(currTask)} to="/coding" className={`text-white underline hover:text-gray-400 `}>Let's Start</NavLink>
                                        <p className="text-red-500">{dueDate}</p>
                                    </div>
                                </div>

                            })
                        }
                    </div>

         </div>
        </div>
        
    )
}