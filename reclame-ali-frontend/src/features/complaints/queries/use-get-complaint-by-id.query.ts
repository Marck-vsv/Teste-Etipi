import { useQuery } from '@tanstack/react-query';
import { getComplaintById } from '../services/complaint.service';

const getQueryKey = (id: string) => ['complaint', id];

export const useGetComplaintById = (id: string | undefined) => {
  return useQuery({
    queryKey: getQueryKey(id!),
    queryFn: () => getComplaintById(id!),
    enabled: !!id,
  });
};
