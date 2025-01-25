import 'moment/min/locales.min';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartNoAxesGantt, DollarSign, Users } from 'lucide-react';

import { SummaryType } from '@/types/summaryType';
import moment from 'moment';

// without this line it didn't work

interface DashboardBlocksProps {
  summary: SummaryType;
}

export function DashboardBlocks({ summary }: DashboardBlocksProps) {
  moment.locale('en-GB');

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8'>
      <Card>
        <CardHeader className='flex items-center flex-row justify-between pb-2'>
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className='size-4' />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className='text-3xl font-bold'>
              $
              {summary.TotalAmount.toLocaleString('en-us', {
                maximumFractionDigits: 2,
              })}
            </h2>
            <p>{moment(summary.ToDate).format('DD.MM.YYYY')}</p>
            <p className='text-sm text-muted-foreground mt-2'>
              {moment(summary.ToDate).format('MMM DD YYYY')} -{' '}
              {moment(summary.FromDate).format('MMM DD YYYY')}
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
            <h2 className='text-3xl font-bold'> {summary.TotalInvoices}</h2>
            <p className='text-sm text-muted-foreground mt-2'>
              {moment(summary.ToDate).format('MMM DD YYYY')} -{' '}
              {moment(summary.FromDate).format('MMM DD YYYY')}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex items-center flex-row justify-between pb-2'>
          <CardTitle>Average Invoice Amount</CardTitle>
          <ChartNoAxesGantt className='size-4' />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className='text-3xl font-bold'>
              {' '}
              $
              {(summary.TotalAmount / summary.TotalInvoices).toLocaleString(
                'en-us',
                { maximumFractionDigits: 2 }
              )}
            </h2>
            <p className='text-sm text-muted-foreground mt-2'>
              {moment(summary.ToDate).format('MMM DD YYYY')} -{' '}
              {moment(summary.FromDate).format('MMM DD YYYY')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
