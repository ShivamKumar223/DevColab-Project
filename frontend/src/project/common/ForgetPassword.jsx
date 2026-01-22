import { useState } from "react";
import { IoReorderThreeOutline, } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import  Cookies from "js-cookie";
import axios from "axios";

export const ForgetPassword = () => {
     const [mobile, setMobile] = useState(()=>{
                   const user = JSON.parse(Cookies.get("DevColab"));
                   // console.log(user)
                   return user.pNumber;
                  })
     const [otp, setOTP] = useState("");
    
     const sendOTP = async () => {
       await axios.post("http://localhost:5000/send-otp", { mobile });
       };

    const verifyOTP = async () => {
        const res = await axios.post("http://localhost:5000/verify-otp", {
        mobile,
        otp
        });
    console.log(res.data);
  };

  return (
    <div className="bg-green-700 h-screen text-black">
            <header className="flex items-center justify-center">
                <nav className='flex justify-between h-20 items-center border-b-2 w-[90vw] ' >
                    <button className="m-10 font-light text-black flex items-center justify-center bg-white h-10 w-10 rounded-[5rem] "> <IoReorderThreeOutline /> </button>
                 <img className="h-[10rem] relative left-[5rem]" src="/DevColab-logo-transparent.png" alt="" />
                    <div className="w-[18rem] h-12 flex justify-between items-center">
                        {/* <button className="mx-10 rounded-[50px] text-white"> <IoMoonSharp /> </button> */}
                        <button className="mr-10  h-10 w-20 text-white text-[1.3rem] hover:text-[1.2rem] hover:underline"><NavLink to="/">Home</NavLink></button>
    
                        <button className="mx-10 h-11 w-[7rem] text-[1.2rem] hover:text-[1.1rem] text-white  rounded-[3px] hover:underline "><NavLink to="/">Back</NavLink></button>
                    </div>
                </nav>
            </header>

        <div className="h-[25%] w-full flex flex-col items-center gap-5 pt-5 ">
             <div className="flex gap-5">
                <input className="h-[2rem] w-[15rem] px-2 rounded-[5px]" type="text" value={"+91 "+mobile} readOnly/>
                <button onClick={sendOTP} className="bg-blue-700 text-white border-white border-[1px] h-[2rem] w-[7rem] rounded-[1rem] active:text-[0.95rem]">Send OTP</button>
             </div>
             <div className="flex gap-5">
                <input placeholder="OTP" onChange={(e) => setOTP(e.target.value)} className="h-[2rem] w-[15rem] px-2 rounded-[5px]"/>
                <button onClick={verifyOTP} className="bg-blue-700 text-white border-white border-[1px] h-[2rem] w-[7rem] rounded-[1rem] active:text-[0.95rem]">Verify OTP</button>
             </div>
             
        </div> 

       </div>
  )
}
