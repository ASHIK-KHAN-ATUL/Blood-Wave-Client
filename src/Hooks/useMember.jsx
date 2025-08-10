import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMember = () => {

    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data:isMember} = useQuery({
        queryKey:[user?.email, 'isMember'],
        enabled: !loading,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/user/member/${user?.email}`);
            console.log(res.data)
            return  res.data.member;
        }
    })
    return[isMember]
};
export default useMember;