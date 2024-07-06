// utils/supabaseUtils.ts
import { createClient } from './supabase/server';
import { getUser } from './getuser';
import { TodoData } from '@/types/types'; // Adjust the path to where your types are

export async function getTodo(): Promise<{ data?: TodoData[]; error?: any }> {
  const supabase = createClient();
  const { data: user, error: userError } = await getUser();

  if (userError || !user) {
    return { error: userError };
  }

  const { data, error } = await supabase
    .from('todos')
    .select('id, title')
    .eq('user_id', user.id); // Fetch all todos related to the user

  if (error) {
    console.error('Error fetching todo data:', error);
    return { error };
  }

  return { data };
}
