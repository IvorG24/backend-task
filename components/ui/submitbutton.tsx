'use client';
import { type ComponentProps } from 'react';
import { Button } from './button';
import LoadingSpinner from './spinner';
import { useFormStatus } from 'react-dom';

type Props = ComponentProps<'button'> & {
  pendingText: string;
};

export function Submit({ children, pendingText, ...props }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} type='submit' disabled={pending}>
      {pending ? (
        <p className='flex items-center gap-2'>
          <LoadingSpinner />
          {pendingText}
        </p>
      ) : (
        children
      )}
    </Button>
  );
}
