
# JustPaid Node.js Library

The JustPaid Node.js library provides convenient access to the JustPaid API from applications written in server-side JavaScript.

## Installation

Install the package directly from GitHub:

```sh
npm install github:mugambi-ian/jp-sdk
# or
yarn add github:mugambi-ian/jp-sdk
```


## Usage

 The package needs to be configured with your account's API key, which is available in the [JustPaid Dashboard](https://app.justpaid.io).

```typescript
import { JustPaid } from 'jp-sdk';

const justpaid = new JustPaid({
  apiToken: 'jp_test_...',
});

// Create a customer
const customer = await justpaid.customers.create({
  email: 'customer@example.com',
  name: 'John Doe',
});

console.log(customer.id);
```

### Invoices

```typescript
const invoice = await justpaid.invoices.create({
  customer_id: 'cust_123',
  currency: 'usd',
  items: [
      {
          amount: 1000, // in cents
          description: 'Software Service',
          quantity: 1
      }
  ]
});
```

### Usage Reporting

```typescript
await justpaid.usage.ingest({
  customer_id: 'cust_123',
  meter_id: 'meter_requests',
  amount: 1,
  timestamp: new Date().toISOString() // optional, defaults to now
});
```

## TypeScript Support

This package includes TypeScript declarations for the JustPaid API.

## Configuration

The `JustPaid` constructor accepts the following options:

| Option | Type | Description |
| --- | --- | --- |
| `apiToken` | `string` | **Required.** Your JustPaid API Key. |
| `baseUrl` | `string` | Optional. The base URL for the API. Defaults to `https://api.justpaid.io/api/v1`. |

