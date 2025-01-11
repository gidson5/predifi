"use client";
import { useState } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { addressSlice } from "@/lib/helper";
import Conectors from "../conectors";
import { Button } from "../ui/button";
import ChevronDown from "@/svg/chevron-down";
import Link from "next/link";
import { routes } from "@/lib/route";

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
      {openModal && !isConnected && <Conectors setIsOpen={modalHandler} />}
      <div className="relative">
        <nav className="flex justify-between items-center pl-5 pr-14 mt-4">
          <Link href={routes.home} className="text-xl font-normal">
            PrediFi
          </Link>
          <div className="flex justify-between items-center gap-4">
            <h3>Features</h3>
            <h3>How it works</h3>
          </div>
          <Button
            className="bg-transparent shadow-none border border-[#373737] text-white"
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
              className={`fixed top-16 right-20 transition-all duration-500 text-[#FFFFFF] ${
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
      </div>
    </>
  );
}
export default Nav;
