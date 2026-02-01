import { JustPaidClient } from '../types';
import { BillableMetric, CreateBillableMetricParams } from '../types';

export class BillableMetricsResource {
    private client: JustPaidClient;

    constructor(client: JustPaidClient) {
        this.client = client;
    }

    public async create(params: CreateBillableMetricParams): Promise<BillableMetric> {
        return this.client.request<BillableMetric>('/usage/billable_metrics/create', 'POST', params);
    }
}
