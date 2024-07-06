import { createClient } from '@/utils/supabase/client';

const getUserImage = async (imagePath: string) => {
  const supabase = createClient();

  const {
    data: { publicUrl: userAvatar },
  } = supabase.storage.from('images').getPublicUrl(imagePath);

  return userAvatar;
};

export default getUserImage;
