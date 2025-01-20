use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use starknet::{
    ContractAddress, get_caller_address, get_contract_address, get_block_timestamp,
    contract_address_const,
};
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

pub fn ORACLE_ADDRESS() -> ContractAddress {
    contract_address_const::<0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b>()
}

// #[test]
// #[fork(url: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7", block_number: 996491)]
// fn test_contract_fetches_strk_usd_price_correctly() {
//     let (autoSwappr_contract_address, _, _) = __setup__();
//     let autoswappr_dispatcher = IAutoSwapprDispatcher {
//         contract_address: autoSwappr_contract_address
//     };
//     let (strk_usd_price, decimals) = autoswappr_dispatcher.get_strk_usd_price();
//     println!("The strk/usd price is {} with {} decimals", strk_usd_price, decimals);
// }

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

    let pool_name2: felt252 = 'Test Pool 2'.into();
    let pool_type2: Pool = Pool::WinBet;
    let pool_description2: ByteArray = "random byte array insertions";
    let pool_image2: ByteArray = "random byte array insertions";
    let pool_event_source_url2: ByteArray = "random byte array insertions";
    let pool_start_time2: u64 = 1633024800;
    let pool_lock_time2: u64 = 1633034800;
    let pool_end_time2: u64 = 1633044800;
    let option12: felt252 = 'Option 1'.into();
    let option22: felt252 = 'Option 2'.into();
    let min_bet_amount2: u256 = 100.into();
    let max_bet_amount2: u256 = 1000.into();
    let creator_fee2: u8 = 5;
    let is_private2: bool = false;
    let category2: Category = Category::Sports;

    // create pool
    predifi_instance
        .create_pool(
            pool_name2,
            pool_type2,
            pool_description2,
            pool_image2,
            pool_event_source_url2,
            pool_start_time2,
            pool_lock_time2,
            pool_end_time2,
            option12,
            option22,
            min_bet_amount2,
            max_bet_amount2,
            creator_fee2,
            is_private2,
            category2,
        );

    predifi_instance
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

    // Get all pools
    let all_pools = predifi_instance.get_all_pools();

    // Verify array length
    assert(all_pools.len() == 2, 'Incorrect number of pools');

    // Verify pool details for each pool
    let mut i: u32 = 0;
    loop {
        if i == 2 {
            break;
        }
        let pool = all_pools.at(i);
        let pool_name: felt252 = 'Test Pool 2';
        let option1: felt252 = 'Option 1';
        let option2: felt252 = 'Option 2';
        assert(pool.poolName.into() == @pool_name, 'Pool name mismatch');
        assert(pool.option1.into() == @option1, 'Option 1 mismatch');
        assert(pool.option2.into() == @option2, 'Option 2 mismatch');
        i += 1;
    };
}
