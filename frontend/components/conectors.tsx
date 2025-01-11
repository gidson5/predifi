import { useConnect } from "@starknet-react/core";
import { Button } from "./ui/button";
import { modal } from "@/type/type";
import CrossX from "@/svg/cross";
import ArgentIcon from "@/svg/argent";

function Conectors({ setIsOpen }: modal) {
  const { connect, connectors } = useConnect();
  console.log(connectors);
  return (
    <div className="relative">
      <div
        className="fixed h-screen w-full bg-[#868686]/20 backdrop-blur-md top-0 left-0"
        onClick={setIsOpen}
      />
      <div className="w-[398px] min-h-[316px] pb-5 pt-8 px-3 bg-[#1E1E1E] top-1/2 right-1/2 fixed -translate-y-[50%] translate-x-[50%]">
        <button
          className="text-white absolute right-4 top-2"
          onClick={setIsOpen}
        >
          <CrossX />
        </button>
        <h1 className="text-center font-normal text-base uppercase">
          select wallet
        </h1>
        <div className="w-full grid gap-y-2 mt-7">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => {
                connect({ connector });
                setIsOpen();
              }}
              className="w-full border border-[#373737] rounded-[16px] py-6 capitalize text-start text-lg flex justify-start"
            >
              {connector.id === "argentX" ? (
                <>
                  <ArgentIcon />
                  {connector.id}
                </>
              ) : (
                connector.id
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Conectors;
