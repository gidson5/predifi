import { routes } from "@/lib/route";
import PlusIcon from "@/svg/plus-icon";
import Link from "next/link";

function DashboardRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-between items-center border-b border-[#373737] mb-12">
        <div className="flex justify-between items-center gap-3">
          <div className="bg-[#373737] w-[170px] h-[43px] grid place-content-center align-middle rounded-t-full">
            <Link href={routes.dashboard}>Dashboard</Link>
          </div>
          <div className="bg-[#373737] w-[170px] h-[43px] grid place-content-center align-middle rounded-t-full">
            <Link href={routes.profile}>Profile</Link>
          </div>
        </div>
        <Link href={routes.createPool} className="flex gap-3 items-center mb-3">
          Create New Pool <PlusIcon />{" "}
        </Link>
      </div>
      {children}
    </>
  );
}
export default DashboardRoot;
