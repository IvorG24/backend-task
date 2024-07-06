'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
export async function signIn(formdata: FormData) {
  const supabase = createClient();

  const email = formdata.get('email') as string;
  const password = formdata.get('password') as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`Error ${error}`);
  }

  console.log('user logged in successfully', data);
  redirect('/dashboard');
}

export async function signUp(formdata: FormData) {
  const supabase = createClient();
  const email = formdata.get('email') as string;
  const password = formdata.get('password') as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(`Error ${error}`);
  }

  console.log('user register successfully');
  redirect('/sign-in');
}
