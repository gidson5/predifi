"use client";
import Image from "next/image";
import { sliceWithEllipsis } from "@/lib/helper";
import { PoolData } from "@/type/type";
function GameCard({ data }:{data:PoolData}) {
  // console.log(data)
  return (
    <div className="border border-[#373737] p-2 sm:p-4 rounded-[8px] flex justify-between items-center gap-3 sm:gap-8 w-[550px] font-work relative">
      <span className="text-[#CCCCCC] border rounded-md p-1 absolute right-4 top-2">
        claim
      </span>
      <Image
        //placeholder="blur"
        //blurDataURL={data.poolImage}
        className="w-[150px] h-[150px] self-start"
        src={data?.poolImage}
        alt=""
        width={150}
        height={150}
      />
      <div className="grid gap-2">
        <h2 className="capitalize font-semibold text-lg sm:text-2xl">
          {data?.poolName}
        </h2>
        <p className="font-normal text-sm sm:text-base sm:hidden">
          {sliceWithEllipsis(data?.poolDescription, 50)}
        </p>
        <p className="font-normal text-sm sm:text-base sm:block hidden">
          {sliceWithEllipsis(data?.poolDescription, 150)}
        </p>
        <button className="w-fit border brder-[#373737] px-3 py-[2px] sm:py-2 text-center rounded-full capitalize">
          manage
        </button>

      </div>
    </div>
  );
}
export default GameCard;
