import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Slider } from "./common/Slider";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [loginData, setLoginData] = useState({ role: role, companyCode: "", email: "", empID: "", password: "" });
  const [hide, setHide] = useState(true);

  const toggleSlider = () => setHide(!hide);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      credentials: "include",
    });
    const { authenticate, message } = await res.json();

    if (res.ok && authenticate) {
      toast.success(`${message}`);
      if (role === "Admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } else {
      toast.error(message);
      setLoginData({ ...loginData, password: "" });
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center bg-green-800 text-white">
      <Slider hide={hide} />
      
      <header className="flex items-center justify-center p-4 w-full">
        <nav className='flex justify-between h-16 md:h-20 items-center border-b border-white/20 w-full max-w-6xl px-4'>
          <button onClick={toggleSlider} className="font-light text-black flex items-center justify-center bg-white h-10 w-10 rounded-full shadow"> 
            <IoReorderThreeOutline className="text-xl"/> 
          </button>
          <img className="h-14 md:h-20 object-contain" src="/DevColab-logo-transparent.png" alt="Logo" />
          <div className="flex gap-4">
            <NavLink to="/" className="text-white hover:underline text-sm md:text-base">Home</NavLink>
            <NavLink to="/" className="text-white hover:underline text-sm md:text-base">Back</NavLink>
          </div>
        </nav>
      </header>

      <div className="w-full flex-1 flex flex-col justify-center items-center">
        <p className="text-2xl md:text-3xl font-bold mb-2 text-center">Log-in</p>

        <div>
          <b>Demo: </b>
          <p>Email: <i className=" underline " >demo@email.com,</i></p>
          
          <p>Company code: <i className=" underline " >demo123, </i></p>
          
          <p>Password: <i className=" underline " >demo@123</i></p>
          
        </div>

        <div className="bg-green-700 w-full max-w-4xl flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden border border-green-600">
          <div className="hidden md:flex justify-center items-center w-1/2 p-6 border-r border-green-600/30">
            <img src="./loginPic/login1.png" alt="Login Graphic" className="max-h-80 object-contain" />
          </div>

          <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
              <div className="w-full">
                <label htmlFor="role" className="text-xs font-semibold text-black mb-1 block">Role :</label>
                <input value={role || ""} readOnly className="h-10 px-4 w-full bg-green-800 rounded-full text-white text-sm" type="text" id="role" required /> 
              </div>

              <div className={`${role === "user" ? "hidden" : "block"} w-full`}>
                <label className="text-xs font-semibold text-black mb-1 block" htmlFor="cID">Company Code :</label>
                <input value={loginData.companyCode} onChange={(e) => setLoginData({ ...loginData, companyCode: e.target.value })} className="h-10 px-4 w-full bg-green-800 rounded-full text-white text-sm" type="text" id="cID" placeholder="Enter company code" /> 
              </div>

              <div className={`${role === "user" || role === "Admin" ? "block" : "hidden"} w-full`}>
                <label className="text-xs font-semibold text-black mb-1 block" htmlFor="email">Email :</label>
                <input value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="h-10 px-4 w-full bg-green-800 rounded-full text-white text-sm" type="email" id="email" placeholder="Enter email"/>
              </div>

              <div className={`${role === "user" || role === "Admin" ? "hidden" : "block"} w-full`}>
                <label className="text-xs font-semibold text-black mb-1 block" htmlFor="empID">Employee ID :</label>
                <input value={loginData.empID} onChange={(e) => setLoginData({ ...loginData, empID: e.target.value })} className="h-10 px-4 w-full bg-green-800 rounded-full text-white text-sm" type="text" id="empID" placeholder="Enter employee id"/>
              </div>

              <div className="w-full">
                <label className="text-xs font-semibold text-black mb-1 block" htmlFor="pass">Password :</label>
                <input value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="h-10 px-4 w-full bg-green-800 rounded-full text-white text-sm" type="password" id="pass" required minLength="5" placeholder="Enter password"/>
              </div>

              <div className="w-full text-right">
                <NavLink to="/forgetPassword" className="text-xs hover:underline text-blue-200">Forget password?</NavLink>
              </div>

              <button className="h-11 w-full bg-blue-700 hover:bg-blue-800 rounded-full font-medium transition-all shadow mt-2" type="submit">Log in</button>

              <div className={`${role === "user" || role === "Admin" ? "flex" : "hidden"} justify-center gap-1 text-xs mt-2`}> 
                <p>Don't have an account?</p>
                <NavLink to="/signup" className="hover:underline text-blue-200 font-semibold">Register</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}