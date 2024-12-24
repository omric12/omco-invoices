'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function updateOnboarding(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    address: formData.get('address') as string,
    phoneNumber: formData.get('phone') as string,
  };
  console.log(data);
  const { error } = await supabase.auth.updateUser({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phone: data.phoneNumber,
      status: 'onboarded',
    },
  });

  if (error) {
    console.error(error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
