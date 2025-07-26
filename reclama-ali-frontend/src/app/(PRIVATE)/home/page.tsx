'use client';
import { ComplaintSummaryCard } from '@/features/complaints/components/ComplaintSummaryCard';
import { ComplaintFormModal } from '@/features/complaints/components/ComplaintFormModal';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const dummyComplaint: Complaint = {
    id: '1',
    title: 'Problema com a entrega',
    description:
      'Minha encomenda de número XXXXX atrasou e não consigo rastreá-la. Já tentei contato com a transportadora, mas sem sucesso. Preciso de uma solução urgente, pois o prazo de entrega já expirou há 3 dias.',
    createdAt: new Date().toISOString(),
    status: 'FECHADO',
  };
  const dummyComplaint2: Complaint = {
    id: '2',
    title: 'Problema com a entrega',
    description:
      'Minha encomenda de número XXXXX atrasou e não consigo rastreá-la. Já tentei contato com a transportadora, mas sem sucesso. Preciso de uma solução urgente, pois o prazo de entrega já expirou há 3 dias.',
    createdAt: new Date().toISOString(),
    status: 'EM_ANALISE',
  };
  const dummyComplaint3: Complaint = {
    id: '3',
    title: 'Problema com a entrega',
    description:
      'Minha encomenda de número XXXXX atrasou e não consigo rastreá-la. Já tentei contato com a transportadora, mas sem sucesso. Preciso de uma solução urgente, pois o prazo de entrega já expirou há 3 dias.',
    createdAt: new Date().toISOString(),
    status: 'PENDENTE',
  };

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nova Reclamação
        </Button>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-6">
          <ComplaintSummaryCard
            complaint={dummyComplaint}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint2}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint3}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint2}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint3}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint2}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint3}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint2}
          />
          <ComplaintSummaryCard
            complaint={dummyComplaint3}
          />
        </div>

      <ComplaintFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}

