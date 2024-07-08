import { uploadResume } from '@/services/resume';
import React, { useEffect, useRef, useState } from 'react';

export const useResumeData = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [keyword, setKeyword] = useState<string>('developer');
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    formRef,
    resumes,
    setKeyword,
    isLoading,
    uploadStatus,
  };
};
