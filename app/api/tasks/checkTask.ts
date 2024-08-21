"use server";
import { TaskType } from "@/components/TaskType";
export async function checkTask(todo: TaskType) {
'use server'
    const checked = { ...todo, isCompleted: !todo.isCompleted }
    const checkTask = await fetch(`http://localhost:8080/tasks/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checked)
    })

  if (!checkTask.ok) {
    throw new Error('Failed to checked todo');
  }

  return checkTask.json();
}