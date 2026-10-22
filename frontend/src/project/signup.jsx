import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Slider } from "./common/Slider";

export const SignupPage = () => {
    const navigate = useNavigate();
    const [role] = useState(() => localStorage.getItem("role"));
    const [signupData, setSignupData] = useState({ role: role, name: "", pNumber: "", email: "", password: "", confirmPass: "", companyCode: "" });
    const [hide, setHide] = useState(true);

    const toggleSlider = () => setHide(!hide);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (signupData.password === signupData.confirmPass) {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(signupData),
                });
                const { message, success } = await res.json();
                if (res.ok && success) {
                    toast.success(`${message}`);
                    navigate("/login");
                } else {
                    toast.warn(message);
                }
            } catch (error) {
                console.error(error);
            }
            setSignupData({ name: "", pNumber: "", email: "", password: "", confirmPass: "", companyCode: "" });
        } else {
            toast.warn("Enter same password in password and confirm password field.");
        }
    }

    return (
        <section id="signup" className="flex flex-col justify-between items-center bg-green-700 min-h-screen w-full text-white">
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

            <div className="flex-1 flex flex-col justify-center items-center w-full p-4 my-4">
                <p className="text-2xl md:text-3xl font-bold mb-6">Sign-up</p>

                <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl bg-green-800 rounded-xl shadow-2xl overflow-hidden border border-green-600">
                    <form onSubmit={handleFormSubmit} className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 gap-3 border-b md:border-b-0 md:border-r border-green-600/40">
                        <input value={role || ""} readOnly className="w-full max-w-xs h-10 bg-gray-200 px-3 rounded text-black text-sm" type="text" placeholder="Role" required />
                        <input value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} className="w-full max-w-xs h-10 bg-transparent border-b border-white px-2 text-sm focus:outline-none" type="text" placeholder="Enter your full name" required />
                        <input value={signupData.pNumber} onChange={(e) => setSignupData({ ...signupData, pNumber: e.target.value })} className="w-full max-w-xs h-10 bg-transparent border-b border-white px-2 text-sm focus:outline-none" type="number" placeholder="Phone number" maxLength={10} required />
                        <input value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className="w-full max-w-xs h-10 bg-transparent border-b border-white px-2 text-sm focus:outline-none" type="email" placeholder="Enter your email" required />
                        <input value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className="w-full max-w-xs h-10 bg-transparent border-b border-white px-2 text-sm focus:outline-none" type="password" placeholder="Enter password" required />
                        <input value={signupData.confirmPass} onChange={(e) => setSignupData({ ...signupData, confirmPass: e.target.value })} className="w-full max-w-xs h-10 bg-transparent border-b border-white px-2 text-sm focus:outline-none" type="password" placeholder="Confirm password" required />
                        <input value={signupData.companyCode} onChange={(e) => setSignupData({ ...signupData, companyCode: e.target.value })} className={`w-full max-w-xs h-10 bg-transparent border-b border-white px-2 text-sm focus:outline-none ${role !== "Admin" ? "hidden" : "block"}`} type="text" placeholder="Enter company code" />
                        
                        <button className="w-full max-w-xs h-11 mt-4 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-medium transition-all shadow" type="submit">Sign up</button>
                    </form>

                    <div className="hidden md:flex justify-center items-center w-1/2 p-6">
                        <img src="./loginPic/signup.png" alt="Signup Illustration" className="max-h-80 object-contain" />
                    </div>
                </div>
            </div>
        </section>
    )
}