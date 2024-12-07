"use client"; // Client-side component

import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from "react-hot-toast";
import { hydrateRoot } from "react-dom/client";
import { useEffect } from "react";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function RootLayout({ children }) {

  useEffect(() => {
    // HydrateRoot logic can be placed here if necessary
    const root = document.getElementById("root");
    if (root) {
      hydrateRoot(root);
    }
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="flex flex-col min-h-screen max-w-7xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            <div className="flex-grow">
              {children} {/* This will take up all available space */}
            </div>
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; {new Date().getFullYear()}  <span className="text-primary font-semibold">Crust & Co.</span> All rights reserved.
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
