use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address
};

use starknet::{ContractAddress, contract_address_const};
use core::array::ArrayTrait;
use core::traits::TryInto;
use core::result::ResultTrait;
use core::option::OptionTrait;
use core::byte_array::ByteArray;

use contract::base::types::{PoolDetails, Pool, Status};
use contract::interfaces::ipredifi::{IPredifi, IPredifiDispatcher, IPredifiDispatcherTrait};

pub mod Accounts {
    use starknet::ContractAddress;
    use core::traits::TryInto;

    pub fn zero() -> ContractAddress {
        0x0000000000000000000000000000000000000000.try_into().unwrap()
    }

    pub fn owner() -> ContractAddress {
        'owner'.try_into().unwrap()
    }

    pub fn strkaddress() -> ContractAddress {
        'strkaddress'.try_into().unwrap()
    }
    pub fn account2() -> ContractAddress {
        'account2'.try_into().unwrap()
    }
}

fn deploy_util(contract_name: ByteArray, constructor_calldata: Array<felt252>) -> ContractAddress {
    let contract = declare(contract_name).unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
    contract_address
}

#[test]
fn contract_deployed_successfully() {
    // deploying the student_registry contract
    let mut predifi_call_data: Array<felt252> = array![
        Accounts::owner().into(), Accounts::strkaddress().into()
    ];
    let predifi_contract_address: ContractAddress = deploy_util("Predifi", predifi_call_data);
    let predifi_instance = IPredifiDispatcher { contract_address: predifi_contract_address };
}

#[test]
fn create_pool_successfully() {
    let mut predifi_call_data: Array<felt252> = array![
        Accounts::owner().into(), Accounts::strkaddress().into()
    ];
    let predifi_contract_address: ContractAddress = deploy_util("Predifi", predifi_call_data);
    let predifi_instance = IPredifiDispatcher { contract_address: predifi_contract_address };
    let pool_data = PoolDetails {
        address: starknet::contract_address_const::<0x1>(),
        poolName: 'Test Pool',
        poolType: Pool::WinBet,
        poolDescription: "Test Description",
        poolImage: "test.jpg",
        poolEventSourceUrl: "https://test.com",
        poolStartTime: 1700000000,
        poolLockTime: 1700001000,
        poolEndTime: 1700002000,
        option1: 'Team A',
        option2: 'Team B',
        minBetAmount: 1,
        maxBetAmount: 100,
        creatorFee: 5,
        status: Status::Active,
        isPrivate: false,
        category: 'Sports',
        totalBetAmountStrk: 0,
        totalBetCount: 0,
        totalStakeOption1: 0,
        totalStakeOption2: 0,
    };

    let result = predifi_instance.create_pool(pool_data);
    assert_eq!(result, true, "Result is supposed to be true");
}


#[test]
fn get_all_pools_test() {
    let mut predifi_call_data: Array<felt252> = array![
        Accounts::owner().into(), Accounts::strkaddress().into()
    ];
    let predifi_contract_address: ContractAddress = deploy_util("Predifi", predifi_call_data);
    let predifi_instance = IPredifiDispatcher { contract_address: predifi_contract_address };
    let pool_data = PoolDetails {
        address: starknet::contract_address_const::<0x1>(),
        poolName: 'Test Pool',
        poolType: Pool::WinBet,
        poolDescription: "Test Description",
        poolImage: "test.jpg",
        poolEventSourceUrl: "https://test.com",
        poolStartTime: 1700000000,
        poolLockTime: 1700001000,
        poolEndTime: 1700002000,
        option1: 'Team A',
        option2: 'Team B',
        minBetAmount: 1,
        maxBetAmount: 100,
        creatorFee: 5,
        status: Status::Active,
        isPrivate: false,
        category: 'Sports',
        totalBetAmountStrk: 0,
        totalBetCount: 0,
        totalStakeOption1: 0,
        totalStakeOption2: 0,
    };

    let result = predifi_instance.create_pool(pool_data);
    assert_eq!(result, true, "Result is supposed to be true");
    let pools = predifi_instance.get_active_pools();
    // println!("Pools: {:?}", pools);
    // assert_eq!(pools.len(), 1, "Should have one pool");
    let pool = pools.at(0);
    assert_eq!(pool.poolName, 'Test Pool', "Pool name mismatch");
    assert_eq!(pool.poolType, Pool::WinBet, "Pool type mismatch");
    assert_eq!(pool.status, Status::Active, "Pool status mismatch");
    assert_eq!(pool.category, 'Sports', "Category mismatch");
}
