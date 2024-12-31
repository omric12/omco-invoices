'use server';

import { InvoiceSchema } from '@/lib/schemas/invoiceSchema';
import { cookies } from 'next/headers';
import { form } from 'react-hook-form';
import moment from 'moment';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function getInvoices() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/invoices`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }

  const data = await response.json();
  return data;
}

export async function createInvoice(formData: z.infer<typeof InvoiceSchema>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  }

  const validateData = InvoiceSchema.parse(formData);

  const response = await fetch(`${process.env.BACKEND_URL}/api/invoices`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validateData),
  });

  if (!response.ok) {
    throw new Error('Failed to create invoice');
  }

  return response.json();
}

export async function getInvoiceById(id: string): Promise<Invoice> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/invoices/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch invoice: ${response.statusText}`);
  }
  const invData = await response.json();
  // console.log(invData);
  return { invData };
}

export async function updateInvoice(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/invoices/${id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invoice_number: formData.get('invoice_number'),
        date: formData.get('date'),
        due_date: formData.get('due_date'),
        customer_name: formData.get('customer_name'),
        customer_email: formData.get('customer_email'),
        items: formData.get('items'),
        total: formData.get('total'),
        status: formData.get('status'),
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update invoice');
  }

  return response.json();
}

export async function deleteInvoice(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/invoices/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete invoice');
  }

  return true;
}
