import img1 from "@/public/why-choose-1.png";
import img2 from "@/public/why-choose-2.png";
import img3 from "@/public/why-choose-3.png"
import img4 from "@/public/why-choose-4.png"
import Image from "next/image";
function PredictionType() {
  return (
    <div className="flex flex-wrap justify-center gap-10">
      <div className="bg-[#14121a] rounded-[8px] flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4 w-[593px] font-work lg:pr-3">
        <Image className="w-full h-full rounded-[8px] lg:self-start" src={img1} alt="" />
        <div className="grid gap-4 p-5 lg:p-0">
          <h2 className="capitalize font-semibold text-lg sm:text-xl">
            Decentralized and Transparent
          </h2>
          <p className="font-normal text-sm sm:text-base">
            The Win Bet is a straightforward prediction pool where participants
            choose between two clear outcomes.
          </p>
          <button className="w-fit border brder-[#373737] px-3 py-[2px] sm:py-2 text-center rounded-full capitalize">
            Learn more
          </button>
        </div>
      </div>
      <div className="bg-[#14121a] rounded-[8px] flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4 w-[593px] font-work lg:pr-3">
        <Image className="w-full h-full self-start rounded-[8px]" src={img2} alt="" />
        <div className="grid gap-4 p-5 lg:p-0">
          <h2 className="capitalize font-semibold text-lg sm:text-xl">
            No Coding Required
          </h2>
          <p className="font-normal text-sm sm:text-base">
            The Win Bet is a straightforward prediction pool where participants
            choose between two clear outcomes.
          </p>
          <button className="w-fit border brder-[#373737] px-3 py-[2px] sm:py-2 text-center rounded-full capitalize">
            Learn more
          </button>
        </div>
      </div>
      <div className="bg-[#14121a] rounded-[8px] flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4 w-[593px] font-work lg:pr-3">
        <Image className="w-full h-full self-start rounded-[8px]" src={img3} alt="" />
        <div className="grid gap-4 p-5 lg:p-0">
          <h2 className="capitalize font-semibold text-lg sm:text-xl">
            Profit While Engaging
          </h2>
          <p className="font-normal text-sm sm:text-base">
            The Win Bet is a straightforward prediction pool where participants
            choose between two clear outcomes.
          </p>
          <button className="w-fit border brder-[#373737] px-3 py-[2px] sm:py-2 text-center rounded-full capitalize">
            Learn more
          </button>
        </div>
      </div>
      <div className="bg-[#14121a] rounded-[8px] flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4 w-[593px] font-work lg:pr-3">
        <Image className="w-full h-full self-start rounded-[8px]" src={img4} alt="" />
        <div className="grid gap-4 p-5 lg:p-0">
          <h2 className="capitalize font-semibold text-lg sm:text-xl">
            Decentralized and Transparent
          </h2>
          <p className="font-normal text-sm sm:text-base">
            The Win Bet is a straightforward prediction pool where participants
            choose between two clear outcomes.
          </p>
          <button className="w-fit border brder-[#373737] px-3 py-[2px] sm:py-2 text-center rounded-full capitalize">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
export default PredictionType;
