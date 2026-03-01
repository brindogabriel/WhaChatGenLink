"use client";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { WhatsAppForm } from "./components/WhatsAppForm";
import { WhatsAppModal } from "./components/WhatsAppModal";
import { QRModal } from "./components/QRModal";
import { CopyNotification } from "./components/CopyNotification";
import { Country } from "./types";
import { countries } from "./data/countries";
import Historial from "./components/Historial";
import { generateWhatsAppUrl, validatePhoneNumber } from "./utils/whatsapp";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[7]);
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [showOpenOptions, setShowOpenOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedHistorial = localStorage.getItem("historial");
    if (storedHistorial) {
      setHistorial(JSON.parse(storedHistorial));
    }
 
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    setIsDesktop(!isMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem("whatsappHistorial", JSON.stringify(historial));
  }, [historial]);

  const validateAndGenerateLink = () => {
    if (!phoneNumber.trim()) {
      setError("Por favor, ingresa un número de teléfono.");
      return "";
    }
    if (!validatePhoneNumber(phoneNumber.trim())) {
      setError("El número de teléfono debe contener solo dígitos.");
      return "";
    }
    setError("");
    return generateWhatsAppUrl(phoneNumber, selectedCountry, message);
  };

  const handleGenerateLink = () => {
    const link = validateAndGenerateLink();
    if (link) {
      setGeneratedLink(link);
      const newHistorial = [
        { name: linkName || "Enlace sin nombre", link, createdAt: Date.now() },
        ...historial,
      ];
      setHistorial(newHistorial);
      localStorage.setItem("historial", JSON.stringify(newHistorial));
      setLinkName("");
    }
  };

  const handleGoToChat = () => {
    const link = validateAndGenerateLink();
    if (link) {
      if (isDesktop) {
        setShowOpenOptions(true);
      } else {
        window.open(link, "_blank");
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
      localStorage.setItem("historial", JSON.stringify(updatedHistorial));
    }
  };

  const generateQRCode = async (link: string) => {
    try {
      const qr = await QRCode.toDataURL(link);
      setQrCode(qr);
      setShowQrModal(true);
    } catch (err) {
      console.error("Error al generar el QR:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 bg-gray-100 transition-colors duration-200">
      <div className="container mx-auto p-4 grow">
       
        <div className="flex flex-col md:flex-row items-start justify-center space-y-4 md:space-y-0 md:space-x-6">
          <WhatsAppForm
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            message={message}
            setMessage={setMessage}
            linkName={linkName}
            setLinkName={setLinkName}
            error={error}
            handleGoToChat={handleGoToChat}
            handleGenerateLink={handleGenerateLink}
            generatedLink={generatedLink}
            onGenerateQR={generateQRCode}
          />

          <Historial
            historial={historial}
            handleEditName={handleEditName}
            handleDeleteLink={handleDeleteLink}
            handleShareLink={handleShareLink}
            generateQRCode={generateQRCode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <CopyNotification show={copied} />

        <QRModal
          isOpen={showQrModal}
          onClose={() => setShowQrModal(false)}
          qrCode={qrCode}
        />

        <WhatsAppModal
          isOpen={showOpenOptions}
          onClose={() => setShowOpenOptions(false)}
          selectedCountry={selectedCountry}
          phoneNumber={phoneNumber}
          message={message}
        />
      </div>
    </div>
  );
}
