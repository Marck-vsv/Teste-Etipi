import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateComplaintStatusRequest } from '../schemas/complaint.schema';
import { updateComplaintStatus } from '../services/complaint.service';
export const useUpdateComplaintStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateComplaintStatusRequest;
    }) => updateComplaintStatus(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
      queryClient.invalidateQueries({ queryKey: ['complaint', id] });
    },
    onMutate: () => {
      toast.loading('Atualizando sua reclamação...', {
        id: 'update-status-loading',
      });
    },
    onSettled: () => {
      toast.dismiss('update-status-loading');
    },
  });
};
