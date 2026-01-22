import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Navbar } from "../common/navbar.jsx";
import { User } from "../common/user.jsx";
import { AdminMenu } from "./adminLeftMenu.jsx"
import { Welcome } from "./welcome.jsx";
import { Outlet } from "react-router-dom";

// import { AdminAllCandidates } from "./AdminAllCandidates.jsx";
// import { AdminAdmins } from "./AdminAdmins.jsx";
// import { AdminMentors } from "./AdminMentors.jsx";
// import { AdminEmployees } from "./AdminEmployees.jsx";

// import {ActivityFeed} from "../activityFeed.jsx";


export const AdminDashboard = ()=>{
   
    return (
        <>  
           <Navbar/>
           <AdminMenu/>
           <User/>
           <Welcome/>
           <Outlet />
        </>
    )
}
