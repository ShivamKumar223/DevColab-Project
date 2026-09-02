import {Navbar} from "../common/navbar.jsx";
import { AdminMenu } from "./adminLeftMenu.jsx";
import {User} from "../common/user.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const CandidateForm=() =>{
    
    return <>
       <Navbar/>
       <AdminMenu/>
       <User/>
       <Form/>
    </>
}

export const Form =()=>{
  const [user, setUser ] = useState(()=> {
    return  JSON.parse(Cookies.get("DevColab"));
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

  useEffect(()=>{
    setCandidateData({...candidateData,companyCode:user.companyCode});
  },[]);

  const handleSubmit = async(e)=>{
         e.preventDefault();
         
        //  console.log(user.companyCode)
         for(let ind in candidateData)
          if(candidateData[ind].trim()==="")
          {
            alert("You are doing any mistake")
            return;
          }
          
           if(candidateData.password !== candidateData.confirmPassword)
            {
              alert("Warning : Plese match the password !");
              return;
            }
            
       try{
        const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateData),
       });
      //  console.log("res", res)
       const {message, success} = await res.json();
        // console.log("message : ",message)
       if(res.ok && success)
       {
        alert(`${message}`)
        
       }
       else{
         alert(message)
       }
    } 
    catch(error){
            console.log("Error : ",error);
            console.log("API error in signup");
        }

              // console.log(candidateData);
            setCandidateData({
                name:"",
                email:"",
                password:"",
                confirmPassword:"",
                pNumber:"",
                empID: "",
                role:"",
                companyCode:""
                })
  }


    return (
     
       <div className="h-screen w-[80%] bg-gray-700 absolute top-[5rem] right-0 rounded-[1px] flex justify-center items-center">
           <form onSubmit={(e)=>handleSubmit(e)} className="h-[80%] w-[60%] bg-gray-800 flex flex-col items-center justify-evenly rounded-[2rem]">
                   <div className="flex justify-between w-[80%]" >
                     <label htmlFor="name">Name :</label>
                     <input onChange={(e)=>setCandidateData({...candidateData,name:e.target.value})} value={candidateData.name} 
                        className="h-[2rem] w-[20rem] px-5 rounded-[2rem] bg-gray-900 " 
                        id="name" type="text" placeholder="Enter full name" required/>
                   </div>
                   <div className="flex justify-between w-[80%]">
                      <label htmlFor="id">Assign Employee ID :</label>
                      <input onChange={(e)=>setCandidateData({...candidateData,empID:e.target.value})} value={candidateData.empID} 
                           className="h-[2rem] w-[20rem] px-5 rounded-[2rem] bg-gray-900 " 
                           id="id" type="text" placeholder="Enter employee id" required/>
                    </div>
                    
                   <div className="flex justify-between w-[80%]">
                     <label htmlFor="pass">Password : </label>
                     <input onChange={(e)=>setCandidateData({...candidateData,password:e.target.value})} value={candidateData.password} 
                       className="h-[2rem] w-[20rem] px-5 rounded-[2rem] bg-gray-900 " 
                       id="pass" type="password" placeholder="Enter password" required/>
                   </div>
                   <div className="flex justify-between w-[80%]">
                     <label htmlFor="confirmPass">Confirm Password : </label>
                     <input onChange={(e)=>setCandidateData({...candidateData,confirmPassword:e.target.value})} value={candidateData.confirmPassword} 
                     className="h-[2rem] w-[20rem] px-5 rounded-[2rem] bg-gray-900 " 
                     id="confirmPass" type="password" placeholder="Confirm password" required/>
                   </div>

                     <div className="flex justify-between w-[80%]">
                      <label htmlFor="role">Assign Employee role :</label>
                      <input onChange={(e)=>setCandidateData({...candidateData,role:e.target.value})} value={candidateData.role} 
                           className="h-[2rem] w-[20rem] px-5 rounded-[2rem] bg-gray-900 " 
                           id="role" type="text" placeholder="Enter employee role" required/>
                    </div>


                    <div className="flex justify-between w-[80%]">
                       <label htmlFor="code">Company Code :</label>
                       <input readOnly  value={user.companyCode}
                           className="h-[2rem] w-[20rem] px-5 rounded-[2rem] bg-gray-900 text-red-500" 
                           id="code" type="text" placeholder="Company Code" required/>
                    </div>
                    
                     <div className="flex justify-between w-[80%]">
                      <label htmlFor="phone">Phone number :</label>
                      <input onChange={(e)=>setCandidateData({...candidateData,pNumber:e.target.value})} value={candidateData.phone} 
                         className="h-[2rem] w-[20rem] px-5 rounded-[2rem] bg-gray-900 " 
                         id="phone" type="number" placeholder="Enter phone number"  required/>
                    </div>
                    <div className="flex justify-between w-[80%]">
                      <label htmlFor="email">Email :</label>
                      <input onChange={(e)=>setCandidateData({...candidateData,email:e.target.value})} value={candidateData.email} 
                        className="h-[2rem] w-[20rem] px-5 rounded-[2rem] bg-gray-900 " 
                        id="email" type="email" placeholder="Enter email" required/>
                    </div>
                    <button className="bg-blue-800 w-[50%] h-[2.2rem] rounded-[2rem]" type="submit">Create</button>
           </form>
       </div>
    )

}