#[starknet::contract]
pub mod Predifi {
    use starknet::storage::StoragePointerWriteAccess;
    use starknet::storage::StoragePointerReadAccess;
    use crate::interfaces::ipredifi::IPredifi;
    use crate::base::{types::{PoolDetails, Status, UserStake, Pool, Category, CategoryType }, errors::Errors};
    use starknet::{
        ContractAddress, get_caller_address, contract_address_const, get_contract_address,
    };
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use core::traits::Into;
    // pragma lib importation
    use pragma_lib::abi::{IRandomnessDispatcher, IRandomnessDispatcherTrait};

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
        // pragma needs
        randomness_contract_address: ContractAddress,
        predifi_token_address: ContractAddress,
        last_random: felt252,
        pending_pools: Map<u32, bool> // Track pools waiting for IDs             
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        strk_address: ContractAddress,
        randomness_contract_address: ContractAddress,
        predifi_token_address: ContractAddress,
    ) {
        self.ownable.initializer(owner);
        self.strk_token.write(strk_address);
        // pragma writng the randomness contract address
        self.randomness_contract_address.write(randomness_contract_address);
        self.predifi_token_address.write(predifi_token_address);
        self.pools_len.write(0);
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
        fn create_pool(
            ref self: ContractState,
            poolName: felt252,
            poolType: Pool,
            poolDescription: ByteArray,
            poolImage: ByteArray,
            poolEventSourceUrl: ByteArray,
            poolStartTime: felt252,
            poolLockTime: felt252,
            poolEndTime: felt252,
            option1: felt252,
            option2: felt252,
            minBetAmount: u8,
            maxBetAmount: u8,
            creatorFee: u8,
            isPrivate: bool,
            category: Category,
        ) -> bool {
            assert(self.assert_pool_values(
                poolName, poolType, poolDescription.clone(), poolImage.clone(), poolEventSourceUrl.clone(),
                poolStartTime, poolLockTime, poolEndTime, option1, option2,
                minBetAmount, maxBetAmount, creatorFee, isPrivate, category
            ), Errors::INVALID_POOL_DETAILS);

            let current_pool_len: u32 = self.pools_len.read();
            let new_pool_len: u32 = current_pool_len + 1;
            self.pools_len.write(new_pool_len);

            let randomness_dispatcher = IRandomnessDispatcher {
                contract_address: self.randomness_contract_address.read(),
            };

            // Configure randomness request
            let seed: u64 = current_pool_len.try_into().unwrap();
            let callback_address = get_contract_address();
            let callback_fee_limit = 100000000000000;
            let publish_delay = 1;
            let num_words = 10;
            let mut calldata = ArrayTrait::<felt252>::new();
            calldata.append(current_pool_len.try_into().unwrap());

            randomness_dispatcher
                .request_random(
                    seed.try_into().unwrap(),
                    callback_address,
                    callback_fee_limit,
                    publish_delay,
                    num_words,
                    calldata,
                );

            let details = PoolDetails {
                pool_id: 0,
                address: get_contract_address(),
                poolName: poolName,
                poolType: poolType,
                poolDescription: poolDescription,
                poolImage: poolImage,
                poolEventSourceUrl: poolEventSourceUrl,
                poolStartTime: poolStartTime,
                poolLockTime: poolLockTime,
                poolEndTime: poolEndTime,
                option1: option1,
                option2: option2,
                minBetAmount: minBetAmount,
                maxBetAmount: maxBetAmount,
                creatorFee: creatorFee,
                status: Status::Active,
                isPrivate: isPrivate,
                category: CategoryType(category),
                totalBetAmountStrk: 0,
                totalBetCount: 0,
                totalStakeOption1: 0,
                totalStakeOption2: 0,
                totalSharesOption1: 0,
                totalSharesOption2: 0,
                initial_share_price: 10000,
            };

            self.pending_pools.write(current_pool_len.try_into().unwrap(), true);
            self.pools_mapping.write(new_pool_len, details);
            // current_pool_len
            true
        }

        fn receive_random_words(
            ref self: ContractState,
            requestor_address: ContractAddress,
            request_id: u64,
            random_words: Span<felt252>,
            calldata: Array<felt252>,
        ) {
            assert(
                get_caller_address() == self.randomness_contract_address.read(), 'Invalid caller',
            );
            let random_word = *random_words.at(0);
            let pool_id_u32: u32 = (request_id % 0x100000000).try_into().unwrap();
            let mut pool = self.pools_mapping.read(pool_id_u32);
            pool.pool_id = random_word.try_into().unwrap();
            self.pools_mapping.write(pool_id_u32, pool);
            self.pending_pools.write(pool_id_u32, false);
        }


        fn vote_in_pool(
            ref self: ContractState, pool_id: u32, amount: u256, option: felt252,
        ) -> bool {
            assert(self.assert_vote_values(pool_id, amount, option), Errors::INVALID_VOTE_DETAILS);
            assert(self.transfer_amount_from_user(amount, get_caller_address()), 'Transfer failed');

            let mut pool = self.pools_mapping.read(pool_id);
            let caller = get_caller_address();
            let shares = calculate_shares(
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

        fn get_pools_by_contract_address(
            self: @ContractState, contract_address: ContractAddress,
        ) -> Array<PoolDetails> {
            let mut pool_array = array![];
            let pool_len = self.pools_len.read();
            let mut i: u32 = 1;

            loop {
                if i > pool_len {
                    break;
                }
                let pool = self.pools_mapping.read(i);
                if pool.address == contract_address {
                    pool_array.append(pool);
                }
                i += 1;
            };
            pool_array
        }
        fn validate_pool(ref self: ContractState, pool_id: u32, option: felt252) -> bool {
            let pool = self.pools_mapping.read(pool_id);
            assert(pool.status == Status::Active, 'Pool is not active');
            assert(option == pool.option1 || option == pool.option2, 'Invalid option');
            let predifi_token = IERC20Dispatcher {
                contract_address: self.predifi_token_address.read(),
            };
            assert(predifi_token.balance_of(get_caller_address()) >= 10000, 'Insufficient tokens');
            // assert()
            true
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
        fn assert_pool_values(
            ref self: ContractState,
            poolName: felt252,
            poolType: Pool,
            poolDescription: ByteArray,
            poolImage: ByteArray,
            poolEventSourceUrl: ByteArray,
            poolStartTime: felt252,
            poolLockTime: felt252,
            poolEndTime: felt252,
            option1: felt252,
            option2: felt252,
            minBetAmount: u8,
            maxBetAmount: u8,
            creatorFee: u8,
            isPrivate: bool,
            category: Category,
        ) -> bool {
            let end_time: u64 = poolEndTime.try_into().unwrap();
            let lock_time: u64 = poolLockTime.try_into().unwrap();
            let start_time: u64 = poolStartTime.try_into().unwrap();

            // Assert that end time is greater than lock time
            assert(end_time > lock_time, 'invalid end time');

            // Assert that lock time is greater than start time
            assert(lock_time > start_time, 'invalid_lock_time');

            // Assert that min bet amount is greater than 0
            assert(minBetAmount > 0, 'invalid min bet');

            // Assert that max bet amount is greater than min bet amount
            assert(maxBetAmount > minBetAmount, 'max must be greater than min');

            // Assert that creator fee is within reasonable range (e.g., 0-5%)
            assert(creatorFee <= 5, 'Creator fee must be 0-5%');

            // Assert that pool options are not empty
            assert(option1 != 0, 'Option 1 cannot be empty');
            assert(option2 != 0, 'Option 2 cannot be empty');

            // Assert that pool name and description are not empty
            assert(poolName != 0, 'Pool name cannot be empty');
            assert(poolDescription.len() > 0, 'Pool description invalid');
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
