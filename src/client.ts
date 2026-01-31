import { JustPaidOptions, JustPaidClient } from './types';
import { CustomersResource } from './resources/customers';
import { InvoicesResource } from './resources/invoices';
import { UsageResource } from './resources/usage';

export class JustPaid implements JustPaidClient {
    private apiToken: string;
    private baseUrl: string;

    public customers: CustomersResource;
    public invoices: InvoicesResource;
    public usage: UsageResource;

    constructor(options: JustPaidOptions) {
        if (!options.apiToken) {
            throw new Error('API Token is required for JustPaid SDK');
        }
        this.apiToken = options.apiToken;
        this.baseUrl = options.baseUrl || 'https://api.justpaid.io/api/v1';

        this.customers = new CustomersResource(this);
        this.invoices = new InvoicesResource(this);
        this.usage = new UsageResource(this);
    }

    public async request<T>(
        endpoint: string,
        method: string = 'GET',
        body?: any
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json',
            'User-Agent': 'JustPaid-TS-SDK/1.0.0'
        };

        const config: RequestInit = {
            method,
            headers,
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(url, config);

        if (!response.ok) {
            let errorMessage = `JustPaid API Error: ${response.status} ${response.statusText}`;
            try {
                const errorBody = await response.json();
                if (errorBody && errorBody.message) {
                    errorMessage = `JustPaid API Error: ${errorBody.message}`;
                }
            } catch (e) {
                // ignore JSON parse error
            }
            throw new Error(errorMessage);
        }

        // Handle empty responses (e.g. 204 No Content)
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }
}
