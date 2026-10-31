import React, { useState, useEffect } from "react";
import axios from 'axios';
import Editor from "@monaco-editor/react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { IoIosShareAlt } from "react-icons/io";

export function CodeEditor() {
  const [user, setUser] = useState(() => {
    try {
      const cookie = Cookies.get("DevColab");
      return cookie ? JSON.parse(cookie) : { empID: "", role: "", name: "" };
    } catch { return { empID: "", role: "", name: "" }; }
  });
  const [code, setCode] = useState("// Write JavaScript code here 👇\n");
  const [output, setOutput] = useState("");
  const [error, setError] = useState('');
  const [currentTask, setCurrentTask] = useState(() => {
    try {
      const cookie = Cookies.get("currentTask");
      return cookie ? JSON.parse(cookie) : { status: "pending", assignTo: [], project: "", taskTitle: "" };
    } catch { return { status: "pending", assignTo: [], project: "", taskTitle: "" }; }
  });
  const [hidden, setHidden] = useState(true);
  const [socket, setSocket] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(() => currentTask.status);
  const [selectedCandidates, setSelectedCandidates] = useState([user.empID]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [hide, setHide] = useState(true);

  const handleFileHide = () => setHide(!hide);
  const handleSelectLanguage = (e) => setSelectedLanguage(e.target.value);

  useEffect(() => {
    if(selectedLanguage === "javascript")
      setCode(`// Write JavaScript code here 👇\nconsole.log("Welcome to DevColab JavaScript Code Editor");`);
    else if(selectedLanguage === "c")
      setCode(`// Write C code here 👇\n#include <stdio.h>\n\nint main() {\n  printf("Welcome to DevColab c++ compiler");\n  return 0;\n}`);
    else if(selectedLanguage === "cpp")
      setCode(`// Write C++ code here 👇\n#include<iostream>\nusing namespace std;\n\nint main(){\n  cout<<"Welcome to DevColab c++ compiler";\n  return 0;\n}`);
    else if(selectedLanguage === "python")
      setCode(`// Write Python code here 👇\nprint("Welcome to DevColab Python interpreter");`);
    else if(selectedLanguage === "java")
      setCode(`// Write Java code here 👇\nclass Main {\n  public static void main(String[] args) {\n    System.out.println("Welcome to DevColab Java code editor");\n  }\n}`);
  }, [selectedLanguage]);

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);
    
    newSocket.on("connect", () => {
      newSocket.emit("setID", user.empID);
    });

    newSocket.on("shareCode", (data) => {
      setCode(`${data.code}`);
      setSelectedCandidates([...data.selectedCandidates]);
    });
  }, []);

  const updateTaskStatus = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    await fetch(`${API_URL}/api/updateTaskStatus`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ selectedStatus }),
      credentials: "include"
    });
    toast.success("Updation successful");
  }

  const javascript = () => {
    let logs = [];
    const originalLog = console.log;
    console.log = (...args) => logs.push(args.join(" "));

    try {
      const result = eval(code);
      if (result !== undefined) logs.push(String(result));
      setOutput(logs.join("\n"));
    } catch (error) {
      setOutput(error.toString());
    } finally {
      console.log = originalLog;
    }
  }

  const cpp = async () => {
    setOutput("Running...");
    try {
      const res = await fetch("http://localhost:5002/cpp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setOutput(data.output || "No output");
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  const python = async () => {
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
    if(selectedLanguage === "javascript") javascript();
    else if(selectedLanguage === "cpp") cpp();
    else if(selectedLanguage === "python") python();
  };

  const toggleShareList = () => setHidden(!hidden);

  const selectedCandidatesFunction = (e) => {
    const arr = [...selectedCandidates];
    const value = e.target.value;
    if(e.target.checked) {
      if(!arr.includes(value)) {
        arr.push(value);
        setSelectedCandidates([...arr]);
      }
    } else {
      const index = arr.indexOf(value);
      arr.splice(index, 1);
      setSelectedCandidates([...arr]);
    }
  }

  const shareToSelectedCandidate = (e) => {
    e.preventDefault();
    setHidden(true);
    socket.emit("shareCode", { selectedCandidates, code });
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#1e1e1e] text-gray-100">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#252526] border-b border-gray-700">
        <div className="flex items-center gap-3">
          <button onClick={handleFileHide} className="bg-white w-8 h-8 rounded-full text-black flex justify-center items-center shadow">
            <PiDotsThreeOutlineVerticalBold />
          </button>
          <h1 className="text-base md:text-lg font-semibold text-green-400">DevColab Editor</h1>
          
          <div className="flex items-center gap-2">
            <select onChange={(e) => setSelectedStatus(e.target.value)} className="bg-blue-600 text-white h-8 px-2 rounded text-sm">
              <option className="hidden" value={currentTask.status}>{currentTask.status}</option>
              <option value="pending">Pending</option>
              <option value="inprogress">Inprogress</option>
              <option value="review">Review</option>
              <option value="complete">Complete</option>
            </select>
            <button onClick={updateTaskStatus} className="border border-blue-500 px-2 py-1 rounded text-xs hover:bg-blue-600 transition">Update</button>
          </div>
        </div>

        <div className="bg-purple-600 text-white px-3 py-1 rounded text-xs md:text-sm truncate max-w-xs">
          <p>{currentTask.project}@{currentTask.taskTitle}</p>
        </div>

        <div className="flex items-center gap-3 relative">
          <select onChange={(e) => handleSelectLanguage(e)} className="h-8 px-2 rounded bg-blue-600 text-white text-sm">
            <option value="javascript">JavaScript</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <button onClick={runCode} className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded font-semibold text-black text-sm">
            ▶ Run
          </button>

          <button onClick={toggleShareList} className="w-8 h-8 bg-green-500 rounded-full flex justify-center items-center text-black text-lg">
            <IoIosShareAlt/>
          </button>

          <form onSubmit={shareToSelectedCandidate} className={`${hidden ? "hidden" : "flex"} flex-col absolute right-0 top-10 z-20 w-60 bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700 gap-2 max-h-80 overflow-y-auto`}>
            <p className="text-sm font-semibold border-b border-gray-600 pb-1">Share with:</p>
            {
              currentTask.assignTo.map((emp, ind) => (
                <div key={ind} className="flex items-center gap-2">
                  <input onChange={selectedCandidatesFunction} value={emp} type="checkbox" id={`emp-${emp}`} className="h-4 w-4"/> 
                  <label htmlFor={`emp-${emp}`} className="text-sm">{emp}</label>
                </div>
              ))
            }
            <button type="submit" className="mt-2 w-full bg-blue-600 py-1 rounded text-sm hover:bg-blue-700 font-medium">Share</button>
          </form>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-2/3 border-b md:border-b-0 md:border-r border-gray-700 min-h-[50vh]">
          <Editor
            height="100%"
            language={selectedLanguage}
            theme="vs-dark"
            value={code}
            onChange={(value) => {
              setCode(value);
              if(socket) socket.emit("shareCode", { selectedCandidates, code: value });
            }}
          />
        </div>

        <div className="w-full md:w-1/3 p-4 bg-[#1b1b1b] overflow-auto min-h-[25vh]">
          <h2 className="text-base font-bold text-green-400 mb-2">Output:</h2>
          <pre className="text-gray-300 text-sm whitespace-pre-wrap">{output}<br/>{error}</pre>
        </div>
      </div>
    </div>
  );
}