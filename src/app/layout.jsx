import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import PreloaderWrapper from "@/components/PreloaderWrapper";

export const metadata = {
  title: "Ground Glass",
  description: "To be added",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LenisProvider>
          <PreloaderWrapper>
            <Navbar />
            {children}
          </PreloaderWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}
