import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import ClientThemeProvider from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Aces Poker Admin",
  description: "Sistema de gestão de torneios de poker profissional",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["poker", "tournament", "admin", "management", "aces"],
  authors: [{ name: "Aces Poker Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${bebasNeue.variable} antialiased`}
      >
        <ClientThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
