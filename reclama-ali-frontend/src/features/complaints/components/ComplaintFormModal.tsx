import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { TextArea } from '@/components/ui/TextArea';
import { useCreateComplaint } from '@/features/complaints/mutations/use-create-complaint.mutation';
import { useUpdateComplaint } from '@/features/complaints/mutations/use-update-complaint.mutation';
import {
  Complaint,
  CreateComplaintRequest,
  UpdateComplaintRequest,
  createComplaintSchema,
  updateComplaintSchema,
} from '@/features/complaints/schemas/complaint.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ComplaintFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint?: Complaint;
}

export function ComplaintFormModal({
  isOpen,
  onClose,
  complaint,
}: ComplaintFormModalProps) {
  const isEditing = !!complaint;

  const { mutate: createComplaint, isPending: isCreating } =
    useCreateComplaint();
  const { mutate: updateComplaint, isPending: isUpdating } =
    useUpdateComplaint();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateComplaintRequest | UpdateComplaintRequest>({
    resolver: zodResolver(
      isEditing ? updateComplaintSchema : createComplaintSchema,
    ),
    defaultValues: isEditing
      ? { title: complaint.title, description: complaint.description }
      : { title: '', description: '' },
  });

  useEffect(() => {
    if (isOpen && isEditing && complaint) {
      reset({ title: complaint.title, description: complaint.description });
    } else if (isOpen && !isEditing) {
      reset({ title: '', description: '' });
    }
  }, [isOpen, isEditing, complaint, reset]);

  const onSubmit = (data: CreateComplaintRequest | UpdateComplaintRequest) => {
    if (isEditing && complaint) {
      updateComplaint(
        { id: complaint.id, data: data as UpdateComplaintRequest },
        {
          onSuccess: () => onClose(),
        },
      );
    } else {
      createComplaint(data as CreateComplaintRequest, {
        onSuccess: () => onClose(),
      });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Reclamação' : 'Nova Reclamação'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Título"
          id="title"
          {...register('title')}
          error={errors.title?.message}
          isLoading={isLoading}
        />
        <TextArea
          label="Descrição"
          id="description"
          {...register('description')}
          error={errors.description?.message}
          isLoading={isLoading}
        />
        <Button type="submit" isLoading={isLoading}>
          {isEditing ? 'Salvar Alterações' : 'Criar Reclamação'}
        </Button>
      </form>
    </Modal>
  );
}
