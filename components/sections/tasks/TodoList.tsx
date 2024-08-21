'use client';
import { useState, useEffect } from 'react';
import { TaskType } from '@/components/TaskType';
import TaskItem from '@/components/todosItem/TaskItem';
import Pagination from '@/components/pagination/Pagination';
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
    try {
      const res = await fetch(`http://localhost:8080/tasks?_page=${page}&_limit=${limitItem}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to fetch todos');
      }
      const todos: TaskType[] = await res.json();
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <section>
        {
          todos ?
            <ul>
              <Suspense fallback={<LoadingSkeleton />}>
                {todos.map((todo) => (
                  <TaskItem key={todo.id} task={todo} deleteTask={() => fetchTodos(currentPage)} />
                ))}
              </Suspense>
            </ul>
            :
            <LoadingSkeleton />
        }
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
