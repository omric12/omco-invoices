import { Download, Ellipsis, Eye, Mail, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import Link from 'next/link';
import moment from 'moment';

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
          <TableRow key={invoice.ID}>
            <TableCell className='font-medium'>{invoice.number}</TableCell>
            <TableCell>{moment(invoice.date).format('DD/MM/YYYY')}</TableCell>
            <TableCell>{invoice.payment_method}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell className='text-right '>
              <OptionsMenu invoiceId={invoice.ID} />
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
            <Link href={`/dashboard/invoices/${invoiceId}/edit`}>
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
            <Link href={`/dashboard/invoices/${invoiceId}/delete`}>
              <Trash2 className='size-4 mr-2' /> Delete
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
