import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import ProjectsLayout from "./projects/layout";
import TransitionProvider from "@/components/TransitionProvider";

export const metadata = {
  title: "Ground Glass",
  description: "To be added",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <LenisProvider>
          <TransitionProvider>
            <Navbar />
            {children}
          </TransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
