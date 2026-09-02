import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AdminMentors =()=>{

    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState(()=>{
                return JSON.parse(Cookies.get("DevColab"));
             })
    const companyCode = userDetails.companyCode;
    const getAllUsers = async()=>{
         const API_URL = import.meta.env.VITE_API_URL;
         const res = await fetch(`${API_URL}/admin/getAllUsers?companyCode=${companyCode.trim()}`,{
            method:"GET",
            credentials:"include",
         });
         const { users } = await res.json();
         console.log("users : ",users)
         setUsers([...users])
    }
    console.log(users)

    useEffect(()=>{
        getAllUsers();
    },[])

    if(users.length == 0)
       return <div className="h-[100%] w-[80%] absolute right-[0] bg-gray-700 absolute flex justify-center pt-[5rem] text-[2rem]">
          <h1>Loading...</h1>
       </div>
     

    return <div className="h-[70%] w-[80%] absolute right-[0] bg-gray-700 absolute top-[40.2%]">
           
         <div className="mx-9 p-5 bg-gray-800 h-[97%] rounded-[1rem] ">
            <big className="border-b-[1px] w-[100%]">All Mentors</big >
            <ul className="mt-9 h-[100%] grid grid-cols-3 auto-rows-[10rem] gap-5 overflow-y-scroll scrollbar-none">
            {
                users.map((user,ind)=>{
                    if(user.role=="Mentor")
                    return <li className="bg-gray-800 p-5 rounded-[1rem] shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl" key={ind}>
                        <p >{user.empID}</p>
                        <p >{user.name}</p>
                        <p >{user.role}</p>
                        <p >{user.pNumber}</p>
                        <p >{user.email}</p>
                    </li>
                })
            }
         </ul>
        </div>
     
    </div>
}