import { getResume, uploadResume } from '@/services/resume';
import React, { useEffect, useRef, useState } from 'react';

export const useResumeData = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [keyword, setKeyword] = useState<string>('developer');
  const [resumes, setResumes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch resumes based on the keyword
  useEffect(() => {
    const fetchResumes = async () => {
      setIsLoading(true);
      try {
        const data = await getResume(keyword);
        setResumes(data || []); // Ensure resumes is always an array
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [keyword]); // Dependency array includes `keyword`

  const handleUpload = async (formdata: FormData) => {
    if (!(formdata instanceof FormData)) {
      throw new Error('Invalid form data');
    }
    setIsLoading(true);
    try {
      const result = await uploadResume(formdata);
      setUploadStatus(result.message);
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      setUploadStatus('Failed to upload resumes');
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleUpload,
    keyword,
    error,
    formRef,
    resumes,
    setKeyword,
    isLoading,
    uploadStatus,
  };
};
