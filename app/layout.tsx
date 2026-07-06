import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import SiteConfig from "@/config/site";
import { PROFILE } from "@/config/profile";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: SiteConfig.title,
    template: `%s | ${SiteConfig.title}`,
  },
  description: SiteConfig.description,
  keywords: SiteConfig.keywords,
  authors: [{ name: SiteConfig.author }],
  creator: SiteConfig.author,
  publisher: SiteConfig.author,
  metadataBase: new URL(SiteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SiteConfig.url,
    title: SiteConfig.title,
    description: SiteConfig.description,
    siteName: 'Sandeep Kothapalli Portfolio',
    images: [
      {
        url: `${SiteConfig.url}/logo.jpg`,
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} - Technical Lead & Solution Architect`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SiteConfig.title,
    description: SiteConfig.description,
    images: [`${SiteConfig.url}/logo.jpg`],
    creator: '@sandeepattech',
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
    // Add Google Search Console verification when available
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-p-20 scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
