import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './common/Footer';

export default function Main() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}