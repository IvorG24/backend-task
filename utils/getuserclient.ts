import { UserData } from '@/types/types';
import { createClient } from './supabase/client';

export async function getUser(): Promise<{ data?: UserData; error?: any }> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error fetching authenticated user:', userError);
    return { error: userError };
  }

  const { data, error } = await supabase
    .from('user')
    .select('id, role,avatar')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user data:', error);
    return { error };
  }

  return { data };
}

// utils/getuser.ts
