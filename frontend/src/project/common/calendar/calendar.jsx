import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import {Navbar} from "../navbar.jsx";
import {User} from "../user.jsx";
import {LeftMenu} from "../leftMenu.jsx";




export const Calendar = ()=>{
   
    return (
        <>  
           <Navbar/>
           <LeftMenu/>
           <User/>
           <CalendarPage/>
        </>
    )
}

 const CalendarPage = ()=>{
  


    return (
     
       <div className="h-screen w-[80%] bg-purple-700 absolute right-0 rounded-[1px] flex justify-center items-center text-[3rem]">

           <big>This page under maintainence...</big>
          
       </div>
    )
}