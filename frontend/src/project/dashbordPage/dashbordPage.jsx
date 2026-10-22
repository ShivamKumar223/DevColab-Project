import { Navbar } from "../common/navbar.jsx";
import { User } from "../common/user.jsx";
import { LeftMenu } from "../common/leftMenu.jsx";
import { HomePage } from "./homePage.jsx";
// import { ActivityFeed } from "../activityFeed.jsx";
import { AdminDashboard } from "../admin/AdminDashboard.jsx";
import Cookies from "js-cookie";

export const DashbordPage = () => {
    return (
        <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden flex flex-col">
            {/* Top Navbar */}
            <Navbar />

            {/* Main Layout Body */}
            <div className="flex flex-col md:flex-row flex-1 relative">
                {/* Left Sidebar Navigation */}
                <LeftMenu />

                {/* Main Content Area */}
                <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col flex-1 pb-20 md:pb-0">
                    <HomePage />
                    {/* <ActivityFeed /> */}
                </div>

                {/* Bottom Fixed User Profile Component for Mobile/Desktop */}
                <User />
            </div>
        </div>
    );
};