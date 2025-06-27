// app/layout.tsx

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { Providers } from "./providers";
import { generalSans } from "./fonts/fonts";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://a1education.com.au"),
  title: "A1 Education",
  description: "Empowering students through tailored education support.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "A1 Education",
              image: "https://a1education.com.au/favicon.svg",
              url: "https://a1education.com.au/",
              telephone: "0402097284",
              priceRange: "60-70",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Suite 207/30 Campbell St, Blacktown",
                addressLocality: "Sydney",
                addressRegion: "NSW",
                postalCode: "2148",
                addressCountry: "AU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -33.7716599,
                longitude: 150.9097367,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
            }),
          }}
        />
      </head>
      <body className={`${generalSans.variable} antialiased`}>
        <Providers>
          <Topbar />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
