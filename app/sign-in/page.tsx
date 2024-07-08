'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { signInSchema, SignInValues } from '@/lib/schema';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '@/components/ui/formbutton';
import { Card } from '@/components/ui/card';
import { signIn } from '../action/auth';
import { toast } from '@/components/ui/use-toast';

const SignInPage = () => {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: SignInValues) {
    try {
      await signIn(values);
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: `${error}`,
        variant: 'destructive',
      });
    }
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-lg p-10'>
        <h1 className='text-2xl'>Login Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              className='w-full'
              pendingText='Signing in ...'
              type='submit'
            >
              Sign In
            </SubmitButton>
          </form>
        </Form>
      </Card>
    </main>
  );
};

export default SignInPage;
