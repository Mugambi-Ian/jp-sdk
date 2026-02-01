import { JustPaidClient } from '../types';
import { Contract } from '../types';

export class ContractsResource {
    private client: JustPaidClient;

    constructor(client: JustPaidClient) {
        this.client = client;
    }

    public async get(contractId: string): Promise<Contract> {
        return this.client.request<Contract>(`/contract/${contractId}`, 'GET');
    }
}
