"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import Image from "next/image";

type Inputs = {
  name: string;
  betType: string;
  description: string;
  eventDetailsUrl: string;
  startDate: Moment | string;
  lockTime: string;
  endTime: string;
  minBetAmount: number;
  maxBetAmount: number;
  creatorsFee: number;
  optionOne: string;
  optionTwo: string;
  poolImage:string;
};

function CreatePoolForm() {
  
   const [image, setImage] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    //formState: { errors },
  } = useForm<Inputs>();
  const poolDemoImage = watch("poolImage");
  console.log(poolDemoImage)
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { startDate} = data;
   
    // Check if the value is a valid Moment object
    if (moment.isMoment(startDate)) {
      console.log(
        "Selected Date and Time:",
        startDate.format("YYYY-MM-DD HH:mm:ss")
      );
    } else {
      console.error("Invalid date input:", startDate);
    }
    console.log("submit");
  };
  const inputProps = {
    placeholder: "date/time",
    className:
      " text-[#fff] border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4 w-full",
  };
  // Define a function to disable past dates
  const validDate = (current: Moment) => {
    // Allow only dates and times in the future
    return current.isSameOrAfter(moment(),"date");
  };


  useEffect(()=>{
    if (poolDemoImage !== undefined) {
      // setImage(URL.createObjectURL(poolDemoImage[0]));
      setImage('')
    }
  },[poolDemoImage])

  return (
    <section>
      <h2>Create a pool</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-9">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-1 flex-col text-base place-self-end w-full">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px]"
              placeholder="chelsea vs manchester united"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="bet-type">Bet type</label>
            <select
              id="bet-type"
              {...register("betType", { required: true })}
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px]"
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
            {image !== null && <Image className="w-[111px] h-[111px] rounded-full object-fill" src={image} alt="pool demo" width={111} height={111} />}
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
            className="border-[#373737] bg-inherit border rounded-[8px] h-[140px] w-full"
            {...register("description", { required: true })}
          />
        </div>
        <div className="w-full">
          <label htmlFor="Event-details-url">Event details URL</label>
          <input
            id="Event-details-url"
            {...register("eventDetailsUrl", { required: true })}
            className="border-[#373737] bg-inherit border rounded-[8px] h-[59px] w-full"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-1 flex-col text-base place-self-end w-full">
            <label htmlFor="Start-time">Start time</label>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Date and time are required" }}
              render={({ field }) => (
                <>
                  <Datetime
                    {...field}
                    inputProps={inputProps}
                    className=" text-[#373737] w-full"
                    isValidDate={validDate}
                    onChange={(date) => field.onChange(date)}
                  />
                  {/* {fieldState.error && (
                    <span style={{ color: "red" }}>
                      {fieldState.error.message}
                    </span>
                  )} */}
                </>
              )}
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="Lock-time">Lock time</label>
            <Controller
              name="lockTime"
              control={control}
              rules={{ required: "Date and time are required" }}
              render={({ field }) => (
                <>
                  <Datetime
                    {...field}
                    inputProps={inputProps}
                    className=" text-[#373737] w-full"
                    isValidDate={validDate}
                    onChange={(date) => field.onChange(date)}
                  />
                  {/* {fieldState.error && (
                    <span style={{ color: "red" }}>
                      {fieldState.error.message}
                    </span>
                  )} */}
                </>
              )}
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="End-time">End time</label>
            <Controller
              name="endTime"
              control={control}
              rules={{ required: "Date and time are required" }}
              render={({ field }) => (
                <>
                  <Datetime
                    {...field}
                    inputProps={inputProps}
                    className=" text-[#373737] w-full"
                    isValidDate={validDate}
                    onChange={(date) => field.onChange(date)}
                  />
                  {/* {fieldState.error && (
                    <span style={{ color: "red" }}>
                      {fieldState.error.message}
                    </span>
                  )} */}
                </>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-1 flex-col text-base place-self-end w-full">
            <label htmlFor="option-0ne">Option 1</label>
            <input
              type="text"
              id="option-0ne"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px]"
              {...register("optionOne", { required: true })}
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="option-two">Option 2</label>
            <input
              type="text"
              id="option-two"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px]"
              {...register("optionTwo", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-1 flex-col text-base place-self-end w-full">
            <label htmlFor="min-bet-amount">Min bet amount</label>
            <input
              type="number"
              {...register("minBetAmount", { required: true })}
              id="min-bet-amount"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4"
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="max-bet-amount">Max bet amount</label>
            <input
              type="number"
              {...register("maxBetAmount", { required: true })}
              id="max-bet-amount"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4"
            />
          </div>
          <div className="flex gap-1 flex-col place-self-end w-full">
            <label htmlFor="creators-fee">Creators fee</label>
            <input
              type="number"
              id="creators-fee"
              {...register("creatorsFee", { required: true })}
              placeholder="5"
              max="5"
              className="border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4"
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
