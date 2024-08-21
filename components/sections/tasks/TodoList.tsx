'use client';
import { useState, useEffect } from 'react';
import { TaskType } from '@/components/TaskType';
import TaskItem from '@/components/todosItem/TaskItem';
import Pagination from '@/components/pagination/Pagination';
import FetchTodos from '@/app/api/tasks/getTaskes';
import { Suspense } from 'react';
import LoadingSkeleton from '@/app/tasks/LoadingSkeleton';

interface TodosListProps {
  initialTodos: TaskType[];
  totalTodos: number;
}

export default function TodoList({ initialTodos, totalTodos }: TodosListProps) {
  const limitItem = 5;
  const totalPages = Math.ceil(totalTodos / limitItem);

  const [todos, setTodos] = useState<TaskType[]>(initialTodos);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);
  async function fetchTodos(page: number) {
    const res = await FetchTodos({ page: currentPage })
    setTodos(res.todos);

  }
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <ul>
        {
          todos ?
            <Suspense fallback={<LoadingSkeleton />}>
              {todos.map((todo) => (
                <TaskItem key={todo.id} task={todo} deleteTask={() => fetchTodos(currentPage)} />
              ))}
            </Suspense>
            :
            <LoadingSkeleton />
        }
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
