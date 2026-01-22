import { FaMoon, FaDev} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

import { IoClose } from "react-icons/io5";
// for alert(toast) 
import { toast } from "react-toastify";

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";



export const Navbar =()=>{
    const [user, setUser] = useState(()=>{
        return JSON.parse(Cookies.get("DevColab"));
    })
    let joiningDate = user.createdAt;
        joiningDate = new Date(joiningDate)
        joiningDate = joiningDate.toLocaleDateString();
        
    // console.log(joiningDate)
     const [count, setCount] = useState(0);
     const [toggleProfile, setToggleProfile] = useState(false);
     const [toggleNotification, setToggleNotification] = useState(false);
     const [toggleChangePassword, setToggleChangePassword] = useState(true);

     const handleChangePassword = () =>{
        // console.log("shivam")
        setToggleChangePassword(!toggleChangePassword)
     }

     const handleToggleProfile = () =>{
        
        setToggleProfile((pre)=> !pre)
     }

     const handleToggleNotification = () =>{

        setToggleNotification((pre) => !pre)
     }

    return(
    
        <div className="h-[5rem] relative flex justify-between items-center bg-gray-900">
            <div className="text-[2.2rem] bg-blue-600 flex items-center gap-5 justify-center w-[20%] h-10 rounded-[5px]">
                <NavLink to="/dashboard" ><img className="h-[10rem] "  src="/DevColab-logo-transparent.png" alt="" /></NavLink>
                {/* <a className="text-[1rem] hover:cursor-pointer hover:text-[0.9rem] h-10 w-[5rem] flex items-center justify-center">Dashboard</a> */}
            </div> 
            <div className=" w-[50%] flex justify-evenly">
                {/* <input className="h-[2.2rem] w-[70%] rounded-[3rem] bg-gray-500 text-black px-5" type="text" placeholder="search..."/>
                <button className="bg-blue-500 w-[15%] h-[2.2rem]  rounded-[3rem] hover:text-[0.9rem]">Search</button> */}
            </div>
            <div className="right-10 text-[1.4rem] h-[2rem] w-[20%] flex justify-evenly items-center">
                {/* <button className="hover:text-[1.1rem] h-[2rem] w-[2rem] text-[1.2rem] " title="Click to switch mood"><FaMoon/></button> */}
                         <IconButton className="h-[2rem] w-[2rem]"  title="notification" onClick={() => {setCount(count + 1); handleToggleNotification()}}>
                             <Badge badgeContent={count} color="error">
                             <IoMdNotifications className="active:h-[1.3rem] active:w-[1.3rem] h-[1.5rem] w-[1.5rem] text-white " />
                             </Badge>
                         </IconButton>
                <button onClick={handleToggleProfile} className="hover:text-[1.4rem] h-[2rem] w-[2rem] text-[1.5rem]" title="profile"><ImProfile /></button>
            </div>
           <Profile toggleProfile={toggleProfile} user={user} joiningDate={joiningDate} handleChangePassword={handleChangePassword}/>
           <Notifications toggleNotification={toggleNotification}/>
           <ChangePassword user={user} toggleChangePassword={toggleChangePassword}/>
        </div>
    
    )
}



const Profile = ({toggleProfile, user, joiningDate, handleChangePassword}) =>{

    return (
         <div className={`${toggleProfile?"" : "hidden"} absolute right-1 top-[5rem] z-10 bg-gray-800 h-[35rem] w-[20rem] rounded-[5px] p-[5px] pl-10 flex flex-col gap-4 border-[1px] border-white`}>
                <b className="text-[1.1rem]"> My Profile</b>
                <img className="h-[5rem] w-[5rem] rounded-[5rem]  mt-5" src="/shivam.jpg" alt="my pic" />
                <pre className="flex">Name         : <div className="overflow-x-scroll scrollbar-none w-[150px]">{user.name}</div></pre>
                <pre className="flex">Role         : <div className="overflow-x-scroll scrollbar-none w-[150px]">{user.role}</div></pre>
                <pre className={`${user.role=='user'?"hidden":""} flex`}>ID           : <div className="overflow-x-scroll scrollbar-none w-[150px]">{user.empID}</div></pre>
                <pre className={`${user.role=='user'?"hidden":""} flex`}>Company Code : <div className="overflow-x-scroll scrollbar-none w-[150px]">{user.companyCode}</div></pre>
                <pre className="flex">Joining Date : <div className="overflow-x-scroll scrollbar-none w-[150px]">{joiningDate}</div></pre>
                <pre className="flex">Phone        : <div className="overflow-x-scroll scrollbar-none w-[150px]">{user.pNumber}</div></pre>
                <pre className="flex">Email        : <div className="overflow-x-scroll scrollbar-none w-[150px]">{user.email}</div></pre>
                <div className="w-full flex justify-center">
                    <button onClick={handleChangePassword} className="rounded-[2rem] w-[60%] h-[2rem] border-white border-[2px] hover:underline" >Change Password</button>
                </div>
            </div>
    )
}


const Notifications = ({toggleNotification})=>{
    let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,]

    return (
        <div className={`${toggleNotification?"" : "hidden"} 
        absolute right-1 top-[5rem] z-10 bg-blue-500 h-[40rem] w-[20rem] 
        rounded-[5px] p-[5px] pl-5 flex flex-col gap-4`}>
            <b>Notifications</b>
         <div className="h-[36.8rem] w-[100%] flex flex-col gap-1 overflow-y-scroll scrollbar-none">
            {
                arr.map((item)=>{
                 return <div className="h-[3rem] bg-white rounded-[3px] text-black">
                          {item}<br></br>
                          {item}<br></br>
                          
                       </div>
                })
            }
         </div>
        </div>
    )
}

// Handle Change Password
const ChangePassword = ({user, toggleChangePassword}) =>{
    // console.log(toggleChangePassword)
    const [password, setPassword] = useState({oldPassword:"", newPassword:"", confirmPassword:""});
    const [close, setClose] = useState(toggleChangePassword)

    useEffect(()=>setClose(toggleChangePassword),[toggleChangePassword])
    const handleClose = () =>{

        setClose(true);
    }

    const handleSubmit = async(e) =>{
        // console.log(password)
        e.preventDefault();
        for(let key in password)
            if(password[key].trim() == "")
            {
                toast.warn("Fill all fields.");
                return;
            }
        
        if(user.password !== password.oldPassword)
          {
              toast.warn("Wrong Password !")
              return;
          }
        if(password.newPassword === password.confirmPassword)
          {
              const res =await fetch("http://localhost:5000/api/changePassword", {
                         method: "PATCH",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({newPassword : password.newPassword }),
                         credentials:"include",
                       });
                const { success } = await res.json();
             if(success)
             {
                toast.success("Password Changed.");
                setClose(true)
                setPassword({oldPassword:"", newPassword:"", confirmPassword:""})
             }

          }
        else
            toast.warn("Somthing is wrong")

    }

    return (
        <>
          <form className={`${close?"hidden":""} w-[25rem] h-[25rem] rounded-[1rem] p-5 bg-gray-600 absolute top-[7rem] right-[33%] z-10 flex flex-col items-center gap-5`}>
            <button onClick={handleClose} 
                    className={`absolute top-3 right-3 bg-gray-700 w-[1.2rem] h-[1.2rem] rounded-[1rem] flex justify-center items-center`}><IoClose/></button>
            <fieldset className="border-2 w-[80%] h-[4rem] rounded-[7px] flex justify-center">
                <legend >Current Password</legend>
                <input className="w-[95%] h-[95%] pl-2 bg-gray-600" 
                       value={password.oldPassword} onChange={(e)=>setPassword({...password, oldPassword:e.target.value})}
                       type="password" placeholder="Current Password" minLength={5} required/>
            </fieldset>
            <fieldset className="border-2 w-[80%] h-[4rem] rounded-[7px] flex justify-center">
                <legend >New Password</legend>
                <input className="w-[95%] h-[95%] pl-2 bg-gray-600"
                       value={password.newPassword} onChange={(e)=>setPassword({...password, newPassword:e.target.value})} 
                       type="password" placeholder="New Password" minLength={5} required/>
            </fieldset>
            <fieldset className="border-2 w-[80%] h-[4rem] rounded-[7px] flex justify-center">
                <legend >Confirm Password</legend>
                <input className="w-[95%] h-[95%] pl-2 bg-gray-600" 
                       value={password.confirmPassword} onChange={(e)=>setPassword({...password, confirmPassword:e.target.value})}
                       type="password" placeholder="Confirm Password" minLength={5} required/>
            </fieldset>

            <button onClick={(e)=>handleSubmit(e)} 
                    type="submit"
                    className="mt-7 border-2 w-[80%] h-[3rem] rounded-[7px] bg-blue-500 active:text-[0.95rem]">Change Password</button>

          </form>
        </>
    )
}