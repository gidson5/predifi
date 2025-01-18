"use client"
import { routes } from "@/lib/route";
import ChevronDown from "@/svg/chevron-down";
import PlusIcon from "@/svg/plus-icon";
import Link from "next/link";
import { useState } from "react";

function DashboardRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen]=useState(false);
  return (
    <>
      <div className="flex justify-between items-center md:border-b md:border-[#373737] mb-12">
        <div className="relative  md:hidden border-[#373737] border rounded-full h-[30px] w-[150px] px-2">
          <select
            name=""
            id=""
            className="border-none bg-inherit w-full absolute z-10 profile-select capitalize"
            onMouseDown={() => setIsOpen((prev) => !prev)}
          >
            <option value="active pool" className="bg-[#373737]">
              active pool
            </option>
            <option value="active pool" className="bg-[#373737]">
              Manage pools
            </option>
            <option value="active pool" className="bg-[#373737]">
              Claiming
            </option>
          </select>
          <span
            className={`${
              isOpen ? "-rotate-180" : "rotate-0"
            } transition-all duration-500 absolute right-3 top-2`}
          >
            <ChevronDown />
          </span>
        </div>
        <div className="hidden justify-between items-center gap-3 md:flex">
          <div className="bg-[#373737] w-[170px] h-[43px] grid place-content-center align-middle rounded-t-full">
            <Link href={routes.dashboard}>Dashboard</Link>
          </div>
          <div className="bg-[#373737] w-[170px] h-[43px] grid place-content-center align-middle rounded-t-full">
            <Link href={routes.profile}>Profile</Link>
          </div>
        </div>
        <Link href={routes.createPool} className="flex gap-3 items-center md:mb-3">
          Create New Pool <PlusIcon />
        </Link>
      </div>
      {children}
    </>
  );
}
export default DashboardRoot;
