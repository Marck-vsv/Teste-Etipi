import { useQuery } from '@tanstack/react-query';
import { getComplaints } from '../services/complaint.service';

export const useGetComplaints = () => {
  return useQuery({
    queryKey: ['complaints'],
    queryFn: getComplaints,
  });
};
