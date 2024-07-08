import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const TodoSchema = z.object({
  title: z.string().min(1, {
    message: 'content must be at least 1 characters.',
  }),
});
export type TodoValues = z.infer<typeof TodoSchema>;

export const UpdateTodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: 'content must be at least 1 characters.',
  }),
});
export type UpdateTodoValues = z.infer<typeof UpdateTodoSchema>;

export const imageSchema = z.object({
  name: z.string(),
  type: z.enum(['image/jpeg', 'image/png', 'image/gif']),
  size: z.number().max(5 * 1024 * 1024, 'File size should not exceed 5MB'),
});
