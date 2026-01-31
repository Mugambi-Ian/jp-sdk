import { JustPaidClient } from '../types';
import { Customer, CreateCustomerParams, UpdateCustomerParams } from '../types';

export class CustomersResource {
    private client: JustPaidClient;

    constructor(client: JustPaidClient) {
        this.client = client;
    }

    public async create(params: CreateCustomerParams): Promise<Customer> {
        return this.client.request<Customer>('/customer/create', 'POST', params);
    }

    public async get(customerId: string): Promise<Customer> {
        return this.client.request<Customer>(`/customer/${customerId}`, 'GET');
    }

    public async update(customerId: string, params: UpdateCustomerParams): Promise<Customer> {
        return this.client.request<Customer>(`/customer/update`, 'PATCH', {
            ...params,
            customer_id: customerId
        });
    }
}
