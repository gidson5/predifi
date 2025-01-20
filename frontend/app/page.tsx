"use client"
import img1 from "@/public/Frame 91.svg"
import Image from "next/image";
import PredictionType from "@/components/predicton-type-detail";
import HowITWork from "@/components/how-it-work";
import PoolTypes from "@/components/pool-types";
import Link from "next/link";
import { routes } from "@/lib/route";
//import bgImg from "@/public/code.png"

export default function Home() {
  return (
    <div className="grid items-center justify-items-center">
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="font-jersey font-normal text-5xl">
          Transform Predictions Into Profits!
        </h1>
        <p className="font-normal text-xl">
          Create and participate in decentralized prediction markets across
          sports, finance, and pop culture.
        </p>
        <div className="flex gap-x-2">
          <Link href={routes.createPool} className="bg-transparent rounded-full hover:bg-[#37B7C3] shadow-none border border-[#37B7C3] text-[#37B7C3] hover:text-[#071952] py-1 px-4">
            Create a Pool
          </Link>
          <Link href={routes.dashboard} className="bg-transparent rounded-full hover:bg-[#37B7C3] shadow-none border border-[#37B7C3] text-[#37B7C3] hover:text-[#071952] px-4 py-1">
            Explore Markets
          </Link >
        </div>
      </header>
      <Image src={img1} alt="rectangle" className="my-24 max-w-screen-lg" />
      <section className="">
        <div className="text-center grid gap-1">
          <h2 className="text-[#37B7C3]">Features overview</h2>
          <h1 className="font-jersey text-3xl">Why Choose PredFi?</h1>
        </div>
        <div className="mt-4">
          <PredictionType />
        </div>
      </section>
      <section className="mt-10">
        <div className="text-center grid gap-1">
          <h2 className="text-[#37B7C3]">Step-by-step</h2>
          <h1 className="font-jersey text-3xl">How It Works</h1>
        </div>
        <div className="mt-4">
          <HowITWork />
        </div>
      </section>
      <section className="mt-16">
        <div className="text-center grid gap-1">
          <h2 className="text-[#37B7C3]">Step-by-step</h2>
          <h1 className="font-jersey text-3xl">Types of Prediction Pools </h1>
        </div>
        <div className="mt-4">
          <PoolTypes />
        </div>
      </section>
      <section className="grid gap-3 my-10">
        <h2 className="text-3xl font-normal font-jersey text-center">Site Metrics</h2>
        <div className="flex justify-center gap-4">
          <div className="border-[#373737] w-[205px] h-[119px] border text-center grid place-content-center">
            <h2 className="text-sm font-semibold">Total Bets Open</h2>
            <h3 className="font-bold text-3xl">17</h3>
          </div>
          <div className="border-[#373737] w-[205px] h-[119px] border text-center grid place-content-center">
            <h2 className="text-sm font-semibold">Total Bets Open</h2>
            <h3 className="font-bold text-3xl">17</h3>
          </div>
          <div className="border-[#373737] w-[205px] h-[119px] border text-center grid place-content-center">
            <h2 className="text-sm font-semibold">Total Bets Open</h2>
            <h3 className="font-bold text-3xl">17</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
