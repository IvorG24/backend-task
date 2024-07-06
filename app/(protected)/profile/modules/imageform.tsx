'use client';
import { UploadImage } from '@/app/action/profile';
import { Button } from '@/components/ui/button';
import React, { useRef, FormEvent } from 'react';

const ImageForm = () => {
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current) {
      const formdata = new FormData(ref.current);

      try {
        await UploadImage(formdata);
        // Clear the file input field manually
        const fileInput = ref.current.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      } catch (error) {
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
      <Button type='submit' className='w-full'>
        Upload Image
      </Button>
    </form>
  );
};

export default ImageForm;
