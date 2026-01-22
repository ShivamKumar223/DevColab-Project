import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoReorderThreeOutline, } from "react-icons/io5";
import { toast } from "react-toastify";

import { Slider } from "./common/Slider";

//                        signup Page
export const SignupPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(()=>{
   return localStorage.getItem("role")
    })
    const [signupData, setSignupData] = useState({role:role, name: "", pNumber: "", email: "", password: "", confirmPass: "",companyCode:"" });
    const [hide, setHide] = useState(true);

    const toggleSlider = () =>{

        setHide(!hide);
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(signupData.password === signupData.confirmPass){
    try{
        const res =await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
       });
       
       const {message, success} = await res.json();
        // console.log("message : ",message)
       if(res.ok && success)
       {
        toast.success(`${message}`)
         navigate("/login");
       }
       else{
         toast.warn(message)
       }
    } 
    catch(error){
            console.error(error);
            console.log("API error in signup");
        }

          setSignupData({
            name: "",
            pNumber: "",
            email: "",
            password: "",
            confirmPass: "",
            companyCode:""
        })
        
        console.log(signupData);
    }
    else toast.warn("Enter same password in password and confirm password field.");
    
    }

    const inputStyle = `
      w-[15rem] h-[2rem] bg-transparent
        p-2 border-white border-b-[1px]`;

    return (

        <section id="signup" className={`flex justify-between items-center flex-col bg-green-700 h-screen w-screen`} >
           {/* <div className={`{hidden bg-black text-[2.2rem] flex items-center gap-5 justify-center w-[20%] 
           h-10 rounded-[5px] `}>
                <img className="h-[10rem] "  src="/DevColab-logo-transparent.png" alt="" />
            </div> */}
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
        
            <div id="signup" className={`flex flex-col justify-evenly items-center h-[90%] w-screen`}>
                <p className="text-[2rem]">Sign up</p>
                <div className={` flex
        justify-between items-center  
        w-[60rem] h-[30em] rounded-[1rem] custom-shadow`}>
             
                    <form onSubmit={handleFormSubmit}
                        className="flex flex-col justify-evenly items-center w-[50%] h-full border-black border-r-[1px] text-white">

                        <input value={role}  readOnly
                            className={`${inputStyle} text-black`} type="text" 
                            placeholder="Enter your role" required />    
                       
                        <input
                            value={signupData.name}
                            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                            className={`${inputStyle}`} type="text" placeholder="Enter your full name" required />
                        <input value={signupData.pNumber} onChange={(e) => setSignupData({ ...signupData, pNumber: e.target.value })} 
                              className={`${inputStyle}`} type="number" placeholder="Phone number" min="1000000000" max="9999999999" 
                              maxLength={10} title="Please enter a 10-digit number" required />
                        <input value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} 
                              className={`${inputStyle}`} type="email" placeholder="Enter your email" required />
                        <input value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                              className={`${inputStyle}`} type="password" placeholder="Enter password" required />
                        <input value={signupData.confirmPass} onChange={(e) => setSignupData({ ...signupData, confirmPass: e.target.value })} 
                              className={`${inputStyle}`} type="password" placeholder="Confirm password" required />
                        <input value={signupData.companyCode} onChange={(e) => setSignupData({ ...signupData, companyCode: e.target.value })} 
                              className={`${inputStyle} ${role !=="Admin"?"hidden":"block"}`} type="text" placeholder="Enter company code"  />
                        <button className="w-[60%] h-[2.5rem] mt-3 border-[1px] border-white  rounded-[5rem] bg-blue-700 text-white hover:text-[0.9rem] hover:underline" type="submit">Sign up</button>
                    </form>

                    <div className="w-[50%]">
                        <img src="./loginPic/signup.png" alt="" />
                    </div>
                </div>
            </div>

        </section>

    )
}
