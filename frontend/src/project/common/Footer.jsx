import React from 'react';
import { FaWhatsappSquare, FaInstagramSquare, FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";


export default function Footer() {

    return (

        <footer id='footer' className=" bg-gray-700 h-[30rem] ">
            <div className="grid grid-cols-2 grid-rows-1 h-[25rem]  text-white">
                <div className="h-[25rem] ">
                    <h1 className="text-center text-[1.5rem] pt-5">About us</h1>
                    <ul className="flex  flex-col  justify-evenly h-[20rem]  text-[1rem] text-white list-decimal p-10 pb-5">
                        <li>“DevColab helps developers and teams collaborate to plan, build, and deliver projects seamlessly.”</li>
                        <li>“DevColab unites coding, communication, and project management in one place, so you can focus on creating.”</li>
                        <li>“DevColab helps solo developers, startups, and teams organize tasks, collaborate in real time, and track progress easily.”</li>
                        <li>“Our mission is to simplify teamwork by giving developers a secure and efficient space to innovate together.”</li>
                        <li>“DevColab supports your entire development journey — from ideas to deployment — in one workspace.”</li>
                    </ul>
                </div>

                <div className="h-[25rem] ">
                    <h1 className="text-center text-[1.5rem] pt-5">Contect us</h1>
                    <div className="p-10 pb-5 ">
                        <p>Have questions, feedback, or partnership ideas? We’d love to hear from you!
                            Reach out anytime and our team will get back to you quickly.</p>
                        <ul className="p-10 flex flex-col justify-between h-[13rem] ">
                            <li>Email : shivam865889@gmail.com</li>
                            <li>Website : www.devcolab.com</li>
                            <li>Location : Bihar, Patna</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-8 h-[2rem] text-[1.5rem]">
                <button className="hover:text-[1.8rem] h-[2rem] w-[2rem]"><FaWhatsappSquare /></button>
                <button className="hover:text-[1.8rem] h-[2rem] w-[2rem]" ><FaInstagramSquare /></button>
                <button className="hover:text-[1.8rem] h-[2rem] w-[2rem]" ><FaYoutubeSquare /></button>
                <button className="hover:text-[1.8rem] h-[2rem] w-[2rem]" ><FaFacebookSquare /></button>
            </div>
        </footer>
    )
}

