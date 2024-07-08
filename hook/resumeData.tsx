import { toast } from '@/components/ui/use-toast';
import { uploadResume } from '@/services/resume';
import React, { useEffect, useRef, useState } from 'react';

export const useResumeData = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [keyword, setKeyword] = useState<string>('developer');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (formdata: FormData) => {
    if (!(formdata instanceof FormData)) {
      throw new Error('Invalid form data');
    }
    setIsLoading(true);
    try {
      await uploadResume(formdata);
      toast({
        title: 'Resume Uploaded Sucessfully',
      });
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: `${error}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleUpload,
    keyword,
    formRef,
    setKeyword,
    isLoading,
  };
};
