import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateOnboarding } from './actions';

export default function OnboardingPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Almost Finished</CardTitle>
          <CardDescription>
            Please fill your information to complete you profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='grid gap-4' action={updateOnboarding}>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label>First Name</Label>
                <Input name='firstName' id='firstName' type='text' />
              </div>
              <div className='grid gap-2'>
                {' '}
                <Label>Last Name</Label>
                <Input name='lastName' id='lastName' type='text' />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label>Company</Label>
              <Input name='companyName' id='companyName' type='text' />
            </div>
            <div className='grid gap-2'>
              <Label>Address</Label>
              <Input name='address' id='address' type='text' />
            </div>
            <div className='grid gap-2'>
              <Label>Phone Number</Label>
              <Input name='phone' id='phone' type='text' />
            </div>
            <Button type='submit'>Finish Onboarding</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
