import { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { Slider } from "./Slider";

export const ForgetPassword = () => {
    const [hide, setHide] = useState(true);
    const toggleSlider = () => setHide(!hide);

    const [mobile, setMobile] = useState(() => {
        try {
            const cookieVal = Cookies.get("DevColab");
            if (cookieVal) {
                const user = JSON.parse(cookieVal);
                return user.pNumber || "";
            }
        } catch (error) {
            console.error("Error reading user cookie:", error);
            return "";
        }
        return "";
    });

    const [otp, setOTP] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;
    
    const sendOTP = async () => {
        if (!mobile) {
            toast.error("Mobile number not found. Please log in again.");
            return;
        }
        try {
            await axios.post(`${API_URL}/send-otp`, { mobile });
            toast.success("OTP sent successfully!");
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
            console.error(error);
        }
    };

    const verifyOTP = async () => {
        if (!otp || otp.trim() === "") {
            toast.warn("Please enter the OTP.");
            return;
        }
        try {
            const res = await axios.post(`${API_URL}/verify-otp`, {
                mobile,
                otp
            });
            toast.success("OTP verified successfully!");
            console.log(res.data);
        } catch (error) {
            toast.error("Invalid OTP. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="bg-green-700 min-h-screen w-full flex flex-col justify-between text-white overflow-x-hidden">
            <Slider hide={hide} />

            <header className="flex items-center justify-center p-4 w-full">
                <nav className='flex justify-between h-16 md:h-20 items-center border-b border-white/20 w-full max-w-6xl px-4'>
                    <button onClick={toggleSlider} className="font-light text-black flex items-center justify-center bg-white h-10 w-10 rounded-full shadow hover:bg-gray-100 transition-all"> 
                        <IoReorderThreeOutline className="text-xl"/> 
                    </button>
                    <img className="h-14 md:h-20 object-contain" src="/DevColab-logo-transparent.png" alt="Logo" />
                    <div className="flex gap-4 items-center">
                        <NavLink to="/" className="text-white hover:underline text-sm md:text-base">Home</NavLink>
                        <NavLink to="/" className="text-white hover:underline text-sm md:text-base">Back</NavLink>
                    </div>
                </nav>
            </header>

            <div className="flex-1 flex flex-col justify-center items-center w-full p-4 my-auto">
                <div className="w-full max-w-md bg-green-800 p-6 md:p-8 rounded-xl shadow-2xl border border-green-600 flex flex-col gap-6 items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-center">Reset Password</h1>
                    
                    <div className="w-full flex flex-col sm:flex-row gap-3 items-center">
                        <input 
                            className="h-11 w-full px-4 rounded-lg bg-green-900 border border-green-600 text-white text-sm focus:outline-none" 
                            type="text" 
                            value={mobile ? `+91 ${mobile}` : "No mobile found"} 
                            readOnly 
                            placeholder="Mobile number"
                        />
                        <button 
                            onClick={sendOTP} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 w-full sm:w-32 rounded-lg text-sm transition-all shadow whitespace-nowrap"
                        >
                            Send OTP
                        </button>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-3 items-center">
                        <input 
                            placeholder="Enter OTP" 
                            onChange={(e) => setOTP(e.target.value)} 
                            value={otp}
                            className="h-11 w-full px-4 rounded-lg bg-green-900 border border-green-600 text-white text-sm focus:outline-none"
                        />
                        <button 
                            onClick={verifyOTP} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 w-full sm:w-32 rounded-lg text-sm transition-all shadow whitespace-nowrap"
                        >
                            Verify OTP
                        </button>
                    </div>

                    <div className="text-center mt-2">
                        <NavLink to="/login" className="text-xs text-blue-200 hover:underline">Back to Login</NavLink>
                    </div>
                </div>
            </div>
            
            <div className="p-4 text-center text-xs text-green-200">
                <p>&copy; 2026 DevColab. All rights reserved.</p>
            </div>
        </div>
    );
};