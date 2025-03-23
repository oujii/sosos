import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "7.css/dist/7.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Windows 10 Web OS",
  description: "A web-based operating system inspired by Windows 10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
