          // let randomness_dispatcher = IRandomnessDispatcher {
            //     contract_address: self.randomness_contract_address.read(),
            // };

            // Configure randomness request
            // let seed: u64 = current_pool_len.try_into().unwrap();
            // let callback_address = get_contract_address();
            // let callback_fee_limit = 100000000000000;
            // let publish_delay = 1;
            // let num_words = 10;
            // let mut calldata = ArrayTrait::<felt252>::new();
            // calldata.append(current_pool_len.try_into().unwrap());

            // randomness_dispatcher
            //     .request_random(
            //         seed.try_into().unwrap(),
            //         callback_address,
            //         callback_fee_limit,
            //         publish_delay,
            //         num_words,
            //         calldata,
            //     );
<!-- 
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
    fn receive_random_words(
        ref self: TContractState,
        requestor_address: ContractAddress,
        request_id: u64,
        random_words: Span<felt252>,
        calldata: Array<felt252>,
    );
     -->