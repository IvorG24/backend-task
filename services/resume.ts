import { createClient } from '@/utils/supabase/client';

export const uploadResume = async (formData: FormData) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  if (!data) {
    throw new Error('You are not authenticated');
  }

  const accessToken = data.session?.access_token;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/resume/`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload resumes');
  }

  return response.json();
};

// services/resume.ts
export const getResume = async (keyword: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  if (!data) {
    throw new Error('You are not authenticated');
  }

  const accessToken = data.session?.access_token;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/resume/search-resumes?keyword=${encodeURIComponent(keyword)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass the token from the user session
      },
    }
  ).then((res) => res.json());

  if (error) throw new Error(error.message);
  return response;
};
