import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateComplaintRequest } from '../schemas/complaint.schema';
import { updateComplaint } from '../services/complaint.service';
import { toast } from 'sonner';

export const useUpdateComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateComplaintRequest }) =>
      updateComplaint(id, data),
    onSuccess: (_, { id }) => {
      toast.success('Reclamação atualizada!');
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
      queryClient.invalidateQueries({ queryKey: ['complaint', id] });
    },
    onMutate: () => {
      toast.loading('Atualizando sua reclamação...', {
        id: 'update-complaint-loading',
      });
    },
    onSettled: () => {
      toast.dismiss('update-complaint-loading');
    },
  });
};
