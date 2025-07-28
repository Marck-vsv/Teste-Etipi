import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';
import { formatDate } from '@/utils/formatters';
import { useReducer } from 'react';
import { useDeleteComplaint } from '../mutations/use-delete-complaint.mutation';
import { ComplaintActionsDropdown } from './ComplaintActionsDropdown';
import { ComplaintDetailsModal } from './ComplaintDetailsModal';
import { ComplaintFormModal } from './ComplaintFormModal';

interface ModalState {
  isEditModalOpen: boolean;
  isDetailsModalOpen: boolean;
  isConfirmDeleteModalOpen: boolean;
}

type ModalAction =
  | { type: 'OPEN_EDIT_MODAL' }
  | { type: 'OPEN_DETAILS_MODAL' }
  | { type: 'OPEN_CONFIRM_DELETE_MODAL' }
  | { type: 'CLOSE_ALL_MODALS' };

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_EDIT_MODAL':
      return { ...state, isEditModalOpen: true, isDetailsModalOpen: false, isConfirmDeleteModalOpen: false };
    case 'OPEN_DETAILS_MODAL':
      return { ...state, isDetailsModalOpen: true, isEditModalOpen: false, isConfirmDeleteModalOpen: false };
    case 'OPEN_CONFIRM_DELETE_MODAL':
      return { ...state, isConfirmDeleteModalOpen: true, isEditModalOpen: false, isDetailsModalOpen: false };
    case 'CLOSE_ALL_MODALS':
      return { isEditModalOpen: false, isDetailsModalOpen: false, isConfirmDeleteModalOpen: false };
    default:
      return state;
  }
}

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

  const [modalState, dispatch] = useReducer(modalReducer, {
    isEditModalOpen: false,
    isDetailsModalOpen: false,
    isConfirmDeleteModalOpen: false,
  });

  const truncatedDescription =
    complaint.description.length > 100
      ? complaint.description.substring(0, 90) + '...'
      : complaint.description;

  const handleDelete = () => {
    dispatch({ type: 'OPEN_CONFIRM_DELETE_MODAL' });
  };

  const handleConfirmDelete = () => {
    mutateDelete(complaint.uuid);
    dispatch({ type: 'CLOSE_ALL_MODALS' });
  };

  const handleEdit = () => {
    dispatch({ type: 'OPEN_EDIT_MODAL' });
  };

  const handleCardClick = () => {
    dispatch({ type: 'OPEN_DETAILS_MODAL' });
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
        isOpen={modalState.isEditModalOpen}
        onClose={() => dispatch({ type: 'CLOSE_ALL_MODALS' })}
        complaint={complaint}
      />

      <ComplaintDetailsModal
        isOpen={modalState.isDetailsModalOpen}
        onClose={() => dispatch({ type: 'CLOSE_ALL_MODALS' })}
        complaint={complaint}
      />

      <ConfirmationModal
        isOpen={modalState.isConfirmDeleteModalOpen}
        onClose={() => dispatch({ type: 'CLOSE_ALL_MODALS' })}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a reclamação? Esta ação não pode ser desfeita.`}
        confirmButtonText="Excluir"
        isConfirming={isDeleting}
      />
    </>
  );
}
