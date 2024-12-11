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
  title: "WhaChatGenLink",
  description: "Envia whatsapp sin agendar el numero",
  keywords: "whatsapp, enviar whatsapp sin agendar",
  robots: "index, follow",

  openGraph: {
    locale: "es_AR",
    title: "WhaChatGenLink",
    description: "Envia whatsapp sin agendar el numero",
    url: "https://wha-chat-gen-link.vercel.app/",
    siteName: "Gabriel Brindo",
    images: [
      {
        url: "https://wha-chat-gen-link.vercel.app/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Logo",
      },
    ],

    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhaChatGenLink",
    description: "Envia whatsapp sin agendar el numero",
    images: ["https://wha-chat-gen-link.vercel.app/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  applicationName: "WhaChatGenLink",
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
