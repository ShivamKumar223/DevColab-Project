import { Slider } from "../common/Slider";
import { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const Categories = () => {
    const handleClick = (role) => {
        localStorage.setItem("role", role);
    }

    const [hide, setHide] = useState(true);

    const toggleSlider = () => {
        setHide(!hide);
    }

    return (
        <div className="min-h-screen w-full bg-green-700 flex flex-col justify-between text-white">
            <Slider hide={hide}/>                        

            <header className="flex items-center justify-center p-4">
                <nav className='flex justify-between h-20 items-center border-b-2 border-white/20 w-full max-w-6xl px-4' >
                    <button onClick={toggleSlider} className="font-light text-black flex items-center justify-center bg-white h-10 w-10 rounded-full shadow"> 
                        <IoReorderThreeOutline className="text-2xl" /> 
                    </button>
                    <img className="h-16 md:h-24 object-contain" src="/DevColab-logo-transparent.png" alt="DevColab Logo" />
                    <div className="flex gap-2 sm:gap-4 items-center">
                        <NavLink to="/" className="text-white text-base md:text-lg hover:underline">Home</NavLink>
                        <NavLink to="/" className="text-white text-base md:text-lg hover:underline">Back</NavLink>
                    </div>
                </nav>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
                <h1 className="text-2xl md:text-4xl font-bold text-center">Choose Your Role</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl justify-items-center">
                    <NavLink onClick={() => handleClick("Admin")} to="/login" className="w-full max-w-[18rem]">
                        <div className="bg-green-800 p-6 flex flex-col items-center gap-4 rounded-[1rem] shadow-lg hover:shadow-2xl hover:scale-105 transition-all border border-green-600">
                           <img className="h-40 w-auto object-contain" src="./admin.png" alt="Admin" />
                           <b className="text-xl">Admin</b>
                        </div>
                    </NavLink>

                    <NavLink onClick={() => handleClick("Mentor")} to="/login" className="w-full max-w-[18rem]">
                        <div className="bg-green-800 p-6 flex flex-col items-center gap-4 rounded-[1rem] shadow-lg hover:shadow-2xl hover:scale-105 transition-all border border-green-600">
                           <img className="h-40 w-auto object-contain" src="./mentor.png" alt="Mentor" />
                           <b className="text-xl">Mentor</b>
                        </div>
                    </NavLink>

                    <NavLink onClick={() => handleClick("Employee")} to="/login" className="w-full max-w-[18rem]">
                        <div className="bg-green-800 p-6 flex flex-col items-center gap-4 rounded-[1rem] shadow-lg hover:shadow-2xl hover:scale-105 transition-all border border-green-600">
                           <img className="h-40 w-auto object-contain" src="./employee.png" alt="Employee" />
                           <b className="text-xl">Employee</b>
                        </div>
                    </NavLink>
                </div>
            </main>
        </div>
    );
}