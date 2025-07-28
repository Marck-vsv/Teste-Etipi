import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';
import { formatDate } from '@/utils/formatters';
import { useState } from 'react';
import { useDeleteComplaint } from '../mutations/use-delete-complaint.mutation';
import { ComplaintActionsDropdown } from './ComplaintActionsDropdown';
import { ComplaintDetailsModal } from './ComplaintDetailsModal';
import { ComplaintFormModal } from './ComplaintFormModal';

interface ComplaintSummaryCardProps {
  complaint: Complaint;
}

const getStatusBadgeVariant = (status: Complaint['complaintStatus']) => {
  switch (status) {
    case 'PENDENTE':
      return 'warning';
    case 'RESOLVIDO':
      return 'success';
    case 'FECHADO':
      return 'default';
    default:
      return 'default';
  }
};

export function ComplaintSummaryCard({ complaint }: ComplaintSummaryCardProps) {
  const { mutate: mutateDelete, isPending: isDeleting } = useDeleteComplaint();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const truncatedDescription =
    complaint.description.length > 100
      ? complaint.description.substring(0, 90) + '...'
      : complaint.description;

  const handleDelete = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    mutateDelete(complaint.uuid);
    setIsConfirmDeleteModalOpen(false);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCardClick = () => {
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <Card.Body interactive={false} variant={'gradient'} size="sm" className="w-full">
        <Card.Header size="sm">
          <div className="flex justify-between items-center">
            <Card.Title onClick={handleCardClick} className="cursor-pointer">
              {complaint.title}
            </Card.Title>
            <div className="flex items-center space-x-2">
              <Badge variant={getStatusBadgeVariant(complaint.complaintStatus)}>
                {complaint.complaintStatus.replace('_', ' ')}
              </Badge>
              <ComplaintActionsDropdown
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetails={handleCardClick}
                status={complaint.complaintStatus}
              />
            </div>
          </div>
          <Card.Description size="sm">{truncatedDescription}</Card.Description>
        </Card.Header>
        <Card.Content size="sm">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">
              {formatDate(complaint.createdAt)}
            </p>
          </div>
        </Card.Content>
      </Card.Body>

      <ComplaintFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        complaint={complaint}
      />

      <ComplaintDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        complaint={complaint}
      />

      <ConfirmationModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a reclamação? Esta ação não pode ser desfeita.`}
        confirmButtonText="Excluir"
        isConfirming={isDeleting}
      />
    </>
  );
}
