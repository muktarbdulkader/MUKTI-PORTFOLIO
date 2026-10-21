import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mukti — Software Engineer & Full-Stack Developer",
    template: "%s — Mukti",
  },
  description:
    "Mukti is a software engineer and full-stack developer building web and mobile applications. Explore projects, skills, and ways to collaborate.",
  keywords: [
    "Mukti",
    "software engineer",
    "full-stack developer",
    "web development",
    "mobile development",
    "Next.js",
    "Flutter",
  ],
  authors: [{ name: "Mukti" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Mukti — Software Engineer",
    title: "Mukti — Software Engineer & Full-Stack Developer",
    description:
      "Building digital products that solve real problems. Explore projects, skills, and ways to collaborate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukti — Software Engineer & Full-Stack Developer",
    description: "Building digital products that solve real problems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-content">
        {children}
      </body>
    </html>
  );
}
