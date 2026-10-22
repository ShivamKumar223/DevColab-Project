import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { LeftMenu } from "./common/leftMenu";
import { User } from "./common/user";

export function NotificationsDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden flex flex-col md:flex-row">
      <LeftMenu />

      <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col min-h-screen justify-between">
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-800 m-4 md:m-6 rounded-xl shadow-2xl border border-gray-700">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center gap-6 max-w-sm w-full">
            <h2 className="text-xl font-bold text-white">Notification Center</h2>
            
            <div className="p-4 bg-gray-800 rounded-full border border-gray-700 shadow-inner">
              <IconButton 
                onClick={() => setCount(count + 1)} 
                className="text-white hover:text-blue-400 transition-all"
                title="Click to add notification"
              >
                <Badge badgeContent={count} color="error" max={99}>
                  <NotificationsIcon sx={{ fontSize: 40, color: "white" }} />
                </Badge>
              </IconButton>
            </div>

            <p className="text-xs text-gray-400 text-center">
              Click the notification icon above to increment the unread counter.
            </p>

            <button 
              onClick={() => setCount(0)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow text-sm"
            >
              Clear Notifications
            </button>
          </div>
        </div>

        <User />
      </div>
    </div>
  );
}

export default NotificationsDemo;