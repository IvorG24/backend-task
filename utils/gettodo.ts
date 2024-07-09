// utils/supabaseUtils.ts
import { createClient } from './supabase/server';
import { getUser } from './getuser';
import { TodoData } from '@/types/types'; // Adjust the path to where your types are

export async function getTodo(
  from: number,
  to: number
): Promise<{ data?: TodoData[]; count?: number; error?: any }> {
  const supabase = createClient();
  const { data: user, error: userError } = await getUser();

  if (userError || !user) {
    return { error: userError };
  }

  const { data, error } = await supabase
    .from('todos')
    .select('id, title')
    .eq('user_id', user.id)
    .range(from, to)
    .order('createDate', { ascending: false });

  if (error) {
    console.error('Error fetching todo data:', error);
    return { error };
  }

  const { count, error: countError } = await supabase
    .from('todos')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (countError) {
    console.error('Error fetching todo count:', countError);
    return { error: countError };
  }

  return { data, count: count ?? 0 };
}
