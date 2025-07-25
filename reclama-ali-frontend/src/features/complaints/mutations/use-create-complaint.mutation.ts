import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CreateComplaintRequest } from '../schemas/complaint.schema';
import { createComplaint } from '../services/complaint.service';

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateComplaintRequest) => createComplaint(data),
    onSuccess: () => {
      toast.success('Reclamação enviada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
    onError: (error) => {
      toast.error('Erro ao enviar reclamação', {
        description: error.message || 'Ocorreu um erro inesperado.',
      });
    },
    onMutate: () => {
      toast.loading('Enviando reclamação...', {
        id: 'complaint-sending',
      });
    },
    onSettled: () => {
      toast.dismiss('complaint-sending');
    },
  });
};
