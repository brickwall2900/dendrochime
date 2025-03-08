import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationShit, { SidebarNavigation } from "@/components/navbar/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DendroChime",
  description: "carbon stock go boom brrrrr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <div>
          <NavigationShit />
        </div>
        <div className="mt-12">
          <SidebarNavigation>{children}</SidebarNavigation>
        </div>
      </body>
    </html>
  );
}
