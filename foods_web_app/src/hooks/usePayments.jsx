import { useQuery } from '@tanstack/react-query'
import useAuth  from '../hooks/useAuth';
import useAxiosSecure from './useAxiosSecure';

const usePayments = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders =[], isPending: loading, refetch} = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            console.log('res---------------', res.data)
            return res.data;
        },
    })
    console.log('orders---------------', orders)
    return [orders, refetch]

}
export default usePayments;