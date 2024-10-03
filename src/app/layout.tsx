import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Venda Crud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={font.className}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
