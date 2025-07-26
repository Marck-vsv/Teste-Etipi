'use client';
import { ComplaintSummaryCard } from '@/features/complaints/components/ComplaintSummaryCard';
import { ComplaintFormModal } from '@/features/complaints/components/ComplaintFormModal';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useGetComplaints } from '@/features/complaints/queries/use-get-complaints.query';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: paginatedData, isLoading } = useGetComplaints(currentPage);

  const complaints = paginatedData?.content || [];
  const totalPages = paginatedData?.totalPages || 0;

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nova Reclamação
        </Button>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-6">
        {isLoading ? (
          <p>Carregando reclamações...</p>
        ) : complaints.length > 0 ? (
          complaints.map((complaint: Complaint) => (
            <ComplaintSummaryCard key={complaint.id} complaint={complaint} />
          ))
        ) : (
          <p>Nenhuma reclamação encontrada.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Anterior
          </Button>
          <span>
            Página {currentPage + 1} de {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
          >
            Próxima
          </Button>
        </div>
      )}

      <ComplaintFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}

