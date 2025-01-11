import type { Metadata } from "next";
import { Jersey_10, Work_Sans } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "@/components/starknet-provider";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";

const Jersey10 = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey-10",
});

const  WorkSans = Work_Sans({
  variable: "--font-work-sans",
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
        className={`${Jersey10.variable} ${WorkSans.variable} antialiased px-5 md:px-10 xl:px-16 bg-[#1E1E1E] text-[#FFFFFF] font-work`}
      >
        <StarknetProvider>
          <Nav />
          <section className="mt-14 min-h-screen pb-14">{children}</section>
          <Footer />
        </StarknetProvider>
      </body>
    </html>
  );
}
