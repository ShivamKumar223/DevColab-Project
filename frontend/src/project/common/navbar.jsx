import { ImProfile } from "react-icons/im";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const [user, setUser] = useState(() => {
        try {
            const cookieVal = Cookies.get("DevColab");
            return cookieVal ? JSON.parse(cookieVal) : { name: "User", role: "Developer", createdAt: new Date() };
        } catch {
            return { name: "User", role: "Developer", createdAt: new Date() };
        }
    });

    let joiningDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "";
    
    const [count, setCount] = useState(0);
    const [toggleProfile, setToggleProfile] = useState(false);
    const [toggleNotification, setToggleNotification] = useState(false);
    const [toggleChangePassword, setToggleChangePassword] = useState(true);

    const handleChangePassword = () => {
        setToggleChangePassword(!toggleChangePassword);
        setToggleProfile(false);
    }

    const handleToggleProfile = () => {
        setToggleProfile((pre) => !pre);
        setToggleNotification(false);
    }

    const handleToggleNotification = () => {
        setToggleNotification((pre) => !pre);
        setToggleProfile(false);
    }

    return (
        <header className="h-16 md:h-20 relative flex justify-between items-center bg-gray-900 px-4 md:px-6 shadow-md border-b border-gray-800 z-30">
            {/* Logo Section */}
            <div className="flex items-center">
                <NavLink to="/dashboard" className="flex items-center">
                    <img className="h-[10rem] object-contain" src="/DevColab-logo-transparent.png" alt="Logo" />
                </NavLink>
            </div> 

            {/* Right Action Icons */}
            <div className="flex items-center gap-3 md:gap-4 relative">
                <IconButton className="text-white" title="Notifications" onClick={() => { setCount(count + 1); handleToggleNotification(); }}>
                    <Badge badgeContent={count} color="error">
                        <IoMdNotifications className="text-xl md:text-2xl text-white" />
                    </Badge>
                </IconButton>

                <button onClick={handleToggleProfile} className="text-xl md:text-2xl text-white hover:text-blue-400 transition-all p-1" title="Profile">
                    <ImProfile />
                </button>
            </div>

            {/* Dropdown Modals */}
            <Profile toggleProfile={toggleProfile} user={user} joiningDate={joiningDate} handleChangePassword={handleChangePassword} />
            <Notifications toggleNotification={toggleNotification} />
            <ChangePassword user={user} toggleChangePassword={toggleChangePassword} setToggleChangePassword={setToggleChangePassword} />
        </header>
    )
}

const Profile = ({ toggleProfile, user, joiningDate, handleChangePassword }) => {
    if (!toggleProfile) return null;

    return (
        <div className="absolute right-2 top-16 md:top-20 z-40 bg-gray-800 w-[90%] max-w-xs rounded-lg p-5 shadow-2xl border border-gray-700 flex flex-col gap-3 text-sm text-white">
            <h3 className="font-bold text-base border-b border-gray-700 pb-2">My Profile</h3>
            <div className="flex justify-center my-2">
                <img className="h-16 w-16 rounded-full object-cover border-2 border-blue-500 shadow" src="/shivam.jpg" alt="Profile" />
            </div>
            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                <span className="text-gray-400">Name:</span>
                <span className="font-medium truncate max-w-[150px]">{user.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                <span className="text-gray-400">Role:</span>
                <span className="font-medium truncate max-w-[150px]">{user.role}</span>
            </div>
            {user.role !== 'user' && (
                <div className="flex justify-between border-b border-gray-700/50 pb-1">
                    <span className="text-gray-400">ID:</span>
                    <span className="font-medium truncate max-w-[150px]">{user.empID}</span>
                </div>
            )}
            {user.role !== 'user' && (
                <div className="flex justify-between border-b border-gray-700/50 pb-1">
                    <span className="text-gray-400">Company Code:</span>
                    <span className="font-medium truncate max-w-[150px]">{user.companyCode}</span>
                </div>
            )}
            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                <span className="text-gray-400">Joining Date:</span>
                <span className="font-medium">{joiningDate}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                <span className="text-gray-400">Phone:</span>
                <span className="font-medium">{user.pNumber}</span>
            </div>
            <div className="flex justify-between pb-1">
                <span className="text-gray-400">Email:</span>
                <span className="font-medium truncate max-w-[150px]">{user.email}</span>
            </div>
            <div className="w-full flex justify-center pt-2">
                <button onClick={handleChangePassword} className="bg-blue-600 hover:bg-blue-700 transition-all rounded-full w-full py-2 font-medium text-xs shadow">Change Password</button>
            </div>
        </div>
    )
}

const Notifications = ({ toggleNotification }) => {
    if (!toggleNotification) return null;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="absolute right-2 top-16 md:top-20 z-40 bg-gray-800 w-[90%] max-w-xs h-96 rounded-lg p-4 shadow-2xl border border-gray-700 flex flex-col gap-3 text-white">
            <h3 className="font-bold text-base border-b border-gray-700 pb-2">Notifications</h3>
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-none">
                {
                    arr.map((item, index) => (
                        <div key={index} className="p-3 bg-gray-900 rounded text-xs border border-gray-700/50 shadow-sm">
                            <p className="font-semibold text-blue-400">New system notification #{item}</p>
                            <p className="text-gray-300 mt-1">Your task status was updated successfully.</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const ChangePassword = ({ user, toggleChangePassword, setToggleChangePassword }) => {
    const [password, setPassword] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [close, setClose] = useState(toggleChangePassword);

    useEffect(() => setClose(toggleChangePassword), [toggleChangePassword]);

    const handleClose = () => {
        setClose(true);
        setToggleChangePassword(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let key in password) {
            if (password[key].trim() === "") {
                toast.warn("Fill all fields.");
                return;
            }
        }
        
        if (user.password && user.password !== password.oldPassword) {
            toast.warn("Wrong Current Password!");
            return;
        }

        if (password.newPassword === password.confirmPassword) {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/changePassword`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newPassword: password.newPassword }),
                    credentials: "include",
                });
                const data = await res.json();
                if (data.success) {
                    toast.success("Password Changed Successfully.");
                    handleClose();
                    setPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
                } else {
                    toast.error(data.message || "Failed to change password.");
                }
            } catch (error) {
                toast.error("Network error. Please try again.");
                console.error(error);
            }
        } else {
            toast.warn("New password and confirm password do not match.");
        }
    }

    if (close) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl p-6 bg-gray-800 relative flex flex-col gap-4 shadow-2xl border border-gray-700 text-white">
                <button type="button" onClick={handleClose} className="absolute top-4 right-4 bg-gray-700 w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-600 transition-all">
                    <IoClose className="text-lg"/>
                </button>
                
                <h3 className="text-xl font-bold mb-2">Change Password</h3>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-gray-300 font-medium">Current Password</label>
                    <input className="w-full h-10 px-3 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500" 
                        value={password.oldPassword} onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                        type="password" placeholder="Enter current password" minLength={5} required/>
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-gray-300 font-medium">New Password</label>
                    <input className="w-full h-10 px-3 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                        value={password.newPassword} onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} 
                        type="password" placeholder="Enter new password" minLength={5} required/>
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-gray-300 font-medium">Confirm Password</label>
                    <input className="w-full h-10 px-3 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500" 
                        value={password.confirmPassword} onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                        type="password" placeholder="Confirm new password" minLength={5} required/>
                </div>

                <button type="submit" className="mt-4 w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all font-medium text-sm shadow">
                    Update Password
                </button>
            </form>
        </div>
    )
}