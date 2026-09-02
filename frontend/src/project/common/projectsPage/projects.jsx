import {Navbar} from "../navbar.jsx";
import {User} from "../user.jsx";
import {LeftMenu} from "../leftMenu.jsx";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";

export const ProjectsPage = () =>{
  

    return (
     <>
           <Navbar/>
           <LeftMenu/>
           <User/> 
           <Projects/> 
     </>
        
    )
}

const Projects = ()=>{
    const [projects, setProjects] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [user, setUser] = useState(()=>{
       return  JSON.parse(Cookies.get("DevColab"));
       })
    // const email = localStorage.getItem("email");
    useEffect(()=>{
       const getProjects = async ()=>{
         try{
          const API_URL = import.meta.env.VITE_API_URL;
         const res = await fetch(`${API_URL}/api/getProjects`,{
            method:"GET",
            credentials:"include"
          })

            const res1 = await fetch(`${API_URL}/api/allTask`,{
            method:"GET",
            credentials:"include"
          })
          const projects = await res.json();
          setProjects([...projects])
          const alltask = await res1.json();
          setAllTask([...alltask])

        }
        catch(error){
            console.log("Error in projects : ",error)
        }
       }
       
       getProjects();
    },[])

    // console.log(allTask)

// console.log(user.role)

    return (
        <div className="h-screen w-[80%] bg-gray-700  rounded-[1px] absolute  right-0 overflow-auto">
           <div className=" h-[5rem] bg-gray-700 p-5 flex items-center sticky top-0"><h1 className="text-[2rem]" ><b><h1 className="text-[2rem]" ><b> {projects.length==0?"No any projects":"All projects"}</b></h1></b></h1>
           <NavLink className={`${user.role=="Employee"?"hidden":"absolute right-[5rem]"}`}  to="/projectform"><button className="bg-blue-500 h-8 w-[8rem] rounded-[3px]">+ New Project</button></NavLink>
           </div> 
        <div className="grid gap-5 px-5 lg:grid-cols-3 md:grid-cols-2 grid-rows-auto auto-rows-[18rem] overflow-scroll scrollbar-none ">
           
         { 
           projects.map((project,ind)=>{
            var count=0;
            const tempTask = allTask.filter((task)=>{
                
                if(task.project==project.name)
                {
                    if(task.status == "complete")
                        count++;
                
                    return task;
                }
            })
            // console.log(tempTask) 
             let length = 0;
            if(tempTask.length != 0){ 
               
                length = ((100/tempTask.length)*count).toFixed(2);
                //  console.log(length)
            }

           let color="red";
            if(length>33 && length<66)
                color="blue";
            else if(length>66 && length<=100)
                color="green";

            const colors = {
                 red: "bg-red-700",
                 blue: "bg-blue-700",
                 green: "bg-green-700",
                 };

            
          
            if(project.assignTo.includes(user.empID))
            return  <NavLink key={ind} onClick={()=>localStorage.setItem("currentProject",project.name)} to="/projectDetails" 
                    className="bg-gray-800 rounded-[5px] p-3 shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl">
                <h1 className="pb-2 text-[1.5rem]"><b>{project.name}</b></h1>
                <p className=" h-[5rem] overflow-y-auto break-words scrollbar-none">{project.description}</p>
                <ul className="flex gap-3 flex-wrap w-[100%]  h-[5rem] mt-5 overflow-y-auto ">
                    {
                        project.assignTo.map((person, ind)=>{
                         return   <li key={ind}>
                                     {person}   
                                  </li>
                        })
                    }
                </ul>
                <div className="mt-3">
                    <div className="h-4 w-[100%] rounded-[1rem] bg-gray-500 "> 
                        <div className={`h-[100%]  ${colors[color]} rounded-[2rem] text-[0.7rem] text-center` } 
                             style={{width:`${length}%`}}>
                              {length}% 
                        </div>
                    </div>
                </div>
             </NavLink>
           }) 
        }
        </div>
        </div>
    )
}