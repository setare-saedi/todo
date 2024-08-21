import { TaskType } from '@/components/TaskType'
import Link from 'next/link';
import React from 'react';
import { fetchTaskData } from '@/app/api/tasks/[id]';
import { redirect } from 'next/navigation';

const Task = async ({ params }: { params: { id: string } }) => {
  let data: TaskType;

  try {
    data = await fetchTaskData(params.id);
  } catch (error) {
    redirect('/error');
    return null;
  }
  if (!data) {
    redirect('/');
    return null;
  }

  return (
    <div className='text-center flex flex-col mt-10 gap-12 '>
      <p className=' text-2xl my-3 text-violet-950'>صفحه ی اطلاعات تسک</p>
      <div>
        {data.task}
      </div>
      <div className=' mt-20 px-8 rounded-md bg-violet-600 text-white py-2 w-fit mx-auto border border-violet-900'>
        <Link href={'/'}>بازگشت به لیست تسک ها</Link>
      </div>
    </div>
  );
}

export default Task;