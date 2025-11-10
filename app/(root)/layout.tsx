// app/(root)/layout.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import Script from "next/script";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
              streetAddress: "Suite 4/30 Campbell St, Blacktown",
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
      <Topbar />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
