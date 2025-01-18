import { Button } from "@/components/ui/button";
import CrossX from "@/svg/cross";


function ClaimRewordModal() {
  return (
    <div className="relative">
      <div
        className="fixed h-screen w-full bg-[#868686]/20 backdrop-blur-md top-0 left-0"
      />
      <div className="grid gap-4 w-[320px] z-50 h-fit py-5 bg-[#1E1E1E] top-1/2 right-1/2 fixed -translate-y-[50%] translate-x-[50%] rounded-lg border border-[#373737] px-6 text-[#CCCCCC]">
        <div
          className="justify-self-end"
        >
          <CrossX/>
        </div>
        <div className="grid gap-4">
          <div className="flex justify-between">
            <h2>Woah you’re amazing</h2>
            <span className="text-[#CCCCCC] border rounded-md p-1">claim</span>
          </div>
          <h2>Total Amount Won from Pool</h2>
          <h1 className="text-7xl">$100</h1>
        </div>
        <Button className="rounded-full">Claim your victory</Button>
      </div>
    </div>
  );
}
export default ClaimRewordModal;
