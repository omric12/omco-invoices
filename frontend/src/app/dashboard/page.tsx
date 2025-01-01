import AdminDashboard from '@/components/dashboard/admin-dash';
import { DashboardBlocks } from '@/components/dashboard/blocks';
import { DashboardGraphs } from '@/components/dashboard/graph';
import { getSummary } from '@/actions/dashboard-actions';
export default async function PrivatePage() {
  const summary = await getSummary();
  return (
    <div className='grid gap-4'>
      <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

      <DashboardBlocks summary={summary} />
      <DashboardGraphs summary={summary} />
    </div>
  );
}
