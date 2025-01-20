import { Moment } from "moment";
import { AccountInterface } from "starknet";

export type modal = {
  setIsOpen: () => void;
};

// type data = {
//   poolName: string;
//   poolType: string;
//   poolDetail: number;
//   image: number;
//   poolUrl: string;
//   startDate: Moment | string;
//   lockDate: string;
//   endDate: string;
//   poolOptionA: string;
//   poolOptionB: string;
//   account: string;
//   poolMin: number;
//   poolMax: number;
//   poolCreatorFee: string;
//   poolCategory: number;
// };

export interface poolModal {
  modalHandle:()=>void,
  sendFn:()=>void,
  data:sendFnType
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

export interface poolData {
  name: string;
  detail: string;
  createAt: string;
  creatorFee: string;
  isPrivate: boolean;
  initialPrice: string;
  maxAmount: string;
  minAmount: string;
  option1: string;
  option2: string;
  startTime: string;
  lockTime: string;
  endTime: string;
  image: string;
  id: string;
  //status: string;
  //category: string;
  poolUrl: string;
  totalBetAmountStrk: string;
  totalBetCount: string;
  totalShareOption1: string;
  totalShareOption2: string;
  totalStakeOption1: string;
  totalStakeOption2: string;
}
