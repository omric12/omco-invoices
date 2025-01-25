import { InvoiceData } from './invoiceType';

export interface SummaryType {
  TotalAmount: number;
  TotalInvoices: number;
  FromDate: Date;
  ToDate: Date;
  Invoices: InvoiceData[];
}
