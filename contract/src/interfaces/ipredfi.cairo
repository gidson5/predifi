use crate::base::types::{Pool, TrueFalse};

#[starknet::interface]
pub trait iPredifi<TContractState> {
    fn create_pool(ref self: TContractState, details: Pool) -> TrueFalse;
}
