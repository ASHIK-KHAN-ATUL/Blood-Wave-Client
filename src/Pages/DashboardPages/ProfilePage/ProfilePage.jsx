import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const ProfilePage = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const{data:mainUser={}, isLoading} = useQuery({
        queryKey : [user?.email, 'mainUser'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/user/profile/${user?.email}`);
            return res.data;
        }
    })
    // console.log(mainUser);


    if (isLoading){
                return (
            <div className="flex flex-col justify-center items-center py-10 min-h-screen ">
                <p className='text-red-500 font-semibold text-2xl'>Loading Profile Page</p>
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
        )
    }

    if (!mainUser?.email){
                return (
            <div className="flex justify-center items-center py-10 min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
        )
    }

    return (
        <div className='p-2 text-black'>


            <Helmet>
                <title>My Profile | Blood Wave</title>
                <meta
                name="description"
                content="View and update your Blood Wave profile information easily."
                />
                <meta
                name="keywords"
                content="profile, user profile, blood wave, update profile"
                />
                <link rel="canonical" href="https://blood-wave.netlify.app" />
            </Helmet>


            <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-[#eb464662] via-[#fcc7df83] to-[#9cf5f59a] rounded shadow-md  mt-10 relative">

            {/* edit btn */}
            <div className='absolute top-1 right-1'>
                <Link to={'/dashboard/profile/edit'} className='btn btn-xs text-white bg-gradient-to-br from-red-500 via-black  to-sky-500'>Edit</Link>
            </div>

            <div className="flex flex-col items-center text-center">
                <img
                    src={mainUser.image}
                    alt={mainUser.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h2 className="text-2xl font-semibold">{mainUser.name}</h2>
                <p className="">{mainUser.email}</p>
                <p className="text-sm text-blue-600 font-semibold capitalize mt-1">{mainUser.role}</p>
                {
                    mainUser.role === 'donor' && mainUser.status === 'blocked' ?  
                    <p className='text-xs'>"You Are Blocked By Admin"</p> : ''
                }
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ">
                <p><strong>Status:</strong> {mainUser.status}</p>
                <p><strong>Phone:</strong> {mainUser.phone}</p>
                <p><strong>Phone Visibility:</strong> {mainUser.phoneVisibility}</p>
                <p><strong>Blood Group:</strong> {mainUser.bloodGroup}</p>
                <p><strong>Availability:</strong> {mainUser.availability}</p>
                <p><strong>Gender:</strong> {mainUser.gender}</p>
                <p><strong>Area:</strong> {mainUser.area}</p>
                <p><strong>District:</strong> {mainUser.district}</p>
                <p><strong>Division:</strong> {mainUser.division}</p>
                <p><strong>Message:</strong> {mainUser.message}</p>
                <p><strong>Joined:</strong> {new Date(mainUser.createAt).toLocaleDateString()}</p>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;