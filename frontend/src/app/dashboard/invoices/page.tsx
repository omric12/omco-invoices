import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';

import { FilePlus } from 'lucide-react';
import { InvoicesTable } from '../../../components/invoices/invoicesTable';
import Link from 'next/link';
import { buttonVariants } from '../../../components/ui/button';
import { queryInvoices } from './actions';

export default async function InvoicesPage() {
  const invData = await queryInvoices();

  return (
    <div>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage Invoices</CardDescription>
            </div>
            <div>
              <Link href='/dashboard/invoices/add' className={buttonVariants()}>
                <FilePlus />
                Create Invoice
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <InvoicesTable tableData={invData} />
        </CardContent>
      </Card>
    </div>
  );
}
