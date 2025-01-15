#[starknet::contract]
pub mod Predifi {
    use starknet::storage::StoragePointerWriteAccess;
    use starknet::storage::StoragePointerReadAccess;
    use crate::interfaces::ipredifi::IPredifi;
    use crate::base::{types::{PoolDetails, Status, UserStake}, errors::Errors};
    use starknet::{
        ContractAddress, get_caller_address, contract_address_const, get_contract_address,
    };
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use core::traits::Into;


    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::upgrades::UpgradeableComponent;

    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
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
        poolStakeData: Map<(u32, ContractAddress), UserStake>,
        // this is for the pool, the pool id the user that staked and the amount he staked
        pools_len: u32,
        strk_token: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, strk_address: ContractAddress) {
        self.ownable.initializer(owner);
        self.strk_token.write(strk_address);
    }
    fn calculate_shares(
        total_amount: u256, new_amount: u256, total_shares: u256, initial_share_price: u16,
    ) -> u256 {
        if total_amount == 0 {
            return (new_amount * 10000) / (initial_share_price.try_into().unwrap());
        }
        (new_amount * total_shares) / total_amount
    }
    #[abi(embed_v0)]
    impl predifi of IPredifi<ContractState> {
        fn create_pool(ref self: ContractState, details: PoolDetails) -> bool {
            assert(self.assert_pool_values(details.clone()), Errors::INVALID_POOL_DETAILS);
            let current_pool_len: u32 = self.pools_len.read();
            let new_pool_len: u32 = current_pool_len + 1;
            self.pools_mapping.write(new_pool_len, details);
            true
        }


        fn vote_in_pool(
            ref self: ContractState, pool_id: u32, amount: u256, option: felt252,
        ) -> bool {
            assert(self.assert_vote_values(pool_id, amount, option), Errors::INVALID_VOTE_DETAILS);
            assert(self.transfer_amount_from_user(amount, get_caller_address()), 'Transfer failed');

            let mut pool = self.pools_mapping.read(pool_id);
            let caller = get_caller_address();
            let shares = 
            calculate_shares(
                    if option == pool.option1 {
                        pool.totalStakeOption1
                    } else {
                        pool.totalStakeOption2
                    },
                    amount,
                    if option == pool.option1 {
                        pool.totalSharesOption1
                    } else {
                        pool.totalSharesOption2
                    },
                    pool.initial_share_price,
                );

            pool.totalBetAmountStrk += amount;
            if option == pool.option1 {
                pool.totalStakeOption1 += amount;
                pool.totalSharesOption1 += shares;
            } else {
                pool.totalStakeOption2 += amount;
                pool.totalSharesOption2 += shares;
            }

            let mut user_stake = UserStake { amount: amount, shares: shares, option: option };
            self.pools_mapping.write(pool_id, pool);
            self.poolStakeData.write((pool_id, caller), user_stake);

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

        fn get_locked_pools(self: @ContractState) -> Array<PoolDetails> {
            let mut pool_array = array![];
            let pools_len = self.pools_len.read();

            let mut i: u32 = 1;
            loop {
                if i > pools_len {
                    break;
                }
                let pool = self.pools_mapping.read(i);
                if pool.status == Status::Locked {
                    pool_array.append(pool);
                }
                i += 1;
            };
            pool_array
        }

        fn get_closed_pools(self: @ContractState) -> Array<PoolDetails> {
            let mut pool_array = array![];
            let pools_len = self.pools_len.read();

            let mut i: u32 = 1;
            loop {
                if i > pools_len {
                    break;
                }
                let pool = self.pools_mapping.read(i);
                if pool.status == Status::Closed {
                    pool_array.append(pool)
                }
                i += 1;
            };
            pool_array
        }
    }

    #[generate_trait]
    impl Private of PrivateTrait {
        fn transfer_amount_from_user(
            ref self: ContractState, amount: u256, user: ContractAddress,
        ) -> bool {
            let caller = get_caller_address();
            let strk_address = self.strk_token.read();
            let strk = IERC20Dispatcher { contract_address: strk_address };
            // Transfer STRK tokens from the caller to this contract
            assert(strk.transfer_from(caller, get_contract_address(), amount), 'Transfer failed');
            true
        }
        fn assert_pool_values(ref self: ContractState, pool: PoolDetails) -> bool {
            let end_time: u64 = pool.poolEndTime.try_into().unwrap();
            let lock_time: u64 = pool.poolLockTime.try_into().unwrap();
            let start_time: u64 = pool.poolStartTime.try_into().unwrap();
            // Assert that end time is greater than lock time
            // assert(end_time > lock_time, 'lock time gresater than end');

            // Assert that lock time is greater than start time
            // assert(start_time > start_time, 'Lock time must be after start');

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
        fn assert_vote_values(
            ref self: ContractState, pool_id: u32, amount: u256, option: felt252,
        ) -> bool {
            let pool = self.pools_mapping.read(pool_id);
            // Assert that pool is active
            assert(pool.status == Status::Active, 'Pool is not active');

            // Assert that amount is greater than 0
            assert(amount > 0, 'Amount must be greater than 0');

            // Assert that option is valid
            assert(option == pool.option1 || option == pool.option2, 'Invalid option');
            true
        }
    }
}
