'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InvoiceSchema } from '@/lib/schemas/invoiceSchema';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createInvoice } from '@/actions/invoices-actions';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// First, define the payment method type
type PaymentMethod = 'CASH' | 'BIT' | 'PAYBOX';

export default function AddInvoice() {
  const router = useRouter();
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: moment().format('YYYY-MM-DD'),
      payment_method: 'CASH' as PaymentMethod, // Add type assertion
      description: '',
      items_quantity: 0,
      customer_name: '',
      customer_phone: '',
      customer_address: '',
      customer_email: '',
    },
  });

  // Update the submit handler to match types
  async function handleSubmit(data: z.infer<typeof InvoiceSchema>) {
    const formattedData = {
      ...data,
      date: data.date || moment().format('YYYY-MM-DD'), // Keep as string
      payment_method: data.payment_method as PaymentMethod,
    };
    await createInvoice(formattedData);
    router.push('/dashboard/invoices');
  }

  return (
    <main className='max-w-screen flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='mx-auto grid  flex-1 auto-rows-max gap-4'>
            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                size='icon'
                className='h-7 w-7'
                onClick={() => router.back()}>
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Back</span>
              </Button>
              <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
                Add Invoice
              </h1>
              <Badge variant='outline' className='ml-auto sm:ml-0'>
                In stock
              </Badge>
              <div className='hidden items-center gap-2 md:ml-auto md:flex'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => router.back()}>
                  Discard
                </Button>
                <Button size='sm' type='submit'>
                  Save Invoice
                </Button>
              </div>
            </div>

            <div className='grid gap-4  lg:gap-8'>
              <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                <Card className='col-span-2 w-full max-w-screen mx-auto'>
                  <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                  </CardHeader>
                  <CardContent className='grid gap-4'>
                    <div className='flex flex-col-2 justify-between'>
                      <div className='flex flex-col gap1 w-fit'>
                        <div className='flex items-center gap-2'>
                          <Badge variant='secondary'>Draft</Badge>
                          <FormField
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder='Invoice Name'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col-2 justify-between'>
                      <div className='flex flex-col gap-4 '>
                        <Label>Amount</Label>
                        <FormField
                          name='amount'
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='gap-4 flex flex-col'>
                        <Label htmlFor='invoiceDate'>Invoice Date</Label>
                        <FormField
                          name='date'
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type='date'
                                  id='invoiceDate'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col-2 justify-between'>
                      <div className=' flex flex-col gap-4'>
                        <div className=' gap-2 '>
                          <Label>Customer Name</Label>
                          <FormField
                            name='customer_name'
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className=' gap-2 mt-2 '>
                          <Label>Customer Phone</Label>
                          <FormField
                            name='customer_phone'
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className=' flex flex-col gap-4 '>
                        <div className=' gap-2 mt-2 '>
                          <Label>Customer Email</Label>
                          <FormField
                            name='customer_email'
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className=' gap-2 mt-2'>
                          <Label>Customer Address</Label>
                          <FormField
                            name='customer_address'
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='gap-4 flex flex-col justify-end'>
                      <FormField
                        name='payment_method'
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <Label>Payment Method</Label>
                            <FormControl>
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className='w-[180px]'>
                                  <SelectValue placeholder='Payment Method' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='BIT'>Bit</SelectItem>
                                  <SelectItem value='CASH'>Cash</SelectItem>
                                  <SelectItem value='PAYBOX'>Paybox</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      name='description'
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea placeholder='Add a note' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className='flex items-center justify-center gap-2 md:hidden'>
                <Button variant='outline' size='sm'>
                  Discard
                </Button>
                <Button size='sm' type='submit'>
                  Save Invoices
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
