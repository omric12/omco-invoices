import { DashboardBlocks } from '../../components/dashboard/blocks';
import { createClient } from '../../lib/supabase/server';
import { redirect } from 'next/navigation';

function getData() {}

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <>
      <DashboardBlocks />
    </>
  );
}
