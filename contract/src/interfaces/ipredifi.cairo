use crate::base::types::{PoolDetails};
use starknet::ContractAddress;

#[starknet::interface]
pub trait iPredifi<TContractState> {
    fn create_pool(ref self: TContractState, details: PoolDetails) -> bool;
    fn get_all_pools(self: @TContractState) -> Array<PoolDetails>;
    // fn get_active_pools(self: @TContractState) -> Array<PoolDetails>;
// fn get_locked_pools(self: @TContractState) -> Array<PoolDetails>;
// fn get_closed_pools(self: @TContractState) -> Array<PoolDetails>;
// fn get_pools_by_contract_address(self: @TContractState, contract_address: ContractAddress) ->
// Array<PoolDetails>;
}
