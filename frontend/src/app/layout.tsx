import "@/styles/variables.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.scss";
import Providers from "@/providers/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NJAM Geography",
  description: "NJAM Geography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
