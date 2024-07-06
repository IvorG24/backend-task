import React from 'react';
import TodoList from './modules/todolist';
import { getUser } from '@/utils/getuser';
import { redirect } from 'next/navigation';
import { getTodo } from '@/utils/gettodo';

const DashbiardPage = async () => {
  const { data: user } = await getUser();
  const { data: todos } = await getTodo();

  if (!user) {
    redirect('/');
  }

  return (
    <main className='min-h-screen flex w-full items-center justify-center'>
      {user.role === 'user' ? (
        <TodoList variant='user' todos={todos} />
      ) : (
        <TodoList variant='admin' todos={todos} />
      )}
    </main>
  );
};

export default DashbiardPage;
