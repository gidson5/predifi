#[starknet::contract]
pub mod Predifi {
    use starknet::storage::StoragePointerReadAccess;
    use crate::interfaces::ipredifi::iPredifi;
    use crate::base::{types::{PoolDetails, Status}, errors::Errors};
    use starknet::{ContractAddress};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use core::traits::Into;

    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::upgrades::UpgradeableComponent;
    // use openzeppelin::upgrades::interface::IUpgradeable;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);


    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;


    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event,
    }
    #[storage]
    struct Storage {
        // making the contract ownable by someone
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
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
        fn create_pool(ref self: ContractState, details: PoolDetails) -> bool {
            assert(self.assert_pool_values(details.clone()), Errors::INVALID_POOL_DETAILS);
            let current_pool_len: u32 = self.pools_len.read();
            let new_pool_len: u32 = current_pool_len + 1;
            self.pools_mapping.write(new_pool_len, details);
            true
        }
        fn upgrade(ref self: ContractState, new_class_hash: starknet::class_hash::ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
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
        fn get_active_pools(self: @ContractState) -> Array<PoolDetails> {
            let mut pool_array = array![];
            let pools_len = self.pools_len.read();
            let mut i: u32 = 1;
            loop {
                if i > pools_len {
                    break;
                }
                let pool = self.pools_mapping.read(i);
                if pool.status == Status::Active {
                    pool_array.append(pool);
                }
                i += 1;
            };
            pool_array
        }
    }
    #[generate_trait]
    impl Private of PrivateTrait {
        fn assert_pool_values(ref self: ContractState, pool: PoolDetails) -> bool {
            let end_time: u64 = pool.poolEndTime.try_into().unwrap();
            let lock_time: u64 = pool.poolLockTime.try_into().unwrap();
            let start_time: u64 = pool.poolStartTime.try_into().unwrap();
            // Assert that end time is greater than lock time
            assert(end_time > lock_time, 'lock time gresater than end');

            // Assert that lock time is greater than start time
            assert(start_time > start_time, 'Lock time must be after start');

            // Assert that min bet amount is greater than 0
            assert(pool.minBetAmount > 0, 'Min bet must be greater than 0');

            // Assert that max bet amount is greater than min bet amount
            assert(pool.maxBetAmount > pool.minBetAmount, 'min bet greater than max');

            // Assert that creator fee is within reasonable range (e.g., 0-100%)
            assert(pool.creatorFee <= 5, 'Creator fee must be 0-100');

            // Assert that pool options are not empty
            assert(pool.option1.try_into().unwrap() != 0, 'Option 1 cannot be empty');
            assert(pool.option2.try_into().unwrap() != 0, 'Option 2 cannot be empty');

            // Assert that pool name and description are not empty
            assert(pool.poolName.try_into().unwrap() != 0, 'Pool name cannot be empty');
            true
        }
    }
}
