"use client"
import Image from "next/image";
import img from "@/public/av.png";
import { sliceWithEllipsis } from "@/lib/helper";
function GameCard(){
    return (
      <div className="border border-[#373737] p-2 sm:p-4 rounded-[8px] flex justify-between items-center gap-3 sm:gap-8 w-[550px] font-work relative">
        <span className="text-[#CCCCCC] border rounded-md p-1 absolute right-4 top-2">claim</span>
        <Image className="w-[150px] h-[150px] self-start" src={img} alt="" />
        <div className="grid gap-2">
          <h2 className="capitalize font-semibold text-lg sm:text-2xl">name</h2>
          <p className="font-normal text-sm sm:text-base sm:hidden">
            {sliceWithEllipsis(
              "You can now put your prediction into something and get outcomes prople of the world",
              50
            )}
          </p>
          <p className="font-normal text-sm sm:text-base sm:block hidden">
            {sliceWithEllipsis(
              "You can now put your prediction into something and get outcomes prople of the world",
              150
            )}
          </p>
          <button className="w-fit border brder-[#373737] px-3 py-[2px] sm:py-2 text-center rounded-full capitalize">
            manage
          </button>
        </div>
      </div>
    );
}
export default GameCard