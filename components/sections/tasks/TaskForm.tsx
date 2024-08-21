'use client'

import { FormEvent, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useFormStatus } from 'react-dom'

interface TaskFormProps {
  addTask: (e: string) => void;
}

function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [task, setTask] = useState('')
  const { pending } = useFormStatus()

  const handleSubmit = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if (!task.trim()) return
    let data=sanitizeInput(task.trim())
    addTask(data)
    setTask('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex items-center rounded-lg border-2 border-violet-600 w-fit mx-auto bg-white shadow-md mb-6">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          name="task"
          className="px-4 py-2 outline-none rounded-lg w-[450px] bg-white"
          autoComplete="nct"
          placeholder="برنامه جدید..." />
        <button
          type="submit"
          disabled={pending || !task.trim()}
          className="px-2"  >
          <GrAdd className=" text-violet-800 text-xl" />
        </button>
      </div>
    </form>
  )
}
