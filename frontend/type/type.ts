import { Moment } from "moment";

export type modal = {
  setIsOpen: () => void;
};

type poolType = "win bet" | "vote bet" | "over under bet" | "parlay pool"

type status = "active"| "locked" | "settled" | "closed"

type category = "sport" | "culture" | "politics" | "others"

export interface creatorInputs{
  name: string;
  betType: poolType;
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
  status:status,
  category:category
};