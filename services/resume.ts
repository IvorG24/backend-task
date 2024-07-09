import { getUser } from '@/utils/getuserclient';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

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

const fetchResume = async (keyword: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  const { data: user } = await getUser();
  if (!data || user?.role === 'member') {
    throw new Error('You are not authenticated');
  }

  const accessToken = data.session?.access_token;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/resume?keyword=${encodeURIComponent(keyword)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass the token from the user session
      },
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();

  return responseData;
};

export const useGetResume = (keyword: string) => {
  return useQuery({
    queryKey: ['fetchResume', keyword],
    queryFn: () => fetchResume(keyword),
    enabled: !!keyword, // Only run the query if a keyword is provided
  });
};
