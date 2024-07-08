'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useResumeData } from '@/hook/resumeData';
import { Input } from '@/components/ui/input';
import { useGetResume } from '@/services/resume';
import { toast } from '@/components/ui/use-toast';
type UploadPageProps = {
  variant: 'admin' | 'member';
};
const UploadForm = ({ variant }: UploadPageProps) => {
  const { keyword, setKeyword, resumes, handleUpload, formRef, uploadStatus } =
    useResumeData();

  const { data, isLoading, isError, error } = useGetResume(keyword);
  return (
    <>
      {variant === 'admin' ? (
        <div className='w-full space-y-4 '>
          <h1>Search Resumes</h1>
          <Input
            type='text'
            name='keyword'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Enter keyword'
          />
          <Button
            className='w-full'
            type='button'
            onClick={() => {
              setKeyword(keyword);
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error: {error.message}</p>}
          <ul>
            {data && (
              <div>
                <h2>Search Results:</h2>
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
            )}
          </ul>
        </div>
      ) : (
        <div className='container mx-auto p-4'>
          <h1 className='text-2xl font-bold mb-4'>Upload Resume</h1>
          <form
            ref={formRef}
            onSubmit={(e) => {
              try {
                e.preventDefault();
                const formData = new FormData(formRef.current!);
                handleUpload(formData);

                toast({
                  title: 'Resume Uploaded Sucessfully',
                  description: `${uploadStatus}`,
                });
              } catch (e) {
                toast({
                  title: 'Uh oh! Something went wrong.',
                  description: `${uploadStatus}`,
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
