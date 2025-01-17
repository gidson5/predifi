"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { useEffect, useState } from "react";
import Image from "next/image";
import { creatorInputs } from "@/type/type";
import { DateInput } from "./components/inputs";
import { useAccount, useReadContract } from "@starknet-react/core";
import {CallData, Contract, RpcProvider, byteArray, cairo} from "starknet"
import { abi, predifiContractAddress } from "@/lib/abi";

function CreatePoolForm() {
  const [image, setImage] = useState<null | string>(null);
  const [startDate, setStartDate] = useState<number>();
  const [lockDate, setLockDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const {
    register,
    handleSubmit,
    watch,
    control,
    //formState: { errors },
  } = useForm<creatorInputs>();
  const poolDemoImage = watch("poolImage");
  const poolStart = watch("startDate");
  const poolLock = watch("lockTime");
  const poolEnd = watch("endTime");
  console.log(poolDemoImage);
  const {data} = useReadContract({
    abi:abi,
    functionName:"get_all_pools",
    address:predifiContractAddress,
    args:[]
  })
  console.log(data)
  const onSubmit: SubmitHandler<creatorInputs> = (data) => {
    //const { startDate } = data;
    console.log(startDate,endDate,lockDate,data)
  };

  useEffect(() => {
    if (poolDemoImage !== undefined) {
      const fileContent = poolDemoImage[0]; // Example string
      const blob = new Blob([fileContent], { type: "image/*" }); // Create a Blob from the string
      setImage(URL.createObjectURL(blob));
    }
    // Check if the value is a valid Moment object
    if (moment.isMoment(poolStart)) {
      // Math.floor(new Date().getTime() / 1000.0); 
      const date = Math.floor(new Date(poolStart.format("YYYY-MM-DD HH:mm:ss")).getTime());
      setStartDate(+date)
    }
    // Check if the value is a valid Moment object
    if (moment.isMoment(poolLock)) {
      const date = Math.floor(new Date(poolLock.format("YYYY-MM-DD HH:mm:ss")).getDate());
      setLockDate(+date)
    }
    // Check if the value is a valid Moment object
    if (moment.isMoment(poolEnd)) {
      const date = Math.floor(new Date(poolEnd.format("YYYY-MM-DD HH:mm:ss")).getDate());
      setEndDate(date);
    }
  }, [poolDemoImage,poolEnd,poolLock,poolStart]);
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
  });
  const prediFiContract = new Contract(abi, predifiContractAddress, provider);
  const {account,address} = useAccount()
    if (account) {
      prediFiContract.connect(account);
    }
    async function sendFn() {
      //writeAsync()
      console.log("contract address", address);
      if (account && address) {
        const poolCall = prediFiContract.populate(
          "create_pool",
          CallData.compile([
            "chelsea vs mnchester united",
            0,
            byteArray.byteArrayFromString(
              "derby match beteen chelsea and manchester united at old traford"
            ),
            byteArray.byteArrayFromString(
              "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ),
            byteArray.byteArrayFromString("https://www.livescore.com/en/"),
           cairo.uint256(99995789987654),
          cairo.uint256(19333995789987654),
          cairo.uint256(23339995789987654),
            "chelsea to win",
            "manchester united to lose",
            2,
            4,
            3,
            0,
            2,
          ])
        );
        console.log(poolCall.calldata);
        const response = await prediFiContract?.["create_pool"](
          poolCall.calldata
        );
        console.log(response);
        await provider.waitForTransaction(response?.transaction_hash);
      }
    }
  //console.log(image)
  return (
    <section>
      <h2>Create a pool</h2>
      <button type="button" onClick={sendFn} className="p-3 bg-gray-400">click</button>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-9">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-1 flex-col text-base place-self-end w-full">
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
              <option value="win bet" className="bg-[#373737]">
                win bet
              </option>
              <option value="palour bet" className="bg-[#373737]">
                palour bet
              </option>
            </select>
          </div>
          <div className="justify-self-end">
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
            {...register("description", { required: true })}
          />
        </div>
        <div className="w-full">
          <label htmlFor="Event-details-url">Event details URL</label>
          <input
            id="Event-details-url"
            {...register("eventDetailsUrl", { required: true })}
            className="border-[#373737] bg-inherit border rounded-[8px] h-[59px] w-full px-4 outline-none"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
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
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-1 flex-col text-base place-self-end w-full">
            <label htmlFor="option-0ne">Option 1</label>
            <input
              type="text"
              id="option-0ne"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] outline-none"
              {...register("optionOne", { required: true })}
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="option-two">Option 2</label>
            <input
              type="text"
              id="option-two"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] outline-none"
              {...register("optionTwo", { required: true })}
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="bet-type">Bet type</label>
            <select
              id="bet-type"
              {...register("betType", { required: true })}
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-2 outline-none"
            >
              <option value="sport" className="bg-[#373737]">
                sport
              </option>
              <option value="culture" className="bg-[#373737]">
                culture
              </option>
              <option value="politics" className="bg-[#373737]">
                politics
              </option>
              <option value="others" className="bg-[#373737]">
                others
              </option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-1 flex-col text-base place-self-end w-full">
            <label htmlFor="min-bet-amount">Min bet amount</label>
            <input
              type="number"
              {...register("minBetAmount", { required: true })}
              id="min-bet-amount"
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
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="creators-fee">Creators fee</label>
            <input
              type="number"
              id="creators-fee"
              {...register("creatorsFee", { required: true, max: 5 })}
              placeholder="5"
              //max="5"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4 outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="border-[#373737] text-white rounded-full border w-fit place-self-end p-5 py-2"
        >
          {" "}
          Preview pool
        </button>
      </form>
    </section>
  );
}
export default CreatePoolForm;
