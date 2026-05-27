import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mega-header-mega-header-qyou Starter",
  description: "Open source hackathon starter for the mega-header-mega-header-qyou rebuild."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
