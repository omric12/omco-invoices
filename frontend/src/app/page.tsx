'use client';

import { ArrowRight, FileText, Globe, PieChart } from 'lucide-react';
import { fadeIn, scaleIn, slideUp, staggerContainer } from '@/lib/animations';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      className='min-h-screen bg-background'
      initial='initial'
      animate='animate'
      exit='exit'
      variants={fadeIn}>
      {/* Hero Section */}
      <motion.div className='container px-4 py-16 md:py-24' variants={slideUp}>
        <div className='flex flex-col items-center text-center space-y-8'>
          <motion.h1
            className='text-4xl md:text-6xl font-bold tracking-tight text-foreground'
            variants={scaleIn}>
            Smart Invoice Management
            <br />
            <span className='text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
              Made Simple
            </span>
          </motion.h1>
          <motion.p
            className='text-lg md:text-xl text-muted-foreground max-w-2xl'
            variants={fadeIn}>
            Create, manage, and track your invoices with ease. Perfect for
            businesses of all sizes.
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row gap-4'
            variants={staggerContainer}>
            <motion.div variants={scaleIn}>
              <Link href='/register'>
                <Button
                  size='lg'
                  className='w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 transition-all duration-300'>
                  Get Started <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={scaleIn}>
              <Link href='/login'>
                <Button
                  size='lg'
                  variant='outline'
                  className='w-full sm:w-auto border-primary/20 hover:border-primary/40 transition-all duration-300'>
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className='bg-muted/50 py-16 md:py-24 backdrop-blur-sm'
        variants={fadeIn}>
        <div className='container px-4'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'
            variants={slideUp}>
            Features that empower your business
          </motion.h2>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-8'
            variants={staggerContainer}>
            <FeatureCard
              icon={<FileText className='h-10 w-10 text-primary' />}
              title='Easy Invoice Creation'
              description='Create professional invoices in seconds with our intuitive interface'
            />
            <FeatureCard
              icon={<Globe className='h-10 w-10 text-primary' />}
              title='Access Anywhere'
              description='Manage your invoices from any device, anywhere in the world'
            />
            <FeatureCard
              icon={<PieChart className='h-10 w-10 text-primary' />}
              title='Insightful Analytics'
              description='Track your business performance with detailed analytics and reports'
            />
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div className='container px-4 py-16 md:py-24' variants={slideUp}>
        <motion.div
          className='bg-card rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-300'
          variants={scaleIn}>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>
            Ready to streamline your invoicing?
          </h2>
          <p className='text-muted-foreground mb-8'>
            Join thousands of businesses that trust our platform for their
            invoicing needs.
          </p>
          <Link href='/register'>
            <Button
              size='lg'
              className='w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 transition-all duration-300'>
              Start Free Trial
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      className='bg-card p-6 rounded-lg text-center space-y-4 transition-shadow duration-300 border border-primary/10 hover:border-primary/20 hover:shadow-lg'>
      <div className='flex justify-center'>{icon}</div>
      <h3 className='text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>
        {title}
      </h3>
      <p className='text-muted-foreground'>{description}</p>
    </motion.div>
  );
}
