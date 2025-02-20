// #[starknet::contract]
// pub mod Predifi {
//     use starknet::storage::{StoragePointerWriteAccess, StoragePointerReadAccess};
//     use crate::interfaces::ipredifi::IPredifi;
//     use crate::base::{
//         types::{
//             PoolDetails, Status, UserStake, Pool, Category, ValidatorData, ValidateOptions,
//             PoolOdds,
//         },
//         errors::Errors,
//     };
//     use starknet::{ContractAddress, get_caller_address, get_contract_address, get_block_timestamp};
//     use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
//     use core::traits::Into;
//     use openzeppelin::access::ownable::OwnableComponent;
//     use openzeppelin::upgrades::UpgradeableComponent;
//     use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};

//     component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
//     component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

//     #[abi(embed_v0)]
//     impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
//     impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
//     impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

//     use pragma_lib::abi::{IPragmaABIDispatcher, IPragmaABIDispatcherTrait};
//     use pragma_lib::types::{AggregationMode, DataType, PragmaPricesResponse};

//     #[event]
//     #[derive(Drop, starknet::Event)]
//     enum Event {
//         #[flat]
//         OwnableEvent: OwnableComponent::Event,
//         #[flat]
//         UpgradeableEvent: UpgradeableComponent::Event,
//     }

//     #[storage]
//     struct Storage {
//         #[substorage(v0)]
//         ownable: OwnableComponent::Storage,
//         #[substorage(v0)]
//         upgradeable: UpgradeableComponent::Storage,
//         pools_mapping: Map<u32, PoolDetails>,
//         poolStakeData: Map<(u32, ContractAddress), UserStake>,
//         poolResult: Map<u32, ValidateOptions>,
//         pools_len: u32,
//         strk_token: ContractAddress,
//         predifi_token_address: ContractAddress,
//         pending_pools: Map<u32, bool>, // Track pools waiting for IDs   
//         user_wins: Map<ContractAddress, u32>,
//         user_losses: Map<ContractAddress, u32>,
//         user_total_bets: Map<ContractAddress, u32>,
//         validators: Map<ContractAddress, ValidatorData>,
//         get_all_pools_user_voted: Map<ContractAddress, u32>,
//         oracle_address: ContractAddress,
//     }

//     #[constructor]
//     fn constructor(
//         ref self: ContractState,
//         owner: ContractAddress,
//         strk_address: ContractAddress,
//         randomness_contract_address: ContractAddress,
//         predifi_token_address: ContractAddress,
//         oracle_address: ContractAddress,
//     ) {
//         self.ownable.initializer(owner);
//         self.strk_token.write(strk_address);
//         self.predifi_token_address.write(predifi_token_address);
//         self.oracle_address.write(oracle_address);
//         self.pools_len.write(0);
//     }
//     fn calculate_shares(
//         total_amount: u256, new_amount: u256, total_shares: u256, initial_share_price: u16,
//     ) -> u256 {
//         if total_amount == 0 {
//             return (new_amount * 10000) / (initial_share_price.try_into().unwrap());
//         }
//         (new_amount * total_shares) / total_amount
//     }

//     const STRK_KEY: felt252 = 'STRK/USD';

//     #[abi(embed_v0)]
//     impl predifi of IPredifi<ContractState> {
//         fn get_strk_usd_price(self: @ContractState) -> (u128, u32) {
//             self.get_asset_price_median(DataType::SpotEntry(STRK_KEY))
//         }

//         fn create_pool(
//             ref self: ContractState,
//             poolName: felt252,
//             poolType: Pool,
//             poolDescription: ByteArray,
//             poolImage: ByteArray,
//             poolEventSourceUrl: ByteArray,
//             poolStartTime: u64,
//             poolLockTime: u64,
//             poolEndTime: u64,
//             option1: felt252,
//             option2: felt252,
//             minBetAmount: u256,
//             maxBetAmount: u256,
//             creatorFee: u8,
//             isPrivate: bool,
//             category: Category,
//         ) -> bool {
//             assert(
//                 self
//                     .assert_pool_values(
//                         poolName,
//                         poolType,
//                         poolDescription.clone(),
//                         poolImage.clone(),
//                         poolEventSourceUrl.clone(),
//                         poolStartTime,
//                         poolLockTime,
//                         poolEndTime,
//                         option1,
//                         option2,
//                         minBetAmount,
//                         maxBetAmount,
//                         creatorFee,
//                         isPrivate,
//                         category,
//                     ),
//                 Errors::INVALID_POOL_DETAILS,
//             );

//             let current_pool_len: u32 = self.pools_len.read();
//             let new_pool_len: u32 = current_pool_len + 1;
//             self.pools_len.write(new_pool_len);

//             let details = PoolDetails {
//                 pool_id: new_pool_len.try_into().unwrap(),
//                 address: get_contract_address(),
//                 poolName: poolName,
//                 poolType: poolType,
//                 poolDescription: poolDescription,
//                 poolImage: poolImage,
//                 poolEventSourceUrl: poolEventSourceUrl,
//                 createdTimeStamp: get_block_timestamp(),
//                 poolStartTime: poolStartTime,
//                 poolLockTime: poolLockTime,
//                 poolEndTime: poolEndTime,
//                 option1: option1,
//                 option2: option2,
//                 minBetAmount: minBetAmount,
//                 maxBetAmount: maxBetAmount,
//                 creatorFee: creatorFee,
//                 status: Status::Active,
//                 isPrivate: isPrivate,
//                 category: category,
//                 totalBetAmountStrk: 0,
//                 totalBetCount: 0,
//                 totalStakeOption1: 0,
//                 totalStakeOption2: 0,
//                 totalSharesOption1: 0,
//                 totalSharesOption2: 0,
//                 initial_share_price: 10000,
//             };

//             self.pending_pools.write(current_pool_len.try_into().unwrap(), true);
//             self.pools_mapping.write(new_pool_len, details);
//             true
//         }

//         fn get_pool_by_id(self: @ContractState, pool_id: u32) -> PoolDetails {
//             self.pools_mapping.read(pool_id)
//         }


//         fn vote_in_pool(
//             ref self: ContractState, pool_id: u32, amount: u32, option: felt252,
//         ) -> bool {
//             // assert(self.assert_vote_values(pool_id, amount, option),
//             // Errors::INVALID_VOTE_DETAILS);
//             assert(self.transfer_amount_from_user(1000, get_caller_address()), 'Transfer failed');
//             // assert(!self.is_ended(pool_id), Errors::LOCKED_PREDICTION_POOL);

//             // let mut pool = self.pools_mapping.read(pool_id);
//             // let caller = get_caller_address();
//             // let shares = calculate_shares(
//             //     if option == pool.option1 {
//             //         pool.totalStakeOption1
//             //     } else {
//             //         pool.totalStakeOption2
//             //     },
//             //     amount,
//             //     if option == pool.option1 {
//             //         pool.totalSharesOption1
//             //     } else {
//             //         pool.totalSharesOption2
//             //     },
//             //     pool.initial_share_price,
//             // );

//             // pool.totalBetAmountStrk += amount;
//             // if option == pool.option1 {
//             //     pool.totalStakeOption1 += amount;
//             //     pool.totalSharesOption1 += shares;
//             // } else {
//             //     pool.totalStakeOption2 += amount;
//             //     pool.totalSharesOption2 += shares;
//             // }

//             // let mut user_stake = UserStake { amount: amount, shares: shares, option: option };
//             // self.pools_mapping.write(pool_id, pool);
//             // self.poolStakeData.write((pool_id, caller), user_stake);
//             true
//         }

//         fn upgrade(ref self: ContractState, new_class_hash: starknet::class_hash::ClassHash) {
//             self.ownable.assert_only_owner();
//             self.upgradeable.upgrade(new_class_hash);
//         }

//         fn get_all_pools(self: @ContractState) -> Array<PoolDetails> {
//             let mut pool_array = array![];
//             let pools_len = self.pools_len.read();
//             let mut i: u32 = 1;
//             loop {
//                 if i > pools_len {
//                     break;
//                 }
//                 pool_array.append(self.pools_mapping.read(i));
//                 i += 1;
//             };
//             pool_array
//         }

//         fn get_active_pools(self: @ContractState) -> Array<PoolDetails> {
//             let mut pool_array = array![];
//             let pools_len = self.pools_len.read();
//             let mut i: u32 = 1;
//             loop {
//                 if i > pools_len {
//                     break;
//                 }
//                 let pool = self.pools_mapping.read(i);
//                 if pool.status == Status::Active {
//                     pool_array.append(pool);
//                 }
//                 i += 1;
//             };
//             pool_array
//         }

//         fn get_locked_pools(self: @ContractState) -> Array<PoolDetails> {
//             let mut pool_array = array![];
//             let pools_len = self.pools_len.read();

//             let mut i: u32 = 1;
//             loop {
//                 if i > pools_len {
//                     break;
//                 }
//                 let pool = self.pools_mapping.read(i);
//                 if pool.status == Status::Locked {
//                     pool_array.append(pool);
//                 }
//                 i += 1;
//             };
//             pool_array
//         }

//         fn get_closed_pools(self: @ContractState) -> Array<PoolDetails> {
//             let mut pool_array = array![];
//             let pools_len = self.pools_len.read();

//             let mut i: u32 = 1;
//             loop {
//                 if i > pools_len {
//                     break;
//                 }
//                 let pool = self.pools_mapping.read(i);
//                 if pool.status == Status::Closed {
//                     pool_array.append(pool)
//                 }
//                 i += 1;
//             };
//             pool_array
//         }

//         fn get_pools_by_contract_address(
//             self: @ContractState, contract_address: ContractAddress,
//         ) -> Array<PoolDetails> {
//             let mut pool_array = array![];
//             let pool_len = self.pools_len.read();
//             let mut i: u32 = 1;

//             loop {
//                 if i > pool_len {
//                     break;
//                 }
//                 let pool = self.pools_mapping.read(i);
//                 if pool.address == contract_address {
//                     pool_array.append(pool);
//                 }
//                 i += 1;
//             };
//             pool_array
//         }
//         fn get_pools_by_category(self: @ContractState, category: Category) -> Array<PoolDetails> {
//             let mut pool_array = array![];
//             let pool_len = self.pools_len.read();
//             let mut i: u32 = 1;

//             loop {
//                 if i > pool_len {
//                     break;
//                 }
//                 let pool = self.pools_mapping.read(i);
//                 if pool.category == category {
//                     pool_array.append(pool);
//                 }
//                 i += 1;
//             };
//             pool_array
//         }

//         fn get_user_wins(self: @ContractState, user: ContractAddress) -> u32 {
//             self.user_wins.read(user)
//         }

//         fn get_user_losses(self: @ContractState, user: ContractAddress) -> u32 {
//             self.user_losses.read(user)
//         }

//         fn get_user_total_bets(self: @ContractState, user: ContractAddress) -> u32 {
//             self.user_total_bets.read(user)
//         }
//         fn get_all_pools_user_voted(self: @ContractState) -> Array<PoolDetails> {
//             let pool_id_list = self.get_all_pools_user_voted.read(get_caller_address());
//             let mut pool_array = array![];
//             let mut i: u32 = 1;

//             loop {
//                 if i > pool_id_list {
//                     break;
//                 }
//                 let pool = self.pools_mapping.read(i);
//                 pool_array.append(pool);
//                 i += 1;
//             };
//             pool_array
//         }


//         fn validate_pool(ref self: ContractState, pool_id: u32, option: ValidateOptions) -> bool {
//             let pool = self.pools_mapping.read(pool_id);
//             assert(pool.status == Status::Active, 'Pool is not active');
//             // let predifi_token = IERC20Dispatcher {
//             //     contract_address: self.predifi_token_address.read(),
//             // };
//             let validator_data = self.validators.read(get_caller_address());
//             assert(validator_data.preodifiTokenAmount >= 10000, 'not enough tokens to validate');
//             self.poolResult.write(pool_id, option);
//             true
//         }
//         fn claim(ref self: ContractState, pool_id: u32) -> bool {
//             let caller = get_caller_address();
//             let pool = self.pools_mapping.read(pool_id);
//             assert(pool.status == Status::Closed, 'Pool is not closed');

//             let user_stake = self.poolStakeData.read((pool_id, caller));
//             assert(user_stake.amount > 0, 'No stake found');

//             let result = self.poolResult.read(pool_id);
//             let won = user_stake.option == match result {
//                 ValidateOptions::Win => pool.option1,
//                 ValidateOptions::Loss => pool.option2,
//                 ValidateOptions::Void => 'Draw Not Implemented',
//             };

//             let total_shares = if won {
//                 if user_stake.option == pool.option1 {
//                     pool.totalSharesOption1
//                 } else {
//                     pool.totalSharesOption2
//                 }
//             } else {
//                 0
//             };

//             let winning_amount = if won {
//                 let total_pool = pool.totalStakeOption1 + pool.totalStakeOption2;
//                 (total_pool * user_stake.shares) / total_shares
//             } else {
//                 0
//             };

//             if winning_amount > 0 {
//                 let strk = IERC20Dispatcher { contract_address: self.strk_token.read() };
//                 assert(strk.transfer(caller, winning_amount), 'Transfer failed');

//                 let current_wins = self.user_wins.read(caller);
//                 self.user_wins.write(caller, current_wins + 1);
//             } else {
//                 let current_losses = self.user_losses.read(caller);
//                 self.user_losses.write(caller, current_losses + 1);
//             }

//             self
//                 .poolStakeData
//                 .write((pool_id, caller), UserStake { amount: 0, shares: 0, option: 0 });
//             true
//         }
//         fn get_pool_odds(self: @ContractState, pool_id: u32) -> PoolOdds {
//             let pool = self.pools_mapping.read(pool_id);

//             let total_pool = pool.totalStakeOption1 + pool.totalStakeOption2;

//             let (prob1, prob2) = if total_pool == 0 {
//                 (5000, 5000) // 50-50 if no stakes
//             } else {
//                 let prob1 = (pool.totalStakeOption1 * 10000) / total_pool;
//                 (prob1, 10000 - prob1)
//             };

//             let odds1 = if prob1 == 0 {
//                 0
//             } else {
//                 (10000 * 10000) / prob1
//             };
//             let odds2 = if prob2 == 0 {
//                 0
//             } else {
//                 (10000 * 10000) / prob2
//             };

//             let margin = 200;
//             let implied_total = 10000 + margin;
//             let implied_prob1 = (prob1 * implied_total) / 10000;
//             let implied_prob2 = (prob2 * implied_total) / 10000;

//             PoolOdds {
//                 option1_odds: odds1,
//                 option2_odds: odds2,
//                 option1_probability: prob1,
//                 option2_probability: prob2,
//                 implied_probability1: implied_prob1,
//                 implied_probability2: implied_prob2,
//             }
//         }
//         fn calculate_potential_payout(
//             self: @ContractState, pool_id: u32, stake_amount: u256, option: felt252,
//         ) -> u256 {
//             let pool = self.pools_mapping.read(pool_id);
//             let odds = self.get_pool_odds(pool_id);

//             if option == pool.option1 {
//                 (stake_amount * odds.option1_odds) / 10000
//             } else {
//                 (stake_amount * odds.option2_odds) / 10000
//             }
//         }

//         fn get_share_price(self: @ContractState, pool_id: u32, option: felt252) -> u256 {
//             let pool = self.pools_mapping.read(pool_id);

//             if option == pool.option1 {
//                 if pool.totalSharesOption1 == 0 {
//                     pool.initial_share_price.into()
//                 } else {
//                     (pool.totalStakeOption1 * 10000) / pool.totalSharesOption1
//                 }
//             } else {
//                 if pool.totalSharesOption2 == 0 {
//                     pool.initial_share_price.into()
//                 } else {
//                     (pool.totalStakeOption2 * 10000) / pool.totalSharesOption2
//                 }
//             }
//         }

//         fn get_liquidity_depth(
//             self: @ContractState, pool_id: u32, price_point: u256,
//         ) -> (u256, u256) {
//             let pool = self.pools_mapping.read(pool_id);
//             let liquidity_option1 = if pool.totalSharesOption1 == 0 {
//                 0
//             } else {
//                 (pool.totalStakeOption1 * price_point) / 10000
//             };

//             let liquidity_option2 = if pool.totalSharesOption2 == 0 {
//                 0
//             } else {
//                 (pool.totalStakeOption2 * price_point) / 10000
//             };

//             (liquidity_option1, liquidity_option2)
//         }
//     }

//     #[generate_trait]
//     impl Private of PrivateTrait {
//         fn transfer_amount_from_user(
//             ref self: ContractState, amount: u256, user: ContractAddress,
//         ) -> bool {
//             let owner = get_caller_address();
//             let strk_address = self.strk_token.read();
//             let strk = IERC20Dispatcher { contract_address: strk_address };
//             // Transfer STRK tokens from the caller to this contract
//             assert(strk.transfer(owner, amount), 'Transfer failed');
//             true
//         }

//         fn assert_pool_values(
//             ref self: ContractState,
//             poolName: felt252,
//             poolType: Pool,
//             poolDescription: ByteArray,
//             poolImage: ByteArray,
//             poolEventSourceUrl: ByteArray,
//             poolStartTime: u64,
//             poolLockTime: u64,
//             poolEndTime: u64,
//             option1: felt252,
//             option2: felt252,
//             minBetAmount: u256,
//             maxBetAmount: u256,
//             creatorFee: u8,
//             isPrivate: bool,
//             category: Category,
//         ) -> bool {
//             let end_time: u64 = poolEndTime.try_into().unwrap();
//             let lock_time: u64 = poolLockTime.try_into().unwrap();
//             let start_time: u64 = poolStartTime.try_into().unwrap();

//             // Assert that end time is greater than lock time
//             assert(end_time > lock_time, 'invalid end time');

//             // Assert that lock time is greater than start time
//             assert(lock_time > start_time, 'invalid_lock_time');

//             // Assert that min bet amount is greater than 0
//             assert(minBetAmount > 0, 'invalid min bet');

//             // Assert that max bet amount is greater than min bet amount
//             assert(maxBetAmount > minBetAmount, 'max must be greater than min');

//             // Assert that creator fee is within reasonable range (e.g., 0-5%)
//             assert(creatorFee <= 5, 'Creator fee must be 0-5%');

//             // Assert that pool options are not empty
//             assert(option1 != 0, 'Option 1 cannot be empty');
//             assert(option2 != 0, 'Option 2 cannot be empty');

//             // Assert that pool name and description are not empty
//             assert(poolName != 0, 'Pool name cannot be empty');
//             assert(poolDescription.len() > 0, 'Pool description invalid');
//             true
//         }

//         fn assert_vote_values(
//             ref self: ContractState, pool_id: u32, amount: u256, option: felt252,
//         ) -> bool {
//             let pool = self.pools_mapping.read(pool_id);
//             // Assert that pool is active
//             assert(pool.status == Status::Active, 'Pool is not active');

//             // Assert that amount is greater than 0
//             assert(amount > 0, 'Amount must be greater than 0');
//             // Assert that option is valid
//             assert(option == pool.option1 || option == pool.option2, 'Invalid option');
//             true
//         }

//         fn is_ended(ref self: ContractState, pool_id: u32) -> bool {
//             let pool = self.pools_mapping.read(pool_id);
//             let current_time = get_block_timestamp();
//             if pool.poolEndTime < current_time {
//                 return true;
//             }
//             false
//         }

//         fn get_asset_price_median(self: @ContractState, asset: DataType) -> (u128, u32) {
//             let oracle_dispatcher = IPragmaABIDispatcher {
//                 contract_address: self.oracle_address.read(),
//             };
//             let output: PragmaPricesResponse = oracle_dispatcher
//                 .get_data(asset, AggregationMode::Median(()));
//             return (output.price, output.decimals);
//         }
//     }
// }
