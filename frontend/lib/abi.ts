export const abi = [
  {
    type: "impl",
    name: "predifi",
    interface_name: "contract::interfaces::ipredifi::IPredifi",
  },
  {
    type: "enum",
    name: "contract::base::types::Pool",
    variants: [
      {
        name: "WinBet",
        type: "()",
      },
      {
        name: "VoteBet",
        type: "()",
      },
      {
        name: "OverUnderBet",
        type: "()",
      },
      {
        name: "ParlayPool",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "contract::base::types::Category",
    variants: [
      {
        name: "Sports",
        type: "()",
      },
      {
        name: "Politics",
        type: "()",
      },
      {
        name: "Entertainment",
        type: "()",
      },
      {
        name: "Crypto",
        type: "()",
      },
      {
        name: "Other",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "contract::base::types::ValidateOptions",
    variants: [
      {
        name: "Win",
        type: "()",
      },
      {
        name: "Loss",
        type: "()",
      },
      {
        name: "Void",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "contract::base::types::Status",
    variants: [
      {
        name: "Active",
        type: "()",
      },
      {
        name: "Locked",
        type: "()",
      },
      {
        name: "Settled",
        type: "()",
      },
      {
        name: "Closed",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "contract::base::types::PoolDetails",
    members: [
      {
        name: "pool_id",
        type: "core::integer::u256",
      },
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "poolName",
        type: "core::felt252",
      },
      {
        name: "poolType",
        type: "contract::base::types::Pool",
      },
      {
        name: "poolDescription",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "poolImage",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "poolEventSourceUrl",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "createdTimeStamp",
        type: "core::integer::u64",
      },
      {
        name: "poolStartTime",
        type: "core::integer::u64",
      },
      {
        name: "poolLockTime",
        type: "core::integer::u64",
      },
      {
        name: "poolEndTime",
        type: "core::integer::u64",
      },
      {
        name: "option1",
        type: "core::felt252",
      },
      {
        name: "option2",
        type: "core::felt252",
      },
      {
        name: "minBetAmount",
        type: "core::integer::u256",
      },
      {
        name: "maxBetAmount",
        type: "core::integer::u256",
      },
      {
        name: "creatorFee",
        type: "core::integer::u8",
      },
      {
        name: "status",
        type: "contract::base::types::Status",
      },
      {
        name: "isPrivate",
        type: "core::bool",
      },
      {
        name: "category",
        type: "contract::base::types::Category",
      },
      {
        name: "totalBetAmountStrk",
        type: "core::integer::u256",
      },
      {
        name: "totalBetCount",
        type: "core::integer::u8",
      },
      {
        name: "totalStakeOption1",
        type: "core::integer::u256",
      },
      {
        name: "totalStakeOption2",
        type: "core::integer::u256",
      },
      {
        name: "totalSharesOption1",
        type: "core::integer::u256",
      },
      {
        name: "totalSharesOption2",
        type: "core::integer::u256",
      },
      {
        name: "initial_share_price",
        type: "core::integer::u16",
      },
    ],
  },
  {
    type: "struct",
    name: "contract::base::types::PoolOdds",
    members: [
      {
        name: "option1_odds",
        type: "core::integer::u256",
      },
      {
        name: "option2_odds",
        type: "core::integer::u256",
      },
      {
        name: "option1_probability",
        type: "core::integer::u256",
      },
      {
        name: "option2_probability",
        type: "core::integer::u256",
      },
      {
        name: "implied_probability1",
        type: "core::integer::u256",
      },
      {
        name: "implied_probability2",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "interface",
    name: "contract::interfaces::ipredifi::IPredifi",
    items: [
      {
        type: "function",
        name: "create_pool",
        inputs: [
          {
            name: "poolName",
            type: "core::felt252",
          },
          {
            name: "poolType",
            type: "contract::base::types::Pool",
          },
          {
            name: "poolDescription",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "poolImage",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "poolEventSourceUrl",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "poolStartTime",
            type: "core::integer::u64",
          },
          {
            name: "poolLockTime",
            type: "core::integer::u64",
          },
          {
            name: "poolEndTime",
            type: "core::integer::u64",
          },
          {
            name: "option1",
            type: "core::felt252",
          },
          {
            name: "option2",
            type: "core::felt252",
          },
          {
            name: "minBetAmount",
            type: "core::integer::u256",
          },
          {
            name: "maxBetAmount",
            type: "core::integer::u256",
          },
          {
            name: "creatorFee",
            type: "core::integer::u8",
          },
          {
            name: "isPrivate",
            type: "core::bool",
          },
          {
            name: "category",
            type: "contract::base::types::Category",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "validate_pool",
        inputs: [
          {
            name: "pool_id",
            type: "core::integer::u32",
          },
          {
            name: "option",
            type: "contract::base::types::ValidateOptions",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "new_class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_all_pools",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_active_pools",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_locked_pools",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_closed_pools",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_pool_by_id",
        inputs: [
          {
            name: "pool_id",
            type: "core::integer::u32",
          },
        ],
        outputs: [
          {
            type: "contract::base::types::PoolDetails",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_pools_by_contract_address",
        inputs: [
          {
            name: "contract_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_pools_by_category",
        inputs: [
          {
            name: "category",
            type: "contract::base::types::Category",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "vote_in_pool",
        inputs: [
          {
            name: "pool_id",
            type: "core::integer::u32",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
          {
            name: "option",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "claim",
        inputs: [
          {
            name: "pool_id",
            type: "core::integer::u32",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_user_wins",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_user_losses",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_user_total_bets",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_all_pools_user_voted",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_pool_odds",
        inputs: [
          {
            name: "pool_id",
            type: "core::integer::u32",
          },
        ],
        outputs: [
          {
            type: "contract::base::types::PoolOdds",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "calculate_potential_payout",
        inputs: [
          {
            name: "pool_id",
            type: "core::integer::u32",
          },
          {
            name: "stake_amount",
            type: "core::integer::u256",
          },
          {
            name: "option",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_share_price",
        inputs: [
          {
            name: "pool_id",
            type: "core::integer::u32",
          },
          {
            name: "option",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_liquidity_depth",
        inputs: [
          {
            name: "pool_id",
            type: "core::integer::u32",
          },
          {
            name: "price_point",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u256, core::integer::u256)",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "OwnableImpl",
    interface_name: "openzeppelin_access::ownable::interface::IOwnable",
  },
  {
    type: "interface",
    name: "openzeppelin_access::ownable::interface::IOwnable",
    items: [
      {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transfer_ownership",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce_ownership",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "strk_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "randomness_contract_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "predifi_token_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        kind: "nested",
      },
      {
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    kind: "struct",
    members: [
      {
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "contract::predifi::Predifi::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
        kind: "flat",
      },
      {
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
        kind: "flat",
      },
    ],
  },
] as const;