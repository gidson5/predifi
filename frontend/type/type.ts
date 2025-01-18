import { Moment } from "moment";
import { AccountInterface } from "starknet";

export type modal = {
  setIsOpen: () => void;
};

export type poolModal ={
  modalHandle:()=>void;
  sendFn:()=>void;
}

export interface creatorInputs{
  name: string;
  betType: number;
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
  status:number,
  category:number
};

export interface creatoHook {
  poolDemoImage: string;
  poolEnd: Moment | string;
  poolStart: Moment | string;
  poolLock: Moment | string;
  setEndDate: (x: number) => void;
  setLockDate: (x: number) => void;
  setImage: (x: null| string) => void;
  setStartDate: (x: number) => void;
}

export type sendFnType = {
  account: AccountInterface | undefined;
  endDate: number ;
  lockDate: number ;
  startDate: number;
  poolName:string;
  poolType:number;
  poolDetail:string;
  image:FileList | string | File;
  poolUrl:string;
  poolOptionA:string;
  poolOptionB:string;
  poolMin:number;
  poolMax:number;
  poolCreatorFee:number;
  poolCategory:number;
}; 