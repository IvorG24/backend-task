// app/dashboard/page.tsx
import React from 'react';
import TodoList from './modules/todolist';
import { getUser } from '@/utils/getuser';
import { redirect } from 'next/navigation';
import { getTodo } from '@/utils/gettodo';

const limit = 100; // Define the limit outside the component to avoid recalculation

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  // Extract the page number from searchParams and validate it
  const page = parseInt(searchParams.page || '1', 10);
  if (isNaN(page) || page < 1) {
    redirect('/dashboard?page=1');
    return null; // Ensure the component does not render if a redirect occurs
  }

  // Fetch user and todos
  const { data: user } = await getUser();
  if (!user) {
    redirect('/');
  }

  const offset = (page - 1) * limit;
  const { data: todos, count } = await getTodo(offset, offset + limit - 1);
  const totalPages = count ? Math.ceil(count / limit) - 1 : 0;
  // Determine the variant based on the user role
  const variant = user.role === 'member' ? 'member' : 'admin';

  return (
    <TodoList
      variant={variant}
      todos={todos}
      currentPage={page}
      totalPages={totalPages}
    />
  );
};

export default DashboardPage;
