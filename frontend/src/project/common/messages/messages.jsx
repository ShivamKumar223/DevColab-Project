import { LeftMenu } from "../leftMenu.jsx";
import { User } from "../user.jsx";
import { io } from "socket.io-client";
import { IoSettingsOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { LuSendHorizontal } from "react-icons/lu";
import { MdVideoCall } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const Messages = () => {
    return (
        <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden flex flex-col md:flex-row">
            <LeftMenu />
            <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col min-h-screen">
                <Chatboard />
            </div>
        </div>
    )
}

const Chatboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [user] = useState(() => {
        try {
            return JSON.parse(Cookies.get("DevColab"));
        } catch {
            return { empID: "", name: "User" };
        }
    });
    const [username, setUsername] = useState("");
    const [socket, setSocket] = useState(null);
    const [activeProject, setActiveProject] = useState(null); // For mobile responsive view switching

    const saveCurrentProject = (project) => {
        setActiveProject(project);
        setProjects((prevProjects) => {
            return prevProjects?.map((proj) => {
                if (proj.name === project.name) {
                    return { ...proj, hidden: proj.hidden ? !proj.hidden : false };
                }
                return { ...proj, hidden: true };
            });
        });
    };

    // Handle real-time chatting socket connection
    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        const newSocket = io(`${API_URL}`);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            newSocket.emit("setMessageID", user);
        });

        newSocket.on("send-message", (data) => {
            setMessages((pre) => [...pre, data]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    const handleMessages = (e, message, setMessage) => {
        e.preventDefault();
        if (!message || message.trim() === "") {
            toast.error("Enter something...");
            return;
        }
        
        let date = new Date();
        let formattedDate = date.toDateString();
        let localeTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        if (socket && activeProject) {
            socket.emit("message", {
                name: username,
                ID: user.empID,
                message,
                group: activeProject.name,
                targetGroup: activeProject.name,
                date: formattedDate,
                time: localeTime
            });
        }
        setMessage("");
    };

    useEffect(() => {
        const temp = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/api/getProjects`, {
                    method: "GET",
                    credentials: "include"
                });
                const res1 = await fetch(`${API_URL}/api/getUsername`, {
                    method: "GET",
                    credentials: "include"
                });

                const fetchedProjects = await res.json();
                const fetchedUsername = await res1.json();

                if (res.ok) {
                    setUsername(fetchedUsername.name);
                    setProjects(fetchedProjects.map(p => ({ ...p, hidden: true })));
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error fetching projects or username in chatboard:", error);
                setLoading(false);
            }
        };
        temp();
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full bg-gray-700 flex justify-center items-center">
                <h1 className="text-xl md:text-[2rem] font-bold">Loading chats...</h1>
            </div>
        );
    }

    const userProjects = projects.filter(project => project.assignTo?.includes(user.empID));

    return (
        <div className="w-full h-screen bg-gray-800 flex flex-col md:flex-row overflow-hidden border-l border-gray-700">
            {/* Team List Sidebar */}
            <div className={`w-full md:w-1/3 bg-gray-900 border-r border-gray-700 flex flex-col h-full ${activeProject ? "hidden md:flex" : "flex"}`}>
                <div className="h-16 px-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                    <span className="font-bold text-lg text-white">Chats</span>
                    <IoSettingsOutline className="text-xl text-gray-400 cursor-pointer hover:text-white" />
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-none">
                    {userProjects.length === 0 ? (
                        <p className="text-gray-400 text-center text-sm mt-6">No team chats available.</p>
                    ) : (
                        userProjects.map((project, ind) => (
                            <div 
                                onClick={() => saveCurrentProject(project)} 
                                key={ind} 
                                className="bg-gray-800 rounded-xl p-4 shadow hover:bg-gray-700/80 cursor-pointer transition-all border border-gray-700 flex flex-col gap-2"
                            >
                                <div className="flex gap-3 items-center border-b border-gray-700 pb-2">
                                    <div className="h-9 w-9 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white shadow">
                                        <GrGroup />
                                    </div>
                                    <h3 className="font-bold text-white text-base truncate flex-1">
                                        {project.name}
                                    </h3>
                                </div>
                                <div className="text-xs text-gray-400 flex justify-between items-center">
                                    <span>Total members: {project.assignTo?.length || 0}</span>
                                    <span className="text-blue-400 font-medium">Open chat &rarr;</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Board Area */}
            <div className={`flex-1 flex flex-col bg-gray-800 h-full ${!activeProject ? "hidden md:flex" : "flex"}`}>
                {activeProject ? (
                    <ChatBoardView 
                        activeProject={activeProject} 
                        setActiveProject={setActiveProject}
                        messages={messages} 
                        handleMessages={handleMessages} 
                        user={user} 
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                        <GrGroup className="text-5xl mb-3 opacity-40" />
                        <p className="text-lg font-medium">Select a team chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ChatBoardView = ({ activeProject, setActiveProject, messages, handleMessages, user }) => {
    const [message, setMessage] = useState("");

    const projectMessages = messages.filter(msg => msg.targetGroup === activeProject.name);

    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="h-16 px-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center shadow">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setActiveProject(null)} 
                        className="md:hidden text-xl text-gray-300 hover:text-white p-1"
                    >
                        <IoArrowBack />
                    </button>
                    <div className="flex items-center gap-2">
                        <GrGroup className="text-white text-lg" />
                        <h3 className="font-bold text-base md:text-lg text-white truncate max-w-xs">
                            {activeProject.name}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xl text-gray-300">
                    <button className="hover:text-white transition-all p-1" title="Video Call"><MdVideoCall /></button>
                    <button className="hover:text-white transition-all p-1" title="Settings"><IoSettingsOutline /></button>
                </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-900/50 scrollbar-none">
                {projectMessages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    projectMessages.map((data, ind, arr) => {
                        const isSelf = data.ID === user.empID || data.senderID === user.empID;
                        const showDateDivider = ind === 0 || data.date !== arr[ind - 1].date;

                        return (
                            <div key={ind} className={`flex flex-col ${isSelf ? "items-end" : "items-start"} gap-1 mb-2`}>
                                {showDateDivider && (
                                    <div className="w-full flex justify-center my-2">
                                        <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full shadow-sm">
                                            {data.date}
                                        </span>
                                    </div>
                                )}
                                <div className={`p-3 rounded-xl max-w-[85%] md:max-w-md shadow-sm ${
                                    isSelf 
                                        ? "bg-blue-600 text-white rounded-br-none" 
                                        : "bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600"
                                }`}>
                                    <p className="text-xs font-semibold text-gray-300 mb-1">{data.name}</p>
                                    <p className="text-sm md:text-base break-words">{data.message}</p>
                                </div>
                                <span className="text-[10px] text-gray-400 px-1">{data.time}</span>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Message Input Form */}
            <form onSubmit={(e) => handleMessages(e, message, setMessage)} className="p-3 md:p-4 bg-gray-900 border-t border-gray-700 flex items-center gap-3">
                <input 
                    onChange={(e) => setMessage(e.target.value)} 
                    value={message} 
                    className="flex-1 h-11 bg-gray-800 border border-gray-700 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-blue-500 shadow-inner" 
                    type="text" 
                    placeholder="Type your message..." 
                />
                <button 
                    type="submit" 
                    className="h-11 px-5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex justify-center items-center text-xl transition-all shadow"
                >
                    <LuSendHorizontal />
                </button>
            </form>
        </div>
    );
};