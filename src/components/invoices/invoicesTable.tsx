import { Download, Ellipsis, Eye, Mail, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '../ui/button';
import { Invoice } from '@prisma/client';
import Link from 'next/link';

export function InvoicesTable({ tableData }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Invoice</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((invoice: Invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className='font-medium'>{invoice.number}</TableCell>
            <TableCell>{invoice.date.toLocaleDateString('en-001')}</TableCell>
            <TableCell>{invoice.payment_method}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell className='text-right '>
              <OptionsMenu invoiceId={invoice.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
function OptionsMenu({ invoiceId }: { invoiceId: string }) {
  return (
    <div className='flex w-fill text-right justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/invoices/${invoiceId}`}>
              <Eye className='size-4 mr-2' /> View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/invoices/edit/${invoiceId}`}>
              <Pencil className='size-4 mr-2' /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href=''>
              <Download className='size-4 mr-2' /> Download
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href=''>
              <Mail className='size-4 mr-2' /> Send Email
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href=''>
              <Trash2 className='size-4 mr-2' /> Delete
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
