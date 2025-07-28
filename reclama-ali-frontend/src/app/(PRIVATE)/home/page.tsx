'use client';
import { Button } from '@/components/ui/Button';
import { ComplaintFormModal } from '@/features/complaints/components/ComplaintFormModal';
import { ComplaintSummaryCard } from '@/features/complaints/components/ComplaintSummaryCard';
import { useGetComplaints } from '@/features/complaints/queries/use-get-complaints.query';
import { Complaint } from '@/features/complaints/schemas/complaint.schema';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: paginatedData, isLoading } = useGetComplaints(currentPage);

  const complaints = paginatedData?.content || [];
  const totalPages = paginatedData?.page?.totalPages || 0;
  const currentPageNumber = paginatedData?.page?.number || 0;

  return (
    <div className='h-full w-full grid grid-rows-[1fr_8fr_1fr]'>
      <div className="w-full flex justify-end">
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex w-full mb-4 items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Reclamação
        </Button>
      </div>

      <div className="w-full max-h- overflow-y-auto bg-transparent">
        <div className="flex flex-col justify-center items-center gap-6 p-4">
          {isLoading ? (
            <p>Carregando reclamações...</p>
          ) : complaints.length > 0 ? (
            complaints.map((complaint: Complaint) => (
              <ComplaintSummaryCard
                key={complaint.uuid}
                complaint={complaint}
              />
            ))
          ) : (
            <p>Nenhuma reclamação encontrada.</p>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center space-x-4 mt-6">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Anterior
          </Button>
          <span>
            Página {currentPageNumber + 1} de {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
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
    </div>
  );
}
