import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const {createUser, updateUserProfile, user} = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async(data) => {

        const formData = new FormData();
        formData.append('image', data.image[0] )
        const res = await fetch(image_hosting_api, {
            method: "POST",
            body: formData
        })
        const result = await res.json();
        console.log(result);

        if(result?.success){
            const photoUrl = result.data.display_url;

            // Create user
            createUser(data.email, data.password)
            .then(result =>{
                const loggedUser = result.user;
                console.log('Logged User : ' ,loggedUser);
                toast.success('Account Created Successfully');

                // update user info
                updateUserProfile(data.name, photoUrl)
                .then(()=>{
                    console.log("User Profile updated");
                    reset();
                    toast.info('User data Updated');
                    navigate('/');

                    
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        image: photoUrl,
                        role: 'member',
                        createAt: new Date(),
                        status: 'active',
                        phone: data.phone
                    }
                    axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log("Backend response:", res.data); 
                        if(res.data.insertedId){
                            console.log('User data save in database')
                        }
                    })
                })
            });

        }else{
            toast.error('Something went wrong')
        }


    };


    return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff1f1] py-12 px-4">

      <Helmet>
        <title>Register | Blood Wave</title>
        <meta
          name="description"
          content="Create a new account on Blood Wave to donate or request blood easily."
        />
        <meta
          name="keywords"
          content="register, blood wave, blood donation, create account"
        />
        <link rel="canonical" href="https://blood-wave.netlify.app/register" />
      </Helmet>

        <div className="w-full max-w-xl bg-gradient-to-br to-rose-300 from-red-200  p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#e50914] mb-6 text-center">Register on Blood-Wave</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium ">Full Name</label>
                    <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-2 border-b  focus:outline-none "
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="fieldset-label text-red-600 font-bold">Upload Photo</label>
                    <div className=' border border-red-600 p-2 border-dashed mt-2'>
                        <input type="file" {...register("image", { required: true })} name="image" accept="image/*" className="file-input bg-gradient-to-br to-rose-300 from-red-200  text-red-600 file:bg-red-500 w-full " />
                    </div>
                    {errors.image && <span className='text-red-600'>Image is required</span>}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium ">Email</label>
                    <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-4 py-2 border-b  focus:outline-none "
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                </div>


                {/* Phone */}
                <div>
                    <label className="block mb-1 font-medium ">Phone Number</label>
                    <input
                    type="tel"
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Must be 11 digit phone number",
                        },
                    })}
                    className="w-full px-4 py-2 border-b  focus:outline-none  "
                    />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                </div>

                {/* Password */}
                <div>
                <label className="block mb-1 font-medium ">Password</label>
                <input
                    type="password"
                    {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    },
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
                        message: "Must contain at least one uppercase letter one lowercase and one number",
                    },
                    })}
                    className="w-full px-4 py-2 border-b focus:outline-none"
                />
                {errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
                </div>



                <button type="submit" className="w-full bg-[#e50914] text-white font-semibold py-2 rounded-lg hover:bg-[#c1070f] transition-all cursor-pointer hover:scale-x-90 duration-500" >Register</button>
            
            </form>
        </div>
        </div>
    );
};

export default Register;