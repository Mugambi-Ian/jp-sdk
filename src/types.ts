
export interface JustPaidOptions {
    apiToken: string;
    baseUrl?: string;
}

export interface JustPaidClient {
    request<T>(endpoint: string, method?: string, body?: any): Promise<T>;
}

export interface Customer {
    id: string;
    email: string;
    name?: string;
    payment_method_id?: string;
    created_at: string;
    updated_at: string;
    [key: string]: any;
}

export interface CreateCustomerParams {
    email: string;
    name?: string;
    source?: string; // payment source token
    address?: {
        line1: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
}

export interface UpdateCustomerParams {
    email?: string;
    name?: string;
    source?: string;
    address?: {
        line1?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
    };
}

export interface Invoice {
    id: string;
    customer_id: string;
    amount_due: number;
    amount_paid: number;
    amount_remaining: number;
    currency: string;
    status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
    created_at: string;
    due_date?: string;
    lines: InvoiceLineItem[];
    [key: string]: any;
}

export interface InvoiceLineItem {
    id: string;
    amount: number;
    description: string;
    quantity?: number;
}

export interface CreateInvoiceParams {
    customer_id: string;
    currency: string;
    due_date?: string;
    items: {
        amount: number;
        description: string;
        quantity?: number;
    }[];
}

export interface UpdateInvoiceParams {
    invoice_status?: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void' | 'sent';
    invoice_date?: string;
    due_date?: string;
    description?: string;
    service_start_date?: string;
    service_end_date?: string;
    notes?: string;
    recipients?: string[];
    custom_fields?: any[];
}

export interface CreateLineItemParams {
    name: string;
    unit_price: number;
    description: string;
    quantity?: number;
    flat_fee?: number;
    discount_amount?: number;
    discount_percent?: number;
    tax_rate?: number;
    tax_name?: string;
    service_start_date?: string;
    service_end_date?: string;
    display_order?: number;
}

export interface Contract {
    uuid: string;
    title: string;
    contract_status: string;
    contract_start_date: string;
    contract_end_date: string;
    contract_amount: number;
    currency: string;
    payment_terms: string;
    is_evergreen: boolean;
    customer: {
        uuid: string;
        name: string;
        email: string;
    };
    created_at: string;
    [key: string]: any;
}

export interface Template {
    uuid: string;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: any;
}

export interface BillableMetric {
    uuid: string;
    name: string;
    description: string;
    event_name: string;
    aggregation_type: number;
    created_at: string;
}

export interface CreateBillableMetricParams {
    name: string;
    description: string;
    event_name: string;
    aggregation_type: number;
}

export interface UsageEvent {
    customer_id: string;
    meter_id: string;
    amount: number;
    timestamp?: string; // ISO 8601
}

export interface UsageIngestResponse {
    success: boolean;
    ingested: number;
    failed: number;
}
