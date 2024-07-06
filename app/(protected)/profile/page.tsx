import { UploadImage } from '@/app/action/profile';
import { Button } from '@/components/ui/button';
import { getUser } from '@/utils/getuser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { UserImage } from '@/components/ui/userImage';

const Page = async () => {
  try {
    const { data: user, error: userError } = await getUser();
    if (userError || !user) {
      throw new Error('User not found or failed to retrieve user data.');
    }

    // Get user avatar URL
    // const userAvatar = await getUserImage(user?.avatar!);

    return (
      <div className='flex flex-col gap-2 items-center'>
        <UserImage />
        <form action={UploadImage} className='mb-4'>
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
      </div>
    );
  } catch (error) {
    console.error('Error in Page component:', error);
    return (
      <div className='p-4 text-red-600'>
        <p>Error loading user data or image.</p>
      </div>
    );
  }
};

export default Page;
