'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import Link from 'next/link';
import { register } from '@/actions/auth-actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string().email(),
    phoneNumber: z.string(),
    password: z.string().min(6),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    }
  )
  .refine(
    (data) => {
      return data.firstName.length > 0;
    },
    {
      message: 'Please enter first name',
      path: ['firstName'],
    }
  )
  .refine(
    (data) => {
      return data.lastName.length > 0;
    },
    {
      message: 'Please enter last name',
      path: ['lastName'],
    }
  )
  .refine(
    (data) => {
      return data.emailAddress.length > 0;
    },
    {
      message: 'Please enter email address',
      path: ['emailAddress'],
    }
  );
export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
    },
  });

  // async function handleSubmit(values: z.infer<typeof formSchema>) {
  //   console.log({ values });

  //   const response = await fetch(process.env.MS_REST + '/api/register', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(values),
  //   });

  //   if (response.ok) {
  //     router.push('/dashboard');
  //   } else {
  //     console.log('error' + response.status);
  //   }
  // }
  return (
    <Card className='mx-auto mt-20 max-w-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='emailAddress'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />{' '}
                </div>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='phoneNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type='password' />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='passwordConfirm'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password confirm</FormLabel>
                      <FormControl>
                        <Input {...field} type='password' />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' className='w-full' formAction={register}>
                Create an account
              </Button>
              <Button variant='outline' className='w-full'>
                Sign up with GitHub
              </Button>
            </div>
          </form>
        </Form>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='underline'>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
