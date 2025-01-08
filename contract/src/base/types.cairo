#[derive(Copy, Drop, Serde, PartialEq, starknet::Store)]
pub enum Pool {
    WinBet,
    VoteBet,
    OverUnderBet,
    ParlayPool,
}

#[derive(Copy, Drop, Serde, PartialEq, starknet::Store)]
pub enum TrueFalse {
    True,
    False,
}

fn PoolType(PoolType: Pool) -> felt252 {
    match PoolType {
        Pool::WinBet => 'win bet',
        Pool::VoteBet => 'vote bet',
        Pool::OverUnderBet => 'over under bet',
        Pool::ParlayPool => 'parlay pool',
    }
}

#[derive(Drop, starknet::Store)]
struct PoolDetails {
    // basic pool details
    address: starknet::ContractAddress,
    poolName: felt252,
    poolType: Pool,
    poolDescription: ByteArray,
    // event url where users can see more event details and verify event
    poolEventSourceUrl: felt252,
    // pool timings: start time, lock time, end time
    poolStartTime: felt252,
    poolLockTime: felt252,
    poolEndTime: felt252,
    // pool options, the options that users can bet on
    option1: felt252,
    option2: felt252,
    // betamounts in strk
    minBetAmount: u8,
    maxBetAmount: u8,
    // the fee that the creator gets
    creatorFee: u8,
}