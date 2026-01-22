import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";



export const HomePage = ()=>{
  const [userName, setUserName]=useState("");
  const [role, setRole] = useState("");
 useEffect(()=>{
  const welcome = async ()=>{
    try{
    const  email = localStorage.getItem("email")
    const  companyCode = localStorage.getItem("companyCode")
    const  empID = localStorage.getItem("empID")
    const res = await fetch(`http://localhost:5000/api/welcome`,{
      method:"GET",
      credentials:"include"
    });
    const {name,role} = await res.json();
     setUserName(name);
     setRole(role);
    // console.log(name);
    }
    catch(error){
      console.log("Data fetching error for welcome : ",error);
    }
     
  }
  welcome();
 },[])

//  console.log(role);

    return (
     
       <div className="h-screen w-[80%] bg-gray-700 absolute top-[5rem] right-0 rounded-[1px] ">
         <div className="p-5 h-[30%] w-[90%] bg-gray-800 mx-[5%] my-2 rounded-[5px] ">
          <h1 className=" text-[2rem] text-green-500">Welcome {userName} 😃 !</h1>
          <p>You have 4 active project and 3 due today</p>
          <NavLink className={role=="Employee"?"hidden":""} to="/projectform">
          <button className="bg-blue-500 w-[10rem] h-9 mt-7 rounded-[2px] hover:text-[0.98rem] " title="click to create new project">
            + new project
            </button></NavLink>
          </div>
          
          <div className="p-5 h-[60%] w-[63%] bg-gray-800 mx-[5%] my-2 rounded-[5px] ">
            <h1 className="text-[1.5rem]">Task Board</h1>
            <div className="grid grid-cols-2 grid-rows-3 gap-y-[2rem] gap-x-[5rem] h-[85%] p-5">
                <NavLink to="/todo" className="flex justify-center items-center shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:text-[0.9rem] hover:shadow-2xl"><button >To-Do</button></NavLink>
                <NavLink to="/inprogress" className="flex justify-center items-center shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:text-[0.9rem] hover:shadow-2xl"><button >In progress</button></NavLink>
                <NavLink to="/review" className="flex justify-center items-center shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:text-[0.9rem] hover:shadow-2xl"><button >Review</button></NavLink>
                <NavLink to="/complete" className="flex justify-center items-center shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:text-[0.9rem] hover:shadow-2xl"> <button >Complete</button></NavLink>
                <button className="shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:text-[0.9rem] hover:shadow-2xl">Team Status</button>
            </div>
          </div>

          <div className="p-5 h-[60%] w-[26%] bg-gray-800 mr-[5%] my-2 rounded-[5px] absolute right-0 bottom-[6.7%] overflow-y-auto">
              <h1 className="text-[1.5rem]">Activity Feed</h1>
          </div>
       </div>
    )
}