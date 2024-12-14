# Documentation for Indodax API Function in Google Apps Script by Dupandes Milenium

This script provides functionality to interact with the Indodax trading platform using its API. Below is a detailed explanation of the `indodax` function and examples of its usage for different actions.

## Function Overview

```javascript
function indodax(action, type, pair, amount, price, market) { ... }
```

### Parameters:
- **`action`** (String): Specifies the operation to perform (e.g., `getBalance`, `order`, `cancel`, etc.).
- **`type`** (String): Specifies the type of order or asset (e.g., `buy`, `sell`, or the asset symbol for some actions).
- **`pair`** (String): The trading pair (e.g., `btc_idr`, `eth_idr`).
- **`amount`** (Number): Amount for the order (optional for some actions).
- **`price`** (Number): Price for the order (only used for limit orders).
- **`market`** (Boolean): Indicates whether the order is a market order (true) or a limit order (false).

### API Keys:
Update the following variables with your API credentials:
```javascript
const apiKey = "YOUR_API_KEY";
const secretKey = "YOUR_SECRET_KEY";
```

---

## Actions and Examples

### 1. Get Balance
- **Description:** Retrieves the account balance.
- **Action:** `getBalance`
- **Example Usage:**
```javascript
const balances = indodax('getBalance');
console.log(balances);
```
- **Response:** An array of objects containing non-zero balances:
```javascript
[
  { symbol: 'btc', amount: 0.01 },
  { symbol: 'eth', amount: 0.5 }
]
```

---

### 2. Place an Order
- **Description:** Places a buy or sell order.
- **Action:** `order`
- **Required Parameters:** `type`, `pair`, `amount`, `price`, `market`
- **Example Usage:**
  - Market Order:
  ```javascript
  const order = indodax('order', 'buy', 'btc_idr', 100000, '', true);
  console.log(order);
  ```
  - Limit Order:
  ```javascript
  const order = indodax('order', 'sell', 'eth_idr', 0.01, 7500000, false);
  console.log(order);
  ```
- **Response:** Order details from the API.

---

### 3. Cancel an Order
- **Description:** Cancels an open order.
- **Action:** `cancel`
- **Required Parameters:** `type` (order ID)
- **Example Usage:**
```javascript
const result = indodax('cancel', '80872690');
console.log(result);
```
- **Response:** API confirmation of the canceled order.

---

### 4. Get Order History
- **Description:** Retrieves the order history for a specific pair.
- **Action:** `orderHistory`
- **Required Parameters:** `type` (trading pair)
- **Example Usage:**
```javascript
const history = indodax('orderHistory', 'btc_idr');
console.log(history);
```
- **Response:** An array of order history details.

---

### 5. Get Trade History
- **Description:** Retrieves trade history.
- **Action:** `tradeHistory`
- **Required Parameters:** `type` (trading pair), `pair` (optional order ID)
- **Example Usage:**
```javascript
const trades = indodax('tradeHistory', 'btc_idr', '123456');
console.log(trades);
```
- **Response:** Trade history details.

---

### 6. Get Open Orders
- **Description:** Retrieves currently open orders for a pair.
- **Action:** `openOrders`
- **Required Parameters:** `type` (trading pair)
- **Example Usage:**
```javascript
const openOrders = indodax('openOrders', 'btc_idr');
console.log(openOrders);
```
- **Response:** List of open orders.

---

### 7. Get Specific Order Details
- **Description:** Retrieves details of a specific order.
- **Action:** `getOrder`
- **Required Parameters:** `type` (trading pair), `pair` (order ID)
- **Example Usage:**
```javascript
const orderDetails = indodax('getOrder', 'btc_idr', '123456');
console.log(orderDetails);
```
- **Response:** Details of the specified order.

---

## Helper Functions

### `request()`
Handles the API request and processes the response.

### `hmac_sha512(payloadString)`
Generates the HMAC-SHA-512 signature required for API authentication.

### `toQueryString(obj)`
Converts an object to a query string for the API request.

---

## Notes
1. Replace `YOUR_API_KEY` and `YOUR_SECRET_KEY` with your actual API credentials.
2. Ensure the API key has appropriate permissions for the actions you intend to perform.
3. The `requestBody` includes default parameters like `recvWindow` to prevent request expiry.

By using this script, you can automate trading and monitoring tasks on the Indodax platform effectively. Always handle API keys securely and avoid hardcoding them in production environments.

