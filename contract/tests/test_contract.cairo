use starknet::{ContractAddress, contract_address_const, ClassHash};

use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

//use starknet::{ContractAddress, SyscallResultTrait};
//use core::result::ResultTrait;
//use core::byte_array::ByteArray;

use contract::base::types::{PoolDetails, Pool, Status, Category};
use contract::interfaces::ipredifi::{IPredifiDispatcher, IPredifiDispatcherTrait};

fn owner() -> ContractAddress {
    'owner'.try_into().unwrap()
}
fn deploy_predifi() -> IPredifiDispatcher {
    let contract_class = declare("Predifi").unwrap().contract_class();

    let mut calldata = array![];
    owner().serialize(ref calldata);
    let (contract_address, _) = contract_class.deploy(@calldata).unwrap();
    (IPredifiDispatcher { contract_address })
}


// #[test]
fn test_create_pool() {
    let contract = deploy_predifi();
    let result = contract
        .create_pool(
            'Example Pool',
            Pool::WinBet,
            "A simple betting pool",
            "image.png",
            "event.com/details",
            1710000000,
            1710003600,
            1710007200,
            'Team A',
            'Team B',
            100,
            10000,
            5,
            false,
            Category::Sports,
        );

    assert!(result == true, "not created");
}
