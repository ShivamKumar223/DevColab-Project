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
  const [projectDetails, setProjectDetails] = useState({ name: "", description: "", assignTo: [user.empID], startDate: "", dueDate: "" });
  const [employees, setEmployees] = useState([]);

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
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/getAllEmployees`, {
      method: "GET",
      credentials: "include"
    });
    const { employees } = await res.json();
    setEmployees([...employees]);
  }

  useEffect(() => {
    getAllEmployee();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/addNewProject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...projectDetails })
      });
      const { success, message } = await res.json();
      if (res.ok && success) {
        alert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log("Error occured in addition of new project : ", error);
    }
  }

  return (
    <div className="min-h-screen w-full md:w-[80%] bg-gray-700 absolute right-0 top-[5rem] md:top-0 p-4 md:p-6 flex justify-center items-center text-white">
      <div className="p-4 md:p-6 w-full max-w-2xl bg-gray-800 rounded-[8px] shadow-lg my-4 mx-auto">
        <h1 className="text-xl md:text-[1.5rem] font-bold mb-4">Create new project</h1>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4 items-center">
          <div className="w-full">
            <label htmlFor="name" className="block mb-1 text-sm md:text-base">Project Name</label>
            <input onChange={(e) => setProjectDetails({ ...projectDetails, name: e.target.value })}
              className="h-10 w-full rounded-[5px] bg-gray-900 px-3 text-white" type="text" id="name"
              required value={projectDetails.name} placeholder="Enter project name" />
          </div>

          <div className="w-full">
            <label className="block mb-1 text-sm md:text-base" htmlFor="description">Description</label>
            <textarea onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}
              className="rounded-[5px] w-full bg-gray-900 text-white p-3" id="description" rows={4}
              value={projectDetails.description} placeholder="Enter something about project"></textarea>
          </div>

          <fieldset className="w-full bg-gray-900 border border-gray-700 p-3 rounded-[5px] max-h-48 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <legend className="px-2 text-sm font-semibold">Assign Team Members</legend>
            {
              employees.map((employee, ind) => {
                return (
                  <div key={ind} className="flex items-center gap-2">
                    <input onChange={handleCheboxes} value={employee.empID}
                      className="w-4 h-4" type="checkbox" id={employee.empID} />
                    <label htmlFor={employee.empID} title={employee.name} className="truncate text-sm">{employee.empID}</label>
                  </div>
                )
              })
            }
          </fieldset>

          <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
            <div className="w-full sm:w-[48%]">
              <label htmlFor="startDate" className="block mb-1 text-sm">Start Date</label>
              <input onChange={(e) => setProjectDetails({ ...projectDetails, startDate: e.target.value })}
                className="bg-gray-900 h-10 px-3 w-full rounded-[5px] text-white" id="startDate" type="date"
                value={projectDetails.startDate} />
            </div>
            <div className="w-full sm:w-[48%]">
              <label htmlFor="dueDate" className="block mb-1 text-sm">Due Date</label>
              <input onChange={(e) => setProjectDetails({ ...projectDetails, dueDate: e.target.value })}
                className="bg-gray-900 h-10 px-3 w-full rounded-[5px] text-white" id="dueDate" type="date" required
                value={projectDetails.dueDate} />
            </div>
          </div>

          <button className="bg-blue-500 w-full sm:w-[50%] h-11 border-[1px] rounded-[2rem] mt-4 hover:bg-blue-600 transition-all font-medium text-white"
            type="submit">Create Project</button>
        </form>
      </div>
    </div>
  )
}