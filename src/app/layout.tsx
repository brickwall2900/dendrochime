import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { MainWithSidebarNav } from "@/components/navbar/nav-main";
import { Toaster } from "@/components/ui/sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, MessageSquareWarning } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | DendroChime',
    default: 'DendroChime',
  },
  description: "carbon stock monitoring go boom brrrrr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Toaster />
        <MainWithSidebarNav>{children}</MainWithSidebarNav>
        {/* <div>
          The footer goes here!
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>DendroChime</AlertTitle>
            <AlertDescription>
              Website is not currently representative in its current state! Anything may be subject to change!
            </AlertDescription>
          </Alert>
        </div> */}
      </body>
    </html>
  );
}
