import { Slider } from "../common/Slider";
import { useState } from "react";
import { IoReorderThreeOutline, } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const Categories = ()=>{
    const handleClick = (role)=>{
        localStorage.setItem("role",role);
    }

    const [hide, setHide] = useState(true);
    
        const toggleSlider = () =>{
    
            setHide(!hide);
        }

    return <div className="h-screen w-screen  bg-green-700 flex flex-col justify-between">

           <Slider hide={hide}/>                         

        <header className="flex items-center justify-center">
            <nav className='flex justify-between h-20 items-center border-b-2 w-[90vw] ' >
                <button onClick={toggleSlider} className="m-10 font-light text-black flex items-center justify-center bg-white h-10 w-10 rounded-[5rem] "> <IoReorderThreeOutline /> </button>
             <img className="h-[10rem] relative left-[5rem]" src="/DevColab-logo-transparent.png" alt="" />
                <div className="w-[18rem] h-12 flex justify-between items-center">
                    {/* <button className="mx-10 rounded-[50px] text-white"> <IoMoonSharp /> </button> */}
                    <button className="mr-10  h-10 w-20 text-white text-[1.3rem] hover:text-[1.2rem] hover:underline"><NavLink to="/">Home</NavLink></button>

                    <button className="mx-10 h-11 w-[7rem] text-[1.2rem] hover:text-[1.1rem] text-white  rounded-[3px] hover:underline "><NavLink to="/">Back</NavLink></button>
                </div>
            </nav>
        </header>

<div>
        <h1 className="flex justify-center text-[2rem] font-[Sans-serif] ">Choose Your Role</h1>

       <div className="flex justify-evenly items-center w-screen h-[30rem] bg-green-700 ">
            <NavLink onClick={()=>handleClick("Admin")} to="/login">
                <div className="bg-green-700 h-[20rem] w-[20rem] flex flex-col items-center gap-[2rem] rounded-[1rem] shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl">
                   <img className="h-[70%] w-[90%]" src="./admin.png" alt="" />
                   <b>Admin</b>
                </div>
            </NavLink>
            <NavLink onClick={()=>handleClick("Mentor")} to="/login">
                <div className="bg-green-700 h-[20rem] w-[20rem] flex flex-col items-center gap-[2rem] rounded-[1rem] shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl">
                 <img className="h-[70%] " src="./mentor.png" alt="" />
                 <b>Mentor</b>
                </div>
            </NavLink>
            <NavLink onClick={()=>handleClick("Employee")} to="/login">
                <div className="bg-green-700 h-[20rem] w-[20rem] flex flex-col items-center gap-[2rem] rounded-[1rem] shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl">
                  <img className="h-[70%] w-[60%]" src="./employee.png" alt="" />
                  <b>Employee</b>
                </div>
            </NavLink>
            {/* <NavLink onClick={()=>handleClick("user")} to="/login">
                <div className="bg-green-700 h-[20rem] w-[20rem] flex flex-col items-center gap-[2rem] rounded-[1rem] shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl">
                 <img className="h-[70%] " src="./user.png" alt="" />
                 <b>Normal user</b>
                </div>
            </NavLink> */}
       </div>
    </div>
    </div>
}