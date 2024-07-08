'use client';
import { type ComponentProps } from 'react';
import { Button } from './button';
import LoadingSpinner from './spinner';
import { useFormContext } from 'react-hook-form';

type Props = ComponentProps<'button'> & {
  pendingText: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;
  return (
    <Button {...props} type='submit' disabled={isSubmitting}>
      {isSubmitting ? (
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
