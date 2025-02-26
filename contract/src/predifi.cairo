#[starknet::contract]
pub mod Predifi {
    #[storage]
    struct Storage {}

    #[constructor]
    fn constructor() {}


    #[abi(embed_v0)]
    impl predifi of IPredifi<ContractState> {}

    #[generate_trait]
    impl Private of PrivateTrait {}
}
