import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoReorderThreeOutline, } from "react-icons/io5";
// import Cookies from "js-cookie"; You can use this after login because now cookies is not seted.
import { toast } from "react-toastify";
import { Slider } from "./common/Slider";


export const LoginPage = ()=>{

  const navigate = useNavigate();
 
   const [role, setRole] = useState(()=>localStorage.getItem("role"))  
  // console.log("Role :",role)
  const [loginData, setLoginData] = useState({role:role, companyCode:"", email:"",empID:"", password:""});
  const [hide, setHide] = useState(true);

    const toggleSlider = () =>{

        setHide(!hide);
    }

  const handleSubmit = async (e)=>{
    e.preventDefault();
  
    
      const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      credentials:"include",
    });
      const {authenticate, message} = await res.json();
      // console.log(authenticate);
    if(res.ok && authenticate)
    {
      // localStorage.setItem("email",`${loginData.email}`);
      // localStorage.setItem("companyCode",`${loginData.companyCode}`);
      // localStorage.setItem("empID",`${loginData.empID}`);

      toast.success(`${message}`);
      if(role == "Admin")
        navigate("/admin/dashboard")
      else
      navigate("/dashboard");

    }
    else 
         {
           toast.error(message);
           setLoginData({...loginData, password:""});
         }

    // console.log(loginData)
  }

    return <div className="h-screen width-screen flex flex-col justify-between items-center bg-green-800 ">
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


       {/* <div className="text-[2.2rem] bg-blue-600 flex items-center gap-5 justify-center w-[20%] h-10 rounded-[5px]">
                <NavLink to="/dashboard" ><img className="h-[10rem] "  src="/DevColab-logo-transparent.png" alt="" /></NavLink>
            </div> */}
      <div className=" w-screen h-[85%] flex flex-col justify-evenly items-center">
           <h1 className="text-[2rem]">Log-in To Enter Your Log</h1>

        <div className="bg-green-700 h-[70%] w-[45rem] flex rounded-[1rem]">
      
            <div className="flex justify-center items-center w-[50%] h-[100%] border-r-[1px]">
               <img src="./loginPic/login1.png" alt="" />
            </div>

    <div className="w-[50%] h-[100%] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-[90%] h-[100%] flex flex-col items-center justify-center " action="">

        <div className="mt-5 w-[80%] flex flex-col justify-evenly text-black">
          <label htmlFor="role">Role :</label>
          <input value={role} readOnly
          className="h-[2rem] p-4 w-[100%] bg-green-800 rounded-[2rem]"
           type="text" id="role" placeholder="Enter your role" required /> 
        </div>

          <div  className={`${role=="user"?"hidden":"flex"} mt-5 w-[80%] flex-col justify-evenly `}>
              <label className="text-black" htmlFor="cID">Company code :</label>
              <input value={loginData.companyCode} 
              onChange={(e)=>setLoginData({...loginData,companyCode:e.target.value})}
                 className="h-[2rem] p-4 w-[100%] bg-green-800 rounded-[2rem]"
                type="text" id="cID" placeholder="Enter company code" /> 
          </div>

        <div  className={`${role=="user" || role== "Admin"?"flex justify-center ":"hidden"} mt-5 w-[80%] flex flex-col justify-evenly `}>
          <label className="text-black" htmlFor="email">Email :</label>
        <input value={loginData.email} 
        onChange={(e)=>setLoginData({...loginData,email:e.target.value})} 
        className="h-[2rem] p-4 w-[100%] bg-green-800 rounded-[2rem]" 
        type="email" id="email" placeholder="Enter email"/>
        </div>

        <div  className={ `${role=="user" || role== "Admin"?"hidden":"flex justify-center "}  mt-5 w-[80%] flex flex-col justify-evenly `}>
          <label className="text-black" htmlFor="empID">Employee ID :</label>
        <input value={loginData.empID} 
        onChange={(e)=>setLoginData({...loginData,empID:e.target.value})} 
        className="h-[2rem] p-4 w-[100%] bg-green-800 rounded-[2rem]" 
        type="text" id="empID"  placeholder="Enter employee id"/>
        </div>
       
        
        <div className={`mt-5 w-[80%] flex flex-col justify-evenly `}>
        <label className="text-black" htmlFor="pass">Password :</label>
        <input 
        value={loginData.password} 
        onChange={(e)=>setLoginData({...loginData, password:e.target.value})} 
        className="h-[2rem] p-4 w-[100%] bg-green-800 rounded-[2rem]"
        type="password" id="pass" required minLength="5" placeholder="Enter password"/>
        </div>
         <div className=" w-[80%] h-[1.5rem] flex flex-row-reverse items-center">
          <NavLink to="/forgetPassword" className=" text-[0.7rem] text-right  hover:underline hover:text-blue-500" href="">forget password</NavLink></div>
       
       <div className="w-[80%] my-[2rem]">
        <button className="h-[2rem]  w-[100%] bg-blue-700 rounded-[2rem] hover:text-[0.9rem]" type="subint">Log in</button>

           <div className={`${role=="user" || role== "Admin"?"flex justify-center ":"hidden"} text-[0.8rem] w-[100%]`}> 
            <p>Don't have an account?</p>
            <NavLink to="/signup" className="hover:underline hover:text-blue-500" >Register</NavLink>
           </div>
        </div>
      </form>
    </div>

      </div>
    </div>
    </div>
}