'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SignInValues, signInSchema, signUpSchema } from '@/lib/schema';
export async function signIn(values: SignInValues) {
  const supabase = createClient();

  const { success, error: validationError } =
    await signInSchema.safeParseAsync(values);

  if (!success) {
    throw new Error(`${validationError?.message}`);
  }

  const { email, password } = values;

  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    throw new Error(` ${signInError.message}`);
  }

  console.log('User logged in successfully');
  redirect('/dashboard');
}

export async function signUp(values: SignInValues) {
  const supabase = createClient();

  const { success, error: validationError } =
    await signUpSchema.safeParseAsync(values);

  if (!success) {
    throw new Error(`${validationError?.message}`);
  }

  const { email, password } = values;
  const { data, error: signInError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signInError) {
    throw new Error(` ${signInError.message}`);
  }

  console.log('user register successfully');
  redirect('/dashboard');
}

export async function signOut() {
  const supabase = createClient();

  const response = await supabase.auth.signOut();

  if (!response) {
    throw new Error(response);
  }

  console.log('user log out successfully');
  redirect('/sign-in');
}
