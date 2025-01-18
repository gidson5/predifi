use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use starknet::{
    ContractAddress, get_caller_address, get_contract_address,
    get_block_timestamp,
};
use core::result::ResultTrait;
use contract::base::{
    types::{
        PoolDetails, Status, UserStake, Pool, Category, ValidatorData,
        ValidateOptions, PoolOdds
    },
    errors::Errors,
};
use contract::interfaces::ipredifi::{IPredifiDispatcher, IPredifiDispatcherTrait};

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

    pub fn predifi_token() -> ContractAddress {
        'predifi_token'.try_into().unwrap()
    }
}


fn deploy_util(contract_name: ByteArray, constructor_calldata: Array<felt252>) -> ContractAddress
{
    let contract = declare(contract_name).unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
    contract_address
}

#[test]
fn contract_deployed_successfully() {
    let mock_randomness_address = deploy_util("MockRandomness", array![]);

    // deploying the student_registry contract
    let mut predifi_call_data: Array<felt252> = array![
        Accounts::owner().into(), 
        Accounts::strkaddress().into(), 
        mock_randomness_address.into(),
        Accounts::predifi_token().into(),
    ];
    let predifi_contract_address: ContractAddress = deploy_util("Predifi", predifi_call_data);
    let predifi_instance = IPredifiDispatcher { contract_address: predifi_contract_address };
}
