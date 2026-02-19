import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quickconvert.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  title: {
    default: "Quick Convert - Fast & Free File Converter",
    template: "%s | Quick Convert"
  },
  description: "Free online file converter. Convert PDF to Word, Word to PDF, Excel to PDF, images, and more. Fast, secure, and fully local processing. No registration required.",
  keywords: [
    "file converter",
    "PDF converter",
    "PDF to Word",
    "Word to PDF",
    "Excel to PDF",
    "image converter",
    "document converter",
    "free file converter",
    "online converter",
    "batch converter",
    "PDF splitter",
    "PDF merger",
    "PDF compressor",
    "file conversion",
    "convert files online",
    "free converter",
    "secure file converter",
    "local file converter"
  ],
  authors: [{ name: "Quick Convert" }],
  creator: "Quick Convert",
  publisher: "Quick Convert",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Quick Convert",
    title: "Quick Convert - Fast & Free File Converter",
    description: "Free online file converter. Convert PDF, Word, Excel, Images and more. Fast, secure, and fully local processing.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Quick Convert - File Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Convert - Fast & Free File Converter",
    description: "Free online file converter. Convert PDF, Word, Excel, Images and more.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@quickconvert",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PLACEHOLDER"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PLACEHOLDER');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
