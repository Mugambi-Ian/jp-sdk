import { JustPaidClient } from '../types';
import { UsageIngestResponse, UsageEvent } from '../types';

export class UsageResource {
    private client: JustPaidClient;

    constructor(client: JustPaidClient) {
        this.client = client;
    }

    public async ingest(events: UsageEvent | UsageEvent[]): Promise<UsageIngestResponse> {
        const payload = Array.isArray(events) ? events : [events];
        return this.client.request<UsageIngestResponse>('/usage/ingest', 'POST', payload);
    }
}
