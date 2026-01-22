import { useEffect, useState } from "react";

import { Navbar } from "../common/navbar.jsx";
import { User } from "../common/user.jsx";
import { LeftMenu } from "../common/leftMenu.jsx";
import Cookies from "js-cookie";

export const AddNewProject = () => {





  return (
    <>
      <Navbar />
      <LeftMenu />
      <User />
      <ProjectDetails />
    </>
  )
}


const ProjectDetails = () => {
  const [user, setUser] = useState(()=> JSON.parse(Cookies.get("DevColab")));
  // console.log(user);
  const [projectDetails, setProjectDetails] = useState({ name: "", description: "", assignTo: [user.empID], startDate: "", dueDate: "" });
  const [employees, setEmployees] = useState([])

  const handleCheboxes = (e) => {
    const value = e.target.value;
    const temp = projectDetails.assignTo;
    const ind = temp.indexOf(value);

    if (e.target.checked)
      setProjectDetails({ ...projectDetails, assignTo: [...temp, value] });


    else {

      temp.splice(ind, 1);
      setProjectDetails({ ...projectDetails, assignTo: [...temp] });
    }

  }

  const getAllEmployee = async () => {
    const res = await fetch('http://localhost:5000/api/getAllEmployees', {
      method: "GET",
      credentials: "include"
    })

    const { employees } = await res.json();
    setEmployees([...employees])
    //  console.log(employees);
  }

  useEffect(() => {
    getAllEmployee();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const conpanyCode = localStorage.getItem("conpanyCode");
    const empID = localStorage.getItem("empID");
    try {
      const res = await fetch(`http://localhost:5000/api/addNewProject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...projectDetails })
      });
      const { success, message } = await res.json();
      if (res.ok && success) {
        alert(message);
        // setProjectDetails({name:"", description:"",assignTo:[],startDate:"",dueDate:""});
      } else {
        alert(message);
      }

    }
    catch (error) {
      console.log("Error occured in addition of new project : ", error);
    }
  }

  return (
    <div className="h-screen w-[80%] bg-gray-700  rounded-[1px] absolute  right-0 ">
      <div className="p-5 h-[90%] w-[90%] bg-gray-800 rounded-[5px] mx-[3.64rem] my-5 "  >

        <h1><b className="text-[1.5rem]">Create new project</b></h1>

        <form onSubmit={handleSubmit}
          className="mt-2 flex flex-col justify-evenly  items-center">
          <div className="w-[80%]">
            <label htmlFor="name">Project Name</label>
            <input onChange={(e) => setProjectDetails({ ...projectDetails, name: e.target.value })}
              className="h-10 w-[100%] rounded-[5px] bg-gray-900 px-[5px]" type="text" id="name"
              required value={projectDetails.name} placeholder="Enter project name" />
          </div>

          <div className="w-[80%] mt-2">
            <label className="mt-3" htmlFor="description">Description</label>
            <textarea onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}
              className="rounded-[5px] w-[100%]  bg-gray-900 text-black p-[5px] text-white" id="description" rows={4}
              value={projectDetails.description} placeholder="Enter somthing about project"></textarea>
          </div>

          <fieldset className="w-[80%] bg-gray-900 border-2 h-[12rem] mt-3 grid grid-cols-3 grid-rows-auto grid-rows-[1fr_1fr_1fr] overflow-auto">
            <legend >Assign Team Members</legend>
            {
              employees.map((employee, ind) => {
                return <li key={ind} className="flex items-center gap-2 m-2" >
                  <input onChange={handleCheboxes} value={employee.empID}
                    className="w-5 h-5" type="checkbox" id={employee.empID} />
                  <label htmlFor={employee.empID} title={employee.name}>{employee.empID}</label>
                </li>

              })
            }
          </fieldset>

          <div className="mt-2 flex justify-between w-[80%] h-[5rem]" >
            <div className="w-[48%]">
              <label htmlFor="startDate">Start Date </label>
              <input onChange={(e) => setProjectDetails({ ...projectDetails, startDate: e.target.value })}
                className="w-[50%] bg-gray-900 h-9 px-2 w-full rounded-[5px]" id="startDate" type="date"
                value={projectDetails.startDate} />
            </div>
            <div className="w-[48%]">
              <label htmlFor="dueDate">Due Date </label>
              <input onChange={(e) => setProjectDetails({ ...projectDetails, dueDate: e.target.value })}
                className="bg-gray-900 h-9 px-2 w-full rounded-[5px]" id="dueDate" type="date" required
                value={projectDetails.dueDate} />
            </div>
          </div>

          <button className="bg-blue-500 w-[50%] h-10 border-[1px] rounded-[2rem] mt-8 hover:text-[0.9rem]"
            type="submit">Create Project</button>

        </form>
      </div>
    </div>
  )
}