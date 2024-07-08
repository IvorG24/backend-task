'use client';
import React from 'react';
import { TodoDataProps } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import UpdateDialog from './update-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { SubmitButton } from '@/components/ui/formbutton';
import useTodoData from '@/hook/todoData';

const TodoList = ({
  todos,
  variant,
  currentPage,
  totalPages,
}: TodoDataProps) => {
  const { form, optimisticData, onSubmit, handleDelete } = useTodoData(todos);

  return (
    <div className='container mx-auto p-4'>
      {todos?.length && todos.length > 99 && (
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
      )}
      <div className='space-y-4'>
        <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Input Todo' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton className='w-full' pendingText='Creating todo ...'>
              Create Todo
            </SubmitButton>
          </form>
        </Form>
        <ul>
          {optimisticData.map((todo) => (
            <li
              key={todo.id}
              className='flex items-center justify-between mb-2'
            >
              <span>{todo.title}</span>
              {variant === 'admin' && (
                <div className='flex gap-2'>
                  <UpdateDialog title={todo.title} id={todo.id} />
                  <Button
                    variant={'destructive'}
                    onClick={() => handleDelete(todo.id, todo.title)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
