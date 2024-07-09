'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useResumeData } from '@/hook/resumeData';
import { Input } from '@/components/ui/input';
import { useGetResume } from '@/services/resume';
import { toast } from '@/components/ui/use-toast';
import { Submit } from '@/components/ui/submitbutton';

type UploadPageProps = {
  variant: 'admin' | 'member';
};

const UploadForm = ({ variant }: UploadPageProps) => {
  const { keyword, setKeyword, handleUpload, formRef, isLoading } =
    useResumeData();

  const {
    data,
    isLoading: isSearching,
    isError,
    error,
  } = useGetResume(keyword);

  const onSearchClick = () => {
    setKeyword(keyword);
  };

  return (
    <>
      {variant === 'admin' ? (
        <div className='w-full space-y-4'>
          <h1 className='text-2xl font-bold mb-4'>Search Resumes</h1>
          <Input
            type='text'
            name='keyword'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Enter keyword'
          />
          <Submit
            pendingText='Searching ...'
            className='w-full'
            type='button'
            onClick={onSearchClick}
            disabled={isSearching}
          >
            Search
          </Submit>
          {isSearching && <p>Loading...</p>}
          {isError && <p className='text-red-500'>Error: {error.message}</p>}
          {data && data.length > 0 ? (
            <div>
              <h2 className='text-xl font-bold mb-2'>Search Results:</h2>
              <ul>
                {data.map(
                  (resume: any, index: React.Key | null | undefined) => (
                    <li
                      key={index}
                      className='p-4 border border-gray-200 rounded-md shadow-sm mb-2'
                    >
                      <pre>{resume.content}</pre>
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : data && data.length === 0 ? (
            <p>No resumes found for the keyword.</p>
          ) : null}
        </div>
      ) : (
        <div className='container mx-auto p-4'>
          <h1 className='text-2xl font-bold mb-4'>Upload Resume</h1>
          <form
            ref={formRef}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const formData = new FormData(formRef.current!);
                await handleUpload(formData);
                toast({
                  title: 'Resume Uploaded Successfully',
                });
              } catch (error) {
                toast({
                  title: 'Uh oh! Something went wrong.',
                  variant: 'destructive',
                });
              }
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
            <Submit
              pendingText='Uploading ...'
              type='submit'
              className='w-full'
            >
              Upload Resume
            </Submit>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadForm;
