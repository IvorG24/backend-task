import { getUser } from '@/utils/getuser';
import { redirect } from 'next/navigation';
import React from 'react';
import UploadForm from './modules/uploadform';

const page = async () => {
  const { data: user } = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const variant = user.role === 'member' ? 'member' : 'admin';
  return (
    <>
      <UploadForm variant={variant} />
    </>
  );
};

export default page;
