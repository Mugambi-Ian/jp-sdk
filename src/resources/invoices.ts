import { JustPaidClient } from '../types';
import { Invoice, CreateInvoiceParams } from '../types';

export class InvoicesResource {
    private client: JustPaidClient;

    constructor(client: JustPaidClient) {
        this.client = client;
    }

    public async create(params: CreateInvoiceParams): Promise<Invoice> {
        return this.client.request<Invoice>('/invoice/create', 'POST', params);
    }

    public async get(invoiceId: string): Promise<Invoice> {
        return this.client.request<Invoice>(`/invoice/${invoiceId}`, 'GET');
    }

    public async list(): Promise<Invoice[]> {
        return this.client.request<Invoice[]>('/invoice/', 'GET');
    }
}
