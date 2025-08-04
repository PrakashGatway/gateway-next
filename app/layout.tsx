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
import { GlobalProvider, useGlobal } from "@/hooks/AppStateContext";
import Loader from "@/components/loader";

const inter = Inter({ subsets: ["latin"] });

const hideLayoutOnPaths = ['/thank-you'];

function LoaderWrapper({ children }: { children: ReactNode }) {
  const { loading } = useGlobal();
  return (
    <>
      {children}
      {loading && <Loader/>}
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldHideLayout = hideLayoutOnPaths.includes(pathname || '');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700"
          rel="stylesheet"
        />
        <title>Gateway Abroad | Study Abroad Consultants</title>
      </head>
      <body className={`${inter.className} hold-transition sidebar-mini layout-fixed`}>
        <ThemeProvider defaultTheme="light" storageKey="gateway-theme">
          <GlobalProvider>
            <LoaderWrapper>
              {!shouldHideLayout && <Header />}
              <main>
                <div>{children}</div>
              </main>
              {!shouldHideLayout && <Footer />}
            </LoaderWrapper>
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}