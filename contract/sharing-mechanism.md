# Dynamic Share Pricing Mechanism

## Core Concept
Instead of fixed stakes, the system uses a continuous price discovery mechanism where:
- Each outcome starts at 0.5 (50% probability)
- Share prices always sum to 1 (representing 100% probability)
- Price adjusts based on market activity

## Price Discovery Formula
```
For a two-outcome pool:

P(outcome) = X / (X + Y)
where:
X = Liquidity for outcome
Y = Liquidity for opposite outcome

Share Price Movement:
new_price = (current_liquidity + purchase_amount) / (total_liquidity + purchase_amount)
```

## Implementation Details

### 1. Pool Initialization
```cairo
struct Pool {
    outcome_a_liquidity: u256,  // Liquidity for outcome A
    outcome_b_liquidity: u256,  // Liquidity for outcome B
    share_supply_a: u256,      // Total shares issued for A
    share_supply_b: u256,      // Total shares issued for B
    initial_price: u256        // Starting at 0.5 * PRECISION
}
```

### 2. Share Calculation
```cairo
const PRECISION: u256 = 1000000;  // 6 decimal places

fn calculate_shares(
    amount: u256,
    current_price: u256
) -> u256 {
    // Shares = Amount / Current Price
    amount * PRECISION / current_price
}
```

### 3. Price Impact
```cairo
fn calculate_new_price(
    amount: u256,
    current_liquidity: u256,
    total_liquidity: u256
) -> u256 {
    // New price after trade
    (current_liquidity + amount) * PRECISION / (total_liquidity + amount)
}
```

## Advantages

1. **Better Liquidity**
   - Continuous price movement
   - No minimum participation requirement
   - More efficient price discovery

2. **Fair Pricing**
   - Prices reflect market sentiment
   - Automatic adjustment based on volume
   - Built-in slippage protection

3. **Improved User Experience**
   - Users can take any position size
   - Multiple entries allowed
   - Real-time price feedback

4. **Risk Management**
   - Price impact visible before trading
   - Natural market balancing
   - Lower manipulation risk

## Implementation Considerations

1. **Initial Liquidity**
   - Bootstrap with minimum liquidity
   - Consider creator-provided liquidity
   - Implement liquidity mining rewards

2. **Price Boundaries**
   ```
   Minimum Price: 0.01 (1%)
   Maximum Price: 0.99 (99%)
   Buffer: Prevent extreme edge cases
   ```

3. **Share Management**
   ```
   Share Tokens:
   - Fungible tokens representing positions
   - Transferable until event starts
   - Automatically settled at outcome
   ```