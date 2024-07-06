import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import SignInPage from './sign-in/page';

export default function Home() {
  return <SignInPage />;
}
