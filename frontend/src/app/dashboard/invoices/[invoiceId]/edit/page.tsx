'use client';

import { useEffect, useState } from 'react';

import { InvoiceData } from '@/types/invoiceType';
import InvoiceForm from '@/components/invoices/invoiceForm';
import { getInvoiceById } from '@/actions/invoices-actions';

export default function EditInvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const [inv, setInvData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      const { invoiceId } = await params;
      const response = await getInvoiceById(invoiceId);
      const invData = response as InvoiceData; // Type assertion
      setInvData(invData);
    };
    fetchInvoice();
  }, [params]); // Add dependency array

  return inv ? <InvoiceForm invData={inv} /> : <div>Loading...</div>;
}
