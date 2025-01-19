"use client"
import { useReadContract } from "@starknet-react/core";
import GameCard from "../../components/game-card";
import { abi } from "@/lib/abi";
import { predifiContractAddress } from "@/lib/send-fn";
import Loading from "@/components/loading-spinner";
import { felt252ToString, formatAmount } from "@/lib/helper";

function Dashboard() {
  const {data:getAllPools,isLoading} = useReadContract({
    abi:abi,
    functionName:"get_all_pools",
    args:[],
    address:predifiContractAddress
  })
    const poolData = getAllPools?.map(data=>{
      return {
        name: felt252ToString(Number(data.poolName)),
        detail: data.poolDescription,
        createAt: formatAmount(Number(data.createdTimeStamp)),
        creatorFee: formatAmount(Number(data.creatorFee)),
        isPrivate: data.isPrivate,
        initialPrice: formatAmount(Number(data.initial_share_price)),
        maxAmount: formatAmount(Number(data.maxBetAmount)),
        minAmount: formatAmount(Number(data.minBetAmount)),
        option1: felt252ToString(Number(data.option1)),
        option2: felt252ToString(Number(data.option2)),
        startTime: formatAmount(Number(data.poolStartTime)),
        lockTime: formatAmount(Number(data.poolLockTime)),
        endTime: formatAmount(Number(data.poolEndTime)),
        image: data.poolImage,
        id: formatAmount(Number(data.pool_id)),
        //status: data.status,
        //category: data.category,
        poolUrl: data.poolEventSourceUrl,
        totalBetAmountStrk: formatAmount(Number(data.totalBetAmountStrk)),
        totalBetCount: formatAmount(Number(data.totalBetCount)),
        totalShareOption1: formatAmount(Number(data.totalSharesOption1)),
        totalShareOption2: formatAmount(Number(data.totalSharesOption2)),
        totalStakeOption1: formatAmount(Number(data.totalStakeOption1)),
        totalStakeOption2: formatAmount(Number(data.totalStakeOption2)),
      };
    })
    if(isLoading) return <Loading message="fetching pool data"/>
  return (
    <section className="flex justify-center md:justify-between gap-y-4 gap-4 items-center flex-wrap">
      {poolData?.map((data,index)=>{
        return <GameCard key={index}  data={data} />;
      })}
    </section>
  );
}
export default Dashboard;
