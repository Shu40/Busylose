import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BusyLoss - Ultimate Platform for Developers & Tech Enthusiasts",
    template: "%s | BusyLoss - Ultra Optimized"
  },
  description: "BusyLoss, founded by Shubham, is the premier hub for premium Website Code, Android APKs, Windows Software, and Linux Tools. Explore high-quality tech resources and contribute to our growing library.",
  keywords: ["BusyLoss", "Shubham", "Software Hub", "Website Code", "Android APK", "Windows Software", "Linux Tools", "Free Code", "Premium Tools", "Developer Resources"],
  authors: [{ name: "Shubham", url: "https://busyloss.com" }],
  creator: "Shubham",
  publisher: "BusyLoss",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "BusyLoss - Ultimate Professional Tool Hub",
    description: "Founded by Shubham, BusyLoss offers high-quality software, tools, and code for all platforms. Join the revolution.",
    url: "https://busyloss.com",
    siteName: "BusyLoss",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BusyLoss - Tech Mastery by Shubham",
    description: "Premium tools and code for developers, curated by Shubham. Explore BusyLoss.",
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
};

import { Toaster } from "sonner";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BusyLoss",
    "url": "https://busyloss.com",
    "logo": "https://busyloss.com/favicon.ico",
    "founder": {
      "@type": "Person",
      "name": "Shubham",
      "jobTitle": "Founder & Lead Developer"
    },
    "description": "BusyLoss is a high-end platform for sharing professional software, tools, and website source code across all major operating systems.",
    "sameAs": [
      "https://github.com/busyloss"
    ]
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full">
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="top-right" richColors />
            <div className="h-full flex">
              <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
                <Sidebar />
              </div>
              <main className="md:pl-72 h-full w-full flex flex-col">
                <div className="flex-1">
                    <Navbar />
                    {children}
                </div>
                <Footer />
              </main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
