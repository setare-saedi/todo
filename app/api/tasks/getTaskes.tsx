
// export async function getTasks(page = 1, limit = 5) {
//     const offset = (page - 1) * limit;
//     try {
//         const response = await fetch(`http://localhost:8080/tasks?_page=${page}&_limit=${limit}`, {
//             cache: "no-store",
//             next: { tags: ['taskList'] }
//         })
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error('Failed to fetch tasks');
//         }
//         return {
//             tasks: data,
//             totalTasks: data.totalTasks 
//         }
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         throw new Error('Failed to fetch tasks');
//     }

// }

import { TaskType } from "@/components/TaskType"
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const start = (page - 1) * limit;
    const url = `http://localhost:8080/tasks?_start=${start}&_per_page=${limit}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch data from JSON Server');
        }

        const data: TaskType[] = await res.json();

        return NextResponse.json({ data });
    } catch (error) {
        // بررسی می‌کنیم که آیا error از نوع Error است یا نه
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ error: 'An unknown error occurred' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }
}
