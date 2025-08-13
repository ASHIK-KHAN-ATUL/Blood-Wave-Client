import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import CountUp from 'react-countup';

const AllUser = () => {

    const axiosSecure = useAxiosSecure();

    const {data: allUser=[] , isLoading, refetch} = useQuery({
        queryKey: ['allUser'],
        queryFn: async() => {
            const res = await axiosSecure.get('/users/allUser/by/admin');
            return res.data;
        }
    })
    // console.log(allUser);

    if (isLoading){
                return (
            <div className="flex flex-col justify-center items-center py-10 min-h-screen ">
                <p className='text-red-500 font-semibold text-2xl'>Loading All User Page</p>
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
        )
    }

    const handleChangeStatus = async(id) => {
        // console.log(id);

        const res = await axiosSecure.patch(`/users/user/status/${id}`)
        if(res.data.modifiedCount > 0){
            toast.success('User Status Updated');
            refetch()
        }else{
            toast.error('Failed to update status')
        }

    }

    const handleDelete = async(id) =>{
        // console.log(id);

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if(result.isConfirmed){
            const res = await axiosSecure.delete(`/users/user/delete/${id}`);

            if(res.data?.deletedCount > 0){
                Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                );
                refetch();
            }
        }
    }

    return (
        <div className="p-4 text-black">

        <Helmet>
            <title>All Users | Blood Wave Admin Dashboard</title>
            <meta
            name="description"
            content="View all registered users in Blood Wave admin dashboard. Manage donors, members and admins."
            />
            <meta
            name="keywords"
            content="blood wave, all users, admin dashboard, blood donors, members"
            />
            <link rel="canonical" href="https://blood-wave.netlify.app" />
        </Helmet>

            <h2 className="text-xl font-bold mb-4 text-right">All Users (<CountUp end={allUser.length} duration={2} />)</h2>

            <div className="overflow-x-auto max-h-screen overflow-y-auto">
                <table className="table  w-full border text-black text-sm">
                    {/* Table Head */}
                    <thead >
                        <tr className='text-white bg-black sticky top-0 z-10'>
                            <th></th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {
                            allUser.map((user, index) => (
                                <tr key={user._id} className='border border-black'>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img  src={user.image}  alt="user Photo"  />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-sm opacity-50">{user.district || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{user.email}</p>
                                        <p>{user.phone}</p>
                                    </td>
                                    <td>
                                        <span className={`badge badge-info capitalize  ${user.role === 'admin' ? 'badge-warning' :  user.role === 'donor' ? 'badge-success' :   'badge-info'} `}> {user.role || 'member'}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                        onClick={()=> {
                                            if(user.email === 'ashikkhan693693@gmail.com'){
                                                toast.info('U can not change Boss status');
                                                return;
                                            } 
                                            handleChangeStatus(user._id)
                                        }} 
                                        
                                        className={`badge  badge-outline  capitalize cursor-pointer ${user?.status === 'active' ? 'badge-success bg-green-500/20' : 'badge-error bg-red-500/20'}  `}>
                                            {user.status}
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={()=>{
                                                if(user.email === 'ashikkhan693693@gmail.com'){
                                                toast.info('You Can Not Delete Boss Account');
                                                return;
                                            } 
                                            handleDelete(user._id)
                                        }} className="btn btn-error btn-sm ">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;