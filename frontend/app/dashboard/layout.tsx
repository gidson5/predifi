import PlusIcon from "@/svg/plus-icon";

function DashoardRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex justify-between items-center border-b">
        <div className="flex justify-between items-center gap-3">
          <div className="dark:bg-[#373737] w-[170px] h-[43px] grid place-content-center align-middle rounded-t-full">
            <span>Dashboard</span>
          </div>
          <div className="dark:bg-[#373737] w-[170px] h-[43px] grid place-content-center align-middle rounded-t-full">
            <span>Profile</span>
          </div>
        </div>
        <button className="flex gap-3 items-center mb-3">
          Create New Pool <PlusIcon />{" "}
        </button>
      </div>
      {children}
    </section>
  );
}
export default DashoardRoot;
