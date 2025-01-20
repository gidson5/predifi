"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import Image from "next/image";
import { creatorInputs } from "@/type/type";
import { DateInput } from "./components/inputs";
import { useAccount, useReadContract } from "@starknet-react/core";
import { abi } from "@/lib/abi";
import { useCreatePool } from "@/hooks/use-create-pool";
import CreatePoolModal from "./components/create-pool-modal";
import { prediFiContract, predifiContractAddress, sendFn } from "@/lib/send-fn";
import Loading from "@/components/loading-spinner";

function CreatePoolForm() {
  const [image, setImage] = useState<null | string>(null);
  const [startDate, setStartDate] = useState<number>();
  const [lockDate, setLockDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register, handleSubmit, watch, control } = useForm<creatorInputs>();
  const poolDemoImage = watch("poolImage");
  const poolStart = watch("startDate");
  const poolLock = watch("lockTime");
  const poolEnd = watch("endTime");
  const poolName = watch("name");
  const poolType = watch("betType");
  const poolDetail = watch("description");
  const poolUrl = watch("eventDetailsUrl");
  const poolOptionA = watch("optionOne");
  const poolOptionB = watch("optionTwo");
  const poolMin = watch("minBetAmount");
  const poolMax = watch("maxBetAmount");
  const poolCreatorFee = watch("creatorsFee");
  //const poolshare = watch("privacy");
  const poolCategory = watch("category");

  const { data: allPools, isLoading } = useReadContract({
    abi: abi,
    functionName: "get_all_pools",
    address: predifiContractAddress,
    args: [],
  });
  console.log(allPools);
  const onSubmit: SubmitHandler<creatorInputs> = (data) => {
    console.log(startDate, endDate, lockDate, data);
    setIsOpen(true);
  };

  useCreatePool({
    poolDemoImage,
    poolEnd,
    poolStart,
    poolLock,
    setEndDate,
    setLockDate,
    setImage,
    setStartDate,
  });

  console.log(poolDemoImage);
  const { account } = useAccount();
  if (account) {
    prediFiContract.connect(account);
  }
  async function createPoolFn() {
    const data = {
      poolName,
      poolType,
      poolDetail,
      image: poolDemoImage,
      poolUrl,
      startDate: startDate ?? 0,
      lockDate: lockDate ?? 0,
      endDate: endDate ?? 0,
      poolOptionA,
      poolOptionB,
      account,
      poolMin,
      poolMax,
      poolCreatorFee,
      poolCategory,
    };
    await sendFn(data);
  }

  if (account) {
    prediFiContract.connect(account);
  }
  console.log(isLoading, "loader");
  if (isLoading) return <Loading message="fetting pool data" />;
  return (
    <>
      {isOpen && (
        <CreatePoolModal
          sendFn={createPoolFn}
          modalHandle={() => setIsOpen(false)}
        />
      )}
      <section>
        <h2>Create a pool</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-9">
          <div className="md:grid sm:grid-cols-3 gap-3 flex flex-col-reverse">
            <div className="flex gap-1 flex-col text-base place-self-end w-full order-1 sm:order-none">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="Name"
                className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4 outline-none"
                placeholder="chelsea vs manchester united"
                {...register("name", { required: true })}
              />
            </div>
            <div className="flex gap-1 flex-col place-self-end w-full">
              <label htmlFor="bet-type">Bet type</label>
              <select
                id="bet-type"
                {...register("betType", { required: true })}
                className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-2"
              >
                <option value={0} className="bg-[#373737]">
                  Win Bet
                </option>
                <option value={3} className="bg-[#373737]">
                  Parlay Pool
                </option>
              </select>
            </div>

            <div className="justify-self-end order-2 sm:order-none">
              {image == null && (
                <div className="w-[111px] h-[111px] rounded-full bg-[#373737]" />
              )}
              {image !== null && (
                <Image
                  className="w-[111px] h-[111px] rounded-full object-fill"
                  src={image}
                  alt="pool demo"
                  width={111}
                  height={111}
                />
              )}
              <button className="relative" type="button">
                <span>Add a picture</span>
                <input
                  type="file"
                  className="border opacity-[0] w-full h-full absolute top-0 left-0"
                  accept="image/*"
                  {...register("poolImage", { required: true })}
                />
              </button>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[140px] w-full px-4 py-1 outline-none"
              placeholder="pool description"
              {...register("description", { required: true })}
            />
          </div>
          <div className="w-full">
            <label htmlFor="Event-details-url">Event details URL</label>
            <input
              id="Event-details-url"
              placeholder="pool url"
              {...register("eventDetailsUrl", { required: true })}
              className="border-[#373737] bg-inherit border rounded-[8px] h-[59px] w-full px-4 outline-none"
            />
          </div>
          <div className="sm:grid sm:grid-cols-3 gap-3 flex flex-col">
            <DateInput
              data={{
                name: "startDate",
                control,
              }}
              name="Start-time"
            />
            <DateInput
              data={{
                name: "lockTime",
                control,
              }}
              name="Lock-time"
            />
            <DateInput
              data={{
                name: "endTime",
                control,
              }}
              name="End-time"
            />
          </div>

          <div className="sm:grid sm:grid-cols-3 gap-3 flex flex-col">
            <div className="flex gap-1 flex-col text-base place-self-end w-full">
              <label htmlFor="option-0ne">Option 1</label>
              <input
                type="text"
                id="option-0ne"
                className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] outline-none px-2"
                {...register("optionOne", { required: true })}
              />
            </div>
            <div className="flex gap-1 flex-col place-self-end w-full">
              <label htmlFor="option-two">Option 2</label>
              <input
                type="text"
                id="option-two"
                className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] outline-none px-2"
                {...register("optionTwo", { required: true })}
              />
            </div>
            <div className="flex gap-1 flex-col place-self-end w-full">
              <label htmlFor="category">Category</label>
              <select
                id="categorry"
                {...register("category", { required: true })}
                className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-2 outline-none"
              >
                <option value={0} className="bg-[#373737]">
                  Sport
                </option>
                <option value={1} className="bg-[#373737]">
                  politics
                </option>
                <option value={2} className="bg-[#373737]">
                  Entertainment
                </option>
                <option value={3} className="bg-[#373737]">
                  Crypto
                </option>
                <option value={4} className="bg-[#373737]">
                  others
                </option>
              </select>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 gap-3 flex flex-col">
            <div className="flex gap-1 flex-col text-base place-self-end w-full">
              <label htmlFor="min-bet-amount">Min bet amount</label>
              <input
                type="number"
                {...register("minBetAmount", { required: true })}
                id="min-bet-amount"
                placeholder="pool min stake amount"
                className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4 outline-none"
              />
            </div>
            <div className="flex gap-1 flex-col place-self-end w-full">
              <label htmlFor="max-bet-amount">Max bet amount</label>
              <input
                type="number"
                {...register("maxBetAmount", { required: true })}
                id="max-bet-amount"
                className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4 outline-none"
                placeholder="pool max stake amount"
              />
            </div>
            <div className="flex gap-1 flex-col place-self-end w-full">
              <label htmlFor="creators-fee">Creators fee</label>
              <input
                type="number"
                id="creators-fee"
                {...register("creatorsFee", { required: true, max: 5 })}
                placeholder="max is 5"
                max="5"
                className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4 outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="border-[#373737] text-white rounded-full border w-fit place-self-end p-5 py-2"
          >
            Preview pool
          </button>
        </form>
      </section>
    </>
  );
}
export default CreatePoolForm;
