"use client";
import Image from "next/image"
import img from "@/public/Image.png"
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
function StakePoolId(){
  const { stakePoolId } = useParams();
    return (
      <section className="grid gap-4">
        <div className="w-full h-[250px]">
          <Image
            src={img}
            className="w-full h-[250px] object-fill rounded-[8px]"
            alt="pool image"
          />
        </div>
        <div>
          <h2 className="font-semibold font-work text-2xl">
            PredFi to win the hackathon  Pool ID: {stakePoolId} 
          </h2>
        </div>
        <div className="grid gap-3">
          <h2 className="text-[#8F8F8F]">Description</h2>
          <p className="border-[#373737] border rounded-[8px] p-3 min-h-[118px]">
            You can now put your prediction into something and get outcomes
          </p>
        </div>
        <div className="grid gap-3">
          <h2 className="text-[#8F8F8F]">Event URL</h2>
          <p className="border-[#373737] border rounded-[8px] p-3 min-h-[43px]">
            Link link link link link link
          </p>
        </div>
        <div className="grid gap-3 grid-cols-2">
          <div className="grid gap-3">
            <h2 className="text-[#8F8F8F]">Start Time</h2>
            <p className="border-[#373737] border rounded-[8px] p-3 min-h-[43px]">
              01 - 03 - 2025
            </p>
          </div>
          <div className="grid gap-3">
            <h2 className="text-[#8F8F8F]">End Time</h2>
            <p className="border-[#373737] border rounded-[8px] p-3 min-h-[43px]">
              01 - 25 - 2025
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-[#8F8F8F] font-semibold">Total Amount in Pool</h2>
          <h3 className="text-[#CCCCCC]">$10,000</h3>
        </div>
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-3">
            <Button className="rounded-full">Yes: PredFi to win</Button>
            <Button className="rounded-full">No: PredFi not to win</Button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-3">$</span>
            <input
              type="number"
              className="bg-transparent outline-none border-[#373737] rounded-full border w-full px-7 py-3"
            />
          </div>
          <div className="flex justify-between ">
            <Button>$1</Button>
            <Button>$5</Button>
            <Button>$10</Button>
            <Button>$50</Button>
            <Button>max</Button>
          </div>
          <Button>stake</Button>
        </div>
      </section>
    );
}
export default StakePoolId