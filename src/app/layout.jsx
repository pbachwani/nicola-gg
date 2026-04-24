import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import Script from "next/script";

export const metadata = {
  title: "Ground Glass",
  description:
    "Groundglass is a boutique colour studio with roots in Florence and Shanghai, where a cross-cultural perspective shapes a refined approach to image-making. Our team brings together different sensibilities and experiences, creating distinctive work through a careful balance of taste, precision, and cinematic craft.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J00XXN8QKC"
        ></Script>
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-J00XXN8QKC');
            `}
        </Script>
      </head>
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
