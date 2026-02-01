
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

### Contracts

```typescript
const contract = await justpaid.contracts.get('con_123');
console.log(contract.contract_status);
```

### Templates

```typescript
const template = await justpaid.templates.get('tmpl_123');
console.log(template.name);
```

### Billable Metrics

```typescript
const metric = await justpaid.billableMetrics.create({
  name: 'API Calls',
  description: 'Number of API calls made',
  event_name: 'api_call',
  aggregation_type: 0 // 0 for count, 1 for sum, etc.
});
```

### Updating Invoices

```typescript
const updatedInvoice = await justpaid.invoices.update('inv_123', {
  invoice_status: 'sent',
  due_date: '2024-12-31'
});
```

### Creating Line Items

```typescript
const lineItem = await justpaid.invoices.createLineItem('inv_123', {
  name: 'Extra Seat',
  unit_price: 2000,
  description: 'Additional user seat',
  quantity: 1
});


## TypeScript Support

This package includes TypeScript declarations for the JustPaid API.

## Configuration

The `JustPaid` constructor accepts the following options:

| Option | Type | Description |
| --- | --- | --- |
| `apiToken` | `string` | **Required.** Your JustPaid API Key. |
| `baseUrl` | `string` | Optional. The base URL for the API. Defaults to `https://api.justpaid.io/api/v1`. |


## Integrations

### NestJS

To use `jp-sdk` in a NestJS application, it is recommended to create a global module that exports the client.

**justpaid.module.ts**
```typescript
import { Global, Module, Provider } from '@nestjs/common';
import { JustPaid } from 'jp-sdk';

export const JUSTPAID_CLIENT = 'JUSTPAID_CLIENT';

const justPaidProvider: Provider = {
  provide: JUSTPAID_CLIENT,
  useFactory: () => {
    return new JustPaid({
      apiToken: process.env.JUSTPAID_API_TOKEN,
    });
  },
};

@Global()
@Module({
  providers: [justPaidProvider],
  exports: [justPaidProvider],
})
export class JustPaidModule {}
```

**app.service.ts**
```typescript
import { Inject, Injectable } from '@nestjs/common';
import { JustPaid } from 'jp-sdk';
import { JUSTPAID_CLIENT } from './justpaid.module';

@Injectable()
export class AppService {
  constructor(@Inject(JUSTPAID_CLIENT) private readonly justPaid: JustPaid) {}

  async createCustomer() {
    return this.justPaid.customers.create({
      email: 'nest@example.com',
      name: 'NestJS User',
    });
  }
}
```

### Express.js

In Express.js, you can initialize the client and attach it to the request object or import it directly.

**Using Middleware (Recommended)**

```typescript
import express, { Request, Response, NextFunction } from 'express';
import { JustPaid } from 'jp-sdk';

const app = express();
const justPaid = new JustPaid({ apiToken: process.env.JUSTPAID_API_TOKEN });

// extend Request definition
declare global {
  namespace Express {
    interface Request {
      justPaid: JustPaid;
    }
  }
}

// Middleware to attach client to request
const justPaidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.justPaid = justPaid;
  next();
};

app.use(justPaidMiddleware);

app.post('/signup', async (req: Request, res: Response) => {
  try {
    const customer = await req.justPaid.customers.create({
        email: req.body.email,
        name: req.body.name 
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```
