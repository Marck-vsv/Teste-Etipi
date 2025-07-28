import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getComplaints } from '../services/complaint.service';

export const useGetComplaints = (page: number) => {
  return useQuery({
    queryKey: ['complaints', page],
    queryFn: () => getComplaints(page),
    placeholderData: keepPreviousData,
  });
};
