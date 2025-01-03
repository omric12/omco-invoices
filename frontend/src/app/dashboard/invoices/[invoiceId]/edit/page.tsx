'use client';

import { useEffect, useState } from 'react';

import InvoiceForm from '@/components/invoices/invoiceForm';
import { getInvoiceById } from '@/actions/invoices-actions';

export default function editInvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  enum InvoicePaymentMethod {
    CASH,
    BIT,
    PAYBOX,
  }
  interface InvoiceData {
    number: number | null;
    name: string;
    amount: number;
    payment_method: InvoicePaymentMethod;
    description: string | null;
    items_quantity: number | null;
    customer_name: string;
    customer_phone: string | null;
    customer_address: string | null;
    customer_email: string | null;
    date: Date;
  }

  const [inv, setInvData] = useState<InvoiceData | undefined>(undefined);

  useEffect(() => {
    const fetchInvoice = async () => {
      const { invoiceId } = await params;
      const { invData } = await getInvoiceById(invoiceId);
      setInvData(invData);
    };
    fetchInvoice();
  }, []);

  return inv ? <InvoiceForm invData={inv} /> : <div>Loading...</div>;
}
