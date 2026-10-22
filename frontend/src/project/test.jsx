import React, { useState } from "react";
import { LeftMenu } from "../common/leftMenu";
import { User } from "../common/user";
import { IoArrowBack } from "react-icons/io5";

export function Messages() {
  const chats = [
    { id: 1, name: "Shivam", type: "dm" },
    { id: 2, name: "Shyam", type: "dm" },
    { id: 3, name: "Project A Team", type: "group" },
    { id: 4, name: "Task #12 - Bug Fix", type: "task" },
    { id: 5, name: "Frontend Team", type: "group" },
  ];

  const [activeChat, setActiveChat] = useState(chats[2]);
  const [messages, setMessages] = useState([
    { sender: "Shyam", text: "Can you finish API integration today? ⏳" },
    { sender: "Shivam", text: "Sure! I’ll push code by evening. ✅" },
    { sender: "Shivam", text: "📎 api_docs.pdf" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showChatMobile, setShowChatMobile] = useState(false);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden flex flex-col md:flex-row">
      <LeftMenu />
      
      <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col h-screen">
        <div className="flex-1 flex flex-col md:flex-row bg-gray-800 m-0 md:m-5 rounded-none md:rounded-xl overflow-hidden shadow-2xl border border-gray-700 h-full">
          
          {/* Sidebar / Chat List */}
          <div className={`w-full md:w-1/3 bg-gray-900 border-r border-gray-700 flex flex-col ${showChatMobile ? "hidden md:flex" : "flex"}`}>
            <h2 className="p-4 font-bold text-lg border-b border-gray-800 text-white">Messages</h2>
            <div className="flex-1 overflow-y-auto scrollbar-none">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 cursor-pointer border-b border-gray-800/50 transition-all flex items-center gap-3 ${
                    activeChat.id === chat.id ? "bg-gray-800 font-semibold border-l-4 border-blue-500" : "hover:bg-gray-800/50 text-gray-300"
                  }`}
                  onClick={() => {
                    setActiveChat(chat);
                    setShowChatMobile(true);
                  }}
                >
                  <span className="text-xl">
                    {chat.type === "dm" && "👤"} 
                    {chat.type === "group" && "👥"} 
                    {chat.type === "task" && "📌"}
                  </span>
                  <span className="truncate">{chat.name}</span>
                </div>
              ))}
            </div>
            <div className="hidden md:block">
               <User />
            </div>
          </div>

          {/* Chat Window */}
          <div className={`flex-1 flex flex-col bg-gray-800 ${!showChatMobile ? "hidden md:flex" : "flex"}`}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900 shadow">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowChatMobile(false)} 
                  className="md:hidden text-xl text-gray-300 hover:text-white p-1"
                  title="Back to chats"
                >
                  <IoArrowBack />
                </button>
                <h3 className="font-bold text-base md:text-lg truncate">{activeChat.name}</h3>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-3 py-1.5 rounded-lg transition shadow whitespace-nowrap">
                🎥 Start Call
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none bg-gray-800/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl max-w-[80%] md:max-w-md shadow-sm ${
                    msg.sender === "You"
                      ? "ml-auto bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600"
                  }`}
                >
                  <p className="text-xs font-semibold opacity-80 mb-1">{msg.sender}</p>
                  <p className="text-sm md:text-base break-words">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <div className="flex items-center p-3 md:p-4 border-t border-gray-700 bg-gray-900 gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="text-xl text-gray-400 hover:text-white p-2" title="Attach file">📎</button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition shadow text-sm font-medium"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}