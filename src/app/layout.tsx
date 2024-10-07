/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Generador de Links para WhatsApp | Crea Chats Fáciles",
  description:
    "Generá fácilmente links personalizados para iniciar chats de WhatsApp sin tener que guardar el número. Ideal para negocios y atención al cliente.",
  keywords: [
    "Generador de links WhatsApp",
    "crear chat WhatsApp",
    "link personalizado WhatsApp",
    "atención al cliente WhatsApp",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js" />
      </body>
    </html>
  );
}
