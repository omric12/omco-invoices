'use server';

import { createClient } from '@/lib/supabase/server';
import { form } from 'react-hook-form';
import moment from 'moment';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

export async function queryInvoice() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await prisma.invoice.findMany({
    where: {
      user_id: user?.id,
    },
  });

  return data;
}

export async function createInvoice(formData: FormData) {
  console.log(formData);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await prisma.invoice.create({
    data: {
      user_id: user?.id,
      name: formData.get('name'),
      amount: Number(formData.get('amount') ?? 0),
      date:
        formData.get('date') == ''
          ? moment().format()
          : moment(formData.get('date')).format(),
      payment_method: formData.get('paymentMethod') ?? 'CASH',
      description: formData.get('description'),
      items_quantity: formData.get('items_quantity') ?? 0,
      customer_name: formData.get('customerName'),
      customer_phone: formData.get('customerPhone'),
      customer_address: formData.get('customerAddr'),
      customer_email: formData.get('customerEmail'),
    },
  });
  return redirect('/dashboard/invoices');
}
