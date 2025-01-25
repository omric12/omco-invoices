'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteInvoice } from '@/actions/invoices-actions';

export default function DeleteInvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const [slug, setSlug] = useState<string>();

  useEffect(() => {
    const fetchInvoice = async () => {
      const { invoiceId } = await params;
      setSlug(invoiceId);
    };
    fetchInvoice();
  });

  const handleDelete = async () => {
    if (slug) {
      await deleteInvoice(slug);
    }
  };

  return slug ? (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-destructive'>
          <AlertCircle className='h-5 w-5' />
          Confirm Deletion
        </CardTitle>
        <CardDescription>
          Are you sure you want to delete this record?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>
          You are about to delete the invoice. This action cannot be undone.
        </p>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='outline'>Cancel</Button>
        <Button variant='destructive' onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <div>Loading...</div>
  );
}
