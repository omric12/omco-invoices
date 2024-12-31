'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function updateOnboarding(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) {
      redirect('/login');
    }

    const payload = {
      // Name: formData.get('firstName') as string + ' ' + formData.get('lastName') as string,
      address: formData.get('address') as string,
      phone_number: formData.get('phone') as string,
      Name: formData.get('companyName') as string,
    };

    const response = await fetch(`${process.env.BACKEND_URL}/api/company`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    //const data = await response.json();
    // console.log('data: ', data);

    redirect('/dashboard');
  } catch (error: any) {
    return {
      error: error.message || 'An error occurred during login',
    };
  }
}
