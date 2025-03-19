#[starknet::contract]
pub mod Predifi {

    // Cairo imports 
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess
    };
    // oz imports

    // package imports 
    use crate::base::types::{PoolDetails, Pool, Category, Status, UserStake};
    use crate::interfaces::ipredifi::IPredifi;


    #[storage]
    struct Storage {
        pools: Map<u256, PoolDetails>, // pool id to pool details struct
        pool_count: u256, // number of pools available totally
        pool_vote: Map<u256, bool>, // pool id to vote
        user_stakes: Map<ContractAddress, UserStake> // Mapping user -> stake details
    }

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[abi(embed_v0)]
    impl predifi of IPredifi<ContractState> {
        fn create_pool(
            ref self: ContractState,
            poolName: felt252,
            poolType: Pool,
            poolDescription: ByteArray, 
            poolImage: ByteArray,
            poolEventSourceUrl: ByteArray, 
            poolStartTime: u64,
            poolLockTime: u64,
            poolEndTime: u64,
            option1: felt252,
            option2: felt252,
            minBetAmount: u256,
            maxBetAmount: u256,
            creatorFee: u8,
            isPrivate: bool,
            category: Category,
        ) -> bool {
            // Validation checks
            assert!(poolStartTime < poolLockTime, "Start time must be before lock time");
            assert!(poolLockTime < poolEndTime, "Lock time must be before end time");
            assert!(minBetAmount > 0, "Minimum bet must be greater than 0");
            assert!(
                maxBetAmount >= minBetAmount, "Max bet must be greater than or equal to min bet",
            );

           
            true
        }
    }

    #[generate_trait]
    impl Private of PrivateTrait {

    }
}
