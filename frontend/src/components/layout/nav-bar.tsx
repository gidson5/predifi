"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import Conneectors from "../connector";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme-toggle";
import { addressSlice } from "@/lib/address-slice";

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
        <nav className="flex justify-between items-center sm:px-20 pl-5 pr-14 mt-4">
          <h1 className="uppercase font-medium">indigo</h1>
          <Button onClick={modalHandler}>
            {user}
            <span>
              <ChevronDown
                className={`${
                  openModal ? "-rotate-180" : "rotate-0"
                } transition-all duration-500`}
              />{" "}
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
