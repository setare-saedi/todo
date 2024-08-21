// // import { useState, useEffect } from 'react';
// import { TaskType } from '@/components/TaskType';

// interface FetchDataProps {
//     page: number
//     limit?: number;
// }


// const fetchTodos = ({ page , limit  }: FetchDataProps) => {

//     let err: string | null =null;
//     let totalCount :number=0;
//     let todos: TaskType[]=[];

//     const fetchData = async () => {
//         try {
//             const res = await fetch(`http://localhost:8080/tasks?_page=${page}&_limit=${limit}`);
//             const data: { todos: TaskType[]; totalCount: number } = await res.json();
//             todos=data.todos;
//             totalCount=data.totalCount;
//             err=null;
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             err = 'خطایی در دریافت داده‌ها رخ داده است.';
//         }
//     };
//     return { todos, totalCount, err };
// };

// export default fetchTodos;

import { TaskType } from "@/components/TaskType";

interface FetchTodosProps {
    page?: number;
    limit?: number;
}

export default async function FetchTodos({ page = 1, limit = 5 }: FetchTodosProps): Promise<{ todos: TaskType[], totalCount: number }> {
    const res = await fetch(`http://localhost:8080/tasks?_page=${page}&_limit=${limit}`);
    const todos: TaskType[] = await res.json();
    const totalCount = parseInt(res.headers.get('X-Total-Count') || '0', 10);
    
    console.log(totalCount, 'total');

    return { todos, totalCount };
}