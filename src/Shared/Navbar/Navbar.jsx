import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import logo from '../../assets/logo-blood-wave.png'
import useAuth from '../../Hooks/useAuth';
import useAdmin from '../../Hooks/useAdmin';
import useDonor from '../../Hooks/useDonor';
import useMember from '../../Hooks/useMember';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {user, logout} = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    // const location = useLocation();
    // console.log(location);

    const handleLogout = () =>{
        logout()
    }

    return (
        <div className="bg-[#fff1f1] text-[#1e1e1e] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-[#e50914] flex items-center gap-2">
                    <img className='h-10 ' src={logo} alt="logo" />
                    <p>BloodWave</p>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-6 font-medium">
                    <Link to="/" className="hover:text-[#e50914] duration-200">Home</Link>
                    <Link to="/donors" className="hover:text-[#e50914] duration-200">Find Donor</Link>
                    {user?.email && <Link to="/dashboard/profile" className="hover:text-[#e50914] duration-200">Dashboard</Link>}
                    {
                        user?.email?
                        ( 
                            <p className='text-red-500 cursor-pointer' onClick={handleLogout}>Logout</p>
                        ) 
                            : 
                        (                    
                            location.pathname.includes('/register')? 

                            <Link to="/login" className='text-green-500'  onClick={toggleMenu}>Login</Link> :
                            <Link to="/register" className='text-green-500' onClick={toggleMenu}>Register</Link>
                        )
                    }
                </div>

                <div className='flex items-center gap-5'>


                    {/* profile */}
                    {
                        user && (
                    <div onMouseEnter={toggleProfile}  onMouseLeave={()=>setIsProfileOpen(false)} className='h-12 w-12 border-2 rounded-full flex items-center border-red-500 relative cursor-pointer'>
                        { !isProfileOpen &&
                             (
                                <div className='absolute animate-spin h-12 w-12 border-2 border-x-rose-600 border-y-red-200 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
                            )
                        }
                        <img className='h-full w-full object-cover rounded-full' src={user?.photoURL} alt="" />

                        {/* Profile detailss */}
                        {isProfileOpen && (
                        <div className='absolute top-10 right-0 w-xs  h-auto p-5 rounded-md bg-gradient-to-br to-red-300 from-red-500 flex flex-col gap-2'>

                            <div className='h-20 w-20  border-2 border-rose-600 rounded-full mx-auto relative'>
                                <img className='w-full h-full object-cover rounded-full ' src={user?.photoURL} alt="" />
                                <div className='absolute animate-spin h-20 w-20 border-2 border-x-rose-600 border-y-red-200 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
                            </div>
                            <h1>{user?.displayName}</h1>
                            <h2>{user?.email}</h2>
                            <button className='btn  btn-error btn-sm' onClick={handleLogout}>Logout</button>

                        </div>
                        )}
                    </div>
                        )
                    }

                    {/* Mobile Toggle */}
                    <div className="lg:hidden items-center flex">
                        <button onClick={toggleMenu}>
                            {isOpen ? <X size={24} /> : <Menu size={30} />}
                        </button>
                    </div>

                </div>

            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-[#fff1f1] px-4 pb-4 flex flex-col gap-4 text-base font-medium transition-all duration-500 text-center">
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                    <Link to="/donors" onClick={toggleMenu}>Find Donor</Link>
                    {user?.email && <Link to="/dashboard/profile" onClick={toggleMenu} >Dashboard</Link>}
                    {
                        user?.email?  
                        ( 
                             <p className='text-red-500 cursor-pointer' onClick={handleLogout}>Logout</p>
                        )
                        :
                        (    location.pathname.includes('/register')? 

                            <Link to="/login" onClick={toggleMenu}>Login</Link> :
                            <Link to="/register" onClick={toggleMenu}>Register</Link>
                        )
                    }
                </div>
            )}
        </div>
    );
};

export default Navbar;