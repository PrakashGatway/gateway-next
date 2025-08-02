"use client";

import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/public/css/style.css";
import "@/public/css/responsive.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from "@/hooks/AppStateContext";
import Loader from "@/components/loader";

const inter = Inter({ subsets: ["latin"] });

// List of paths where Header and Footer should be hidden
const hideLayoutOnPaths = ['/thank-you'];

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldHideLayout = hideLayoutOnPaths.includes(pathname || '');

  // State to manage loader visibility
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading (e.g., fonts, auth, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Show loader for 1.2s (adjust as needed)

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style jsx>{`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 1;
    }
    .loader-container {
      position: relative;
      width: 70px;
      height: 70px;
    }
    .loader-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
    }
    .loader-logo {
      width: 36px;
      border-radius: 50%;
    }
  `}</style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700"
          rel="stylesheet"
        />
        <title>Gateway Abroad</title>
      </head>
      <body className={`${inter.className} hold-transition sidebar-mini layout-fixed`}>
        {/* Full-Screen Loader */}
        {loading && (
          <Loader />
        )}

        {/* Main Content */}
        <ThemeProvider defaultTheme="light" storageKey="gateway-theme">
          <GlobalProvider>
            {!loading && ( // Only render app after loader finishes
              <>
                {!shouldHideLayout && <Header />}
                <main>
                  <div>{children}</div>
                </main>
                {!shouldHideLayout && <Footer />}
              </>
            )}
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}