import { NextResponse } from 'next/server';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await params;
  console.log('invoiceId: ', invoiceId);

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      name: true,
      number: true,
      amount: true,
      date: true,
      payment_method: true,
      description: true,
      items_quantity: true,
      customer_name: true,
      customer_phone: true,
      customer_address: true,
      customer_email: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  console.log(data);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  pdf.setFont('helvetica', 'normal');
  // Header
  pdf.setFontSize(24);
  pdf.text(data.name, 105, 10, { align: 'center' });
  // Body
  pdf.setFontSize(12);
  pdf.text(`Description: ${data.description}`, 10, 60);
  pdf.text(`Items Quantity: ${data.items_quantity}`, 10, 70);
  pdf.text(`Customer Name: ${data.customer_name}`, 10, 80);
  pdf.text(`Customer Phone: ${data.customer_phone}`, 10, 90);
  pdf.text(`Customer Address: ${data.customer_address}`, 10, 100);
  pdf.text(`Customer Email: ${data.customer_email}`, 10, 110);

  //  Invoice Table
  autoTable(pdf, {
    head: [['Invoice #', 'Date', 'Method', 'Amount']],
    body: [
      [
        data.number,
        moment(data.date).format('DD/MM/YYYY'),
        data.payment_method,
        data.amount,
      ],
    ],
  });
  const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      //   'Content-Disposition': `attachment; filename=${data.name}.pdf`,
    },
  });
}
