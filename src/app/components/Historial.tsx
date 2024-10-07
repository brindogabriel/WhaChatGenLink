import React, { useState, useEffect } from "react";
import { Edit, Trash2, Share2, QrCode, Search } from "lucide-react";

interface HistorialProps {
  historial: { link: string; name: string; createdAt: number }[];
  handleEditName: (index: number) => void;
  handleDeleteLink: (index: number) => void;
  handleShareLink: (link: string) => void;
  generateQRCode: (link: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Historial: React.FC<HistorialProps> = ({
  historial,
  handleEditName,
  handleDeleteLink,
  handleShareLink,
  generateQRCode,
  searchTerm,
  setSearchTerm,
}) => {
  const [, setTick] = useState(0); // Notamos que no usamos el valor de estado

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick((prev) => prev + 1); // Actualiza solo para forzar el re-render
    }, 1000);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, []);

  const filteredHistorial = historial.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRelativeTime = (timestamp: number) => {
    if (isNaN(timestamp) || !isFinite(timestamp)) {
      return "Invalid value";
    }
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, "second");
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md dark:text-white text-gray-900">
      <h2 className="text-xl font-bold mb-4">Historial</h2>

      <form className="max-w-md mx-auto mb-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Buscar
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
            <Search />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar"
            required
          />
        </div>
      </form>
      {historial.length === 0 ? (
        <p>No hay enlaces generados aún.</p>
      ) : (
        <ul className="space-y-4 overflow-y-auto h-64 pr-2">
          {filteredHistorial.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="max-w-[70%]">
                <p className="text-sm font-medium truncate">
                  {item.name || "Enlace sin nombre"}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 text-sm hover:underline truncate block"
                >
                  {item.link.replace("https://", "")}
                </a>
                <span className="text-sm">
                  Creado hace: {getRelativeTime(item.createdAt)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditName(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteLink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => handleShareLink(item.link)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={() => generateQRCode(item.link)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <QrCode size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Historial;
