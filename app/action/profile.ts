'use server';
import { imageSchema } from '@/lib/schema';
import { getUser } from '@/utils/getuser';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function UploadImage(formdata: FormData) {
  const supabase = createClient();

  const { data: user, error: userError } = await getUser();

  if (userError || !user) {
    throw new Error('You are not authenticated');
  }

  const unique_id = crypto.randomUUID(); // Generate a unique ID for the image
  const imageFile = formdata.get('image') as Blob | File;

  if (!imageFile) {
    throw new Error('No image file provided');
  }

  // Convert Blob to File for validation
  const imageFileAsFile =
    imageFile instanceof File
      ? imageFile
      : new File([imageFile], 'image', { type: 'image/jpeg' });

  const validation = imageSchema.safeParse({
    name: imageFileAsFile.name,
    type: imageFileAsFile.type,
    size: imageFileAsFile.size,
  });

  if (!validation.success) {
    const validationErrors = validation.error.errors
      .map((e) => e.message)
      .join(', ');
    throw new Error(`Invalid image file: ${validationErrors}`);
  }

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(`user-${user.id}-${unique_id}`, imageFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    const imagePath = uploadData.path;

    const { error: updateError } = await supabase
      .from('user')
      .update({ avatar: imagePath })
      .eq('id', user.id);

    if (updateError) {
      throw new Error(`Error updating user avatar: ${updateError.message}`);
    }

    revalidatePath('/profile');
    console.log('Image uploaded and user avatar updated successfully');
  } catch (error) {
    console.error('Error in UploadImage function:', error);
    throw error; // Re-throw the error after logging
  }
}
