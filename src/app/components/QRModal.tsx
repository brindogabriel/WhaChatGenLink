import React from 'react';
import { X } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCode: string;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, qrCode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="dark:bg-gray-800 bg-white text-black dark:text-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Código QR</h3>
          <button
            onClick={onClose}
            className="dark:text-gray-300 hover:text-gray-100 text-gray-500 dark:hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <img src={qrCode} alt="QR Code" className="w-full" />
        <p className="mt-4 text-sm dark:text-gray-300 text-gray-600 text-center">
          Escanea este código QR para abrir el enlace de WhatsApp
        </p>
      </div>
    </div>
  );
};