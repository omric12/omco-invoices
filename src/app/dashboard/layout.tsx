import NavTL from '@/components/layout/navbar/navTL';

export const metadata = {
  title: 'Dashboard',
  description: 'Admin Dashboard',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavTL>
      <div className='p-4'>{children}</div>
    </NavTL>
  );
}

// import Link from 'next/link';

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
//         <div className='hidden border-r bg-muted/40 md:block'>
//           <div className='flex flex-col max-h-screen h-full gap-2'>
//             <div className='h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6'>
//               <Link href='/' className='flex items-center'>
//                 OMCO-LOGO
//                 <p className='text-2xl font-bold gap-2'>Invoices</p>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className='p-4'>{children}</div>
//       </div>
//     </>
//   );
// }
