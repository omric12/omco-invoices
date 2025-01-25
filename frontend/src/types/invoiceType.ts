export interface InvoiceData {
  ID?: string;
  number: number | null;
  name: string;
  amount: number;
  payment_method: InvoicePaymentMethod;
  description?: string | null;
  items_quantity?: number | null;
  customer_name?: string;
  customer_phone?: string | null;
  customer_address?: string | null;
  customer_email?: string | null;
  date: Date;
  created_at: string;
}

export enum InvoicePaymentMethod {
  CASH = 'CASH',
  BIT = 'BIT',
  PAYBOX = 'PAYBOX',
}

// Add this interface for form data
export interface InvoiceFormData {
  name: string;
  amount: number;
  date: string;
  payment_method: InvoicePaymentMethod;
  description?: string;
  items_quantity?: number;
  customer_name: string;
  customer_phone?: string;
  customer_address?: string;
  customer_email?: string;
}
