import { Navbar } from "../navbar.jsx";
import { User } from "../user.jsx";
import { LeftMenu } from "../leftMenu.jsx";
// socket.io-client
import { io } from "socket.io-client";

import { IoSettingsOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { LuSendHorizontal } from "react-icons/lu";
import { MdVideoCall } from "react-icons/md";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


export const Messages = () => {




    return (
        <>
            <LeftMenu />
            <User />
            <Chatboard />
        </>
    )

}

const Chatboard = () => {


    const [projects, setProjects] = useState([]);
    // const [assignTo, setAssignTo] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [message, setMessage]= useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(Cookies.get("DevColab")))
    const [username, setUsername] = useState("");
    const [currentProject, setCurrentProject] = useState(null);
    const [socket, setSocket] = useState(null);

    // const [email, setEmail] = useState("")



   const saveCurrentProject = (project) => {
  setCurrentProject(project);

  setProjects((prevProjects) => {
    return prevProjects?.map((proj) => {
      if (proj.name === project.name)
        // if(proj.hidden == false)                        // don't uncomment this because this is create a problem because when you click to type message message field is hidden.
        //      return { ...proj, hidden: true };
        // else  
        return { ...proj, hidden: proj.hidden ? !proj.hidden : false };
      else
        return { ...proj, hidden: true };
    });
  });
};

    
     //hendle real-time chatting
    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        const newSocket = io(`${API_URL}`);
        
        // newSocket.ID = email; 
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Me : ", newSocket.id);
            newSocket.emit("setMessageID", user)
        })

        newSocket.on("send-message", (data) => {
            // console.log(data)
            setMessages((pre) => [...pre, data])
        })


        // return cleanup function
        return () => {
            newSocket.disconnect();
            console.log(`${newSocket.empID} disconnected from socket`);
        };
    }, [])

       const handleMessages = (e, message, setMessage) => {
        e.preventDefault();
        let value = message;
        if (value == "") {
            toast.error("Enter somthing...");
        }
        else {
            let date = Date.now();
                date = new Date(date);
                let formattedDate = date.toDateString();
            //    const day = String(date.getDate()).padStart(2, "0");
            //    const month = String(date.getMonth() + 1).padStart(2, "0"); // months start from 0
            //    const year = date.getFullYear();
            //    const formattedDate = `${day}/${month}/${year}`;
               let localeTime = date.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true   // use true for 12-hour format
                              });
                // console.log("localeDate",localeDate);
                // console.log("localeTime",localeTime);
            socket.emit("message", { name: username, ID: user.empID, message, group: currentProject, date: formattedDate, time: localeTime })
        }
        setMessage("");
    }


    useEffect(() => {
        const temp = async () => {
            try {
                // const email = localStorage.getItem("email");
                // setEmail(email);
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/getProjects`, {
                    method: "GET",
                    credentials: "include"
                });


                const res1 = await fetch(`${API_URL}/api/getUsername`, {
                    method: "GET",
                    credentials: "include"
                })

                const projects = await res.json();
                const Username = await res1.json();

                // console.log(projectDetails);
                // console.log(projects)
                // {name,description,assignTo,startDate,dueDate,}

                if (res.ok) {
                    setUsername(Username.name)
                    setProjects([...projects]);
                    setLoading(false)
                }
            } catch (error) {
                console.log("Error to fetching all project or try block in task.jsx", error);
            }
        };
        temp();
    }, [])
    // console.log(currentProject);
    //Loading
    if (loading) {
        return <div className="h-screen w-[80%] bg-gray-700  rounded-[1px]
              absolute  right-0 overflow-auton flex justify-center">
            <h1 className=" mt-[5rem] text-[2rem]">Loading...</h1>
        </div>
    }
    else

        return <div className="h-full w-[80%] bg-gray-500 relative left-[20%] flex">
            {/* Heading of messages */}
            <div className="w-[100%] h-[100%] bg-gray-600 border-l-[2px]  border-white">
                <div className="h-[6rem] px-5 bg-gray-700 flex flex-col justify-evenly">
                    <div className="flex justify-between items-center">
                        <b className="text-[1.3rem]">Chats</b><div className="text-[1.3rem]">
                            <IoSettingsOutline />
                    </div>
                    </div>
                    {/* <input className="h-9 rounded-[0.5rem] px-2" type="text" placeholder="Search team" /> */}

                </div>

                {/* Team list */}
                <div   className={`px-5 
                     bg-gray-600 p-5 h-[85%]
                     rounded-[2px] text-black overflow-y-scroll  scrollbar-none
                     transition-all duration-500 ease-linear`}>

                    {
                        projects.map((project, ind) => {
                            
                            // to set an extra property in projects variable to hid or show messageboard
                           
                            if(project.assignTo.includes(user.empID))
                            return (
                       
                               <div onClick={() => saveCurrentProject(project)} key={ind} 
                                className={`${project.hidden != false?"h-[12rem]":"h-[47rem]"} bg-gray-600 rounded-[5px] p-3 mb-5
                                shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-2xl 
                                overflow-y-scroll scrollbar-none`}> 
                                
                                <div className="flex gap-3 items-center border-b-[1px] border-white p-1">
                                    <div className="h-[2rem] w-[2rem] rounded-[2rem] bg-white grid place-items-center"><GrGroup /></div>
                                    <big className="flex  text-white h-[2rem] overflow-x-scroll scrollbar-none">
                                        {project.name}
                                        {/* <div className="flex items-center h-full">
                                        <RiMoneyRupeeCircleLine />
                                    </div>{project.taskTitle} */}
                                    </big>
                                </div>
                                <div className="min-h-[5px] text-gray-900 break-words p-2 overflow-y-scroll scrollbar-none">
                                    <p>Total members : {project.assignTo.length}</p>
                                </div>
                                <ul className="w-[100%] h-[5rem]   break-words text-gray-400 overflow-y-scroll scrollbar-none">
                                    <b className="flex">Members :</b>
                                    {
                                        project.assignTo.map((person, ind) => {
                                            return <span key={ind} className="mx-2 ">{person},</span>
                                        })
                                    }
                                </ul>
                                  <ChatBoard hidden={project.hidden} projectName={project.name} handleMessages={handleMessages} messages={messages} user={user}/>
                            </div>
                          
                                )

                        })
                    }
                </div>
            </div>
        </div>
}




const ChatBoard = ({hidden,projectName, messages, handleMessages, user}) => {

    const [message, setMessage] = useState();
    
    
   
    // console.log(user);
    
 

   return  <div className={`${hidden != false?"hidden":"w-[100%] h-[35rem]"}`}>

        {/* <div className="h-[3rem] w-full hidden px-5 bg-gray-700 flex justify-between items-center ">
            <div className="w-[70%] h-[3rem]  flex gap-3 items-center  p-1">
                <div className="h-[2rem] w-[2rem] rounded-[2rem] bg-white grid place-items-center text-black">
                    <GrGroup />
                </div>
                <big className="flex  text-white h-[2rem] overflow-x-scroll scrollbar-none">
                    {
                        currentProject ? `${currentProject.name}` : "Team name"
                    }
                </big>
            </div>

            <div className=" h-[5rem] w-[5rem] flex justify-center items-center text-[1.9rem] hover:text-[2.1rem] active:text-[1.9rem]">
                <MdVideoCall />
            </div>

            <div className="h-[5rem] w-[5rem] flex justify-center items-center cursor-pointer text-[1.5rem] hover:text-[1.7rem] active:text-[1.4rem]">
                <IoSettingsOutline />
            </div>

        </div> */}

        {/* Message fild */}
        <div className="h-[76%] bg-gray-500 overflow-y-scroll scrollbar-none p-3">
           
            {
                messages.map((data, ind, arr) => {
                    let date = Date.now();
                    date = new Date(date);
                    let dateNow = date.toDateString();
                   console.log("dateNow",arr[ind-1]?.date);
                  


                    if(data.targetGroup==projectName)
                    return <div key={ind} className={`flex flex-col ${data.senderID == user.empID ? "items-end" : "items-start"} min-h-[2rem] min-w-[0px] max-w-[100%]  rounded-[1rem] flex-wrap mb-2`}>
                          <div className={`${ind==0?"":`${data.date==arr[ind-1].date?"hidden":""}`} h-[2rem] w-[100%]  flex justify-center items-center`}>
                             <div className=" bg-gray-700 text-white w-[12%] h-full rounded-[1rem] flex justify-center items-center">{dateNow==data.date?"Today":data.date} </div>
                          </div>
                        <p
                            className={`${data.senderID == user.empID ? "bg-white text-black rounded-l-[1rem] rounded-tr-[1rem]" : "bg-purple-700 text-white rounded-r-[1rem] rounded-bl-[1rem]"} flex flex-col break-words max-w-[40%] break-all p-2   `}
                        >
                            <small className="text-[0.5rem] text-gray-400">{data.senderName}</small>
                            <p className={`${data.senderID == user.empID ? "text-black" : "text-white"}`}>{data.message}</p>
                        </p>
                        <span className="text-[0.6rem] text-white">{data.time} </span>
                    </div>

                })
            }

        </div>

        {/* Input to send message */}
        <form className="h-[5rem] bg-gray-600 w-[100%] flex items-center justify-evenly ">
            <input onChange={(e) => setMessage(e.target.value)} value={message} className="h-[2.2rem] w-[80%] rounded-[1rem] text-black px-5 " type="text" placeholder="Enter message" />
            <button type="submit" onClick={(e) => handleMessages(e,message, setMessage)} className="w-[10%] flex justify-center items-center text-[1.5rem] cursor-pointer
                hover:text-[1.7rem] active:text-[1.5rem]"><LuSendHorizontal /></button>
        </form>
    </div>
}