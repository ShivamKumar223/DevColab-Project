import { useEffect } from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const User =()=>{

const [userName, setUserName]=useState("");

 useEffect(()=>{
  const welcome = async ()=>{
    try{
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/welcome`,
      {
        method:"GET",
        credentials:"include"
      }
    );
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
        <div className="fixed bottom-0 flex items-center justify-center w-[20%] h-[5rem] bg-gray-900 rounded-[0.5rem] ">
            <div className="bg-black h-7 w-7 flex justify-center items-center rounded-[5rem]"><img className="w-7 h-7 rounded-[2rem]" src="/shivam.jpg" alt="user pic" /></div>
            <div className="ml-3 w-[10rem]  " >{userName}</div>
            <NavLink to="/"><button className=" h-7 w-[6rem] rounded-[5px] hover:underline hover:text-[0.9rem] text-blue-500">Log out</button></NavLink>
        </div>
    )
}