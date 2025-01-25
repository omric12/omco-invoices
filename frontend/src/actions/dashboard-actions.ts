'use server';

import { SummaryType } from '@/types/summaryType';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSummary(): Promise<SummaryType | undefined> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) {
      redirect('/login');
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/summary`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
