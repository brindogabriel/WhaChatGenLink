import React from "react";
import { X } from "lucide-react";
import { Country } from "../types";
import { generateWhatsAppUrl } from "../utils/whatsapp";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: Country;
  phoneNumber: string;
  message: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  phoneNumber,
  message,
}) => {
  if (!isOpen) return null;

  const handleAppClick = () => {
    const appUrl = `whatsapp://send?phone=${selectedCountry.dialCode.replace(
      "+",
      ""
    )}${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(appUrl, "_blank");
    onClose();
  };

  const handleWebClick = () => {
    const webUrl = generateWhatsAppUrl(
      phoneNumber,
      selectedCountry,
      message,
      true
    );
    window.open(webUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 text-center dark:text-white">
          ¿Dónde querés abrir WhatsApp?
        </h3>
        <div className="flex space-x-4">
          <button
            onClick={handleAppClick}
            className="bg-green-500 text-white py-2 px-4 rounded-md flex-1 hover:bg-green-600 transition duration-300"
          >
            WhatsApp App
          </button>
          <button
            onClick={handleWebClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md flex-1 hover:bg-blue-600 transition duration-300"
          >
            WhatsApp Web
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 dark:text-gray-300 underline text-center w-full"
        >
          <X />
        </button>
      </div>
    </div>
  );
};
