import Image from "next/image";
import img from "@/public/av.png";
function GameCard(){
    return (
      <div className="border border-[#373737] p-4 rounded-[8px] flex justify-between items-center gap-4 w-[450px]">
        <Image className="w-[150px] h-[150px]" src={img} alt="" />
        <div className="grid gap-2">
          <h2 className="capitalize font-semibold text-2xl">name</h2>
          <p>You can now put your prediction into something and get outcomes</p>
          <button className="w-fit border brder-[#373737] px-3 py-2 text-center rounded-full">manage</button>
        </div>
      </div>
    );
}
export default GameCard