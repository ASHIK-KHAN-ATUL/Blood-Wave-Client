import axios from "axios";


export const axiosPublic = axios.create({
    baseURL: 'https://blood-wave-server-six.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;