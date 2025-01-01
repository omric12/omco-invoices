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

import { useState } from 'react';

// Sample data (replace this with your actual data fetching logic)
const invoiceData = [
  {
    ID: '5bab0129-dc9e-4008-8bf5-e3ae20d571a5',
    created_at: '2024-12-31T18:02:47.874659 02:00',
    number: 1,
    name: '123',
    amount: 1230,
    date: '2024-12-31T02:00:00 02:00',
    payment_method: 'CASH',
  },
  {
    ID: '1f70180c-0515-431d-832a-0c91016e5119',
    created_at: '2024-12-31T18:03:11.687436 02:00',
    number: 2,
    name: '432423',
    amount: 100,
    date: '2024-12-31T02:00:00 02:00',
    payment_method: 'CASH',
  },
  {
    ID: 'dad46852-bf02-441a-b8d9-7540df50ad07',
    created_at: '2024-12-31T17:47:48.802143 02:00',
    number: 0,
    name: '12',
    amount: 200,
    date: '2024-12-31T02:00:00 02:00',
    payment_method: 'CASH',
  },
];

// Helper function to parse and format dates
function formatDate(dateString: string): string {
  const date = new Date(dateString.split(' ')[0]); // Remove the timezone offset
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

export default function AdminDashboard() {
  const [data] = useState(invoiceData);

  // Calculate summary statistics
  const totalAmount = data.reduce((sum, invoice) => sum + invoice.amount, 0);
  const averageAmount = totalAmount / data.length;
  const invoiceCount = data.length;

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
      const date = formatDate(invoice.created_at);
      const lastEntry = acc[acc.length - 1];
      const cumulativeAmount = (lastEntry?.amount || 0) + invoice.amount;
      acc.push({ date, amount: cumulativeAmount });
      return acc;
    }, [] as { date: string; amount: number }[]);

  return (
    <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-4 md:gap-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg sm:text-xl'>
              Invoice Amounts
            </CardTitle>
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
            <CardTitle className='text-lg sm:text-xl'>
              Payment Methods
            </CardTitle>
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
      </div>

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
    </div>
  );
}
