import { JustPaidClient } from '../types';
import { Template } from '../types';

export class TemplatesResource {
    private client: JustPaidClient;

    constructor(client: JustPaidClient) {
        this.client = client;
    }

    public async get(templateId: string): Promise<Template> {
        return this.client.request<Template>(`/template/${templateId}`, 'GET');
    }
}
