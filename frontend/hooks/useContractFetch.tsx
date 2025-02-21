import { useEffect, useState } from "react";
import { useReadContract } from "@starknet-react/core";

interface UseReadContractProps {
  abi: any;
  functionName: string;
  address: `0x${string}`;
  args?: any[];
}

export function useCustomReadContract({
  abi,
  functionName,
  address: contractAddress,
  args = [],
}: UseReadContractProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { data: contractData, error: callError } = useReadContract({
    abi: abi,
    functionName: functionName,
    address: contractAddress,
    args: args.length > 0 ? args : [],
  });

  // Set the data when the contract data changes

  // add error and refetching also
  useEffect(() => {
    if (callError) {
      setError(callError);
    }
  }, [callError]);
  useEffect(() => {
    if (contractData) {
      setData(contractData);
      setIsLoading(false);
    }
  }, [contractData]);

  return { data, isLoading, isFetching, error };
}
