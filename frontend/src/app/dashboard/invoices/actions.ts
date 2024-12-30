'use server';

import { InvoiceSchema } from '../../../lib/schemas/invoiceSchema';
import { createClient } from '../../../lib/supabase/server';
import { form } from 'react-hook-form';
import moment from 'moment';
import prisma from '../../../lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function queryInvoices() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  const data = await prisma.invoice.findMany({
    where: {
      user_id: user?.id,
    },
  });

  return data;
}

export async function createInvoice(formData: z.infer<typeof InvoiceSchema>) {
  console.log(formData);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const validateData = InvoiceSchema.parse(formData);
  const data = await prisma.invoice.create({
    data: { ...validateData, user_id: user?.id },
    // {
    //   user_id: user?.id,
    //   name: formData.get('name'),
    //   amount: Number(formData.get('amount') ?? 0),
    //   date:
    //     formData.get('date') == ''
    //       ? moment().format()
    //       : moment(formData.get('date')).format(),
    //   payment_method: formData.get('paymentMethod') ?? 'CASH',
    //   description: formData.get('description'),
    //   items_quantity: formData.get('items_quantity') ?? 0,
    //   customer_name: formData.get('customerName'),
    //   customer_phone: formData.get('customerPhone'),
    //   customer_address: formData.get('customerAddr'),
    //   customer_email: formData.get('customerEmail'),
    // },
  });
  return redirect('/dashboard/invoices');
}

export async function getInvoiceById(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  const data = await prisma.invoice.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      number: true,
      amount: true,
      date: true,
      payment_method: true,
      description: true,
      items_quantity: true,
      customer_name: true,
      customer_phone: true,
      customer_address: true,
      customer_email: true,
    },
  });
  // console.log(data);
  if (!data) {
    redirect('/error');
  }

  return { invData: data, user };
}

export async function updateInvoice(
  id: string,
  formData: z.infer<typeof InvoiceSchema>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const validateData = InvoiceSchema.parse(formData);
  const data = await prisma.invoice.update({
    where: {
      id: id,
    },
    data: { ...validateData, user_id: user?.id },
  });
  return redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  const record = await prisma.invoice.findUnique({
    where: {
      id: id,
    },
  });
  if (record) {
    await prisma.invoice.delete({
      where: {
        id: id,
      },
    });
  }
  return redirect('/dashboard/invoices');
}
