import React, { useState } from "react";

export  function Messages() {
  // Sample chats
  const chats = [
    { id: 1, name: "Shivam", type: "dm" },
    { id: 2, name: "Shyam", type: "dm" },
    { id: 3, name: "Project A Team", type: "group" },
    { id: 4, name: "Task #12 - Bug Fix", type: "task" },
    { id: 5, name: "Frontend Team", type: "group" },
  ];

  // State
  const [activeChat, setActiveChat] = useState(chats[2]); // default Project A
  const [messages, setMessages] = useState([
    { sender: "Shyam", text: "Can you finish API integration today? ⏳" },
    { sender: "Shivam", text: "Sure! I’ll push code by evening. ✅" },
    { sender: "Shivam", text: "📎 api_docs.pdf" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Handle send
  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r shadow-sm">
        <h2 className="p-4 font-bold text-lg border-b">Messages</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-3 cursor-pointer hover:bg-gray-100 ${
                activeChat.id === chat.id ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              {chat.type === "dm" && "👤"} 
              {chat.type === "group" && "👥"} 
              {chat.type === "task" && "📌"} {chat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex flex-col w-3/4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
          <h3 className="font-bold text-lg">{activeChat.name}</h3>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">
            🎥 Start Call
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-xs ${
                msg.sender === "You"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm font-semibold">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center p-3 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="ml-2 text-xl">📎</button>
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={sendMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
