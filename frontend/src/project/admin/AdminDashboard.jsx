import { Navbar } from "../common/navbar.jsx";
import { AdminMenu } from "./adminLeftMenu.jsx";
import { User } from "../common/user.jsx";
import { Welcome } from "./welcome.jsx";
import { Outlet, useLocation } from "react-router-dom";

export const AdminDashboard = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-700 text-white relative overflow-x-hidden flex flex-col">
            {/* Top Navbar */}
            <Navbar />

            {/* Main Content Layout */}
            <div className="flex flex-col md:flex-row flex-1 relative">
                {/* Admin Sidebar Navigation */}
                <AdminMenu />

                {/* Right Side Content Container */}
                <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col min-h-screen pb-24 md:pb-6 bg-gray-700">
                    
                    {/* Welcome Banner - Top me render hoga */}
                    <Welcome />

                    {/* Sub-routes like candidateform / task forms will render here */}
                    <div className="flex-1 p-4 md:p-6">
                        <Outlet />
                    </div>

                    {/* Bottom User Profile Panel */}
                    <User />
                </div>
            </div>
        </div>
    );
};