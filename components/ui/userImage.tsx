import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import getUserImage from '@/app/action/getImage';
import { getUser } from '@/utils/getuser';
import { createClient } from '@/utils/supabase/server';
export const UserImage = async () => {
  const { data: user } = await getUser();
  const userAvatar = await getUserImage(user?.avatar!);

  return (
    <Avatar className='h-32 w-32'>
      <AvatarImage src={userAvatar} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
