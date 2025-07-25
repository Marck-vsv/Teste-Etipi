import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteComplaint } from '../services/complaint.service';

export const useDeleteComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteComplaint(id),
    onSuccess: () => {
      toast.success('Reclamação excluída com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
    onError: (error) => {
      toast.error('Erro ao excluir reclamação', {
        description: error.message || 'Ocorreu um erro inesperado.',
      });
    },
  });
};
