#[starknet::interface]
pub trait IPoolActions<TContractState> {
    fn create_pool(
        ref self: TContractState,
        poolName: felt252,
        poolType: Pool,
        poolDescription: ByteArray,
        poolImage: ByteArray,
        poolEventSourceUrl: ByteArray,
        poolStartTime: u256,
        poolLockTime: u256,
        poolEndTime: u256,
        option1: felt252,
        option2: felt252,
        minBetAmount: u8,
        maxBetAmount: u8,
        creatorFee: u8,
        isPrivate: bool,
        category: Category,
    ) -> bool;
    fn vote_in_pool(ref self: TContractState, pool_id: u32, amount: u256, option: felt252) -> bool;
}

