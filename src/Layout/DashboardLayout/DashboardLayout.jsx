import React, { useState } from 'react';
import logo from '../../assets/logo-blood-wave.png'
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useDonor from '../../Hooks/useDonor';
import useMember from '../../Hooks/useMember';
import './DashboardLayout.css'
import { Helmet } from 'react-helmet';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

const DashboardLayout = () => {

    const [isAdmin] = useAdmin();
    const [isDonor] = useDonor();
    const [isMember] = useMember();
    // console.log('Admin:',isAdmin)
    // console.log('Donor:',isDonor)
    // console.log('Member:',isMember)

    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <div className='bg-[#fff1f1] text-red-500 font-medium  min-h-screen max-w-7xl mx-auto grid grid-cols-10 duration-500  relative'>

            <Helmet>
            <title>
                Blood Wave || Dashboard - {isAdmin ? 'Admin' : isDonor ? 'Donor' : isMember ? 'Member' : 'User'}
            </title>
            <meta name="description" content="Blood Wave dashboard for managing your profile and requests." />
            </Helmet>

            {/* Dashboard Menu */}
            <div className={`${drawerOpen ? 'col-span-5': "col-span-1"} bg-gradient-to-br to-rose-300 from-red-200 relative`}>

                <button onClick={toggleDrawer}>
                    <FaRegArrowAltCircleRight className={`text-black text-2xl absolute right-3 transition-transform duration-300 ${drawerOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                <div className='h-16 flex justify-center items-center gap-2 border-b-2 border-red-500 hover:text-white hover:font-semibold duration-500'>
                    <img className='object-cover h-[30%] lg:h-[70%]' src={logo} alt="Logo" />
                    <p className='text-sm sm:text-base lg:text-xl'>Blood Wave</p>
                </div>

                {/* for role based */}
                <div>
                    {
                        isMember && 
                        <ul className='flex flex-col gap-5 mt-10 pl-1 sm:pl-3 text-sm sm:text-base' >

                            <NavLink  to={'/dashboard/profile'}  className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">Profile</NavLink>

                            <NavLink to={'/dashboard/becomeDonor'} className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">Becamoe Donor</NavLink>

                            <NavLink to={'/dashboard/my-blood-request'} className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">My Request</NavLink>
                        </ul>
                    }
                    {
                        isDonor && 
                        <ul className='flex flex-col gap-5 mt-10 pl-1 sm:pl-3 text-sm sm:text-base' >
                            <NavLink  to={'/dashboard/profile'}   className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">Profile</NavLink>

                            <NavLink to={'/dashboard/blood-request'} className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">Blood Request</NavLink>

                            <NavLink to={'/dashboard/blood-request-status'} className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">Request Status</NavLink>

                            <NavLink to={'/dashboard/my-task'} className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">My Task</NavLink>
                        </ul>
                    }
                    {
                        isAdmin && 
                        <ul className='flex flex-col gap-5 mt-10 pl-1 sm:pl-3 text-sm sm:text-base' >
                            <NavLink  to={'/dashboard/profile'}   className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">Profile</NavLink>
                            <NavLink  to={'/dashboard/alluser/admin'}   className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">AllUser</NavLink>
                            <NavLink  to={'/dashboard/manegeDonor/admin'}   className="dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer">Manage Donor</NavLink>
                        </ul>
                    }

                </div>

                {/* Shared Navbar */}
                <ul className='flex flex-col gap-5 mt-10 pl-1 sm:pl-3 text-sm sm:text-base'>
                    <NavLink className='dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer' to="/" >Home</NavLink>
                    <NavLink className='dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer' to="/donors" >Find Donor</NavLink>
                    <NavLink className='dash-nav hover:text-white hover:font-medium duration-300 cursor-pointer' to="/becomeDonor" >Become Donor</NavLink>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className={`${drawerOpen ? 'col-span-5' : "col-span-9"} relative`}>

                {/* Content */}
                <div className='w-full'>
                    <Outlet />
                </div>

                {/* Overlay to block clicks when drawer is open */}
                {drawerOpen && (
                    <div
                        onClick={toggleDrawer}
                        className='fixed inset-0 bg-black/20 bg-opacity-30 z-40 cursor-pointer'
                        aria-hidden="true"
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardLayout;