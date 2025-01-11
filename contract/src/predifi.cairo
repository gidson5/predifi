#[starknet::contract]
pub mod Predfi {
    use starknet::storage::StoragePointerReadAccess;
    use crate::interfaces::ipredifi::iPredifi;
    use crate::base::types::{TrueFalse, PoolDetails};
    use openzeppelin::access::ownable::OwnableComponent;
    use starknet::{ContractAddress, get_tx_info};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use core::traits::Into;


    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }
    #[storage]
    struct Storage {
        // making the contract ownable by someone
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        // a vec to store all the pools
        pools_mapping: Map<u32, PoolDetails>,
        pools_len: u32,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
    }
    #[abi(embed_v0)]
    impl predifi of iPredifi<ContractState> {
        fn create_pool(ref self: ContractState, details: PoolDetails) -> TrueFalse {
            let current_pool_len: u32 = self.pools_len.read();
            let new_pool_len: u32 = current_pool_len + 1;
            self.pools_mapping.write(new_pool_len, details);
            TrueFalse::True
        }
        
        fn get_all_pools(self: @ContractState) -> Array<PoolDetails> {
            let mut pool_array = array![];
            let pools_len = self.pools_len.read();
            let mut i: u32 = 1;
            loop {
                if i > pools_len {
                    break;
                }
                pool_array.append(self.pools_mapping.read(i));
                i += 1;
            };
            pool_array
        }
    }
    #[generate_trait]
    impl Private of PrivateTrait {
        fn assert_pool_values(ref self: ContractState, pool: PoolDetails) {
            // Assert that end time is greater than lock time
            // assert(pool.poolEndTime.try_into() > pool.poolLockTime.try_into(), 'End time must be after lock time');
            
            // Assert that lock time is greater than start time
            assert(pool.poolLockTime.try_into() > pool.poolStartTime.try_into(), 'Lock time must be after start');
            
            // Assert that min bet amount is greater than 0
            assert(pool.minBetAmount > 0, 'Min bet must be greater than 0');
            
            // Assert that max bet amount is greater than min bet amount
            assert(pool.maxBetAmount > pool.minBetAmount, 'Max bet must be greater than min');
            
            // Assert that creator fee is within reasonable range (e.g., 0-100%)
            assert(pool.creatorFee <= 5, 'Creator fee must be 0-100');
            
            // Assert that pool options are not empty
            assert(pool.option1 != 0 , 'Option 1 cannot be empty');
            assert(pool.option2 != 0, 'Option 2 cannot be empty');
            
            // Assert that pool name and description are not empty
            assert(pool.poolName != 0, 'Pool name cannot be empty');
        }
    }
}
