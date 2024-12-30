import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DollarSign, User, Users } from 'lucide-react';

export function DashboardBlocks() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8'>
      <Card>
        <CardHeader className='flex items-center flex-row justify-between pb-2'>
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className='size-4' />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className='text-3xl font-bold'>$1,000</h2>
            <p className='text-sm text-muted-foreground'>
              Based on the last 30 days
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex items-center flex-row justify-between pb-2'>
          <CardTitle>Total Invoices</CardTitle>
          <Users className='size-4' />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className='text-3xl font-bold'>$1,000</h2>
            <p className='text-sm text-muted-foreground'>
              Based on the last 30 days
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
