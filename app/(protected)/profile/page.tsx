import { getUser } from '@/utils/getuser';
import React from 'react';
import { UserImage } from '@/components/ui/userImage';
import ImageForm from './modules/imageform';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { data: user, error: userError } = await getUser();
  if (userError || !user) {
    redirect('/sign-in');
  }

  return (
    <div className='flex flex-col gap-2 items-center'>
      <UserImage />
      <ImageForm />
    </div>
  );
};

export default Page;
