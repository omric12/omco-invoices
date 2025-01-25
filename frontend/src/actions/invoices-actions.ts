'use server';

import { InvoiceData } from '@/types/invoiceType';
import { InvoiceSchema } from '@/lib/schemas/invoiceSchema';
import { cookies } from 'next/headers';
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

export async function getInvoiceById(id: string): Promise<InvoiceData> {
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
  return invData;
}

export async function updateInvoice(
  id: string,
  data: InvoiceData
): Promise<void> {
  try {
    const response = await fetch(`/api/invoices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update invoice');
    }
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
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
