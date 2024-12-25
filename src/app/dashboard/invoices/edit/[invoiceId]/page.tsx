'use client';

import { Invoice, InvoicePaymentMethod } from '@prisma/client';
import { useEffect, useState } from 'react';

import InvoiceForm from './invoiceForm';
import { getInvoiceById } from '../../actions';

export default function editInvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
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
  const [usr, setUser] = useState<any>(undefined);
  //   const slug = (await params).invoiceId;
  //   const { invData, user } = await getInvoiceById(slug);

  useEffect(() => {
    const fetchInvoice = async () => {
      const { invoiceId } = await params;
      const { invData, user } = await getInvoiceById(invoiceId);
      setInvData(invData);
      setUser(user);
    };
    fetchInvoice();
  }, []);

  return inv ? <InvoiceForm invData={inv} user={usr} /> : <div>Loading...</div>;
}
