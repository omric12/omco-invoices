import { Button } from '../../../components/ui/button';
import { GalleryVerticalEnd } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { cn } from '../../../lib/utils';
import { login } from '../actions';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <a
              href='#'
              className='flex flex-col items-center gap-2 font-medium'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md'>
                <GalleryVerticalEnd className='size-6' />
              </div>
              <span className='sr-only'>Acme Inc.</span>
            </a>
            <h1 className='text-xl font-bold'>Welcome to OMCO Invoices</h1>
            <div className='text-center text-sm'>
              Don&apos;t have an account?{' '}
              <a href='/register' className='underline underline-offset-4'>
                Sign up
              </a>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' name='password' type='password' required />
            </div>
            <Button formAction={login} className='w-full'>
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
// import { login, signup } from '../actions';

// export function LoginForm() {
//   return (
//     <form action={login}>
//       <label htmlFor='email'>Email:</label>
//       <input id='email' name='email' type='email' required />
//       <label htmlFor='password'>Password:</label>
//       <input id='password' name='password' type='password' required />
//       <button>Log in</button>
//     </form>
//   );
// }
