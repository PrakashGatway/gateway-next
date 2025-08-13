"use client";

import { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalProvider, useGlobal } from "@/hooks/AppStateContext";
import { usePathname } from "next/navigation";
import Loader from "../loader";

const hideLayoutOnPaths = ['/thank-you'];

function LoaderWrapper({ children }: { children: ReactNode }) {
  const { loading } = useGlobal();
  return <>{children} {loading && <Loader />}</>;
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldHideLayout = hideLayoutOnPaths.includes(pathname || '');

  return (
    <ThemeProvider defaultTheme="light" storageKey="gateway-theme">
      <GlobalProvider>
        <LoaderWrapper>
          {!shouldHideLayout && <Header />}
          <main>{children}</main>
          {!shouldHideLayout && <Footer />}
        </LoaderWrapper>
      </GlobalProvider>
    </ThemeProvider>
  );
}
