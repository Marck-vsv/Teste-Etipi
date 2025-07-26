import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';
import { ComplaintActionsDropdown } from './ComplaintActionsDropdown';

interface ComplaintSummaryCardProps {
  complaint: Complaint;
  userName: string;
}

const getStatusBadgeVariant = (status: Complaint['status']) => {
  switch (status) {
    case 'PENDENTE':
      return 'warning';
    case 'EM_ANALISE':
      return 'secondary';
    case 'RESOLVIDO':
      return 'success';
    case 'FECHADO':
      return 'default';
    default:
      return 'default';
  }
};

export function ComplaintSummaryCard({
  complaint,
  userName,
}: ComplaintSummaryCardProps) {
  const truncatedDescription =
    complaint.description.length > 100
      ? complaint.description.substring(0, 97) + '...'
      : complaint.description;

  const handleEdit = () => {
    console.log('Edit complaint:', complaint.id);
  };

  const handleDelete = () => {
    console.log('Delete complaint:', complaint.id);
  };

  return (
    <Card.Body interactive size="sm">
      <Card.Header size="sm">
        <div className="flex justify-between items-center">
          <Card.Title>{userName}</Card.Title>
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusBadgeVariant(complaint.status)}>
              {complaint.status.replace('_', ' ')}
            </Badge>
            <ComplaintActionsDropdown
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
        <Card.Description size="sm">
          Motivo da reclamação: {complaint.title}
        </Card.Description>
      </Card.Header>
      <Card.Content size="sm">
        <p className="text-sm text-gray-700">{truncatedDescription}</p>
      </Card.Content>
    </Card.Body>
  );
}
