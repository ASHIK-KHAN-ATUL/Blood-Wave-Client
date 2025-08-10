import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { replace, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const form = location.state?.form?.pathname || '/'

    const onSubmit = async(data) => {

        login(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log("user", user);
            toast.success("Login Successfull");
            navigate(form, {replace: true})
        })
        .catch(error => {
            console.error("Login error:", error.code, error.message);
            toast.error("Invalid email or password.");
        })
    };
    

    return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff1f1] py-12 px-4">
        <div className="w-full max-w-xl bg-gradient-to-br to-rose-300 from-red-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#e50914] mb-6 text-center">Login on Blood-Wave</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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



                <button type="submit" className="w-full bg-[#e50914] text-white font-semibold py-2 rounded-lg hover:bg-[#c1070f] transition-all cursor-pointer hover:scale-x-90 duration-500" >Login</button>
            
            </form>
        </div>
        </div>
    );
};

export default Login;