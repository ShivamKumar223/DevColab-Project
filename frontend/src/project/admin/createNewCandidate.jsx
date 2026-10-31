import { Navbar } from "../common/navbar.jsx";
import { AdminMenu } from "./adminLeftMenu.jsx";
import { User } from "../common/user.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const CandidateForm = () => {
    return (
        <>
           <Navbar/>
           <AdminMenu/>
           <User/>
           <Form/>
        </>
    )
}

export const Form = () => {
  const [user, setUser] = useState(() => {
    try {
      const cookie = Cookies.get("DevColab");
      return cookie ? JSON.parse(cookie) : { companyCode: "", empID: "", role: "" };
    } catch {
      return { companyCode: "", empID: "", role: "" };
    }
  })
  const [candidateData, setCandidateData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    pNumber:"",
    empID: "",
    role : "",
    companyCode:""
  });

  useEffect(() => {
    setCandidateData({...candidateData, companyCode: user.companyCode});
  }, []);

  const handleSubmit = async (e) => {
         e.preventDefault();
         for(let ind in candidateData)
          if(candidateData[ind].trim() === "") {
            alert("You are doing any mistake")
            return;
          }
           if(candidateData.password !== candidateData.confirmPassword) {
            alert("Warning : Please match the password !");
            return;
           }
         try {
          const API_URL = import.meta.env.VITE_API_URL;
          const res = await fetch(`${API_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(candidateData),
           });
           const { message, success } = await res.json();
           if(res.ok && success) {
            alert(`${message}`);
           } else {
            alert(message);
           }
        } catch(error) {
            console.log("Error : ", error);
        }

        setCandidateData({
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            pNumber:"",
            empID: "",
            role:"",
            companyCode: user.companyCode
        })
  }

    return (
       <div className="min-h-screen w-full md:w-[80%] absolute top-20 md:top-0 right-0 bg-gray-700 flex justify-center items-center p-4 text-white">
            <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-xl bg-gray-800 flex flex-col items-center justify-center gap-4 p-6 md:p-8 rounded-[2rem] shadow-xl my-6 ">
                <h2 className="text-xl font-bold mb-2">Create Candidate / User</h2>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-4">
                   <label htmlFor="name" className="text-sm font-medium">Name :</label>
                   <input onChange={(e) => setCandidateData({...candidateData, name: e.target.value})} value={candidateData.name} 
                        className="h-10 w-full sm:w-[70%] px-4 rounded-[2rem] bg-gray-900 text-white" 
                        id="name" type="text" placeholder="Enter full name" required/>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-4">
                   <label htmlFor="id" className="text-sm font-medium">Assign Employee ID :</label>
                   <input onChange={(e) => setCandidateData({...candidateData, empID: e.target.value})} value={candidateData.empID} 
                        className="h-10 w-full sm:w-[70%] px-4 rounded-[2rem] bg-gray-900 text-white" 
                        id="id" type="text" placeholder="Enter employee id" required/>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-4">
                   <label htmlFor="pass" className="text-sm font-medium">Password : </label>
                   <input onChange={(e) => setCandidateData({...candidateData, password: e.target.value})} value={candidateData.password} 
                       className="h-10 w-full sm:w-[70%] px-4 rounded-[2rem] bg-gray-900 text-white" 
                       id="pass" type="password" placeholder="Enter password" required/>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-4">
                   <label htmlFor="confirmPass" className="text-sm font-medium">Confirm Password : </label>
                   <input onChange={(e) => setCandidateData({...candidateData, confirmPassword: e.target.value})} value={candidateData.confirmPassword} 
                       className="h-10 w-full sm:w-[70%] px-4 rounded-[2rem] bg-gray-900 text-white" 
                       id="confirmPass" type="password" placeholder="Confirm password" required/>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-4">
                   <label htmlFor="role" className="text-sm font-medium">Assign Employee role :</label>
                   <input onChange={(e) => setCandidateData({...candidateData, role: e.target.value})} value={candidateData.role} 
                        className="h-10 w-full sm:w-[70%] px-4 rounded-[2rem] bg-gray-900 text-white" 
                        id="role" type="text" placeholder="Enter employee role" required/>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-4">
                   <label htmlFor="code" className="text-sm font-medium">Company Code :</label>
                   <input readOnly value={user.companyCode}
                        className="h-10 w-full sm:w-[70%] px-4 rounded-[2rem] bg-gray-900 text-red-500 font-semibold" 
                        id="code" type="text" placeholder="Company Code" required/>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-4">
                   <label htmlFor="phone" className="text-sm font-medium">Phone number :</label>
                   <input onChange={(e) => setCandidateData({...candidateData, pNumber: e.target.value})} value={candidateData.pNumber} 
                       className="h-10 w-full sm:w-[70%] px-4 rounded-[2rem] bg-gray-900 text-white" 
                       id="phone" type="number" placeholder="Enter phone number" required/>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-1 sm:gap-4">
                   <label htmlFor="email" className="text-sm font-medium">Email :</label>
                   <input onChange={(e) => setCandidateData({...candidateData, email: e.target.value})} value={candidateData.email} 
                       className="h-10 w-full sm:w-[70%] px-4 rounded-[2rem] bg-gray-900 text-white" 
                       id="email" type="email" placeholder="Enter email" required/>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 transition-all w-full sm:w-[50%] h-11 rounded-[2rem] font-medium mt-2 shadow text-white" type="submit">Create</button>
           </form>
       </div>
    )
}