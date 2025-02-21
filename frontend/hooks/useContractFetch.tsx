import { useEffect, useState } from "react";
import { useContract, useStarknetCall } from "@starknet-react/core";

interface UseReadContractProps {
  abi: any;
  functionName: string;
  address: `0x${string}`;
  args?: any[];
}

export function useReadContract({
  abi,
  functionName,
  address: contractAddress,
  args = [],
}: UseReadContractProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const { contract } = useContract({ abi, address: contractAddress });

  const {
    data: contractData,
    loading: callLoading,
    error: callError,
    refetch,
  } = useStarknetCall({
    contract,
    method: functionName,
    args: args.length > 0 ? args : [],
  });

  useEffect(() => {
    setIsLoading(callLoading);
    setIsFetching(callLoading);
    if (contractData) {
      setData(contractData);
    }
    if (callError) {
      setError(callError);
    }
  }, [contractData, callLoading, callError]);

  return { data, isLoading, refetch, isFetching, error };
}
