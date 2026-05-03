import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AI Learning Tracker",
  description: "Track and improve learning with AI",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}