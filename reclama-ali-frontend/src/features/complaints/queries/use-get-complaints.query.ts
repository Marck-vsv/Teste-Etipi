import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getComplaints } from '../services/complaint.service';

const COMPLAINTS_SIZE = 10;

export const useGetComplaints = (page: number) => {
  return useQuery({
    queryKey: ['complaints', page],
    queryFn: () => getComplaints(page, COMPLAINTS_SIZE),
    placeholderData: keepPreviousData,
  });
};
