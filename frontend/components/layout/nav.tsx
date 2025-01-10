"use client";
import { useState } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { addressSlice } from "@/lib/helper";
import Conneectors from "../connectors";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-provider";
import ChevronDown from "@/svg/chevron-down";

function Nav() {
  const [openModal, setModal] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect({});
  const user = isConnected ? addressSlice(address ?? "") : "Connect Wallet";

  function modalHandler() {
    setModal((prev) => !prev);
  }
  return (
    <>
      {openModal && !isConnected && <Conneectors setIsOpen={modalHandler} />}
      <div className="relative">
        <nav className="flex justify-between items-center pl-5 pr-14 mt-4">
          <h2 className="text-xl font-normal">PrediFi</h2>
          <Button
            className="bg-transparent shadow-none border border-[#373737] text-black dark:text-white"
            onClick={modalHandler}
          >
            {user}
            <span
              className={`${
                openModal ? "-rotate-180" : "rotate-0"
              } transition-all duration-500`}
            >
              <ChevronDown />
            </span>
          </Button>
          {openModal && (
            <Button
              className={`fixed top-16 right-20 transition-all duration-500 ${
                isConnected ? "block" : "hidden"
              }`}
              onClick={() => {
                disconnect();
                setModal((prev) => !prev);
              }}
            >
              Disconnect Wallet
            </Button>
          )}
        </nav>
        <div className="absolute right-4 top-0">
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
export default Nav;
