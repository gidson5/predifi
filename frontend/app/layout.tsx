import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { StarknetProvider } from "@/components/starknet-provider";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrediFI - Onchain Price Prediction",
  description: "Prediction Protocol built on starknet, predict various outcomes across various fields",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-5 md:px-10 xl:px-16`}
      >
        <StarknetProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <section className="mt-14 min-h-screen">{children}</section>
            <Footer />
          </ThemeProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
