export interface Invoice {
  ID: string;
  number: number;
  name: string;
  amount: number;
  date: string;
  payment_method: string;
  description?: string;
  items_quantity?: number;
  customer_name: string;
  customer_phone?: string;
  customer_address?: string;
  customer_email?: string;
  created_at: string;
  updated_at: string;
}
