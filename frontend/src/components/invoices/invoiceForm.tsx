import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  InvoiceData,
  InvoiceFormData,
  InvoicePaymentMethod,
} from '@/types/invoiceType';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import moment from 'moment';
import { updateInvoice } from '@/actions/invoices-actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface InvoiceFormProps {
  invData: InvoiceData;
}

const invoiceFormSchema = z.object({
  name: z.string().min(1, 'Invoice name is required'),
  amount: z.coerce.number().min(0, 'Amount must be a positive number'),
  date: z.string().min(1, 'Date is required'),
  payment_method: z.nativeEnum(InvoicePaymentMethod),
  description: z.string().nullable().optional(),
  items_quantity: z.coerce.number().nullable().optional(),
  customer_name: z.string().min(1, 'Customer name is required'),
  customer_phone: z.string().nullable().optional(),
  customer_address: z.string().nullable().optional(),
  customer_email: z.string().email().nullable().optional(),
});

export default function InvoiceForm({ invData }: InvoiceFormProps) {
  const router = useRouter();
  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      name: invData.name,
      amount: invData.amount,
      date: moment(invData.date).format('YYYY-MM-DD'),
      payment_method: invData.payment_method,
      description: invData.description || '',
      items_quantity: invData.items_quantity || undefined,
      customer_name: invData.customer_name || '',
      customer_phone: invData.customer_phone || '',
      customer_address: invData.customer_address || '',
      customer_email: invData.customer_email || '',
    },
  });

  async function onSubmit(data: InvoiceFormData) {
    if (!invData.ID) {
      console.error('Invoice ID not found');
      return;
    }

    const invoiceData: InvoiceData = {
      ...invData,
      name: data.name,
      amount: data.amount,
      date: new Date(data.date),
      payment_method: data.payment_method,
      description: data.description || null,
      items_quantity: data.items_quantity || null,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone || null,
      customer_address: data.customer_address || null,
      customer_email: data.customer_email || null,
    };

    try {
      await updateInvoice(invData.ID, invoiceData);
      router.push('/dashboard/invoices');
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  }

  return (
    <main className='max-w-screen-lg mx-auto p-4 md:p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='flex items-center gap-4'>
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='h-8 w-8'
              onClick={() => router.back()}>
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Button>
            <h1 className='text-2xl font-semibold'>Edit Invoice</h1>
            <div className='flex items-center gap-4 ml-auto'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type='submit'>Save Changes</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Badge variant='secondary'>Draft</Badge>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Input placeholder='Invoice Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type='number' step='0.01' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Date</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='customer_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='customer_phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='customer_email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Email</FormLabel>
                        <FormControl>
                          <Input type='email' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='customer_address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name='payment_method'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select payment method' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={InvoicePaymentMethod.BIT}>
                          Bit
                        </SelectItem>
                        <SelectItem value={InvoicePaymentMethod.CASH}>
                          Cash
                        </SelectItem>
                        <SelectItem value={InvoicePaymentMethod.PAYBOX}>
                          Paybox
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Add invoice description'
                        className='h-32'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  );
}
