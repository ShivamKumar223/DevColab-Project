import { Navbar } from "../navbar.jsx";
import { User } from "../user.jsx";
import { LeftMenu } from "../leftMenu.jsx";

export const Settings = () => {
    return (
        <>  
            <Navbar/>
            <LeftMenu/>
            <User/>
            <SettingPage/>
        </>
    )
}

export const SettingPage = () => {
    return (
       <div className="min-h-screen w-full md:w-[80%] bg-purple-700 absolute right-0 top-16 md:top-0 rounded-[1px] flex justify-center items-center p-6 text-center text-white">
           <h1 className="text-2xl md:text-4xl font-bold">This page is under maintenance...</h1>
       </div>
    )
}