import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { FaTint, FaUsers, FaHeartbeat } from 'react-icons/fa';
import CountUp from 'react-countup';

const Stats = () => {

    const axiosPublic = useAxiosPublic();

    const {data:stats={}, isLoading } = useQuery({
        queryKey: ['homepage-stats'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/stats');
            return res.data;
        }
    })
    console.log(stats)

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="my-12 px-4 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10 text-red-600">Blood-Wave Live Stats</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center text-black">

                <div className=" bg-red-500/20 border border-red-500 shadow-lg rounded-2xl p-6  transition-all duration-300">
                    <FaTint className="text-5xl mx-auto text-primary mb-4" />
                    <h3 className="text-xl font-semibold  mb-2">Total Donors</h3>
                    <p className="text-4xl text-primary font-bold">
                        <CountUp end={stats.donor} duration={2} />
                    </p>
                    <p className="text-sm  mt-1">Since launch</p>
                </div>

                <div className=" bg-red-500/20 border border-red-500 shadow-lg rounded-2xl p-6  transition-all duration-300">
                    <FaHeartbeat className="text-5xl mx-auto text-secondary mb-4" />
                    <h3 className="text-xl font-semibold  mb-2">Active Donors</h3>
                    <p className="text-4xl text-secondary font-bold">
                        <CountUp end={stats.activeDonor} duration={2} />
                    </p>
                    <p className="text-sm  mt-1">Recently active</p>
                </div>

                <div className=" bg-red-500/20 border border-red-500 shadow-lg rounded-2xl p-6  transition-all duration-300">
                    <FaUsers className="text-5xl mx-auto text-accent mb-4" />
                    <h3 className="text-xl font-semibold  mb-2">Total Users</h3>
                    <p className="text-4xl text-accent font-bold">
                        <CountUp end={stats.totalUser} duration={2} />
                    </p>
                    <p className="text-sm  mt-1">All registered users</p>
                </div>

            </div>
        </div>
    );
};

export default Stats;