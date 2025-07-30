import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../public/css/style.css"
import "../public/css/responsive.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import GetInTouchWidget from "@/components/get-in-touch-widget"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gateway Abroad Education - Best Study Abroad Consultants in Jaipur",
  description:
    "Complete your overseas education dreams with the best Study Abroad Consultants in Jaipur Rajasthan India. Expert guidance for USA, UK, Canada, Australia, New Zealand and more.",
  keywords:
    "study abroad, education consultants, overseas education, Jaipur, USA, UK, Canada, Australia, New Zealand, IELTS, TOEFL, visa process",
  authors: [{ name: "Gateway Abroad Education" }],
  openGraph: {
    title: "Gateway Abroad Education - Best Study Abroad Consultants in Jaipur",
    description: "Complete your overseas education dreams with the best Study Abroad Consultants in Jaipur",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gateway Abroad Education - Best Study Abroad Consultants in Jaipur",
    description: "Complete your overseas education dreams with the best Study Abroad Consultants in Jaipur",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'Gateway'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Bootstrap CSS */}
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        /> */}

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap-grid.min.css" integrity="sha512-LLxZHu50SXdFJdAzHmDJAoLaozhTB4BYZPoN+xdTRjiPmPhI+1mEJXdoHHiDWmd/jj/9x10pkd8mYGG9sqfPPA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet"></link>
      </head>
      <body className={inter.className + "hold-transition sidebar-mini layout-fixed"}>
        <ThemeProvider defaultTheme="light" storageKey="gateway-theme">
          <Header />
          <main><div>{children}</div></main>
          <Footer />
          {/* <GetInTouchWidget /> */}
        </ThemeProvider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/js/bootstrap.min.js" integrity="sha512-a6ctI6w1kg3J4dSjknHj3aWLEbjitAXAjLDRUxo2wyYmDFRcz2RJuQr5M3Kt8O/TtUSp8n2rAyaXYy1sjoKmrQ==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
          integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
          crossOrigin="anonymous"></script>
      </body>
    </html>
  )
}
