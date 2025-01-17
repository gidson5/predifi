export const abi = [
  {
    name: "predifi",
    type: "impl",
    interface_name: "contract::interfaces::ipredifi::IPredifi",
  },
  {
    name: "contract::base::types::Pool",
    type: "enum",
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
    name: "core::byte_array::ByteArray",
    type: "struct",
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
    name: "core::integer::u256",
    type: "struct",
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
    name: "core::bool",
    type: "enum",
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
    name: "contract::base::types::Category",
    type: "enum",
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
    name: "contract::base::types::Status",
    type: "enum",
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
    name: "contract::base::types::PoolDetails",
    type: "struct",
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
        name: "poolStartTime",
        type: "core::integer::u256",
      },
      {
        name: "poolLockTime",
        type: "core::integer::u256",
      },
      {
        name: "poolEndTime",
        type: "core::integer::u256",
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
        type: "core::integer::u8",
      },
      {
        name: "maxBetAmount",
        type: "core::integer::u8",
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
        type: "core::felt252",
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
    name: "core::array::Span::<core::felt252>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    name: "contract::interfaces::ipredifi::IPredifi",
    type: "interface",
    items: [
      {
        name: "create_pool",
        type: "function",
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
            type: "core::integer::u256",
          },
          {
            name: "poolLockTime",
            type: "core::integer::u256",
          },
          {
            name: "poolEndTime",
            type: "core::integer::u256",
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
            type: "core::integer::u8",
          },
          {
            name: "maxBetAmount",
            type: "core::integer::u8",
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
        name: "get_all_pools",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "upgrade",
        type: "function",
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
        name: "get_active_pools",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "vote_in_pool",
        type: "function",
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
        name: "get_locked_pools",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_closed_pools",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::base::types::PoolDetails>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "receive_random_words",
        type: "function",
        inputs: [
          {
            name: "requestor_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "request_id",
            type: "core::integer::u64",
          },
          {
            name: "random_words",
            type: "core::array::Span::<core::felt252>",
          },
          {
            name: "calldata",
            type: "core::array::Array::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "validate_pool",
        type: "function",
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
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "get_pools_by_contract_address",
        type: "function",
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
        name: "get_user_wins",
        type: "function",
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
        name: "get_user_losses",
        type: "function",
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
        name: "get_user_total_bets",
        type: "function",
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
    ],
  },
  {
    name: "OwnableImpl",
    type: "impl",
    interface_name: "openzeppelin_access::ownable::interface::IOwnable",
  },
  {
    name: "openzeppelin_access::ownable::interface::IOwnable",
    type: "interface",
    items: [
      {
        name: "owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "transfer_ownership",
        type: "function",
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
        name: "renounce_ownership",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
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
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      },
      {
        kind: "nested",
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
      },
    ],
  },
  {
    kind: "enum",
    name: "contract::predifi::Predifi::Event",
    type: "event",
    variants: [
      {
        kind: "flat",
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      },
      {
        kind: "flat",
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
      },
    ],
  },
] as const;
export const predifiContractAddress =
  "0x05a940eadbffd7d4c920fa42e857215da7791b63168e49fa34fccb621e802299";