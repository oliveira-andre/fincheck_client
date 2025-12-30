import { Button } from "./Button";
import { TrashIcon } from "./icons/TrashIcon";
import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  title: string;
  description?: string;
}

export function ConfirmDeleteModal({ onClose, title, description }: ConfirmDeleteModalProps) {
  return (
    <Modal
      title="Excluir"
      open
      onClose={onClose}
    >
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] bg-red-0 rounded-full flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">{title}</p>

        <p className="text-gray-600 tracking-[-0.5px]">{description}</p>
      </div>

      <div className="mt-10 space-y-4">
        <Button type="button" className="w-full" isLoading={false} variant="danger">
          Sim, desejo excluir
        </Button>

        <Button type="button" className="w-full" isLoading={false} variant="ghost">
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}