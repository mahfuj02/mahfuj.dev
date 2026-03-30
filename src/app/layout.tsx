import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahfuj.dev"),
  title: "Mahfuj Ahmed | Full Stack Web and App Developer",
  description:
    "Portfolio of Mahfuj Ahmed featuring full-stack web, mobile, and AI-integrated projects with React, Next.js, React Native, and backend APIs.",
  openGraph: {
    title: "Mahfuj Ahmed | Full Stack Web and App Developer",
    description:
      "Explore selected projects in web, mobile, and AI-integrated product development.",
    url: "https://mahfuj.dev",
    siteName: "mahfuj.dev",
    images: [
      {
        url: "/projects/connexions.jpg",
        width: 1200,
        height: 630,
        alt: "Mahfuj Ahmed portfolio preview",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahfuj Ahmed | Full Stack Web and App Developer",
    description:
      "Portfolio of full-stack, mobile, and AI-integrated development projects.",
    images: ["/projects/connexions.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
