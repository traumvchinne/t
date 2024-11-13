import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onConfirm: () => void;
  isAdmin?: boolean;
}

export const BookingModal = ({
  isOpen,
  onClose,
  selectedDate,
  onConfirm,
  isAdmin = false,
}: BookingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isAdmin ? 'Aprovar Reserva' : 'Confirmar Reserva'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className="mb-4">
          Data selecionada:{' '}
          <span className="font-semibold">
            {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </span>
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isAdmin ? 'Aprovar' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
};