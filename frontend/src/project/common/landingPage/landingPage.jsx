import { useState } from "react";
import { IoReorderThreeOutline, IoMoonSharp } from "react-icons/io5";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";

import { Slider }from "../Slider";
import Footer from "../Footer";
import "./LandingPage.css"


export const LandingPage = () => {

    // console.log("landing Page")
    return (
        <div className="bg-green-700" id="landingPage">
            <NavBar />
            <Heading />
            <CoreFeatures />
            <WorkingSection />
            <Benefits />
            <PricingSection />
        </div>
    )
}

//                                           NavBar
export const NavBar = () => {
    const [hide, setHide] = useState(true);

    const toggleSlider = () =>{

        setHide(!hide);
    }
    return (
        <header className="flex items-center justify-center">
            <nav className='flex justify-between h-20 items-center border-b-2 w-[90vw] ' >
                <button onClick={toggleSlider} className="m-10 font-light text-black flex items-center justify-center bg-white h-10 w-10 rounded-[5rem] "> <IoReorderThreeOutline /> </button>
             <img className="h-[10rem]  left-[5rem]" src="/DevColab-logo-transparent.png" alt="" />
                <div className="w-[10%] h-12 flex justify-between items-center ">
                    {/* <button className="mx-10 rounded-[50px] text-white"> <IoMoonSharp /> </button> */}
                    {/* <button className="h-10 w-20 text-white text-[1.3rem] hover:text-[1.2rem] hover:underline">About</button>
                    <button className="h-10 w-20 text-white text-[1.3rem] hover:text-[1.2rem] hover:underline">Contect</button>
                    <button className="h-10 w-20 text-white text-[1.3rem] hover:text-[1.2rem] hover:underline">Help</button> */}
                    {/* <button className="mr-10  h-10 w-20 text-white text-[1.3rem] hover:text-[1.2rem] hover:underline"></button> */}
                    <NavLink to="/categories"><button className="h-10 w-[7rem] text-white text-[1.2rem] hover:text-[1.1rem]  rounded-[3px] hover:underline ">Get Start</button></NavLink>
                </div>
            </nav>
            <Slider hide={hide}/>
        </header>
    )
}


//                                           Heading
const Heading = () => {


    return (
        <section  className=" h-[42rem] mt-6 flex items-center flex-col">
            <h1 data-aos="zoom-in" className="text-white flex items-center justify-center text-[4rem]  font-serif">DevColab</h1>
            <p data-aos="fade-up"className="h-[7rem] w-[30rem] flex items-center justify-center text-[2rem] text-center text-white">
                Learn, build and ship software on a single, collaborative platform
            </p>
           <img  src="/DevColab.webp" alt="pic" />
        </section>
    )
}



//                          Core Features section
const CoreFeatures = () => {

    return (
        <div data-aos="fade-left" >
            <h1 className="text-white flex items-center justify-center text-[2.5rem] mt-[5rem] p-10 font-[Sans-serif]">Core Features</h1>
           <div className="flex justify-evenly">
            <ul className="flex  flex-col gap-2 justify-center text-[1.5rem] text-white pl-10">
                <li>Real-time Collaboration - Code together in real-time.</li>
                <li>Project Management - Manage tasks, issues, and milestones.</li>
                <li>Team Communication - Built-in chat or integration (Slack/Discord).</li>
                <li>Analytics & Reports - Track progress, contributions, and productivity.</li>
                <li>Cloud Integration - GitHub/GitLab/Bitbucket integration.</li>
                <li>Secure & Reliable - Data encryption, role-based access.</li>
            </ul>
             <div className="h-[20rem] w-[35%] ">
                  <video src="coder.mp4" 
                  className="h-[20rem] rounded-[2rem]"  
                  autoPlay 
                  controls
                  loop 
                 
                  />
                 
            </div>
           </div> 
        </div>
    )
}

//                                       Working
const WorkingSection = () => {

    return (
        <section data-aos="fade-right" className="flex  flex-col w-[100%] mt-[5rem]">
            <h1 className="w-[100%] text-white flex justify-center items-center text-[2.5rem] p-10 font-[Sans-serif]">How It Works</h1>
            <ul className=" flex  flex-col gap-2 text-[1.5rem] text-white pl-10">
                <li>Sign up / Create a workspace.</li>
                <li>Invite your team</li>
                <li>Start coding + managing projects</li>
                <li>Deploy & track results</li>
            </ul>
        </section>
    )
}

//                     Benefits section
const Benefits = () => {

    return (
        <section data-aos="fade-left" className="flex  flex-col mt-[5rem]">
            <h1 className="text-white flex items-center justify-center text-[2.5rem]  p-10 font-[Sans-serif]">Why DevColab?</h1>
            <ul className="flex  flex-col gap-2  text-[1.5rem] text-white p-10">
                <li>Saves time with unified tools</li>
                <li>No switching between multiple apps</li>
                <li>Great for remote & distributed teams</li>
                <li>Free for individuals, scalable for teams</li>
            </ul>
        </section>
    )
}

//            Pricing Section      
const PricingSection = () => {

    return (
        <section data-aos="fade-right" className="flex  flex-col">
            <h1 className="text-white flex items-center justify-center text-[2.5rem] mt-[5rem] p-10 font-[Sans-serif]">Pricing Section</h1>
            <ul className="flex  flex-col gap-2 justify-center text-[1.5rem] text-white pl-10">
                <li>Free / Pro / Enterprise tiers</li>
                <li>Clear comparison of features</li>
            </ul>
        </section>
    )
}
