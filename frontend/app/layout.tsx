import type { Metadata } from "next";
import { Jersey_10, Work_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import StarknetProvider from "@/components/starknet-provider";
import FilterContextProvider from "@/context/filter-context-provider";
import AllFilterContextProvider from "@/context/all-contex-provider";

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
  title: "PrediFI - Onchain Prediction Protocol",
  description: "Prediction Protocol built on starknet, predict various outcomes across various fields",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${Jersey10.variable} ${WorkSans.variable} antialiased px-5 md:px-10 xl:px-16 text-[#FFFFFF] font-work bg-[#13131A]`}
      >
        <StarknetProvider>
          <Nav />
          <AllFilterContextProvider>
            <FilterContextProvider>
              <section className="max-w-screen-[1500px] mx-auto mt-14 min-h-screen pb-14">
                {children}
              </section>
            </FilterContextProvider>
          </AllFilterContextProvider>
          <Footer />
        </StarknetProvider>
      </body>
    </html>
  );
}
