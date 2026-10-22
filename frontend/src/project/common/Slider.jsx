import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";
import { MdRoundaboutLeft } from "react-icons/md";

export const Slider = ({ hide }) => {
  return (
    <ul className={`${hide ? "hidden" : "flex"} flex-col gap-2 absolute top-16 md:top-20 left-4 md:left-8 z-50 w-64 bg-green-800 rounded-xl shadow-2xl border border-green-600 py-4 text-white`}>
        <li>
            <NavLink to="/" className="hover:bg-green-700 px-6 py-3 flex items-center gap-3 transition-all text-sm md:text-base">
                <CiHome className="text-lg"/>Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/categories" className="hover:bg-green-700 px-6 py-3 flex items-center gap-3 transition-all text-sm md:text-base">
                <MdOutlineCategory className="text-lg"/>Categories
            </NavLink>
        </li>
        <li>
            <NavLink to="/signup" className="hover:bg-green-700 px-6 py-3 flex items-center gap-3 transition-all text-sm md:text-base">
                <SiGnuprivacyguard className="text-lg"/>Sign-up
            </NavLink>
        </li>
        <li>
            <NavLink to="/login" className="hover:bg-green-700 px-6 py-3 flex items-center gap-3 transition-all text-sm md:text-base">
                <RiLoginCircleLine className="text-lg"/>Log-in
            </NavLink>
        </li>
        <li>
            <a href="#footer" className="hover:bg-green-700 px-6 py-3 flex items-center gap-3 transition-all text-sm md:text-base">
                <IoIosContacts className="text-lg"/>Contact Us
            </a>
        </li>
        <li>
            <a href="#footer" className="hover:bg-green-700 px-6 py-3 flex items-center gap-3 transition-all text-sm md:text-base">
                <MdRoundaboutLeft className="text-lg"/>About Us
            </a> 
        </li>
    </ul>
  )
}