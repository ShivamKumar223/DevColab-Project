import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-blue-500" style={{ textAlign: "center", marginTop: "50px" }}>
      <IconButton onClick={() => setCount(count + 1)}>
        <Badge badgeContent={count} color="error">
          <NotificationsIcon fontSize="large" />
        </Badge>
      </IconButton>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setCount(0)}>Clear Notifications</button>
      </div>
    </div>
  );
}

export default App;
