'use server'
import { revalidateTag } from "next/cache";
import { TaskType } from "@/components/TaskType";
import TaskForm from "@/components/sections/tasks/TaskForm";
import { addTask } from "../api/tasks/addTask";
import TodoList from "@/components/sections/tasks/TodoList";
const add = async (taskDescription: string) => {
    'use server'
    const newTask: TaskType = {
        id: crypto.randomUUID(),
        task: taskDescription,
        isCompleted: false
    }
    await addTask(newTask)
    revalidateTag('taskList')
}

export default async function Tasks() {
    const tasks = await fetchTodos(1); // Fetch initial data for page 1
    const todos: TaskType[] = tasks.todos
    const count: number = tasks.totalCount

    return (
        <div className="pt-10">
            <section>
                <TaskForm addTask={add} />
            </section>
            <section>
                <TodoList initialTodos={todos} totalTodos={count} />
            </section>
        </div>
    );
}

async function fetchTodos(page: number = 1, limit: number = 5): Promise<{ todos: TaskType[], totalCount: number }> {
    const res = await fetch(`http://localhost:8080/tasks?_page=${page}&_limit=${limit}`);
    const todos: TaskType[] = await res.json();
    const totalCount = parseInt(res.headers.get('X-Total-Count') || '0', 10);
    console.log(totalCount, 'total');

    return { todos, totalCount };
}