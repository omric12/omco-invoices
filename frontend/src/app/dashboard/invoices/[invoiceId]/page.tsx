import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';

import { getInvoiceById } from '../actions';
import moment from 'moment';

export default async function InvoiceIdPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const slug = (await params).invoiceId;
  const { invData, user } = await getInvoiceById(slug);
  return (
    <>
      <div>
        <Card>
          <CardHeader className='flex items-center justify-between'>
            <CardTitle>{user.user_metadata.companyName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex justify-between pt-16'>
              <div>
                <p>{moment(invData.date).format('DD/MM/YYYY')}</p>
                <p className='pb-3 text-4xl font-bold'>INVOICE</p>
                <p className='text-sm font-bold'>
                  INVOICE NO.{' '}
                  <span className='pl-1 font-normal'>{invData.number}</span>
                </p>
                <p className='text-sm font-bold'>
                  DUE DATE:{' '}
                  <span className='pl-1 font-normal'>
                    {moment(invData.date).format('DD/MM/YYYY')}
                  </span>
                </p>
              </div>
              <div className='pl-2 text-right'>
                <p className='text-gray-400'>CLIENT</p>
                <p className='font-bold'>{invData.customer_name}</p>
                <p className='text-sm'>{invData.customer_address}</p>
                <p className='text-sm'>{invData.customer_phone}</p>
                <p className='text-sm'>{invData.customer_email}</p>
              </div>
            </div>
            <div className='pt-16'>
              <table className='w-full table-auto text-sm'>
                <thead className='border-b-2'>
                  <tr className='h-10 text-left'>
                    <th>ITEM</th>
                    <th>QUANTITY</th>
                    <th>Payment Method</th>
                    <th className='text-right'>TOTAL ₪</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='h-10'>
                    <td>{invData.description}</td>
                    <td>{invData.items_quantity}</td>
                    <td>{invData.payment_method}</td>
                    <td className='text-right'>{invData.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex justify-end'>
              <p className='pt-6 text-xl font-bold'>{invData.amount} ₪</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className='pt-16 text-sm'>
              <p className='font-bold'>PAYMENT ADVICE</p>
              <p>{user.user_metadata.companyName}</p>
              <p>{user.user_metadata.address}</p>
              <p>{user.user_metadata.phone}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
