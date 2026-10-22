import React from 'react';
import { NavLink } from 'react-router-dom';

export const ForgetPassword = () => {
  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center items-center p-4 text-white">
      <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-700 w-full max-w-md shadow-2xl flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <p className="text-xs text-gray-400 text-center">Enter your registered email address to receive password reset instructions.</p>
        
        <input type="email" placeholder="Enter your email" className="w-full h-10 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"/>
        
        <button className="w-full h-10 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-all">Send Reset Link</button>
        
        <NavLink to="/login" className="text-xs text-blue-400 hover:underline mt-2">Back to Login</NavLink>
      </div>
    </div>
  )
}