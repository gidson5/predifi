#[starknet::contract]
pub mod Predfi {
    use starknet::storage::StoragePointerReadAccess;
    use crate::interfaces::ipredifi::iPredifi;
    use crate::base::types::{TrueFalse, PoolDetails};
    use openzeppelin::access::ownable::OwnableComponent;
    use starknet::{ContractAddress, get_tx_info};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};


    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }
    #[storage]
    struct Storage {
        // making the contract ownable by someone
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        // a vec to store all the pools
        pools_mapping: Map<u32, PoolDetails>,
        pools_len: u32,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
    }
    #[abi(embed_v0)]
    impl predifi of iPredifi<ContractState> {
        fn create_pool(ref self: ContractState, details: PoolDetails) -> TrueFalse {
            let tx_info = get_tx_info().unbox();
            let current_pool_len: u32 = self.pools_len.read();
            let new_pool_len: u32 = current_pool_len + 1;
            self.pools_mapping.write(new_pool_len, details);
            TrueFalse::True
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
    }
    #[generate_trait]
    impl Private of PrivateTrait {
        fn assert_pool_values(ref self: ContractState) {}
    }
}
