use crate::base::types::{PoolOdds, Pool, Category};

#[starknet::interface]
pub trait IPredifi<TContractState> {
    // Pool Creation and Management
    fn create_pool(
        ref self: TContractState,
        poolName: felt252,
        poolType: Pool,
        poolDescription: ByteArray,
        poolImage: ByteArray,
        poolEventSourceUrl: ByteArray,
        poolStartTime: u64,
        poolLockTime: u64,
        poolEndTime: u64,
        option1: felt252,
        option2: felt252,
        minBetAmount: u256,
        maxBetAmount: u256,
        creatorFee: u8,
        isPrivate: bool,
        category: Category,
    ) -> u256;

    fn pool_count(self: @TContractState) -> u256;
    fn pool_odds(self: @TContractState, pool_id: u256) -> PoolOdds;
}

