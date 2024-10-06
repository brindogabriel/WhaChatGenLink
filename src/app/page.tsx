/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import {
  Link as LinkIcon,
  Edit,
  Trash2,
  Share2,
  CheckCircle,
  QrCode,
  X,
  Sun,
  Moon,
} from "lucide-react";
import QRCode from "qrcode";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [linkName, setLinkName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [historial, setHistorial] = useState<
    { link: string; name: string; createdAt: number }[]
  >([]);
  const [qrCode, setQrCode] = useState("");
  const [showQrModal, setShowQrModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // Nueva variable
  const [showOpenOptions, setShowOpenOptions] = useState(false); // Para mostrar el modal de opciones
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const storedHistorial = localStorage.getItem("historial");
    if (storedHistorial) {
      setHistorial(JSON.parse(storedHistorial));
    }
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }

    // Detectar si es escritorio
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    setIsDesktop(!isMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem("whatsappHistorial", JSON.stringify(historial));
  }, [historial]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  const validatePhoneNumber = (number: string) => {
    return /^\d+$/.test(number);
  };

  const filteredHistorial = historial.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateWhatsAppLink = () => {
    if (!phoneNumber.trim()) {
      setError("Por favor, ingresa un número de teléfono.");
      return "";
    }
    if (!validatePhoneNumber(phoneNumber.trim())) {
      setError("El número de teléfono debe contener solo dígitos.");
      return "";
    }
    setError("");
    let link = `https://wa.me/${phoneNumber.trim()}`;
    if (message.trim()) {
      link += `?text=${encodeURIComponent(message.trim())}`;
    }
    return link;
  };

  const handleGenerateLink = () => {
    const link = generateWhatsAppLink();
    if (link) {
      setGeneratedLink(link);
      const newHistorial = [
        { name: linkName, link, createdAt: Date.now() },
        ...historial,
      ];
      setHistorial(newHistorial);
      localStorage.setItem("historial", JSON.stringify(newHistorial));
      setLinkName("");
    }
  };

  const handleGoToChat = () => {
    const link = generateWhatsAppLink();
    if (link) {
      if (isDesktop) {
        setShowOpenOptions(true); // Mostrar opciones si es escritorio
      } else {
        window.open(link, "_blank"); // Abrir directamente si es móvil
      }
    }
  };

  const handleDeleteLink = (index: number) => {
    const newHistorial = historial.filter((_, i) => i !== index);
    setHistorial(newHistorial);
    localStorage.setItem("historial", JSON.stringify(newHistorial));
  };

  const handleShareLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleEditName = (index: number) => {
    const newName = prompt(
      "Nuevo nombre para el enlace:",
      historial[index].name
    );
    if (newName !== null) {
      const updatedHistorial = [...historial];
      updatedHistorial[index].name = newName;
      setHistorial(updatedHistorial);
    }
  };

  const generateQRCode = async (link: string) => {
    try {
      const qr = await QRCode.toDataURL(link);
      setQrCode(qr);
      setShowQrModal(true);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      className="min-h-screen flex flex-col
       dark:bg-gray-900 bg-gray-100
      transition-colors duration-200"
    >
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Card de funcionalidad principal */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md dark:text-white text-gray-900">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Generador de Enlaces de WhatsApp
            </h1>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium mb-1"
              >
                Número de teléfono (con código de país)
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="w-full px-3 py-2 border 
                 dark:border-gray-600 dark:bg-gray-700 border-gray-300
               rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 5491123456789"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border 
                  dark:border-gray-600 dark:bg-gray-700 border-gray-300
                 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe tu mensaje aquí"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="linkName"
                className="block text-sm font-medium mb-1"
              >
                Nombre del enlace (opcional)
              </label>
              <input
                type="text"
                id="linkName"
                className="w-full px-3 py-2 border
                  dark:border-gray-600 dark:bg-gray-700 border-gray-300
                rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="flex-1 border-2 border-green-500 text-green-500 py-2 px-4 rounded-md hover:bg-green-50 dark:hover:bg-green-900 transition duration-300 flex items-center justify-center 
                 dark:text-green-400 dark:border-green-400"
              >
                <LinkIcon className="mr-2" size={20} />
                Generar enlace
              </button>
              {/* Modal de opciones para escritorio */}
              {showOpenOptions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h3 className="text-lg font-semibold mb-4 text-center dark:text-white">
                      ¿Dónde querés abrir WhatsApp?
                    </h3>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          window.open(
                            `whatsapp://send?phone=${phoneNumber}&text=${message}`,
                            "_blank"
                          );
                          setShowOpenOptions(false);
                        }}
                        className="bg-green-500 text-white py-2 px-4 rounded-md flex-1 hover:bg-green-600 transition duration-300"
                      >
                        WhatsApp App
                      </button>
                      <button
                        onClick={() => {
                          window.open(
                            `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`,
                            "_blank"
                          );
                          setShowOpenOptions(false);
                        }}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md flex-1 hover:bg-blue-600 transition duration-300"
                      >
                        WhatsApp Web
                      </button>
                    </div>
                    <button
                      onClick={() => setShowOpenOptions(false)}
                      className="mt-4 text-gray-500 dark:text-gray-300 underline text-center w-full"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
            {generatedLink && (
              <div
                className={`mt-4 p-3 ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } rounded-md text-sm break-all`}
              >
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
                  onClick={() => generateQRCode(generatedLink)}
                  className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center text-sm"
                >
                  <QrCode size={16} className="mr-1" />
                  Generar QR
                </button>
              </div>
            )}
          </div>

          {/* Card del historial */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md dark:text-white text-gray-900">
            <h2 className="text-xl font-bold mb-4">Historial</h2>

            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="default-search"
                className=" mb-2 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar"
                required
              />
            </div>

            <ul className="space-y-4">
              {filteredHistorial.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="max-w-[70%]">
                    <div content={item.name || "Enlace sin nombre"}>
                      <p className="text-sm font-medium truncate">
                        {truncateText(item.name || "Enlace sin nombre", 30)}
                      </p>
                    </div>
                    <div content={item.link}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 text-sm hover:underline truncate block"
                      >
                        {truncateText(item.link.replace("https://", ""), 30)}
                      </a>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditName(index)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteLink(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      onClick={() => handleShareLink(item.link)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Share2 size={20} />
                    </button>
                    <button
                      onClick={() => generateQRCode(item.link)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <QrCode size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alerta de enlace copiado */}
        {copied && (
          <div className="fixed top-4 right-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100 px-4 py-3 rounded-md flex items-center shadow-md">
            <CheckCircle className="mr-2" size={20} />
            <span>¡Enlace copiado con éxito!</span>
          </div>
        )}

        {/* Modal para mostrar el código QR */}
        {showQrModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="dark:bg-gray-800  bg-white text-black  dark:text-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Código QR</h3>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="dark:text-gray-300 hover:text-gray-100
                      text-gray-500 dark:hover:text-gray-700
                 "
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
        )}
      </div>
    </div>
  );
}
