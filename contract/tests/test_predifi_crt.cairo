use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use starknet::{ContractAddress, get_caller_address, get_contract_address, get_block_timestamp};
use core::result::ResultTrait;
use contract::base::{
    types::{
        PoolDetails, Status, UserStake, Pool, Category, ValidatorData, ValidateOptions, PoolOdds,
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


fn deploy_util(contract_name: ByteArray, constructor_calldata: Array<felt252>) -> ContractAddress {
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
fn create_test_pool(predifi_instance: IPredifiDispatcher) -> u32 {
    // create pool data
    let pool_name: felt252 = 'Test Pool'.into();
    let pool_type: Pool = Pool::WinBet;
    let pool_description: ByteArray = "random byte array insertions";
    let pool_image: ByteArray = "random byte array insertions";
    let pool_event_source_url: ByteArray = "random byte array insertions";
    let pool_start_time: u64 = 1633024800;
    let pool_lock_time: u64 = 1633034800;
    let pool_end_time: u64 = 1633044800;
    let option1: felt252 = 'Option 1'.into();
    let option2: felt252 = 'Option 2'.into();
    let min_bet_amount: u256 = 100.into();
    let max_bet_amount: u256 = 1000.into();
    let creator_fee: u8 = 5;
    let is_private: bool = false;
    let category: Category = Category::Sports;

    // create pool
    let result = predifi_instance
        .create_pool(
            pool_name,
            pool_type,
            pool_description,
            pool_image,
            pool_event_source_url,
            pool_start_time,
            pool_lock_time,
            pool_end_time,
            option1,
            option2,
            min_bet_amount,
            max_bet_amount,
            creator_fee,
            is_private,
            category,
        );

    assert(result == true, 'Pool creation failed');
    1_u32 // Return pool ID
}

#[test]
fn create_pool_successfully() {
    let mock_randomness_address = deploy_util("MockRandomness", array![]);

    // deploying the predifi contract
    let mut predifi_call_data: Array<felt252> = array![
        Accounts::owner().into(),
        Accounts::strkaddress().into(),
        mock_randomness_address.into(),
        Accounts::predifi_token().into(),
    ];
    let predifi_contract_address: ContractAddress = deploy_util("Predifi", predifi_call_data);
    let predifi_instance = IPredifiDispatcher { contract_address: predifi_contract_address };

    let pool_id = create_test_pool(predifi_instance);
    let pool_details = predifi_instance.get_pool_by_id(pool_id);

    // assertions for pool details
    assert(pool_details.poolName == 'Test Pool'.into(), 'Pool name mismatch');
    assert(pool_details.poolType == Pool::WinBet, 'Pool type mismatch');
    assert(pool_details.poolStartTime == 1633024800, 'Pool start time mismatch');
    assert(pool_details.poolLockTime == 1633034800, 'Pool lock time mismatch');
    assert(pool_details.poolEndTime == 1633044800, 'Pool end time mismatch');
    assert(pool_details.option1 == 'Option 1'.into(), 'Option 1 mismatch');
    assert(pool_details.option2 == 'Option 2'.into(), 'Option 2 mismatch');
    assert(pool_details.minBetAmount == 100.into(), 'Min bet amount mismatch');
    assert(pool_details.maxBetAmount == 1000.into(), 'Max bet amount mismatch');
    assert(pool_details.creatorFee == 5, 'Creator fee mismatch');
    assert(pool_details.isPrivate == false, 'Is private mismatch');
    assert(pool_details.category == Category::Sports, 'Category mismatch');
}


#[test]
fn get_all_pools_successfully() {
    let mock_randomness_address = deploy_util("MockRandomness", array![]);

    let mut predifi_call_data: Array<felt252> = array![
        Accounts::owner().into(),
        Accounts::strkaddress().into(),
        mock_randomness_address.into(),
        Accounts::predifi_token().into(),
    ];
    let predifi_contract_address: ContractAddress = deploy_util("Predifi", predifi_call_data);
    let predifi_instance = IPredifiDispatcher { contract_address: predifi_contract_address };

    // Create 5 pools
    create_test_pool(predifi_instance);
    create_test_pool(predifi_instance);
    create_test_pool(predifi_instance);
    create_test_pool(predifi_instance);
    create_test_pool(predifi_instance);

    // Get all pools
    let all_pools = predifi_instance.get_all_pools();

    // Verify array length
    assert(all_pools.len() == 5_u32, 'Incorrect number of pools');
    let one: u256 = 1;
    let two: u256 = 2;
    let three: u256 = 3;
    let four: u256 = 4;
    let five: u256 = 5;
    // Verify pool IDs are sequential
    assert(all_pools.at(0).pool_id == @one, 'Wrong ID for pool 1');
    assert(all_pools.at(1).pool_id == @two, 'Wrong ID for pool 2');
    assert(all_pools.at(2).pool_id == @three, 'Wrong ID for pool 3');
    assert(all_pools.at(3).pool_id == @four, 'Wrong ID for pool 4');
    assert(all_pools.at(4).pool_id == @five, 'Wrong ID for pool 5');

    // Verify pool details for each pool
    let mut i: u32 = 0;
    loop {
        if i >= 5_u32 {
            break;
        }
        let pool = all_pools.at(i);
        let pool_name: felt252 = 'Test Pool';
        let option1: felt252 = 'Option 1';
        let option2: felt252 = 'Option 2';
        assert(pool.poolName.into() == @pool_name, 'Pool name mismatch');
        assert(pool.option1.into() == @option1, 'Option 1 mismatch');
        assert(pool.option2.into() == @option2, 'Option 2 mismatch');
        i += 1;
    };
}
