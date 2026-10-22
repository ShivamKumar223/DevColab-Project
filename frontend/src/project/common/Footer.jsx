import React from 'react';
import { FaWhatsappSquare, FaInstagramSquare, FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <footer id='footer' className="bg-gray-800 text-white py-10 px-4 md:px-8 border-t border-gray-700">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* About Us Section */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-center md:text-left">About us</h2>
                    <ul className="flex flex-col gap-3 text-sm md:text-base text-gray-300 list-disc pl-5">
                        <li>“DevColab helps developers and teams collaborate to plan, build, and deliver projects seamlessly.”</li>
                        <li>“DevColab unites coding, communication, and project management in one place, so you can focus on creating.”</li>
                        <li>“DevColab helps solo developers, startups, and teams organize tasks, collaborate in real time, and track progress easily.”</li>
                        <li>“Our mission is to simplify teamwork by giving developers a secure and efficient space to innovate together.”</li>
                        <li>“DevColab supports your entire development journey — from ideas to deployment — in one workspace.”</li>
                    </ul>
                </div>

                {/* Contact Us Section */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-center md:text-left">Contact us</h2>
                    <div className="text-sm md:text-base text-gray-300 flex flex-col gap-4">
                        <p>Have questions, feedback, or partnership ideas? We’d love to hear from you! Reach out anytime and our team will get back to you quickly.</p>
                        <ul className="flex flex-col gap-2 font-medium">
                            <li className="break-words">Email : shivam865889@gmail.com</li>
                            <li>Website : www.devcolab.com</li>
                            <li>Location : Bihar, Patna</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center items-center gap-6 pt-6 border-t border-gray-700 text-2xl">
                <a href="#whatsapp" className="hover:text-green-400 transition-all" title="WhatsApp"><FaWhatsappSquare /></a>
                <a href="#instagram" className="hover:text-pink-400 transition-all" title="Instagram"><FaInstagramSquare /></a>
                <a href="#youtube" className="hover:text-red-500 transition-all" title="YouTube"><FaYoutubeSquare /></a>
                <a href="#facebook" className="hover:text-blue-500 transition-all" title="Facebook"><FaFacebookSquare /></a>
            </div>
        </footer>
    )
}