import React, { useState } from "react";
import axios from 'axios';
import Editor from "@monaco-editor/react";
import  Cookies from "js-cookie";
import { io } from "socket.io-client";
import {toast  }from "react-toastify"

import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { IoIosShareAlt } from "react-icons/io";
import { useEffect } from "react";

// import { File } from "./File";
export  function CodeEditor() {

  const [user, setUser] = useState(()=>{
    return JSON.parse(Cookies.get("DevColab"));
  })
 
  const [code, setCode] = useState("// Write JavaScript code here 👇\n");
  const [output, setOutput] = useState("");
   const [error, setError] = useState('');
  const [currentTask, setCurrentTask] =useState(()=>{
    return JSON.parse(Cookies.get("currentTask"))
  })
  const [hidden, setHidden] = useState(true);
  const [socket, setSocket] = useState(null);
  // console.log(currentTask.assignTo)
  const [selectedStatus, setSelectedStatus] = useState(()=> currentTask.status);
  // console.log(selectedStatus)
  const [selectedCandidates, setSelectedCandidates] = useState([user.empID])
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [hide, setHide] = useState(true);

  const handleFileHide = ()=>{

    setHide(!hide);
  }

  const handleSelectLanguage = (e) =>{
     setSelectedLanguage(e.target.value);

  }

useEffect(()=>{
 if(selectedLanguage == "javascript")
  setCode(`// Write JavaScript code here 👇\n 
  console.log("Welcome to DevColab JavaScript Code Editor")
        `)
 else if(selectedLanguage == "c")
  setCode(
`// Write C code here 👇\n
#include <stdio.h>

int main() {
   
  printf("Welcome to DevColab c++ compiler");

  return 0;
}
        `)
 else if(selectedLanguage == "cpp")
  setCode(
`// Write C++ code here 👇\n
   #include<iostream>
   using namespace std;

   int main(){

     cout<<"Welcome to DevColab c++ compiler";
     return 0;
  }
        `)
  else if(selectedLanguage == "python")
  setCode(
`// Write Python code here 👇\n
 
  print("Welcome to DevColab Python interpreter");
  
        `)
  else if(selectedLanguage == "java")
  setCode(
`// Write Java code here 👇\n
 class Main {
        public static void main(String[] args) {
        System.out.println("Welcome to DevColab Java code editor");
    }
}
        `)
  },[selectedLanguage])
  

  useEffect(()=>{

    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);
    
    newSocket.on("connect",()=>{
      newSocket.emit("setID",user.empID);
      console.log("emp : ", newSocket.id, " is connected");
    })

    newSocket.on("shareCode",(data)=>{
      setCode(`${data.code}`)
      setSelectedCandidates([...data.selectedCandidates]);
    })
  },[])

  //To update task status
  const updateTaskStatus = async()=>{
 
    const res = await fetch("http://localhost:5000/api/updateTaskStatus",{
      method:"PATCH",
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify({selectedStatus}),
      credentials:"include"
    })

    toast.success(`${"Updation successsful"}`)
    
  }

  //to handle javascript code
const javascript = () =>{

    let logs = [];
  // Temporarily override console.log
  const originalLog = console.log;
  console.log = (...args) => {
    logs.push(args.join(" "));
  };

  try {
    const result = eval(code);
    if (result !== undefined) logs.push(String(result));
    setOutput(logs.join("\n"));
  } catch (error) {
    setOutput(error.toString());
  } finally {
    console.log = originalLog; // restore original console.log
  }

}

// To handle c++ code 
const cpp = async() =>{

   setOutput("Running...");

    try {
      const res = await fetch("http://localhost:5002/cpp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      console.log("cpp output : ", data)
      setOutput(data.output || "No output");
    } catch (err) {
      setOutput("Error: " + err.message);
    }
}

// Handle Python code here
const python = async()=>{

    try {
      const res = await axios.post('http://localhost:5002/python', { code });
      setOutput(res.data.output || '');
      setError(res.data.error || '');
    } catch (err) {
      setError('Failed to execute: ' + err.message);
      setOutput('');
    }

  };

const runCode = () => {
  if(selectedLanguage == "javascript")
      javascript();

  else if(selectedLanguage == "cpp")
      cpp();
  
  else if(selectedLanguage == "python")
      python();
};


const toggleShareList = () =>{
  setHidden(!hidden);
}

const selectedCandidatesFunction = (e)=>{
  const arr = [...selectedCandidates];
  const value = e.target.value;
  
 if(e.target.checked)
   if(arr.includes(value))
    return;
   else
   {
     arr.push(value);
     setSelectedCandidates([...arr])
   }
  else
  {
      const index = arr.indexOf(value);
      arr.splice(index, 1);
      setSelectedCandidates([...arr]);
  }
   
}



const shareToSelectedCandidate = (e)=>{
     e.preventDefault();
     setHidden(true);

     socket.emit("shareCode", {selectedCandidates,code})
     
    }
// console.log(selectedCandidates)
  return (
    <div className="flex flex-col h-screen w-screen bg-[#1e1e1e] text-gray-100">
      {/* File system */}
      {/* <File hide={hide}/> */}
      {/* Header Bar */}
      <div className="flex items-center justify-between items-center px-6 py-3 bg-[#252526] border-b border-gray-700">
       
       <div className="w-[30rem]  flex justify-evenly">
         <button onClick={handleFileHide} className="bg-white w-[2rem] h-[2rem] rounded-[2rem] text-black flex justify-center items-center"><PiDotsThreeOutlineVerticalBold /></button>
         <h1 className="text-lg font-semibold text-green-400">DevColab Editor</h1>
           <div className="w-[15rem] px-2 flex justify-evenly ">
               <select onChange={(e)=>setSelectedStatus(e.target.value)} name="" id="" className="bg-blue-500 w-[8rem] rounded-[3px]" title="Update task status">
                  <option className="hidden" value={currentTask.status}>{currentTask.status}</option>
                  <option   value="pending">Pending</option>
                  <option   value="inprogress">Inprogress</option>
                  <option   value="review">Review</option>
                  <option   value="complete">Complete</option>
                </select>
                <button onClick={updateTaskStatus} type="submit" className="border-[2px] px-3 rounded-[5px]">Update</button>
           </div>
       </div>
      <div className="min-w-[15rem] max-w-[40rem] h-7 bg-purple-500 rounded-[5px] px-2">
            <p>{currentTask.project}@{currentTask.taskTitle}</p>
      </div>
         <div className="w-[20rem] flex justify-evenly items-center">
            <select onChange={(e)=>handleSelectLanguage(e)} name="" id="" className="h-8 w-[8rem] rounded-[3px] bg-blue-500" title="Select language">
           {/* <option value="">Language</option> */}
            <option value="javascript">JavaScript</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
        </select>
        <button
          onClick={runCode}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-semibold text-black"
          title="Run code"
        >
          ▶ Run
        </button>
         <button onClick={toggleShareList} 
         className="w-[2rem] h-[2rem] bg-green-500 rounded-[2rem] flex justify-center items-center text-[1.3rem]" 
         title="share with team members">
           <IoIosShareAlt/>
         </button>
         <form onSubmit={(e)=>shareToSelectedCandidate(e)} className={`${hidden?"hidden":""} absolute top-[5rem] h-[25rem] w-[15rem] bg-gray-500 p-5 rounded-[1rem] overflow-y-scroll scrollbar-none`}>
            {
              currentTask.assignTo.map((emp, ind)=>{
                return <div key={ind} className="flex items-center gap-5">
                         <input onChange={(e)=>selectedCandidatesFunction(e)} value={emp} type="checkbox"  id={`${emp}`} className="h-[1.1rem] w-[1.1rem]"/> 
                         <label htmlFor={`${emp}`}>{emp}</label>
                         
                </div>
              })
            }
          <div className=" absolute bottom-0 h-8 w-[84%] flex justify-center items-center ">
              <button type="submit" className="h-[70%] w-[50%] bg-blue-700 flex justify-center items-center rounded-[1rem]">share</button>
          </div>
         </form>
         </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-1">
        {/* Editor Section */}
        <div className="w-2/3 border-r border-gray-700">
          <Editor
            
            height="100%"
            language={selectedLanguage}
            theme="vs-dark"
            value={code}
            onChange={(value) => {
              setCode(()=> value)
              // console.log("value : ",value);
              socket.emit("shareCode", {selectedCandidates, code:value})
            }}
          />
        </div>

        {/* Output Section */}
        <div className="w-1/3 p-4 bg-[#1b1b1b] overflow-auto">
          <h2 className="text-lg font-bold text-green-400 mb-2">Output:</h2>
          <pre className="text-gray-300 whitespace-pre-wrap">{output}<br/>{error}</pre>
        </div>
      </div>
    </div>
  );
}
