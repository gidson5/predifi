use crate::base::types::{PoolDetails, Status, Pool};
use starknet::ContractAddress;

#[starknet::interface]
pub trait IPredifi<TContractState> {
    fn create_pool(
        ref self: TContractState,
        poolName: felt252,
        address: starknet::ContractAddress,
        poolType: Pool,
        poolDescription: ByteArray,
        poolImage: ByteArray,
        poolEventSourceUrl: ByteArray,
        poolStartTime: felt252,
        poolLockTime: felt252,
        poolEndTime: felt252,
        option1: felt252,
        option2: felt252,
        minBetAmount: u8,
        maxBetAmount: u8,
        creatorFee: u8,
        status: Status,
        isPrivate: bool,
        category: felt252,
    ) -> bool;
    fn get_all_pools(self: @TContractState) -> Array<PoolDetails>;
    fn upgrade(ref self: TContractState, new_class_hash: starknet::class_hash::ClassHash);
    fn get_active_pools(self: @TContractState) -> Array<PoolDetails>;
    fn vote_in_pool(ref self: TContractState, pool_id: u32, amount: u256, option: felt252) -> bool;
    fn get_locked_pools(self: @TContractState) -> Array<PoolDetails>;
    fn get_closed_pools(self: @TContractState) -> Array<PoolDetails>;
    fn receive_random_words(
        ref self: TContractState,
        requestor_address: ContractAddress,
        request_id: u64,
        random_words: Span<felt252>,
        calldata: Array<felt252>,
    );
    // fn get_pools_by_contract_address(self: @TContractState, contract_address: ContractAddress) ->
    // Array<PoolDetails>;
    // many other get functions, get wins, get losses get total bet, more storage like that, a
    // struct that has all info about the user, current pools hes active on, and many other things
    // like that @martinvibes issue for you
    fn get_pools_by_contract_address(
        self: @TContractState, contract_address: ContractAddress,
    ) -> Array<PoolDetails>;
    // many other get functions, get wins, get losses get total bet, more storage like that, a
// struct that has all info about the user, current pools hes active on, and many other things
// like that @martinvibes issue for you
}
