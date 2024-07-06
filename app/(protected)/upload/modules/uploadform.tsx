'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useResumeData } from '@/hook/resumeData';
import { Input } from '@/components/ui/input';
type UploadPageProps = {
  variant: 'admin' | 'user';
};
const UploadForm = ({ variant }: UploadPageProps) => {
  const {
    keyword,
    setKeyword,
    isLoading,
    error,
    resumes,
    handleUpload,
    formRef,
    uploadStatus,
  } = useResumeData();

  return (
    <>
      {variant === 'admin' ? (
        <div>
          <h1>Search Resumes</h1>
          <Input
            type='text'
            name='keyword'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Enter keyword'
          />
          <Button
            type='button'
            onClick={() => {
              // Manually trigger the fetch resumes when button is clicked
              setKeyword(keyword);
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
          {error && <p>Error: {error}</p>}
          <ul>
            {resumes.map((resume, index) => (
              <li key={index}>{resume.content}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='container mx-auto p-4'>
          <h1 className='text-2xl font-bold mb-4'>Upload Resume</h1>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(formRef.current!);
              handleUpload(formData);
            }}
            encType='multipart/form-data'
            className='flex flex-col gap-4'
          >
            <input
              type='file'
              name='resumes'
              accept='.pdf,.docx'
              multiple
              className='border p-2 rounded'
            />
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload Resumes'}
            </Button>
          </form>
          {uploadStatus && <p className='mt-4'>{uploadStatus}</p>}
        </div>
      )}
    </>
  );
};

export default UploadForm;
