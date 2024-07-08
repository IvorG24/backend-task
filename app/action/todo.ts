'use server';

import { TodoSchema, TodoValues } from '@/lib/schema';
import { getUser } from '@/utils/getuser';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createTodos(values: TodoValues) {
  const supabase = createClient();
  const { data: user, error: userError } = await getUser();

  if (userError || !user) {
    throw new Error('You are not authenticated');
  }

  const { success, error: validationError } =
    await TodoSchema.safeParseAsync(values);

  if (!success) {
    throw new Error(`${validationError?.message}`);
  }

  const { title } = values;

  const { error } = await supabase
    .from('todos')
    .insert({ user_id: user.id, title });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  console.log('Todo created successfully');
}

export async function updateTodos(formdata: FormData, title_id: string) {
  const supabase = createClient();

  const { data: user, error: userError } = await getUser();

  if (userError || !user) {
    throw new Error('You are not authenticated');
  }

  const title = formdata.get('title');
  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error('Todo must not be empty');
  }

  const { error } = await supabase
    .from('todos')
    .update({ title: title })
    .eq('id', title_id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  console.log('Todo updated successfully');
}

export async function deleteTodos(title_id: string) {
  const supabase = createClient();

  const { data: user, error: userError } = await getUser();

  if (userError || !user) {
    throw new Error('You are not authenticated');
  }

  const { error } = await supabase.from('todos').delete().eq('id', title_id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  console.log('Todo deleted successfully');
}
