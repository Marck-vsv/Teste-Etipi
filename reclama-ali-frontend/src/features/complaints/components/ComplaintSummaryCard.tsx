import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';

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

  return (
    <Card.Body interactive className='max-w-screen w-3xl'>
      <Card.Header>
        <div className="flex justify-between items-center">
          <Card.Title>{userName}</Card.Title>
          <Badge variant={getStatusBadgeVariant(complaint.status)}>
            {complaint.status.replace('_', ' ')}
          </Badge>
        </div>
        <Card.Description>
          Motivo da reclamação: {complaint.title}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-gray-700">{truncatedDescription}</p>
      </Card.Content>
    </Card.Body>
  );
}
