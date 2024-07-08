import { getUser } from '@/utils/getuser';
import { redirect } from 'next/navigation';
import React from 'react';
import UploadForm from './modules/uploadform';

const page = async () => {
  const { data: user } = await getUser();

  if (!user) {
    redirect('/sign-in');
  }
  return (
    <>
      {user.role === 'admin' ? (
        <UploadForm variant={'admin'} />
      ) : (
        <UploadForm variant={'member'} />
      )}
    </>
  );
};

export default page;
