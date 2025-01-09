import { useConnect } from "@starknet-react/core"
import { X } from "lucide-react"
import { Button } from "./ui/button"

type modal={
    setIsOpen:()=>void
}
function Conneectors ({setIsOpen}:modal){
    const {connect,connectors} = useConnect()
    return (
      <div className="relative">
        <div className="fixed h-screen w-full bg-gray-400/50 top-0" />
        <div className="w-fit h-fit pb-5 pt-8 px-3 bg-white dark:bg-black z-[500] top-1/2 right-1/2 fixed -translate-y-[50%] translate-x-[50%] sm:grid-cols-2 grid gap-3">
            <X
              className="text-black dark:text-white absolute right-4 top-2"
              onClick={setIsOpen}
            />
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => {
                connect({ connector });
                setIsOpen();
              }}
              className="w-fit"
            >
              Connect {connector.id}
            </Button>
          ))}
        </div>
      </div>
    );
}
export default Conneectors