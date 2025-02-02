'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../ui/breadcrumb';
import { CircleUser, Home, Menu, Package2, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { fadeIn, scaleIn } from '@/lib/animations';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import Link from 'next/link';
import { NotepadText } from 'lucide-react';
import React from 'react';
import { ThemeChanger } from './themeChanger';
import { logout } from '@/actions/auth-actions';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    href: '/dashboard',
    title: 'Dashboard',
    img: <Home className='h-4 w-4' />,
  },
  {
    href: '/dashboard/invoices',
    title: 'Invoices',
    img: <NotepadText className='h-4 w-4' />,
  },
];

type Crumb = {
  title: string;
  crumbUrl: string;
};

export default function NavTL({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  let pathnameArr = pathname.split('/');
  pathnameArr = pathnameArr.slice(1);
  const breadcrumbs: Crumb[] = [];
  let crumbUrl = '';
  let val;
  if (pathnameArr[0] != '') {
    for (val of pathnameArr) {
      if (val == null || val == 'undefined') {
        return;
      }
      crumbUrl = crumbUrl + val + '/';
      let crumbTitle = val[0].toUpperCase() + val.slice(1);
      crumbTitle = crumbTitle.replace(/([A-Z])/g, ' $1').trim();
      breadcrumbs.push({
        title: crumbTitle,
        crumbUrl: crumbUrl,
      });
    }
  }

  return (
    <motion.div
      className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'
      initial='initial'
      animate='animate'
      variants={fadeIn}>
      <motion.div
        className='hidden border-r bg-muted/40 md:block'
        variants={scaleIn}>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <motion.div
            className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}>
            <Link href='/' className='flex items-center group'>
              <Package2 className='transition-transform group-hover:scale-110' />
              <p className='text-sm font-bold ml-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>
                OMCO Invoices
              </p>
            </Link>
          </motion.div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              {navLinks.map((item, idx) => {
                if (
                  pathnameArr.at(-1)?.toLowerCase() == item.title.toLowerCase()
                ) {
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}>
                      <Link
                        href={item.href}
                        className='flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                        {item.img}
                        {item.title}
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}>
                    <Link
                      href={item.href}
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                      {item.img}
                      {item.title}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.div>
      <motion.div className='flex flex-col' variants={scaleIn}>
        <header className='sticky top-0 z-30 mt-2 flex h-14 items-center gap-4 bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid gap-2 text-lg font-medium'>
                <Link
                  href='#'
                  className='flex items-center gap-2 text-lg font-semibold'>
                  <Package2 className='h-6 w-6' />
                  <span className='sr-only'>Acme Inc</span>
                </Link>
                {navLinks.map((item, idx) => {
                  if (
                    pathnameArr.at(-1)?.toLowerCase() ==
                    item.title.toLowerCase()
                  ) {
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'>
                        {item.img}
                        {item.title}
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                      {item.img}
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
              <div className='mt-auto'></div>
            </SheetContent>
          </Sheet>

          <div className='w-full flex-1'>
            <div className='relative flex-1 md:grow-0'>
              <Breadcrumb className='hidden md:flex'>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        {idx % 2 == 0 ? <></> : <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href={`/${crumb.crumbUrl}`}>
                              {crumb.title}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          <motion.div
            className='ml-auto w-full flex-1'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}>
            <div className='relative flex-1 md:grow-0'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search...'
                className='w-full rounded-lg bg-background/80 backdrop-blur-sm pl-8 md:w-[200px] lg:w-[336px] transition-all duration-300 focus:bg-background'
              />
            </div>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='secondary'
                size='icon'
                className='rounded-full hover:scale-105 transition-transform'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='ml-auto'>
            <div className='relative flex-1 md:grow-0'>
              <ThemeChanger />
            </div>
          </div>
        </header>
        <motion.div className='' variants={scaleIn}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
