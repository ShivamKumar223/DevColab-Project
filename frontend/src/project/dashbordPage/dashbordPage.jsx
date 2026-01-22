import {Navbar} from "../common/navbar.jsx";
import {User} from "../common/user.jsx";
import {LeftMenu} from "../common/leftMenu.jsx";
import {HomePage} from "./homePage.jsx";
// import {ActivityFeed} from "../activityFeed.jsx";
import { AdminDashboard } from "../admin/AdminDashboard.jsx";

import Cookies from "js-cookie";

export const DashbordPage = ()=>{

   
    return (
        <>  
           <Navbar/>
           <LeftMenu/>
           <User/>
           <HomePage/>
           {/* <ActivityFeed/> */}
        </>
    )
}