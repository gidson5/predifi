use crate::base::types::{TrueFalse, PoolDetails};
use starknet::ContractAddress;   
use starknet::{
    syscalls::deploy_syscall, SyscallResultTrait, syscalls, class_hash::class_hash_const, ClassHash
};


#[starknet::interface]
pub trait iPredifi<TContractState> {
    fn create_pool(ref self: TContractState, details: PoolDetails) -> TrueFalse;
    fn get_all_pools(self: @TContractState) -> Array<PoolDetails>;
    fn upgrade(ref self: TContractState, new_class_hash: ClassHash);
}
