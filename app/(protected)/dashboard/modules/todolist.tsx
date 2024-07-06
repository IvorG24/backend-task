'use client';

import { createTodos, deleteTodos } from '@/app/action/todo';
import { TodoData } from '@/types/types';
import React, { useOptimistic, useRef, useState } from 'react';
import UpdateDialog from './update-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
interface TodoDataProps {
  todos: TodoData[] | undefined;
  variant: 'user' | 'admin';
  currentPage: number;
  totalPages: number;
}
const TodoList = ({
  todos,
  variant,
  currentPage,
  totalPages,
}: TodoDataProps) => {
  const ref = useRef<HTMLFormElement>(null);
  const [optimisticData, addOptimisticData] = useOptimistic(
    todos || [], // Provide a default value to ensure it's always an array
    (state: TodoData[], newTodo: TodoData) => {
      return [...state, newTodo];
    }
  );

  return (
    <>
      <div className='flex justify-center gap-2 mt-4'>
        <Link
          href={`/dashboard?page=${currentPage - 1}`}
          className={`bg-blue-500 text-white p-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Link
          href={`/dashboard?page=${currentPage + 1}`}
          className={`bg-blue-500 text-white p-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </div>
      {variant === 'admin' ? (
        <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
          <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
          <form
            ref={ref}
            action={async (formdata) => {
              addOptimisticData({
                id: '',
                title: formdata.get('title') as string,
              });
              await createTodos(formdata);
              ref.current?.reset();
            }}
            className='mb-4'
          >
            <Input
              type='text'
              name='title'
              className='border p-2 rounded w-full'
              placeholder='Add a new todo'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white p-2 rounded mt-2 w-full'
            >
              Add Todo
            </button>
          </form>
          <ul>
            {optimisticData.map((todo) => (
              <li
                key={todo.id}
                className='flex items-center justify-between mb-2'
              >
                <span>{todo.title}</span>
                <div className='flex gap-2'>
                  <UpdateDialog title={todo.title} id={todo.id} />
                  <form
                    action={async () => {
                      await deleteTodos(todo.id);
                    }}
                  >
                    <Button variant={'destructive'}>Delete</Button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
          <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
          <form action={createTodos} className='mb-4'>
            <input
              type='text'
              name='title'
              className='border p-2 rounded w-full'
              placeholder='Add a new todo'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white p-2 rounded mt-2 w-full'
            >
              Add Todo
            </button>
          </form>
          <ul>
            {optimisticData.map((todo) => (
              <li
                key={todo.id}
                className='flex items-center justify-between mb-2'
              >
                <span>{todo.title}</span>
              </li>
            ))}
          </ul>
          <div className='flex gap-2 mt-4'>
            <a
              href={`/dashboard?page=${currentPage - 1}`}
              className={`bg-blue-500 text-white p-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
              aria-disabled={currentPage === 1}
            >
              Previous
            </a>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <a
              href={`/dashboard?page=${currentPage + 1}`}
              className={`bg-blue-500 text-white p-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
              aria-disabled={currentPage === totalPages}
            >
              Next
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
