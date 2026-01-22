import React from 'react';
import { NavLink } from 'react-router-dom';

import { CiHome } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";
import { MdRoundaboutLeft } from "react-icons/md";

export const Slider = ({hide}) => {
    console.log("Hide : ", hide);
  return (
    <ul className={`${hide?"hidden":"h-[30rem] w-[17rem] bg-green-600 rounded-[1rem] absolute top-[5.5rem] left-[4rem] flex flex-col gap-5 py-5"}`}>
       <NavLink to="/" className="hover:bg-green-500 p-2 pl-10 flex items-center gap-2"    ><CiHome/>Home</NavLink>
       <NavLink to="/categories" className="hover:bg-green-500 p-2 pl-10 flex items-center gap-2" ><MdOutlineCategory/>Categories</NavLink>
       <NavLink to="/signup" className="hover:bg-green-500 p-2 pl-10 flex items-center gap-2"><SiGnuprivacyguard/>Sign-up</NavLink>
       <NavLink to="/login" className="hover:bg-green-500 p-2 pl-10 flex items-center gap-2"><RiLoginCircleLine/>Log-in</NavLink>
       <a href='#footer' className="hover:bg-green-500 p-2 pl-10 flex items-center gap-2"><IoIosContacts/>Contact Us</a>  
       <a href='#footer' className="hover:bg-green-500 p-2 pl-10 flex items-center gap-2"><MdRoundaboutLeft/>About Us</a> 
    </ul>
  )
}
