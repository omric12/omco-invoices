import { z } from 'zod';

export const InvoiceSchema = z.object({
  name: z.string().min(2),
  amount: z.coerce.number(),
  date: z.coerce.date().optional(),
  payment_method: z.enum(['BIT', 'CASH', 'PAYBOX']),
  description: z.string().optional(),
  items_quantity: z.number().optional(),
  customer_name: z.string().min(2),
  customer_phone: z.string(),
  customer_address: z.string(),
  customer_email: z.string().email().optional(),
});
