import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isConfirming?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
  isConfirming = false,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-4 space-y-4">
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose} disabled={isConfirming}>
            {cancelButtonText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            isLoading={isConfirming}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
