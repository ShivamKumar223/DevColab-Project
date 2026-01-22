import {useState } from "react";

import {Navbar} from "../navbar.jsx";
import {User} from "../user.jsx";
import {LeftMenu} from "../leftMenu.jsx";
import { NavLink } from "react-router-dom";

import { TbMessage2Up } from "react-icons/tb";
import { MdVideoCall } from "react-icons/md";

export const Teams = ()=>{

    



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

    const temp = async () => {
                try {
                
                    const res = await fetch(
                        `http://localhost:5000/api/allTask`,{
                            method:"GET",
                            credentials:"include"
                        }
                    );
                    const tasks = await res.json();
                    
                    // console.log(projectDetails);
                    // console.log(tasks)
                    // {name,description,assignTo,startDate,dueDate,}
                    
                    if (res.ok ) {
                        setTasks([...tasks]);
                        setLoading(false)
                    }
                } catch (error) {
                    console.log("Error to fetching all project or try block in task.jsx", error);
                }
            };
            temp();
                       //Loading
            if(loading){
             return <div className="h-screen w-[80%] bg-gray-700  rounded-[1px]
              absolute  right-0 overflow-auton flex justify-center"> 
                           <h1 className=" mt-[5rem] text-[2rem]">Loading...</h1>
                    </div>
            }
            else
   
    return (
        <div className="h-screen w-[80%] bg-gray-700  rounded-[1px] absolute  right-0 overflow-auto">
        <div className="p-2 h-[100%] w-[90%] bg-gray-900 rounded-[5px] mx-[3.64rem] my-5 "  >
           {/* <div className=" h-[5rem] bg-gray-700 p-5 flex items-center sticky top-0"> */}
            <h1 className="text-[2rem]" ><b> {tasks.length==0?"No any teams":"All Teams"}</b></h1>
           {/* <NavLink  to="/projectform" className="absolute right-[5rem] "><button className="bg-blue-500 h-8 w-[8rem] rounded-[3px]">+ New Team</button></NavLink> */}
           {/* </div>   */}

     <div className={`grid gap-5  lg:grid-cols-3 md:grid-cols-2 grid-rows-auto auto-rows-[230px]
                     bg-gray-700 p-4 my-5 h-[90%]
                     rounded-[2px] text-black overflow-y-scroll  scrollbar-none
                     transition-all duration-500 ease-linear`}>
                        
                        {
                            tasks.map((currTask) => {
                               
                                return <div className="bg-gray-800 rounded-[5px] p-3
                                shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl overflow-y-scroll scrollbar-none">
                                  <big className="flex justify-between text-white">
                                    {currTask.project}_{currTask.taskTitle}
                                  </big> 
                                    <div className="min-h-[5px] text-gray-900 break-words p-2 overflow-y-scroll scrollbar-none">
                                        <p>Total members : {currTask.assignTo.length}</p>
                                    </div>
                                    <ul className="w-[100%] h-[5rem]   break-words text-gray-400 overflow-y-scroll scrollbar-none">
                                        <b className="flex">Members :</b>
                                        {
                                            currTask.assignTo.map((person) => {
                                                return <span className="mx-2 ">{person},</span>
                                            })
                                        }
                                    </ul>
                              <div className="flex justify-between items-center mt-5 text-[1.7rem]">
                                 <button> <TbMessage2Up/></button>  <button><MdVideoCall /></button>
                              </div>
                                    
                                </div>

                            })
                        }
                    </div>


         </div>
        </div>
        
    )
}