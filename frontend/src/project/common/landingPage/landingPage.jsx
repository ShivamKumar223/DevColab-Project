import { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { Slider } from "../Slider";
import "./LandingPage.css";

export const LandingPage = () => {
    return (
        <div className="bg-green-700 min-h-screen w-full text-white overflow-x-hidden" id="landingPage">
            <NavBar />
            <Heading />
            <CoreFeatures />
            <WorkingSection />
            <Benefits />
            <PricingSection />
        </div>
    )
}

export const NavBar = () => {
    const [hide, setHide] = useState(true);
    const toggleSlider = () => setHide(!hide);

    return (
        <header className="flex items-center justify-center p-4">
            <nav className='flex justify-between h-16 md:h-20 items-center border-b border-white/20 w-full max-w-6xl px-4' >
                <button onClick={toggleSlider} className="font-light text-black flex items-center justify-center bg-white h-10 w-10 rounded-full shadow"> 
                    <IoReorderThreeOutline className="text-2xl" /> 
                </button>
                <img className="h-[10rem] object-contain" src="/DevColab-logo-transparent.png" alt="DevColab Logo" />
                <NavLink to="/categories">
                    <button className="bg-white text-green-800 px-4 py-2 rounded font-semibold text-sm hover:bg-green-100 transition-all shadow">Get Started</button>
                </NavLink>
            </nav>
            <Slider hide={hide}/>
        </header>
    )
}

const Heading = () => {
    return (
        <section className="py-12 px-4 flex items-center flex-col text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">DevColab</h1>
            <p className="text-lg md:text-2xl max-w-2xl text-green-100 mb-8">
                Learn, build and ship software on a single, collaborative platform
            </p>
            <img src="/DevColab.webp" alt="DevColab Banner" className="w-full max-w-2xl rounded-xl object-cover" />
        </section>
    )
}

const CoreFeatures = () => {
    return (
        <div className="py-12 px-6 max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">Core Features</h1>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <ul className="flex flex-col gap-3 text-base md:text-xl text-green-100 list-disc list-inside">
                    <li>Real-time Collaboration - Code together in real-time.</li>
                    <li>Project Management - Manage tasks, issues, and milestones.</li>
                    <li>Team Communication - Built-in chat or integration.</li>
                    <li>Analytics & Reports - Track progress and productivity.</li>
                    <li>Cloud Integration - GitHub/GitLab integration.</li>
                    <li>Secure & Reliable - Role-based access control.</li>
                </ul>
                <div className="w-full lg:w-1/2 flex justify-center">
                    <video src="coder.mp4" className="w-full max-w-md rounded-2xl shadow-xl" autoPlay controls loop />
                </div>
            </div> 
        </div>
    )
}

const WorkingSection = () => {
    return (
        <section className="py-12 px-6 max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">How It Works</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <li className="bg-green-800 p-6 rounded-xl border border-green-600/40">1. Sign up / Create workspace</li>
                <li className="bg-green-800 p-6 rounded-xl border border-green-600/40">2. Invite your team</li>
                <li className="bg-green-800 p-6 rounded-xl border border-green-600/40">3. Start coding & managing</li>
                <li className="bg-green-800 p-6 rounded-xl border border-green-600/40">4. Deploy & track results</li>
            </ul>
        </section>
    )
}

const Benefits = () => {
    return (
        <section className="py-12 px-6 max-w-6xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">Why DevColab?</h1>
            <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-lg">
                <li className="bg-green-800 px-6 py-3 rounded-full border border-green-600">Unified Tools</li>
                <li className="bg-green-800 px-6 py-3 rounded-full border border-green-600">No App Switching</li>
                <li className="bg-green-800 px-6 py-3 rounded-full border border-green-600">Remote Friendly</li>
                <li className="bg-green-800 px-6 py-3 rounded-full border border-green-600">Free for Individuals</li>
            </ul>
        </section>
    )
}

const PricingSection = () => {
    return (
        <section className="py-12 px-6 max-w-6xl mx-auto text-center pb-20">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">Pricing Section</h1>
            <p className="text-lg text-green-100">Free / Pro / Enterprise tiers with transparent features.</p>
        </section>
    )
}