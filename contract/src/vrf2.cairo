use starknet::ContractAddress;

#[starknet::interface]
trait IMyContract<TContractState> {
    fn create_new_entry(ref self: TContractState, data: felt252 // Whatever data you want to store
    );
    fn get_entry(self: @TContractState, id: felt252) -> felt252;
    fn receive_random_words(
        ref self: TContractState,
        requestor_address: ContractAddress,
        request_id: u64,
        random_words: Span<felt252>,
        calldata: Array<felt252>,
    );
}

#[starknet::contract]
mod MyContract {
    use starknet::storage::StorageMapReadAccess;
    use starknet::storage::StorageMapWriteAccess;
    use starknet::storage::StoragePointerReadAccess;
    use starknet::storage::{StoragePointerWriteAccess, Map};
    use super::{ContractAddress, IMyContract};
    use starknet::{get_block_number, get_caller_address, get_contract_address};
    use pragma_lib::abi::{IRandomnessDispatcher, IRandomnessDispatcherTrait};
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};

    use core::array::{ArrayTrait, SpanTrait};
    use core::traits::{TryInto, Into};

    #[storage]
    struct Storage {
        // Pragma randomness contract address
        randomness_contract_address: ContractAddress,
        // Mapping to store our data
        entries: Map<felt252, felt252>,
        // Store pending data until we receive randomness
        pending_data: Map<u64, felt252>,
        // Track the last request ID for debugging
        last_request_id: u64,
    }

    #[constructor]
    fn constructor(ref self: ContractState, randomness_contract_address: ContractAddress) {
        self.randomness_contract_address.write(randomness_contract_address);
    }

    #[external(v0)]
    impl MyContractImpl of IMyContract<ContractState> {
        fn create_new_entry(ref self: ContractState, data: felt252) {
            // Setup the randomness dispatcher
            let randomness_contract = self.randomness_contract_address.read();
            let randomness_dispatcher = IRandomnessDispatcher {
                contract_address: randomness_contract,
            };

            // Calculate fees
            let caller = get_caller_address();
            let compute_fees = randomness_dispatcher.compute_premium_fee(caller);
            let callback_fee_limit: u128 = 1000000000000000; // Adjust based on your needs

            // Approve ETH transfer for fees
            let eth_address: ContractAddress =
                0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                .try_into()
                .unwrap();
            let eth_dispatcher = IERC20Dispatcher { contract_address: eth_address };
            eth_dispatcher
                .approve(
                    randomness_contract,
                    (callback_fee_limit + compute_fees + callback_fee_limit / 5).into(),
                );

            // Request randomness
            let seed: felt252 = get_block_number().into(); // Using block number as seed
            let request_id = randomness_dispatcher
                .request_random(
                    seed.try_into().unwrap(),
                    get_contract_address(), // callback to this contract
                    callback_fee_limit,
                    1_u64, // minimum delay of 1 block
                    1_u64, // we only need one random number
                    ArrayTrait::new() // no extra calldata needed
                );

            // Store the data temporarily with the request ID
            self.pending_data.write(request_id, data);
            self.last_request_id.write(request_id);
        }

        fn get_entry(self: @ContractState, id: felt252) -> felt252 {
            self.entries.read(id)
        }

        fn receive_random_words(
            ref self: ContractState,
            requestor_address: ContractAddress,
            request_id: u64,
            random_words: Span<felt252>,
            calldata: Array<felt252>,
        ) {
            // Verify caller is Pragma's contract
            let caller = get_caller_address();
            assert(caller == self.randomness_contract_address.read(), 'Invalid caller');

            // Get the random number and pending data
            let random_id = *random_words.at(0);
            let data = self.pending_data.read(request_id);

            // Store the data with the random ID
            self.entries.write(random_id, data);

            // Clean up (optional)
            self.pending_data.write(request_id, 0);
        }
    }
}
