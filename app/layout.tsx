import "./globals.css";
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
      <body className={`${generalSans.variable} antialiased`}>
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="//js-ap1.hs-scripts.com/442828550.js"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
