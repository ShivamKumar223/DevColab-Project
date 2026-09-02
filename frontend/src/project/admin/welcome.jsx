import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";



export const Welcome = ()=>{
  const [userName, setUserName]=useState("");
 useEffect(()=>{
  const welcome = async ()=>{
    try{
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/welcome`,{
      method:"GET",
      credentials:"include",
    });
    const {name} = await res.json();
     setUserName(name);
    // console.log(name);
    }
    catch(error){
      console.log("Data fetching error for welcome : ",error);
    }
     
  }
  welcome();
 },[])


    return (
     
       <div className="px-9 h-[30%] w-[80%] bg-gray-700 absolute top-[5rem] right-0 ">
         <div className="p-5 h-[90%] w-[100%] bg-gray-800  my-2 rounded-[5px] ">
          <h1 className=" text-[2rem] text-green-500">Welcome {userName} 😃 !</h1>
          <p>You have 4 active project and 3 due today</p>
          <NavLink to="/admin/candidateform">
          <button className="bg-blue-500 w-[10rem] h-9 mt-7 rounded-[2px] hover:text-[0.98rem] " title="click to create new project">
            + new candidate
            </button></NavLink>
          </div>
          
       </div>
    )
}