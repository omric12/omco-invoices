'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function downloadInvoicePDF(invoiceId: string): Promise<Blob> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/invoices/${invoiceId}/pdf`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to generate PDF');
  }

  return response.blob();
}
