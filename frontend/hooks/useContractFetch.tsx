import { useReadContract } from "@starknet-react/core";

interface UseReadContractProps {
  abi: any;
  functionName: string;
  address: `0x${string}`;
  args?: string[];
}

export function useCustomReadContract({
  abi,
  functionName,
  address: contractAddress,
  args = [],
}: UseReadContractProps) {
  const { data, isLoading, refetch, isFetching, error } = useReadContract({
    abi: abi,
    functionName: functionName,
    address: contractAddress,
    args: args.length > 0 ? args : [],
  });

  return { data, isLoading, refetch, isFetching, error };
}
