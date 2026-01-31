import { describe, it, expect, vi } from 'vitest';
import { JustPaid } from '../src/index';

global.fetch = vi.fn();

describe('JustPaid SDK', () => {
    it('should initialize with apiToken', () => {
        const client = new JustPaid({ apiToken: 'test-token' });
        expect(client).toBeDefined();
        expect(client.customers).toBeDefined();
        expect(client.invoices).toBeDefined();
        expect(client.usage).toBeDefined();
    });

    it('should throw error without apiToken', () => {
        expect(() => new JustPaid({ apiToken: '' })).toThrow('API Token is required');
    });

    it('should make requests with correct headers', async () => {
        const client = new JustPaid({ apiToken: 'test-token' });
        const mockResponse = { id: 'cust_123', email: 'test@example.com' };

        // @ts-ignore
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const customer = await client.customers.get('cust_123');

        expect(fetch).toHaveBeenCalledWith(
            'https://api.justpaid.io/api/v1/customer/cust_123',
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer test-token',
                    'Content-Type': 'application/json'
                })
            })
        );
        expect(customer).toEqual(mockResponse);
    });

    it('should create a customer', async () => {
        const client = new JustPaid({ apiToken: 'test-token' });
        const mockResponse = { id: 'cust_new', email: 'new@example.com' };

        // @ts-ignore
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const customer = await client.customers.create({ email: 'new@example.com' });

        expect(fetch).toHaveBeenCalledWith(
            'https://api.justpaid.io/api/v1/customer/create',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ email: 'new@example.com' })
            })
        );
        expect(customer).toEqual(mockResponse);
    });

    it('should create an invoice', async () => {
        const client = new JustPaid({ apiToken: 'test-token' });
        const mockResponse = { id: 'inv_123', amount_due: 1000 };
        const invoiceParams = {
            customer_id: 'cust_123',
            currency: 'usd',
            items: [{ amount: 1000, description: 'Test', quantity: 1 }]
        };

        // @ts-ignore
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const invoice = await client.invoices.create(invoiceParams);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.justpaid.io/api/v1/invoice/create',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(invoiceParams)
            })
        );
        expect(invoice).toEqual(mockResponse);
    });

    it('should ingest usage', async () => {
        const client = new JustPaid({ apiToken: 'test-token' });
        const mockResponse = { success: true, ingested: 1, failed: 0 };
        const usageEvent = {
            customer_id: 'cust_123',
            meter_id: 'meter_1',
            amount: 10
        };

        // @ts-ignore
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const response = await client.usage.ingest(usageEvent);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.justpaid.io/api/v1/usage/ingest',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify([usageEvent])
            })
        );
        expect(response).toEqual(mockResponse);
    });
});
