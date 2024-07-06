import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className='min-h-screen h-full w-full  bg-white flex flex-col '>
      {children}
    </div>
  );
}
