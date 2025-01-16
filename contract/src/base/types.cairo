#[derive(Copy, Drop, Serde, PartialEq, starknet::Store, Debug)]
pub enum Pool {
    WinBet,
    VoteBet,
    OverUnderBet,
    ParlayPool,
}

#[derive(Copy, Drop, Serde, PartialEq, Debug, starknet::Store)]
pub enum Status {
    Active,
    Locked,
    Settled,
    Closed,
}

#[derive(Drop, Serde, PartialEq, starknet::Store, Clone)]
pub struct UserStake {
    pub amount: u256,
    pub shares: u256,
    pub option: felt252,
}


fn StatusType(status: Status) -> felt252 {
    match status {
        Status::Active => 'active',
        Status::Locked => 'locked',
        Status::Settled => 'settled',
        Status::Closed => 'closed',
    }
}

fn PoolType(PoolType: Pool) -> felt252 {
    match PoolType {
        Pool::WinBet => 'win bet',
        Pool::VoteBet => 'vote bet',
        Pool::OverUnderBet => 'over under bet',
        Pool::ParlayPool => 'parlay pool',
    }
}

#[derive(Drop, Serde, PartialEq, Debug, starknet::Store, Clone)]
pub struct PoolDetails {
    // basic pool details
    pub pool_id: u256,
    pub address: starknet::ContractAddress,
    pub poolName: felt252,
    pub poolType: Pool,
    pub poolDescription: ByteArray,
    pub poolImage: ByteArray,
    // event url where users can see more event details and verify event
    pub poolEventSourceUrl: ByteArray,
    // pool timings: start time, lock time, end time
    pub poolStartTime: felt252,
    pub poolLockTime: felt252,
    pub poolEndTime: felt252,
    // pool options, the options that users can bet on
    pub option1: felt252,
    pub option2: felt252,
    // betamounts in strk
    pub minBetAmount: u8,
    pub maxBetAmount: u8,
    // the fee that the creator gets
    pub creatorFee: u8,
    pub status: Status,
    pub isPrivate: bool,
    pub category: felt252,
    pub totalBetAmountStrk: u256,
    pub totalBetCount: u8,
    pub totalStakeOption1: u256,
    pub totalStakeOption2: u256,
    pub totalSharesOption1: u256,
    pub totalSharesOption2: u256,
    pub initial_share_price: u16,
}



#[derive(Drop, Serde, PartialEq, Debug, starknet::Store, Clone)]
pub struct PoolDetailsYunus {
    // basic pool details
    pub address: starknet::ContractAddress,
    pub poolName: felt252,
    pub poolType: Pool,
    pub poolDescription: ByteArray,
    pub poolImage: ByteArray,
    // event url where users can see more event details and verify event
    pub poolEventSourceUrl: ByteArray,
    // pool timings: start time, lock time, end time
    pub poolStartTime: felt252,
    pub poolLockTime: felt252,
    pub poolEndTime: felt252,
    // pool options, the options that users can bet on
    pub option1: felt252,
    pub option2: felt252,
    // betamounts in strk
    pub minBetAmount: u8,
    pub maxBetAmount: u8,
    // the fee that the creator gets
    pub creatorFee: u8,
    pub isPrivate: bool,
    pub category: felt252
}
