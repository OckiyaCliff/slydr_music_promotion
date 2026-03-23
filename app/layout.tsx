import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Slydr - Music Promotion Platform",
  description:
    "Launch, manage, and scale your music promotion campaigns. The all-in-one platform for independent musicians to grow their reach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-[#030014]`}>
        {children}
      </body>
    </html>
  );
}
