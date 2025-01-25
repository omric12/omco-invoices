'use client';

import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { SummaryType } from '@/types/summaryType';
import { formatToDisplayDate } from '@/lib/date-utils';

interface DashboardGraphsProps {
  summary: SummaryType;
}

export function DashboardGraphs({ summary }: DashboardGraphsProps) {
  const data = summary.Invoices;
  // console.log('data: ', data);
  // Prepare data for charts
  const barChartData = data.map((invoice) => ({
    name: invoice.name,
    amount: invoice.amount,
  }));

  const pieChartData = Object.entries(
    data.reduce((acc, invoice) => {
      acc[invoice.payment_method] = (acc[invoice.payment_method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const lineChartData = data
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .reduce((acc, invoice) => {
      const date = formatToDisplayDate(invoice.created_at);
      const lastEntry = acc[acc.length - 1];
      const cumulativeAmount = (lastEntry?.amount || 0) + invoice.amount;
      acc.push({ date, amount: cumulativeAmount });
      return acc;
    }, [] as { date: string; amount: number }[]);

  const dailyAmountData = data.reduce((acc, invoice) => {
    const date = formatToDisplayDate(invoice.created_at);
    acc[date] = (acc[date] || 0) + invoice.amount;
    return acc;
  }, {} as Record<string, number>);

  const dailyAmountChartData = Object.entries(dailyAmountData)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className='grid gap-4  md:grid-cols-1 lg:grid-cols-2 md:gap-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg sm:text-xl'>Invoice Amounts</CardTitle>
          <CardDescription>Amount for each invoice</CardDescription>
        </CardHeader>
        <CardContent className='h-[300px] sm:h-[400px]'>
          <ChartContainer
            config={{
              amount: {
                label: 'Amount',
                color: 'hsl(var(--chart-1))',
              },
            }}
            className='w-full h-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={barChartData}>
                <XAxis dataKey='name' />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey='amount' fill='var(--color-amount)' />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg sm:text-xl'>Payment Methods</CardTitle>
          <CardDescription>Distribution of payment methods</CardDescription>
        </CardHeader>
        <CardContent className='h-[300px] sm:h-[400px]'>
          <ChartContainer
            config={{
              value: {
                label: 'Count',
                color: 'hsl(var(--chart-2))',
              },
            }}
            className='w-full h-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius='80%'
                  fill='var(--color-value)'
                  innerRadius={100}
                  label>
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(${index * 45}, 70%, 60%)`}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg sm:text-xl'>
            Cumulative Total Over Time
          </CardTitle>
          <CardDescription>Total amount accumulated over time</CardDescription>
        </CardHeader>
        <CardContent className='h-[300px] sm:h-[400px]'>
          <ChartContainer
            config={{
              amount: {
                label: 'Cumulative Amount',
                color: 'hsl(var(--chart-3))',
              },
            }}
            className='w-full h-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={lineChartData}>
                <XAxis dataKey='date' />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type='monotone'
                  dataKey='amount'
                  stroke='var(--color-amount)'
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg sm:text-xl'>
            Daily Invoice Amounts
          </CardTitle>
          <CardDescription>Total amount invoiced per day</CardDescription>
        </CardHeader>
        <CardContent className='h-[300px] sm:h-[400px]'>
          <ChartContainer
            config={{
              amount: {
                label: 'Daily Amount',
                color: 'hsl(var(--chart-4))',
              },
            }}
            className='w-full h-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={dailyAmountChartData}>
                <XAxis dataKey='date' />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey='amount' fill='var(--color-amount)' />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
