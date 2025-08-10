import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://blood-wave-server-six.vercel.app'
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const {logout} = useAuth();

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        console.log('Request stoped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`
        return config ;
    }, function (error){
        return Promise.reject(error)
    });


    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, function(error){
        const status = error.response.status;
        console.log('Status Error in the interceptors', error);
        if(status === 401 || status === 403){
            logout();
            navigate('/login')
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;