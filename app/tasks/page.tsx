'use server'
import { revalidateTag } from "next/cache";
import { TaskType } from "@/components/TaskType";
import TaskForm from "@/components/sections/tasks/TaskForm";
import { addTask } from "../api/tasks/addTask";
import TodoList from "@/components/sections/tasks/TodoList";
import FetchTodos from "../api/tasks/getTaskes";

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
    const tasks = await FetchTodos({ page: 1 });
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

