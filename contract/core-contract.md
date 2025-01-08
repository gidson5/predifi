// SPDX-License-Identifier: MIT
// Core PredFi Smart Contracts

#[starknet::contract]
mod PredictionMarket {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use array::ArrayTrait;
    
    // Storage
    #[storage]
    struct Storage {
        // Pool storage
        pools: LegacyMap::<u256, Pool>,
        pool_count: u256,
        
        // User storage
        user_predictions: LegacyMap::<(u256, ContractAddress), Prediction>,
        user_stakes: LegacyMap::<(u256, ContractAddress), u256>,
        
        // Protocol settings
        min_stake: u256,
        max_stake: u256,
        protocol_fee: u256,
        creator_fee: u256
    }

    // Structs
    #[derive(Drop, Serde)]
    struct Pool {
        id: u256,
        creator: ContractAddress,
        pool_type: u8,            // 1=Win/Loss, 2=Opinion, 3=Over/Under
        end_time: u64,
        validation_type: u8,      // 1=Oracle, 2=Community
        total_stakes: u256,
        status: u8,               // 1=Active, 2=Locked, 3=Settled
        outcome: u8,
        min_stake: u256,
        max_stake: u256
    }

    #[derive(Drop, Serde)]
    struct Prediction {
        pool_id: u256,
        user: ContractAddress,
        prediction: u8,
        stake_amount: u256,
        claimed: bool
    }

    // Events
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PoolCreated: PoolCreated,
        PredictionPlaced: PredictionPlaced,
        PoolSettled: PoolSettled,
        RewardClaimed: RewardClaimed
    }

    #[derive(Drop, starknet::Event)]
    struct PoolCreated {
        pool_id: u256,
        creator: ContractAddress,
        pool_type: u8,
        end_time: u64
    }

    #[derive(Drop, starknet::Event)]
    struct PredictionPlaced {
        pool_id: u256,
        user: ContractAddress,
        prediction: u8,
        stake_amount: u256
    }

    // Constructor
    #[constructor]
    fn constructor(
        ref self: ContractState,
        min_stake: u256,
        max_stake: u256,
        protocol_fee: u256,
        creator_fee: u256
    ) {
        self.min_stake.write(min_stake);
        self.max_stake.write(max_stake);
        self.protocol_fee.write(protocol_fee);
        self.creator_fee.write(creator_fee);
        self.pool_count.write(0);
    }

    // External functions
    #[external(v0)]
    impl PredictionMarket of super::IPredictionMarket {
        // Create new prediction pool
        fn create_pool(
            ref self: ContractState,
            pool_type: u8,
            end_time: u64,
            validation_type: u8,
            min_stake: u256,
            max_stake: u256
        ) -> u256 {
            // Validations
            assert(end_time > starknet::get_block_timestamp(), 'Invalid end time');
            assert(pool_type <= 3, 'Invalid pool type');
            assert(validation_type <= 2, 'Invalid validation type');
            
            let creator = get_caller_address();
            let pool_id = self.pool_count.read() + 1;
            
            // Create pool
            self.pools.write(pool_id, Pool {
                id: pool_id,
                creator,
                pool_type,
                end_time,
                validation_type,
                total_stakes: 0,
                status: 1, // Active
                outcome: 0,
                min_stake,
                max_stake
            });
            
            self.pool_count.write(pool_id);
            
            // Emit event
            self.emit(Event::PoolCreated(PoolCreated {
                pool_id,
                creator,
                pool_type,
                end_time
            }));
            
            pool_id
        }

        // Place prediction
        fn place_prediction(
            ref self: ContractState,
            pool_id: u256,
            prediction: u8,
            stake_amount: u256
        ) {
            let pool = self.pools.read(pool_id);
            let user = get_caller_address();
            
            // Validations
            assert(pool.status == 1, 'Pool not active');
            assert(starknet::get_block_timestamp() < pool.end_time, 'Pool ended');
            assert(stake_amount >= pool.min_stake, 'Stake too low');
            assert(stake_amount <= pool.max_stake, 'Stake too high');
            
            // Record prediction
            self.user_predictions.write(
                (pool_id, user),
                Prediction {
                    pool_id,
                    user,
                    prediction,
                    stake_amount,
                    claimed: false
                }
            );
            
            // Update pool stakes
            self.pools.write(
                pool_id,
                Pool { total_stakes: pool.total_stakes + stake_amount, ..pool }
            );
            
            // Emit event
            self.emit(Event::PredictionPlaced(PredictionPlaced {
                pool_id,
                user,
                prediction,
                stake_amount
            }));
        }

        // Additional functions to be implemented:
        // - settle_pool()
        // - claim_rewards()
        // - get_pool_info()
        // - get_user_predictions()
        // - emergency_stop()
    }
}

// Token Management Contract interface
#[starknet::interface]
trait ITokenManagement {
    fn stake_tokens(ref self: TContractState, amount: u256);
    fn withdraw_tokens(ref self: TContractState, amount: u256);
    fn get_user_balance(self: @TContractState, user: ContractAddress) -> u256;
}

// Oracle Interface
#[starknet::interface]
trait IOracle {
    fn get_outcome(self: @TContractState, pool_id: u256) -> u8;
    fn is_valid_outcome(self: @TContractState, pool_id: u256, outcome: u8) -> bool;
}

// Validator Registry Interface
#[starknet::interface]
trait IValidatorRegistry {
    fn register_validator(ref self: TContractState);
    fn remove_validator(ref self: TContractState);
    fn validate_outcome(ref self: TContractState, pool_id: u256, outcome: u8);
    fn get_validator_status(self: @TContractState, validator: ContractAddress) -> bool;
}