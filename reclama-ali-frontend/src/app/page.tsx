'use client';
import { ComplaintSummaryCard } from '@/features/complaints/components/ComplaintSummaryCard';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';

export default function Home() {
  const dummyComplaint: Complaint = {
    id: '123',
    title: 'Problema com a entrega',
    description:
      'Minha encomenda de número XXXXX atrasou e não consigo rastreá-la. Já tentei contato com a transportadora, mas sem sucesso. Preciso de uma solução urgente, pois o prazo de entrega já expirou há 3 dias.',
    createdAt: new Date().toISOString(),
    status: 'FECHADO',
  };
  const dummyComplaint2: Complaint = {
    id: '123',
    title: 'Problema com a entrega',
    description:
      'Minha encomenda de número XXXXX atrasou e não consigo rastreá-la. Já tentei contato com a transportadora, mas sem sucesso. Preciso de uma solução urgente, pois o prazo de entrega já expirou há 3 dias.',
    createdAt: new Date().toISOString(),
    status: 'EM_ANALISE',
  };
  const dummyComplaint3: Complaint = {
    id: '123',
    title: 'Problema com a entrega',
    description:
      'Minha encomenda de número XXXXX atrasou e não consigo rastreá-la. Já tentei contato com a transportadora, mas sem sucesso. Preciso de uma solução urgente, pois o prazo de entrega já expirou há 3 dias.',
    createdAt: new Date().toISOString(),
    status: 'PENDENTE',
  };

  return (
    <div className="min-h-screen flex items-center p-4">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <ComplaintSummaryCard
          complaint={dummyComplaint}
          userName="João da Silva"
        />
        <ComplaintSummaryCard
          complaint={dummyComplaint2}
          userName="João da Silva"
        />
        <ComplaintSummaryCard
          complaint={dummyComplaint3}
          userName="João da Silva"
        />
      </div>
    </div>
  );
}
