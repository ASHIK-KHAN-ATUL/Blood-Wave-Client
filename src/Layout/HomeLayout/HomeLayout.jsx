import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div className='bg-black'>
            <div className='bg-[#fff1f1] text-[#e50914] font-medium  min-h-screen max-w-7xl mx-auto pb-10'>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default HomeLayout;