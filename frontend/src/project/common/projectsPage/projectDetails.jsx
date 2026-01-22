import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import Cookies from "js-cookie";

import { Navbar } from "../navbar.jsx";
import { User } from "../user.jsx";
import { LeftMenu } from "../leftMenu.jsx";
import { NavLink } from "react-router-dom";

export const ProjectDetails = () => {

    return (
        <>
            <Navbar />
            <LeftMenu />
            <User />
            <MainPage />
        </>
    )
}


const MainPage = () => {
    const [task, setTask] = useState({ taskTitle: "", description: "", assignTo: [], startDate: "", dueDate: "" });
    const [tasks, setTasks] = useState([]);
    const [formToggle, setFormToggle] = useState(false);
    const [user, setUser] = useState(()=>{
        return JSON.parse(Cookies.get("DevColab"));
    })
    const handleFormHidden = ()=>{
        setFormToggle(false);
    }
    const handleFormShow = ()=>{
        setFormToggle(true)
    }

    const [currentProject, setCurrentProject] = useState({});
    let {startDate, dueDate} = currentProject;
    startDate=new Date(startDate);
    startDate = startDate.toLocaleDateString();
    // console.log(startDate)

    dueDate=new Date(dueDate);
    dueDate = dueDate.toLocaleDateString();
    // console.log(dueDate)

    useEffect(() => {
        const temp = async () => {
            try {
            
                const res = await fetch(
                    `http://localhost:5000/api/currentProjectDetails?currentProject=${localStorage.getItem("currentProject")}`,
                    {
                        method:"GET",
                        credentials:"include"
                    }
                );
                const {projectDetails,allTask} = await res.json();
                // console.log("project Details",projectDetails);
                // console.log("task",tasks)
                // {name,description,assignTo,startDate,dueDate,}
                
                if (res.ok ) {
                    // console.log("t: ",tasks)
                    setTasks([...allTask])
                    // console.log(allTask)
                    setCurrentProject({...projectDetails})
                }
            } catch (error) {
                console.log("Error to fetching project details or try block in projectDetails.jsx", error);
            }
        };
        temp();
    }, []);

//   console.log(user.role);  

    const handleCheckbox = (e) => {
        const value = e.target.value;
        const assignTo = task.assignTo;

        if (e.target.checked)
            setTask({ ...task, assignTo: [...assignTo, value] });
        else {
            const ind = assignTo.indexOf(value);
            assignTo.splice(ind, 1);
            setTask({ ...task, assignTo });
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
       
        try{
             
            const project = localStorage.getItem("currentProject");
           
           const res = await fetch(`http://localhost:5000/api/addTask?project=${project}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body : JSON.stringify(task), 
                credentials:"include"
            })
// console.log("project",res)
        const {message, success} = await res.json();
       
           if(res.ok && success)
            {
                alert(message);
                setTasks([...tasks,task])
                // console.log("all good")
            }
            else{
                alert(message)
            }

        }
        catch{
            console.log("Error occurs in to creation of task in projectDetails.jsx")
        }          
        // console.log(task);
        // setTask({ ...task, taskTitle: "", description: "", assignTo: [], startDate: "", dueDate: "" });
    }

     const handleTask = async(task) =>{
                    
                    Cookies.set('currentTask', JSON.stringify(task));
                } 
    return (
        <div className="h-full w-[80%] bg-gray-700  rounded-[1px] absolute  right-0 overflow-auto scrollbar-none">
            <div className="p-5 h-[105%] w-[90%] bg-gray-800 rounded-[5px] mx-[3.64rem] my-5 "  >
                <div className="bg-blue-500 min-h-[10rem] rounded-[5px] p-3">
                   <div className="flex justify-between">
                     <h1 className="text-[1.5rem] min-h-[5px] break-words w-[80%] "><b>{currentProject.name}</b></h1>
                     <button onClick={handleFormShow} 
                         className={`${user.role=="Employee"?"hidden":" "} h-[2rem] w-[7rem] bg-gray-900 rounded-[5px] hover:text-[0.9rem] `}
                         title="click to add new task in this project">+ New task</button>
                   </div>
                    <div className="min-h-[5px] text-black break-words p-2">
                        <p>{currentProject.description} </p>
                    </div>

                    <div>
                        <ul className="w-full flex flex-wrap gap-5 text-gray-200 py-2 ">
                            {
                                currentProject.assignTo?.map((dev) =>
                                  <li key={dev}>{dev}</li>
                                   
                                
                                )
                            }

                        </ul>
                    </div>
                    <div className=" h-[3rem] w-full flex justify-between items-center">
                       <p className="text-gray-200">{`Start Date : ${startDate}`}</p>
                       <p className="text-gray-200">{`Due Date : ${dueDate}`}</p>
                    </div>
                </div>

                <div className="flex gap-2 h-[70%] ">
                    
                    <form onSubmit={handleSubmit} 
                    className={`${formToggle?"flex ":"hidden"}  flex-col gap-2 justify-evenly w-[50%] h-[104%] items-center 
                        bg-gray-700 p-5 pb-2 my-5 rounded-[2px] text-black `
                    }>
                       <div className="h-[2rem] items-center flex-row-reverse flex w-full">
                        <div onClick={handleFormHidden} className="h-[1.5rem] w-[1.5rem] bg-gray-500 rounded-[5rem] flex justify-center items-center text-[1.2rem] text-black hover:text-[1.4rem] hover:text-white"><IoIosClose /></div>
                       </div>
                        <div className="flex flex-col w-full  ">
                            <label htmlFor="title">Title</label>
                            <input  onChange={(e) => setTask({ ...task, taskTitle: e.target.value })} 
                            value={task.title} type="text" id="title" className="h-[2rem] bg-gray-900 rounded-[3px] px-2" 
                            required placeholder="Enter task title"/>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={(e) => setTask({ ...task, description: e.target.value })} 
                            value={task.description} id="description" rows={3} className="rounded-[3px] px-2 bg-gray-900" 
                            placeholder="Write somthing about your project"></textarea>
                        </div>
                        <ul className="h-[10rem] w-[100%] grid grid-cols-2 auto-rows-[50px] overflow-y-scroll scrollbar-none border-black border-2 px-5 py-2">
                          { 
                             currentProject.assignTo?.map((empID, ind)=>{
                              return  <li key={ind}>
                                 <label className="flex items-center gap-3" htmlFor={ind}>
                                 <input onChange={handleCheckbox} id={ind} className="h-5 w-5" type="checkbox" value={empID} />{empID}</label>
                               </li>
                       })
                          }
                         </ul>
                        <div className="flex flex-col w-full">
                            <label htmlFor="startDate">Start Date</label>
                            <input onChange={(e) => setTask({ ...task, startDate: e.target.value })} 
                            value={task.startDate} type="date" id="startDate" 
                            className="h-[2rem] rounded-[3px] px-2 bg-gray-900 text-white" required/>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="dueDate">Due Date</label>
                            <input onChange={(e) => setTask({ ...task, dueDate: e.target.value })} 
                            value={task.dueDate} type="date" id="dueDate" 
                            className="h-[2rem] rounded-[3px] px-2 bg-gray-900 text-white" required/>
                        </div>
                        <button className="bg-blue-600 border-[1px] border-white mt-5 h-[3rem] w-[50%] rounded-[2rem] hover:text-[0.9rem]" type="submit">Add Task</button>
                    </form>

                    <div className={`${formToggle?"w-[50%]":"w-full"}
                     flex flex-col gap-3 h-[104%] bg-gray-700 p-5 my-5 
                     rounded-[2px] text-black overflow-auto  scrollbar-none
                     transition-all duration-500 ease-linear`}>
                        <div className="h-[2rem] text-[1.5rem]"><h1>Tasks</h1></div>
                        {
                            tasks.map((currTask,ind) => {
                                let startDate = currTask.startDate;
                                startDate = new Date(startDate);
                                startDate = startDate.toLocaleDateString();

                                let dueDate = currTask.dueDate;
                                dueDate = new Date(dueDate);
                                dueDate = dueDate.toLocaleDateString();
                                return <div key={`parant${ind+1}`} className="bg-gray-700 w-[100%] min-h-[10rem] rounded-[5px] p-3
                                shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl ">
                                    <h1 className="text-[1.5rem] min-h-[5px] break-words"><b>{currTask.taskTitle}</b></h1>

                                    <div className="min-h-[5px] text-gray-900 break-words p-2 overflow-y-scroll scrollbar-none">
                                        <p>{currTask.description} </p>
                                    </div>
                                    <ul className="w-[100%] min-h-5   break-words text-gray-400 ">
                                        {
                                            currTask.assignTo.map((person, ind) => {
                                                
                                                return <span key={`child${ind+1}`} className="mx-2 ">{person}</span>
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
        </div>
    )
}