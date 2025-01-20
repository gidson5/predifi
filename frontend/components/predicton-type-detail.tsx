import img2 from "@/public/Rectangle 3.svg";
import Image from "next/image";
function PredictionType() {
  return (
    <div className="flex flex-wrap justify-between gap-5">
      <div className="bg-[#071648] rounded-[8px] flex justify-between items-center gap-3 sm:gap-4 w-[550px] font-work pr-3">
        <Image className="w-full h-full self-start" src={img2} alt="" />
        <div className="grid gap-4 ">
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
      <div className="bg-[#071648] rounded-[8px] flex justify-between items-center gap-3 sm:gap-4 w-[550px] font-work pr-3">
        <Image className="w-full h-full self-start" src={img2} alt="" />
        <div className="grid gap-4 ">
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
      <div className="bg-[#071648] rounded-[8px] flex justify-between items-center gap-3 sm:gap-4 w-[550px] font-work pr-3">
        <Image className="w-full h-full self-start" src={img2} alt="" />
        <div className="grid gap-4 ">
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
      <div className="bg-[#071648] rounded-[8px] flex justify-between items-center gap-3 sm:gap-4 w-[550px] font-work pr-3">
        <Image className="w-full h-full self-start" src={img2} alt="" />
        <div className="grid gap-4 ">
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
