// app/dashboard/page.tsx
import React from 'react';
import TodoList from './modules/todolist';
import { getUser } from '@/utils/getuser';
import { redirect } from 'next/navigation';
import { getTodo } from '@/utils/gettodo';

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const { data: user } = await getUser();
  const page = parseInt(searchParams.page || '1', 10);

  if (isNaN(page) || page < 1) {
    redirect('/dashboard?page=1');
  }
  const limit = 100;
  const offset = (page - 1) * limit;
  const { data: todos } = await getTodo(offset, offset + limit - 1);

  if (!user) {
    redirect('/');
  }

  const totalTodos = 10000;
  const totalPages = Math.ceil(totalTodos / limit);

  return (
    <>
      {user.role === 'member' ? (
        <TodoList
          variant='member'
          todos={todos}
          currentPage={page}
          totalPages={totalPages}
        />
      ) : (
        <TodoList
          variant='admin'
          todos={todos}
          currentPage={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default DashboardPage;
