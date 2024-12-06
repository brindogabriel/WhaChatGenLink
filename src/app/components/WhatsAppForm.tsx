import React from "react";
import { Link as LinkIcon, QrCode } from "lucide-react";
import { CountrySelector } from "./CountrySelector";
import { Country } from "../types";

interface WhatsAppFormProps {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  linkName: string;
  setLinkName: (value: string) => void;
  error: string;
  handleGoToChat: () => void;
  handleGenerateLink: () => void;
  generatedLink: string;
  onGenerateQR: (link: string) => void;
}

export const WhatsAppForm: React.FC<WhatsAppFormProps> = ({
  selectedCountry,
  setSelectedCountry,
  phoneNumber,
  setPhoneNumber,
  message,
  setMessage,
  linkName,
  setLinkName,
  error,
  handleGoToChat,
  handleGenerateLink,
  generatedLink,
  onGenerateQR,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md dark:text-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Generador de Enlaces de WhatsApp
      </h1>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
          Número de teléfono
        </label>
        <div className="flex flex-grow gap-2">
          <CountrySelector
            selectedCountry={selectedCountry}
            onSelect={setSelectedCountry}
          />
          <input
            type="tel"
            id="phoneNumber"
            className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="91123456789"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensaje (opcional)
        </label>
        <textarea
          id="message"
          className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu mensaje aquí"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="linkName" className="block text-sm font-medium mb-1">
          Nombre del enlace (opcional)
        </label>
        <input
          type="text"
          id="linkName"
          className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Verduleria Juancito"
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
        />
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 rounded-md flex items-center">
          <span>{error}</span>
        </div>
      )}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleGoToChat}
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mr-2"
          >
            <path d="M13.601 2.344C12.098.84 10.106 0 8.001 0 3.593 0 .001 3.593.001 8c0 1.41.365 2.795 1.06 4.015L.001 16l4.064-1.045c1.184.645 2.535.986 3.935.986 4.407 0 8-3.593 8-8 0-2.105-.84-4.098-2.399-5.656zM8.001 14.688c-1.25 0-2.48-.33-3.548-.956l-.255-.146-2.688.69.72-2.617-.163-.271C1.354 10.304 1 9.163 1 8c0-3.86 3.14-7 7.001-7C11.86 1 15 4.14 15 8c0 3.861-3.141 6.688-6.999 6.688z" />
            <path d="M11.537 9.663c-.191-.095-1.131-.557-1.306-.62-.175-.065-.304-.096-.432.095-.128.192-.494.621-.606.748-.111.128-.223.144-.414.048-.191-.095-.806-.296-1.537-.943-.568-.507-.95-1.135-1.061-1.327-.112-.192-.012-.295.084-.39.086-.085.192-.223.288-.335.097-.112.128-.192.192-.32.065-.128.032-.24-.016-.336-.049-.096-.432-1.039-.593-1.427-.156-.376-.317-.327-.432-.335h-.37c-.128 0-.335.048-.512.24-.175.191-.674.659-.674 1.611 0 .952.69 1.873.785 2.002.095.128 1.362 2.103 3.3 2.953.462.2.822.319 1.103.416.464.147.886.127 1.223.078.373-.056 1.131-.461 1.292-.906.16-.445.16-.827.112-.906-.048-.079-.175-.128-.366-.223z" />
          </svg>
          Ir al chat
        </button>
        <button
          onClick={handleGenerateLink}
          className="flex-1 border-2 border-green-500 text-green-500 py-2 px-4 rounded-md hover:bg-green-50 dark:hover:bg-green-900 transition duration-300 flex items-center justify-center dark:text-green-400 dark:border-green-400"
        >
          <LinkIcon className="mr-2" size={20} />
          Generar enlace
        </button>
      </div>
      {generatedLink && (
        <div className="mt-4 p-3 dark:bg-gray-700 bg-gray-100 rounded-md text-sm break-all">
          <p className="font-medium mb-1">Enlace generado:</p>
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            {generatedLink.replace("https://", "")}
          </a>
          <button
            onClick={() => onGenerateQR(generatedLink)}
            className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center text-sm"
          >
            <QrCode size={16} className="mr-1" />
            Generar QR
          </button>
        </div>
      )}
    </div>
  );
};
