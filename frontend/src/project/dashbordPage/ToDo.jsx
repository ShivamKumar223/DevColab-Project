import { NavLink } from "react-router-dom";
import { LeftMenu } from "../common/leftMenu";
import { User } from "../common/user";
import { useState, useEffect } from "react";
import  Cookies  from "js-cookie";




export const ToDo = () =>{

   return <div className="bg-gray-500 w-screen h-screen">
      <LeftMenu/>
      <User/>
      <MainContent/>
   </div>
}

const MainContent = () =>{
       const [allTask, setAllTask] = useState([]);
       const [user, setUser] = useState(()=>{
              return  JSON.parse(Cookies.get("DevColab"));
              })
              
useEffect(()=>{
      const getAllTask = async ()=>{
         try{
          const res = await fetch(`http://localhost:5000/api/allTask`,{
            method:"GET",
            credentials:"include"
          })
          const alltask = await res.json();
          setAllTask([...alltask])
          }
        catch(error){
            console.log("Error in projects : ",error)
        }
       }
         getAllTask();
    },[])

   
   

   return <div className="w-[80%] h-[100%] bg-gray-700 absolute right-0">
      <p className="text-center text-[2rem] bg-gray-700">Pending Task </p>
      <div className={`w-full flex flex-col gap-3 h-[91%] bg-gray-700 p-5 my-5 
                     rounded-[2px] text-black overflow-auto  scrollbar-none
                     transition-all duration-500 ease-linear`}>
                        
                        {

                            allTask.map((currTask, ind) => {
                                let startDate = currTask.startDate;
                                startDate = new Date(startDate);
                                startDate = startDate.toLocaleDateString();

                                let dueDate = currTask.dueDate;
                                dueDate = new Date(dueDate);
                                dueDate = dueDate.toLocaleDateString();
                  if(currTask.status == "pending")
                      return <Todo currTask={currTask} startDate={startDate} dueDate={dueDate} ind={ind}/>
                            })
                        }
                    </div>


   </div>
}


const Todo = ({currTask, startDate, dueDate, ind}) =>{

  const handleTask = async(task) =>{
                    
                    Cookies.set('currentTask', JSON.stringify(task));
                }

  return  <div key={ind} className="bg-gray-800 w-[100%] min-h-[10rem] rounded-[5px] p-3
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
                                            currTask.assignTo.map((person, index) => {
                                                return <span key={index} className="mx-2 ">{person}</span>
                                            })
                                        }
                                    </ul>

                                    <div className="flex justify-between px-5">
                                        <p className="text-green-500">{startDate}</p>
                                        <NavLink onClick={()=>handleTask(currTask)} to="/coding" className={`text-white underline hover:text-gray-400 `}>Let's Start</NavLink>
                                        <p className="text-red-500">{dueDate}</p>
                                    </div>
                                </div>
}