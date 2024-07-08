'use client';
import { UploadImage } from '@/app/action/profile';
import { Submit } from '@/components/ui/submitbutton';
import { toast } from '@/components/ui/use-toast';
import React, { useRef, FormEvent } from 'react';

const ImageForm = () => {
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current) {
      const formdata = new FormData(ref.current);
      try {
        await UploadImage(formdata);
        const fileInput = ref.current.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        toast({
          title: 'Uploaded sucessfully',
          description: `New Image Uploaded`,
        });
      } catch (error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: `${error}`,
          variant: 'destructive',
        });
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className='mb-4'>
      <input
        type='file'
        name='image'
        accept='image/*'
        className='border p-2 rounded w-full mb-2'
      />
      <Submit
        pendingText='Uploading image ...'
        type='submit'
        className='w-full'
      >
        Upload Image
      </Submit>
    </form>
  );
};

export default ImageForm;
