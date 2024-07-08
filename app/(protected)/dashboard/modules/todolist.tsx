'use client';
import React, { useOptimistic } from 'react';
import { createTodos, deleteTodos } from '@/app/action/todo';
import { TodoData } from '@/types/types';
import { Button } from '@/components/ui/button';
import { TodoDataProps } from '@/types/types';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TodoSchema, TodoValues } from '@/lib/schema';
import { toast } from '@/components/ui/use-toast';
import { SubmitButton } from '@/components/ui/formbutton';

const TodoList = ({
  todos,
  variant,
  currentPage,
  totalPages,
}: TodoDataProps) => {
  const [optimisticData, addOptimisticData] = useOptimistic(
    todos || [], // Provide a default value to ensure it's always an array
    (state: TodoData[], newTodo: TodoData) => {
      return [...state, newTodo];
    }
  );

  const form = useForm<TodoValues>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: '',
    },
  });

  async function onSubmit(values: TodoValues) {
    try {
      await createTodos(values);
      addOptimisticData({
        id: '',
        title: values.title,
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: `${error}`,
        variant: 'destructive',
      });
      form.reset();
    }
  }

  return (
    <>
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
      {variant === 'admin' ? (
        <div className='bg-white p-6 space-y-4 rounded shadow-md w-full max-w-md'>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TodoList;
