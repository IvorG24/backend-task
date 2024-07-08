import { useOptimistic } from 'react';
import { createTodos, deleteTodos } from '@/app/action/todo';
import { TodoData } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TodoSchema, TodoValues } from '@/lib/schema';
import { toast } from '@/components/ui/use-toast';

const useTodoData = (todos: TodoData[] = []) => {
  // Initialize useOptimistic with the default todos and an update function
  const [optimisticData, addOptimisticData] = useOptimistic(
    todos || [],
    (state: TodoData[], newTodo: TodoData) => {
      return [...state, newTodo];
    }
  );

  // Initialize the form with validation schema
  const form = useForm<TodoValues>({
    resolver: zodResolver(TodoSchema),
    defaultValues: { title: '' },
  });

  // Handle form submission
  const onSubmit = async (values: TodoValues) => {
    try {
      await createTodos(values);
      addOptimisticData({
        id: '',
        title: values.title,
      });
      form.reset();
    } catch (error) {
      form.reset();
      toast({
        title: 'Uh oh! Something went wrong.',
        description: `${(error as Error).message}`,
        variant: 'destructive',
      });
    }
  };

  // Handle delete operation
  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteTodos(id);
      toast({
        title: 'Successfully deleted',
        description: `${title}`,
      });
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: `${(error as Error).message}`,
        variant: 'destructive',
      });
    }
  };

  return {
    form,
    optimisticData,
    onSubmit,
    handleDelete,
  };
};

export default useTodoData;
