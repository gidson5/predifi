 
 #[starknet::contract]
pub mod Predfi {
    use crate::interfaces::ipredfi::iPredifi;
    use crate::base::types::{Pool, TrueFalse};
    use openzeppelin::access::ownable::OwnableComponent;
    use starknet::ContractAddress;

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
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
    }
    #[abi(embed_v0)]
    impl predifi of iPredifi<ContractState> {
        fn create_pool(ref self: ContractState, details:  Pool) -> TrueFalse {
            // implementation
            TrueFalse::True
        }
      
    }

}
