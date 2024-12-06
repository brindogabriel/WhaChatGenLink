import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CopyNotificationProps {
  show: boolean;
}

export const CopyNotification: React.FC<CopyNotificationProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100 px-4 py-3 rounded-md flex items-center shadow-md">
      <CheckCircle className="mr-2" size={20} />
      <span>¡Enlace copiado con éxito!</span>
    </div>
  );
};