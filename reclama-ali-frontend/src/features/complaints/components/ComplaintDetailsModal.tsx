import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';
import { formatDate } from '@/utils/formatters';

interface ComplaintDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: Complaint;
}

const getStatusBadgeVariant = (status: Complaint['status']) => {
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

export function ComplaintDetailsModal({
  isOpen,
  onClose,
  complaint,
}: ComplaintDetailsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalhes da Reclamação">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Título:</h3>
          <p className="text-gray-900">{complaint.title}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Descrição:</h3>
          <p className="text-gray-900">{complaint.description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Status:</h3>
            <Badge variant={getStatusBadgeVariant(complaint.status)}>
              {complaint.status.replace('_', ' ')}
            </Badge>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Data de Criação:
            </h3>
            <p className="text-gray-900">{formatDate(complaint.createdAt)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
